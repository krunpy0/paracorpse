import { useState, useEffect, useRef } from "react";
import type {
  SiteContent,
  NewsItem,
  JoinUsContent,
  AboutContent,
  HeroContent,
  FooterContent,
} from "../types";
import { SITE_CONTENT } from "../data";
import {
  getStoredToken,
  clearStoredToken,
  testGithubAuth,
  uploadMediaToGithub,
  commitSiteContentToGithub,
  getRepoConfig,
  type AuthStatus,
} from "./services/github";
import { AdminLogin } from "./components/AdminLogin";
import { NewsManager } from "./components/NewsManager";
import { JoinUsManager } from "./components/JoinUsManager";
import { AboutManager } from "./components/AboutManager";
import { GeneralManager } from "./components/GeneralManager";
import { DeployStatus } from "./components/DeployStatus";
import type { OptimizedImageResult } from "./utils/imageOptimizer";
import "./admin.css";

interface AdminAppProps {
  onBackToSite?: () => void;
}

type AdminTab = "news" | "join" | "about" | "general" | "deploy";

export function AdminApp({ onBackToSite }: AdminAppProps) {
  const [token, setToken] = useState<string | null>(getStoredToken());
  const [authStatus, setAuthStatus] = useState<AuthStatus | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  // Draft state initialized with current site content
  const [workingContent, setWorkingContent] = useState<SiteContent>(() =>
    JSON.parse(JSON.stringify(SITE_CONTENT))
  );
  const [initialJson, setInitialJson] = useState<string>(() =>
    JSON.stringify(SITE_CONTENT)
  );

  // Pending photos to upload on publish: map of fileName -> OptimizedImageResult
  const pendingPhotosRef = useRef<Map<string, OptimizedImageResult>>(new Map());
  const [pendingPhotosCount, setPendingPhotosCount] = useState<number>(0);

  const [activeTab, setActiveTab] = useState<AdminTab>("news");
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishMessage, setPublishMessage] = useState("");
  const [publishError, setPublishError] = useState<string | null>(null);
  const [publishSuccessUrl, setPublishSuccessUrl] = useState<string | null>(null);

  // Check auth on mount
  useEffect(() => {
    let isMounted = true;
    const initAuth = async () => {
      const stored = getStoredToken();
      if (!stored) {
        if (isMounted) setIsCheckingAuth(false);
        return;
      }
      const status = await testGithubAuth(stored);
      if (isMounted) {
        if (status.success) {
          setAuthStatus(status);
          setToken(stored);
        } else {
          clearStoredToken();
          setToken(null);
        }
        setIsCheckingAuth(false);
      }
    };
    initAuth();
    return () => {
      isMounted = false;
    };
  }, []);

  const isDirty =
    JSON.stringify(workingContent) !== initialJson || pendingPhotosCount > 0;

  const handleLogout = () => {
    if (isDirty && !confirm("Discard all unsaved changes and sign out?")) {
      return;
    }
    clearStoredToken();
    setToken(null);
    setAuthStatus(null);
  };

  const handleLoginSuccess = (newToken: string, status: AuthStatus) => {
    setToken(newToken);
    setAuthStatus(status);
  };

  const handleRegisterPendingPhoto = (photo: OptimizedImageResult) => {
    pendingPhotosRef.current.set(photo.fileName, photo);
    setPendingPhotosCount(pendingPhotosRef.current.size);
  };

  // Content updaters
  const handleNewsChange = (news: NewsItem[]) => {
    setWorkingContent((prev) => ({ ...prev, news }));
  };

  const handleJoinUsChange = (joinUs: JoinUsContent) => {
    setWorkingContent((prev) => ({ ...prev, joinUs }));
  };

  const handleAboutChange = (about: AboutContent) => {
    setWorkingContent((prev) => ({ ...prev, about }));
  };

  const handleHeroChange = (hero: HeroContent) => {
    setWorkingContent((prev) => ({ ...prev, hero }));
  };

  const handleFooterChange = (footer: FooterContent) => {
    setWorkingContent((prev) => ({ ...prev, footer }));
  };

  // PUBLISH WORKFLOW
  const handlePublish = async () => {
    if (!token) return;

    try {
      setIsPublishing(true);
      setPublishError(null);
      setPublishSuccessUrl(null);

      const pendingMap = pendingPhotosRef.current;
      const totalPhotos = pendingMap.size;

      // 1. Upload all pending media to GitHub
      if (totalPhotos > 0) {
        let uploadedCount = 0;
        for (const [fileName, photo] of pendingMap.entries()) {
          uploadedCount++;
          setPublishMessage(
            `Uploading photos (${uploadedCount}/${totalPhotos})...`
          );
          const uploadRes = await uploadMediaToGithub(token, fileName, photo.base64);
          if (!uploadRes.success) {
            throw new Error(`Failed to upload ${fileName}: ${uploadRes.error}`);
          }
        }
      }

      // 2. Commit updated siteContent.json
      setPublishMessage("Saving changes to GitHub...");
      const commitRes = await commitSiteContentToGithub(
        token,
        workingContent,
        `Update website content via Admin CMS (${new Date().toLocaleTimeString()})`
      );

      if (!commitRes.success) {
        throw new Error(commitRes.error || "Failed to save changes to GitHub");
      }

      // 3. Success
      pendingPhotosRef.current.clear();
      setPendingPhotosCount(0);
      setInitialJson(JSON.stringify(workingContent));
      setPublishMessage("Changes published. Deploying site (~45s)");
      setPublishSuccessUrl(commitRes.commitUrl || null);
    } catch (e: any) {
      setPublishError(e.message || "Failed to save changes");
    } finally {
      setIsPublishing(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="admin-login-wrapper">
        <div className="film-grain-layer" />
        <div style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Loading...
        </div>
      </div>
    );
  }

  if (!token || !authStatus) {
    return (
      <>
        <div className="film-grain-layer" />
        <AdminLogin onSuccess={handleLoginSuccess} />
      </>
    );
  }

  const config = getRepoConfig();

  return (
    <div className="admin-root">
      {/* Persistent Film Grain Overlay per DESIGN.md */}
      <div className="film-grain-layer" />

      {/* HEADER */}
      <header className="admin-navbar">
        <div className="admin-brand">
          <span className="admin-logo">PARACORPSE</span>
          <span className="admin-cms-tag">CMS</span>
        </div>

        <div className="admin-nav-actions">
          {authStatus.avatarUrl && (
            <div className="admin-telemetry-badge">
              <img
                src={authStatus.avatarUrl}
                alt="avatar"
                className="admin-user-avatar"
              />
              <span>{authStatus.username}</span>
              <span style={{ color: "var(--text-muted)" }}>{config.owner}/{config.repo}</span>
            </div>
          )}

          {onBackToSite ? (
            <button
              type="button"
              className="btn-secondary-action"
              onClick={onBackToSite}
            >
              ← Back to site
            </button>
          ) : (
            <a href="#/" className="btn-secondary-action">
              ← Back to site
            </a>
          )}

          <button
            type="button"
            className="btn-sm-danger"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* TABS */}
      <nav className="admin-tabs-bar" aria-label="Admin Sections">
        <button
          className={`admin-tab ${activeTab === "news" ? "active" : ""}`}
          onClick={() => setActiveTab("news")}
        >
          News ({workingContent.news.length})
        </button>
        <button
          className={`admin-tab ${activeTab === "join" ? "active" : ""}`}
          onClick={() => setActiveTab("join")}
        >
          Auditions {!workingContent.joinUs.enabled && "(Hidden)"}
        </button>
        <button
          className={`admin-tab ${activeTab === "about" ? "active" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          About &amp; Members ({workingContent.about.members.length})
        </button>
        <button
          className={`admin-tab ${activeTab === "general" ? "active" : ""}`}
          onClick={() => setActiveTab("general")}
        >
          General &amp; Footer
        </button>
        <button
          className={`admin-tab ${activeTab === "deploy" ? "active" : ""}`}
          onClick={() => setActiveTab("deploy")}
        >
          Deploy Status
        </button>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="admin-container">
        {publishError && (
          <div className="admin-alert alert-error">
            <span>Error: {publishError}</span>
            <button
              onClick={() => setPublishError(null)}
              style={{ background: "none", border: "none", color: "var(--text-primary)", cursor: "pointer", fontFamily: "var(--font-mono)" }}
            >
              Close
            </button>
          </div>
        )}

        {publishSuccessUrl && (
          <div className="admin-alert alert-success">
            <div>
              <span>{publishMessage}</span>
              <div style={{ marginTop: "0.4rem" }}>
                <a
                  href={publishSuccessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--signal-white)", textDecoration: "underline", textUnderlineOffset: "4px", fontSize: "0.75rem" }}
                >
                  View commit on GitHub ↗
                </a>
              </div>
            </div>
            <button
              onClick={() => setPublishSuccessUrl(null)}
              style={{ background: "none", border: "none", color: "var(--signal-white)", cursor: "pointer", fontFamily: "var(--font-mono)" }}
            >
              Close
            </button>
          </div>
        )}

        {activeTab === "news" && (
          <NewsManager
            news={workingContent.news}
            onChange={handleNewsChange}
            onRegisterPendingPhoto={handleRegisterPendingPhoto}
          />
        )}

        {activeTab === "join" && (
          <JoinUsManager
            joinUs={workingContent.joinUs}
            onChange={handleJoinUsChange}
          />
        )}

        {activeTab === "about" && (
          <AboutManager
            about={workingContent.about}
            onChange={handleAboutChange}
            onRegisterPendingPhoto={handleRegisterPendingPhoto}
          />
        )}

        {activeTab === "general" && (
          <GeneralManager
            hero={workingContent.hero}
            footer={workingContent.footer}
            onHeroChange={handleHeroChange}
            onFooterChange={handleFooterChange}
          />
        )}

        {activeTab === "deploy" && <DeployStatus token={token} />}
      </main>

      {/* FLOATING ACTION BAR */}
      <div className="admin-publish-bar">
        <div className="publish-bar-status">
          <span
            className={`publish-square-signal ${
              isPublishing ? "busy" : isDirty ? "dirty" : ""
            }`}
          />
          <span>
            {isPublishing
              ? publishMessage || "Saving changes to repository..."
              : isDirty
              ? `Unsaved changes (${pendingPhotosCount} photos pending)`
              : "Changes saved"}
          </span>
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {isDirty && !isPublishing && (
            <button
              type="button"
              className="btn-secondary-action"
              onClick={() => {
                if (confirm("Discard all unsaved changes?")) {
                  setWorkingContent(JSON.parse(initialJson));
                  pendingPhotosRef.current.clear();
                  setPendingPhotosCount(0);
                }
              }}
            >
              Discard
            </button>
          )}

          <button
            type="button"
            className="btn-primary-action"
            disabled={!isDirty || isPublishing}
            onClick={handlePublish}
          >
            {isPublishing ? "Saving..." : "Save changes →"}
          </button>
        </div>
      </div>
    </div>
  );
}
