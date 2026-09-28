import { useState } from "react";
import {
  testGithubAuth,
  setStoredToken,
  setRepoConfig,
  getRepoConfig,
  type AuthStatus,
  type RepoConfig,
} from "../services/github";

interface AdminLoginProps {
  onSuccess: (token: string, status: AuthStatus) => void;
}

export function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfig, setShowConfig] = useState(false);

  const [config, setConfig] = useState<RepoConfig>(getRepoConfig());

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      setError("Please enter your GitHub Personal Access Token");
      return;
    }

    setLoading(true);
    setError(null);

    setRepoConfig(config);
    const auth = await testGithubAuth(token.trim(), config);

    if (!auth.success) {
      setError(auth.error || "GitHub authentication failed. Check your token.");
      setLoading(false);
      return;
    }

    if (!auth.canPush) {
      setError(
        `Signed in as ${auth.username}, but write permission to ${config.owner}/${config.repo} is missing. Make sure your token has the "repo" scope.`
      );
      setLoading(false);
      return;
    }

    setStoredToken(token.trim());
    setLoading(false);
    onSuccess(token.trim(), auth);
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              letterSpacing: "0.15em",
              color: "var(--text-muted)",
              marginBottom: "0.75rem",
              textTransform: "uppercase",
            }}
          >
            Admin Panel
          </div>
          <h1 className="admin-login-title">PARACORPSE</h1>
          <p className="admin-login-subtitle">
            Manage band news, members, and auditions. Changes are committed directly to your GitHub repository.
          </p>
        </div>

        {error && (
          <div className="admin-alert alert-error">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleConnect}>
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="gh-token">
              GitHub Personal Access Token
            </label>
            <input
              id="gh-token"
              type="password"
              className="admin-input"
              placeholder="ghp_..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div style={{ marginBottom: "1.5rem", textAlign: "right" }}>
            <button
              type="button"
              onClick={() => setShowConfig(!showConfig)}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                fontSize: "0.72rem",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.08em",
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                textTransform: "uppercase",
              }}
            >
              {showConfig ? "Hide repository settings" : "Repository settings"}
            </button>
          </div>

          {showConfig && (
            <div
              style={{
                background: "var(--bg-pure)",
                border: "1px solid var(--border-medium)",
                padding: "1.25rem",
                marginBottom: "1.5rem",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="admin-label">Owner</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={config.owner}
                    onChange={(e) =>
                      setConfig({ ...config, owner: e.target.value.trim() })
                    }
                  />
                </div>
                <div>
                  <label className="admin-label">Repository</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={config.repo}
                    onChange={(e) =>
                      setConfig({ ...config, repo: e.target.value.trim() })
                    }
                  />
                </div>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <label className="admin-label">Branch</label>
                <input
                  type="text"
                  className="admin-input"
                  value={config.branch}
                  onChange={(e) =>
                    setConfig({ ...config, branch: e.target.value.trim() })
                  }
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn-primary-action"
            style={{ width: "100%", padding: "16px 28px" }}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>

        <div className="admin-token-help">
          <div style={{ fontWeight: 600, color: "var(--text-primary)", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
            How to get a token:
          </div>
          <ol>
            <li>
              Open GitHub:{" "}
              <a
                href="https://github.com/settings/tokens/new?scopes=repo&description=Paracorpse+Admin+CMS"
                target="_blank"
                rel="noopener noreferrer"
              >
                Generate Personal Access Token ↗
              </a>
            </li>
            <li>Select the <b>repo</b> scope.</li>
            <li>Click <b>Generate token</b> and paste the string above.</li>
          </ol>
          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.75rem", borderTop: "1px solid var(--border-subtle)", paddingTop: "0.75rem" }}>
            Your token is stored only in your browser (localStorage).
          </div>
        </div>
      </div>
    </div>
  );
}
