import { useState } from "react";
import type { JoinUsContent, JoinCard } from "../../types";

interface JoinUsManagerProps {
  joinUs: JoinUsContent;
  onChange: (updatedJoinUs: JoinUsContent) => void;
}

export function JoinUsManager({ joinUs, onChange }: JoinUsManagerProps) {
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editingCard, setEditingCard] = useState<JoinCard | null>(null);
  const [isCreatingCard, setIsCreatingCard] = useState(false);

  const handleToggleEnabled = () => {
    onChange({ ...joinUs, enabled: !joinUs.enabled });
  };

  const handleFieldChange = (field: keyof JoinUsContent, value: any) => {
    onChange({ ...joinUs, [field]: value });
  };

  const startCreateCard = () => {
    const newCard: JoinCard = {
      id: `role_${Date.now()}`,
      title: "",
      subtitle: "",
      soundStyle: "",
      requirements: ["Age 15+ · Based in Miass or surrounding area"],
      buttonText: "APPLY NOW",
    };
    setEditingCard(newCard);
    setEditingCardId(newCard.id);
    setIsCreatingCard(true);
  };

  const startEditCard = (card: JoinCard) => {
    setEditingCard({ ...card, requirements: [...card.requirements] });
    setEditingCardId(card.id);
    setIsCreatingCard(false);
  };

  const cancelCardEdit = () => {
    setEditingCard(null);
    setEditingCardId(null);
    setIsCreatingCard(false);
  };

  const saveCardEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard) return;

    if (!editingCard.title.trim()) {
      alert("Please enter a role title (e.g. Guitarist, Vocalist)");
      return;
    }

    let updatedCards: JoinCard[];
    if (isCreatingCard) {
      updatedCards = [...joinUs.cards, editingCard];
    } else {
      updatedCards = joinUs.cards.map((c) =>
        c.id === editingCard.id ? editingCard : c
      );
    }

    onChange({ ...joinUs, cards: updatedCards });
    cancelCardEdit();
  };

  const handleDeleteCard = (cardId: string) => {
    if (confirm("Delete this role from auditions?")) {
      const updatedCards = joinUs.cards.filter((c) => c.id !== cardId);
      onChange({ ...joinUs, cards: updatedCards });
      if (editingCardId === cardId) {
        cancelCardEdit();
      }
    }
  };

  const handleAddRequirement = () => {
    if (!editingCard) return;
    setEditingCard({
      ...editingCard,
      requirements: [...editingCard.requirements, ""],
    });
  };

  const handleUpdateRequirement = (index: number, val: string) => {
    if (!editingCard) return;
    const reqs = [...editingCard.requirements];
    reqs[index] = val;
    setEditingCard({ ...editingCard, requirements: reqs });
  };

  const handleRemoveRequirement = (index: number) => {
    if (!editingCard) return;
    const reqs = editingCard.requirements.filter((_, i) => i !== index);
    setEditingCard({ ...editingCard, requirements: reqs });
  };

  return (
    <div>
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">Auditions</h2>
          <p className="admin-section-subtitle">
            Manage band audition roles and section visibility
          </p>
        </div>
      </div>

      {/* TOGGLE CARD */}
      <div
        className="brutalist-toggle-card"
        onClick={handleToggleEnabled}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleToggleEnabled();
        }}
      >
        <div>
          <div className="brutalist-toggle-indicator">
            <span
              className={`brutalist-status-box ${
                joinUs.enabled ? "active" : ""
              }`}
            />
            <span>
              {joinUs.enabled
                ? "Section visible on site"
                : "Section hidden on site"}
            </span>
          </div>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: "0.78rem",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.04em",
              marginTop: "0.4rem",
            }}
          >
            {joinUs.enabled
              ? "Audition cards and navigation links are visible on the website."
              : "The audition section and all menu links to it are hidden."}
          </div>
        </div>

        <button
          type="button"
          className="btn-secondary-action"
          onClick={(e) => {
            e.stopPropagation();
            handleToggleEnabled();
          }}
        >
          {joinUs.enabled ? "Hide Section" : "Show Section"}
        </button>
      </div>

      {/* GENERAL JOIN US SETTINGS */}
      <div className="admin-card">
        <h3 className="admin-card-title">Section Settings</h3>

        <div className="admin-form-group">
          <label className="admin-label">Section Title</label>
          <input
            type="text"
            className="admin-input"
            value={joinUs.title}
            onChange={(e) => handleFieldChange("title", e.target.value)}
            placeholder="JOIN A BAND"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Subtitle</label>
          <textarea
            className="admin-textarea"
            rows={2}
            value={joinUs.subtitle}
            onChange={(e) => handleFieldChange("subtitle", e.target.value)}
            placeholder="Auditioning rhythm/lead guitarist and vocalist for upcoming live shows and studio sessions. Miass, Russia · Age 15+."
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Contact Email</label>
          <input
            type="email"
            className="admin-input"
            value={joinUs.contactEmail}
            onChange={(e) => handleFieldChange("contactEmail", e.target.value)}
            placeholder="paracorpse0@gmail.com"
          />
        </div>
      </div>

      {/* CARD EDITOR */}
      {editingCard && (
        <div className="admin-card" style={{ borderColor: "var(--signal-white)" }}>
          <h3 className="admin-card-title">
            {isCreatingCard ? "New Role" : `Edit Role: ${editingCard.title}`}
          </h3>

          <form onSubmit={saveCardEdit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
              }}
            >
              <div className="admin-form-group">
                <label className="admin-label">Role Title</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingCard.title}
                  onChange={(e) =>
                    setEditingCard({ ...editingCard, title: e.target.value })
                  }
                  placeholder="GUITARIST / VOCALIST / BASSIST"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Subtitle</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editingCard.subtitle}
                  onChange={(e) =>
                    setEditingCard({ ...editingCard, subtitle: e.target.value })
                  }
                  placeholder="RHYTHM & LEAD GUITAR"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Sound &amp; Style</label>
              <textarea
                className="admin-textarea"
                rows={3}
                value={editingCard.soundStyle}
                onChange={(e) =>
                  setEditingCard({ ...editingCard, soundStyle: e.target.value })
                }
                placeholder="Dense industrial sound, low drop tunings..."
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
                  Requirements
                </label>
                <button
                  type="button"
                  className="btn-secondary-action"
                  onClick={handleAddRequirement}
                >
                  + Add Requirement
                </button>
              </div>

              {editingCard.requirements.map((req, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <input
                    type="text"
                    className="admin-input"
                    value={req}
                    onChange={(e) =>
                      handleUpdateRequirement(idx, e.target.value)
                    }
                    placeholder="Requirement..."
                  />
                  <button
                    type="button"
                    className="btn-sm-danger"
                    onClick={() => handleRemoveRequirement(idx)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Button Label</label>
              <input
                type="text"
                className="admin-input"
                value={editingCard.buttonText}
                onChange={(e) =>
                  setEditingCard({ ...editingCard, buttonText: e.target.value })
                }
                placeholder="APPLY FOR GUITARIST"
              />
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
              <button type="submit" className="btn-primary-action">
                Save Role
              </button>
              <button
                type="button"
                className="btn-secondary-action"
                onClick={cancelCardEdit}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CARDS LIST */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              fontWeight: 800,
              textTransform: "uppercase",
              color: "var(--text-primary)",
            }}
          >
            Roles ({joinUs.cards.length})
          </h3>
          {!editingCard && (
            <button
              type="button"
              className="btn-primary-action"
              onClick={startCreateCard}
            >
              + Add Role
            </button>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {joinUs.cards.map((card) => (
            <div
              key={card.id}
              className="admin-card"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "2rem",
                margin: 0,
              }}
            >
              <div>
                <h4
                  style={{
                    fontFamily: "var(--font-logo)",
                    fontSize: "1.6rem",
                    color: "var(--text-primary)",
                    letterSpacing: "0.02em",
                    marginBottom: "0.25rem",
                  }}
                >
                  {card.title}
                </h4>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  {card.subtitle}
                </div>
                <div
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.8rem",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {card.requirements.length} requirements · {card.buttonText}
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  type="button"
                  className="btn-secondary-action"
                  onClick={() => startEditCard(card)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn-sm-danger"
                  onClick={() => handleDeleteCard(card.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
