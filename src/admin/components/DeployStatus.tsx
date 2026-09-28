import { useState, useEffect } from "react";
import {
  getLatestDeployStatus,
  getRepoConfig,
  type WorkflowRunStatus,
} from "../services/github";

interface DeployStatusProps {
  token: string;
}

export function DeployStatus({ token }: DeployStatusProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<WorkflowRunStatus | null>(null);

  const fetchStatus = async () => {
    setLoading(true);
    const config = getRepoConfig();
    const result = await getLatestDeployStatus(token, config);
    setStatus(result);
    setLoading(false);
  };

  useEffect(() => {
    let active = true;
    const config = getRepoConfig();
    getLatestDeployStatus(token, config).then((result) => {
      if (active) {
        setStatus(result);
      }
    });
    return () => {
      active = false;
    };
  }, [token]);

  return (
    <div>
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">Deploy Status</h2>
          <p className="admin-section-subtitle">
            GitHub Actions build and deployment status
          </p>
        </div>
        <button
          type="button"
          className="btn-secondary-action"
          onClick={fetchStatus}
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Status"}
        </button>
      </div>

      <div className="admin-card">
        <h3 className="admin-card-title">Latest Build</h3>

        {status ? (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1.25rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  background: "var(--bg-pure)",
                  padding: "1.25rem",
                  border: "1px solid var(--border-medium)",
                }}
              >
                <div className="admin-label">Status</div>
                <div style={{ fontWeight: 600, fontSize: "0.88rem", fontFamily: "var(--font-mono)" }}>
                  {status.status === "in_progress" && "Build in progress..."}
                  {status.status === "queued" && "Queued"}
                  {status.status === "completed" && status.conclusion === "success" && (
                    <span style={{ color: "var(--signal-white)" }}>Deployed to GitHub Pages</span>
                  )}
                  {status.status === "completed" && status.conclusion === "failure" && (
                    <span style={{ color: "var(--text-muted)" }}>Build failed</span>
                  )}
                  {status.status === "completed" &&
                    status.conclusion !== "success" &&
                    status.conclusion !== "failure" &&
                    status.conclusion}
                </div>
              </div>

              <div
                style={{
                  background: "var(--bg-pure)",
                  padding: "1.25rem",
                  border: "1px solid var(--border-medium)",
                }}
              >
                <div className="admin-label">Started</div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
                  {new Date(status.createdAt).toLocaleString()}
                </div>
              </div>

              <div
                style={{
                  background: "var(--bg-pure)",
                  padding: "1.25rem",
                  border: "1px solid var(--border-medium)",
                }}
              >
                <div className="admin-label">Build Run</div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                  Run #{status.id}
                </div>
              </div>
            </div>

            <a
              href={status.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-action"
            >
              View build logs on GitHub ↗
            </a>
          </div>
        ) : (
          <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontFamily: "var(--font-mono)" }}>
            {loading ? "Checking GitHub..." : "No build runs found."}
          </div>
        )}
      </div>

      <div className="admin-card">
        <h3 className="admin-card-title">How publishing works</h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: "1.8", fontFamily: "var(--font-ui)" }}>
          1. When you click <b>"Save changes"</b>, your text edits and uploaded photos are committed to the GitHub repository.
          <br />
          2. GitHub Actions automatically rebuilds and deploys the site in <b>30–50 seconds</b>.
          <br />
          3. The live site at{" "}
          <a
            href="https://krunpy0.github.io/paracorpse/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--signal-white)", textDecoration: "underline", textUnderlineOffset: "4px" }}
          >
            krunpy0.github.io/paracorpse/
          </a>{" "}
          updates automatically.
        </p>
      </div>
    </div>
  );
}
