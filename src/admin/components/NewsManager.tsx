import { useState } from "react";
import type { NewsItem } from "../../types";
import { PhotoUploader } from "./PhotoUploader";
import { resolveMediaUrl } from "../../data";
import type { OptimizedImageResult } from "../utils/imageOptimizer";

interface NewsManagerProps {
  news: NewsItem[];
  onChange: (updatedNews: NewsItem[]) => void;
  onRegisterPendingPhoto: (photo: OptimizedImageResult) => void;
}

export function NewsManager({
  news,
  onChange,
  onRegisterPendingPhoto,
}: NewsManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const startEdit = (item: NewsItem) => {
    setEditingItem({ ...item });
    setEditingId(item.id);
    setIsCreating(false);
  };

  const startCreate = () => {
    const newItem: NewsItem = {
      id: `news_${Date.now()}`,
      headline: "",
      previewImage: "",
      content: "",
    };
    setEditingItem(newItem);
    setEditingId(newItem.id);
    setIsCreating(true);
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditingId(null);
    setIsCreating(false);
  };

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.headline.trim()) {
      alert("Please enter a headline");
      return;
    }

    if (isCreating) {
      onChange([editingItem, ...news]);
    } else {
      onChange(news.map((n) => (n.id === editingItem.id ? editingItem : n)));
    }

    setEditingItem(null);
    setEditingId(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this news post?")) {
      onChange(news.filter((n) => n.id !== id));
      if (editingId === id) {
        cancelEdit();
      }
    }
  };

  const handlePhotoSelected = (result: OptimizedImageResult) => {
    if (!editingItem) return;
    onRegisterPendingPhoto(result);
    setEditingItem({
      ...editingItem,
      previewImage: `/uploads/${result.fileName}`,
    });
  };

  return (
    <div>
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">News</h2>
          <p className="admin-section-subtitle">
            Manage band news, releases, and announcements
          </p>
        </div>
        {!editingItem && (
          <button
            type="button"
            className="btn-primary-action"
            onClick={startCreate}
          >
            + Add News
          </button>
        )}
      </div>

      {editingItem && (
        <div className="admin-card" style={{ borderColor: "var(--signal-white)" }}>
          <h3 className="admin-card-title">
            {isCreating ? "New Post" : "Edit Post"}
          </h3>

          <form onSubmit={saveEdit}>
            <div className="admin-form-group">
              <label className="admin-label">Headline</label>
              <input
                type="text"
                className="admin-input"
                value={editingItem.headline}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, headline: e.target.value })
                }
                placeholder="News headline..."
                required
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Content</label>
              <textarea
                className="admin-textarea"
                rows={5}
                value={editingItem.content}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, content: e.target.value })
                }
                placeholder="News content..."
                required
              />
            </div>

            <PhotoUploader
              label="Photo (reveals on hover)"
              currentPhotoUrl={editingItem.previewImage}
              onPhotoSelected={handlePhotoSelected}
              onPhotoRemoved={() =>
                setEditingItem({ ...editingItem, previewImage: "" })
              }
            />

            <div className="admin-form-actions">
              <button type="submit" className="btn-primary-action">
                Save Post
              </button>
              <button
                type="button"
                className="btn-secondary-action"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {news.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
            }}
          >
            No news posts yet.
          </div>
        ) : (
          news.map((item) => {
            const imgUrl = item.previewImage
              ? resolveMediaUrl(item.previewImage)
              : "";

            return (
              <div
                key={item.id}
                className="admin-card admin-item-card"
              >
                <div className="admin-item-content">
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={item.headline}
                      className="admin-item-thumb"
                    />
                  ) : (
                    <div className="admin-item-thumb-placeholder">
                      No photo
                    </div>
                  )}

                  <div className="admin-item-text">
                    <h4 className="admin-item-headline">
                      {item.headline}
                    </h4>
                    <p className="admin-item-snippet">
                      {item.content}
                    </p>
                  </div>
                </div>

                <div className="admin-item-actions">
                  <button
                    type="button"
                    className="btn-secondary-action"
                    onClick={() => startEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-sm-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
