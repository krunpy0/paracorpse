import { useState } from "react";
import type { AboutContent, BandMember } from "../../types";
import { PhotoUploader } from "./PhotoUploader";
import { resolveMediaUrl } from "../../data";
import type { OptimizedImageResult } from "../utils/imageOptimizer";

interface AboutManagerProps {
  about: AboutContent;
  onChange: (updatedAbout: AboutContent) => void;
  onRegisterPendingPhoto: (photo: OptimizedImageResult) => void;
}

export function AboutManager({
  about,
  onChange,
  onRegisterPendingPhoto,
}: AboutManagerProps) {
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [editingMember, setEditingMember] = useState<BandMember | null>(null);
  const [isCreatingMember, setIsCreatingMember] = useState(false);

  const handleFieldChange = (field: keyof AboutContent, value: any) => {
    onChange({ ...about, [field]: value });
  };

  const handleAddParagraph = () => {
    onChange({ ...about, paragraphs: [...about.paragraphs, ""] });
  };

  const handleUpdateParagraph = (index: number, val: string) => {
    const updated = [...about.paragraphs];
    updated[index] = val;
    onChange({ ...about, paragraphs: updated });
  };

  const handleRemoveParagraph = (index: number) => {
    const updated = about.paragraphs.filter((_, i) => i !== index);
    onChange({ ...about, paragraphs: updated });
  };

  // MEMBERS MANAGEMENT
  const startCreateMember = () => {
    const newMember: BandMember = {
      id: `member_${Date.now()}`,
      name: "",
      role: "",
      photo: "",
      description: "",
    };
    setEditingMember(newMember);
    setEditingMemberId(newMember.id);
    setIsCreatingMember(true);
  };

  const startEditMember = (member: BandMember) => {
    setEditingMember({ ...member });
    setEditingMemberId(member.id);
    setIsCreatingMember(false);
  };

  const cancelMemberEdit = () => {
    setEditingMember(null);
    setEditingMemberId(null);
    setIsCreatingMember(false);
  };

  const saveMemberEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    if (!editingMember.name.trim() || !editingMember.role.trim()) {
      alert("Please enter member name and role");
      return;
    }

    let updatedMembers: BandMember[];
    if (isCreatingMember) {
      updatedMembers = [...about.members, editingMember];
    } else {
      updatedMembers = about.members.map((m) =>
        m.id === editingMember.id ? editingMember : m
      );
    }

    onChange({ ...about, members: updatedMembers });
    cancelMemberEdit();
  };

  const handleDeleteMember = (memberId: string) => {
    if (confirm("Delete this member from the band?")) {
      const updatedMembers = about.members.filter((m) => m.id !== memberId);
      onChange({ ...about, members: updatedMembers });
      if (editingMemberId === memberId) {
        cancelMemberEdit();
      }
    }
  };

  const handlePhotoSelected = (result: OptimizedImageResult) => {
    if (!editingMember) return;
    onRegisterPendingPhoto(result);
    setEditingMember({
      ...editingMember,
      photo: `/uploads/${result.fileName}`,
    });
  };

  return (
    <div>
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">About &amp; Members</h2>
          <p className="admin-section-subtitle">
            Manage manifesto text, band members, and photos
          </p>
        </div>
      </div>

      {/* MANIFESTO EDITING */}
      <div className="admin-card">
        <h3 className="admin-card-title">Manifesto</h3>

        <div className="admin-form-group">
          <label className="admin-label">Section Title</label>
          <input
            type="text"
            className="admin-input"
            value={about.title}
            onChange={(e) => handleFieldChange("title", e.target.value)}
            placeholder="ABOUT US"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Lead Text</label>
          <input
            type="text"
            className="admin-input"
            value={about.lead}
            onChange={(e) => handleFieldChange("lead", e.target.value)}
            placeholder="PARACORPSE — MODERN METAL AND NU-METAL FROM MIASS, RUSSIA."
          />
        </div>

        <div className="admin-form-group">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.75rem",
            }}
          >
            <label className="admin-label" style={{ margin: 0 }}>
              Paragraphs
            </label>
            <button
              type="button"
              className="btn-secondary-action"
              onClick={handleAddParagraph}
            >
              + Add Paragraph
            </button>
          </div>

          {about.paragraphs.map((p, idx) => (
            <div
              key={idx}
              className="admin-paragraph-row"
            >
              <textarea
                className="admin-textarea"
                rows={3}
                value={p}
                onChange={(e) => handleUpdateParagraph(idx, e.target.value)}
                placeholder="Manifesto paragraph..."
              />
              <button
                type="button"
                className="btn-sm-danger admin-delete-row-btn"
                onClick={() => handleRemoveParagraph(idx)}
                aria-label="Remove paragraph"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MEMBER FORM */}
      {editingMember && (
        <div className="admin-card" style={{ borderColor: "var(--signal-white)" }}>
          <h3 className="admin-card-title">
            {isCreatingMember
              ? "New Member"
              : `Edit Member: ${editingMember.name}`}
          </h3>

          <form onSubmit={saveMemberEdit}>
            <div className="admin-form-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Name</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingMember.name}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, name: e.target.value })
                  }
                  placeholder="Igor Zaytsev"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Role</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingMember.role}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, role: e.target.value })
                  }
                  placeholder="Drums / Keys / Vocals / Guitar"
                  required
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Bio</label>
              <textarea
                className="admin-textarea"
                rows={5}
                value={editingMember.description}
                onChange={(e) =>
                  setEditingMember({
                    ...editingMember,
                    description: e.target.value,
                  })
                }
                placeholder="Member background, style, instruments..."
              />
            </div>

            <PhotoUploader
              label="Member Photo"
              currentPhotoUrl={editingMember.photo}
              onPhotoSelected={handlePhotoSelected}
              onPhotoRemoved={() =>
                setEditingMember({ ...editingMember, photo: "" })
              }
            />

            <div className="admin-form-actions">
              <button type="submit" className="btn-primary-action">
                Save Member
              </button>
              <button
                type="button"
                className="btn-secondary-action"
                onClick={cancelMemberEdit}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MEMBERS LIST */}
      <div>
        <div className="admin-subsection-header">
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                fontWeight: 800,
                textTransform: "uppercase",
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              Members ({about.members.length})
            </h3>
          </div>
          {!editingMember && (
            <button
              type="button"
              className="btn-primary-action"
              onClick={startCreateMember}
            >
              + Add Member
            </button>
          )}
        </div>

        <div className="admin-form-group" style={{ marginBottom: "1.5rem" }}>
          <label className="admin-label">Members Section Title</label>
          <input
            type="text"
            className="admin-input"
            value={about.membersTitle}
            onChange={(e) => handleFieldChange("membersTitle", e.target.value)}
            placeholder="MEMBERS"
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {about.members.map((member) => {
            const photoUrl = member.photo ? resolveMediaUrl(member.photo) : "";

            return (
              <div
                key={member.id}
                className="admin-card admin-item-card"
              >
                <div className="admin-item-content">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={member.name}
                      className="admin-member-thumb"
                    />
                  ) : (
                    <div className="admin-member-thumb-placeholder">
                      No photo
                    </div>
                  )}

                  <div className="admin-item-text">
                    <div className="admin-member-header">
                      <h4 className="admin-item-headline">
                        {member.name}
                      </h4>
                      <span className="admin-telemetry-badge">{member.role}</span>
                    </div>
                    <p className="admin-item-snippet">
                      {member.description}
                    </p>
                  </div>
                </div>

                <div className="admin-item-actions">
                  <button
                    type="button"
                    className="btn-secondary-action"
                    onClick={() => startEditMember(member)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-sm-danger"
                    onClick={() => handleDeleteMember(member.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
