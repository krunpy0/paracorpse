import type { SiteContent } from "../../types";

export const DEFAULT_REPO_OWNER = "krunpy0";
export const DEFAULT_REPO_NAME = "paracorpse";
export const DEFAULT_BRANCH = "main";

const TOKEN_STORAGE_KEY = "paracorpse_admin_gh_token";
const REPO_CONFIG_KEY = "paracorpse_admin_repo_config";

export interface RepoConfig {
  owner: string;
  repo: string;
  branch: string;
}

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setStoredToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, token.trim());
}

export function clearStoredToken(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function getRepoConfig(): RepoConfig {
  try {
    const raw = localStorage.getItem(REPO_CONFIG_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }
  return {
    owner: DEFAULT_REPO_OWNER,
    repo: DEFAULT_REPO_NAME,
    branch: DEFAULT_BRANCH,
  };
}

export function setRepoConfig(config: RepoConfig): void {
  localStorage.setItem(REPO_CONFIG_KEY, JSON.stringify(config));
}

/**
 * Robust Unicode (Cyrillic / Russian) UTF-8 string to Base64
 */
export function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Base64 to Unicode UTF-8 string
 */
export function base64ToUtf8(base64: string): string {
  const binary = atob(base64.replace(/\s/g, ""));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export interface AuthStatus {
  success: boolean;
  username?: string;
  avatarUrl?: string;
  repoName?: string;
  canPush?: boolean;
  error?: string;
}

export async function testGithubAuth(
  token: string,
  config: RepoConfig = getRepoConfig()
): Promise<AuthStatus> {
  try {
    const headers = {
      Authorization: `Bearer ${token.trim()}`,
      Accept: "application/vnd.github.v3+json",
    };

    // 1. Check user info
    const userRes = await fetch("https://api.github.com/user", { headers });
    if (!userRes.ok) {
      const err = await userRes.json().catch(() => ({}));
      return {
        success: false,
        error: err.message || `GitHub Auth error (${userRes.status})`,
      };
    }
    const userData = await userRes.json();

    // 2. Check repo access
    const repoRes = await fetch(
      `https://api.github.com/repos/${config.owner}/${config.repo}`,
      { headers }
    );
    if (!repoRes.ok) {
      const err = await repoRes.json().catch(() => ({}));
      return {
        success: false,
        username: userData.login,
        avatarUrl: userData.avatar_url,
        error: `Cannot access repository ${config.owner}/${config.repo}: ${
          err.message || repoRes.statusText
        }`,
      };
    }
    const repoData = await repoRes.json();

    const canPush =
      Boolean(repoData.permissions?.push) ||
      Boolean(repoData.permissions?.admin);

    return {
      success: true,
      username: userData.login,
      avatarUrl: userData.avatar_url,
      repoName: repoData.full_name,
      canPush,
    };
  } catch (e: any) {
    return {
      success: false,
      error: e.message || "Network error while connecting to GitHub",
    };
  }
}

/**
 * Uploads a photo directly into public/uploads/{fileName} in the GitHub repository.
 */
export async function uploadMediaToGithub(
  token: string,
  fileName: string,
  base64Content: string,
  config: RepoConfig = getRepoConfig()
): Promise<{ success: boolean; filePath: string; error?: string }> {
  try {
    const filePath = `public/uploads/${fileName}`;
    const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${filePath}`;
    const headers = {
      Authorization: `Bearer ${token.trim()}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    };

    // Check if file exists to get SHA for update
    let existingSha: string | undefined;
    const checkRes = await fetch(url, { headers });
    if (checkRes.ok) {
      const existing = await checkRes.json();
      existingSha = existing.sha;
    }

    const payload = {
      message: `Upload media: ${fileName} via Admin [skip ci]`,
      content: base64Content,
      sha: existingSha,
      branch: config.branch,
    };

    const putRes = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(payload),
    });

    if (!putRes.ok) {
      const err = await putRes.json().catch(() => ({}));
      return {
        success: false,
        filePath: `/uploads/${fileName}`,
        error: err.message || `Upload failed with status ${putRes.status}`,
      };
    }

    return {
      success: true,
      filePath: `/uploads/${fileName}`,
    };
  } catch (e: any) {
    return {
      success: false,
      filePath: `/uploads/${fileName}`,
      error: e.message || "Failed to upload image to GitHub",
    };
  }
}

/**
 * Commits updated siteContent.json to the repository.
 */
export async function commitSiteContentToGithub(
  token: string,
  content: SiteContent,
  commitMessage = "Update site content via Admin CMS",
  config: RepoConfig = getRepoConfig()
): Promise<{ success: boolean; commitUrl?: string; error?: string }> {
  try {
    const filePath = "src/data/siteContent.json";
    const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${filePath}`;
    const headers = {
      Authorization: `Bearer ${token.trim()}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    };

    // Fetch existing file to get latest SHA if file already exists
    let sha: string | undefined;
    const getRes = await fetch(`${url}?ref=${config.branch}`, { credentials: "omit", headers });
    if (getRes.ok) {
      const currentFileData = await getRes.json();
      sha = currentFileData.sha;
    } else if (getRes.status !== 404) {
      const err = await getRes.json().catch(() => ({}));
      return {
        success: false,
        error: `Failed to inspect siteContent.json: ${err.message || getRes.statusText}`,
      };
    }

    const formattedJson = JSON.stringify(content, null, 2);
    const base64Content = utf8ToBase64(formattedJson);

    const payload: {
      message: string;
      content: string;
      sha?: string;
      branch: string;
    } = {
      message: commitMessage,
      content: base64Content,
      branch: config.branch,
    };

    if (sha) {
      payload.sha = sha;
    }

    const putRes = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(payload),
    });

    if (!putRes.ok) {
      const err = await putRes.json().catch(() => ({}));
      return {
        success: false,
        error: err.message || `Commit failed with status ${putRes.status}`,
      };
    }

    const result = await putRes.json();
    return {
      success: true,
      commitUrl: result.commit?.html_url,
    };
  } catch (e: any) {
    return {
      success: false,
      error: e.message || "Failed to commit content to GitHub",
    };
  }
}

export interface WorkflowRunStatus {
  id: number;
  status: "queued" | "in_progress" | "completed";
  conclusion: "success" | "failure" | "cancelled" | null;
  htmlUrl: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Gets the status of the latest GitHub Actions workflow run (Pages deploy)
 */
export async function getLatestDeployStatus(
  token: string,
  config: RepoConfig = getRepoConfig()
): Promise<WorkflowRunStatus | null> {
  try {
    const url = `https://api.github.com/repos/${config.owner}/${config.repo}/actions/runs?per_page=1`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token.trim()}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!res.ok) return null;
    const data = await res.json();
    if (!data.workflow_runs || data.workflow_runs.length === 0) return null;

    const latest = data.workflow_runs[0];
    return {
      id: latest.id,
      status: latest.status,
      conclusion: latest.conclusion,
      htmlUrl: latest.html_url,
      createdAt: latest.created_at,
      updatedAt: latest.updated_at,
    };
  } catch {
    return null;
  }
}
