import type { HeroContent, FooterContent, SocialLink } from "../../types";

interface GeneralManagerProps {
  hero: HeroContent;
  footer: FooterContent;
  onHeroChange: (updatedHero: HeroContent) => void;
  onFooterChange: (updatedFooter: FooterContent) => void;
}

export function GeneralManager({
  hero,
  footer,
  onHeroChange,
  onFooterChange,
}: GeneralManagerProps) {
  const handleHeroField = (field: keyof HeroContent, value: string) => {
    onHeroChange({ ...hero, [field]: value });
  };

  const handleFooterField = (field: keyof FooterContent, value: any) => {
    onFooterChange({ ...footer, [field]: value });
  };

  const handleAddSocialLink = () => {
    const newLink: SocialLink = {
      id: `social_${Date.now()}`,
      label: "NEW CHANNEL",
      url: "https://",
    };
    onFooterChange({
      ...footer,
      socialLinks: [...footer.socialLinks, newLink],
    });
  };

  const handleUpdateSocialLink = (
    index: number,
    field: "label" | "url",
    val: string
  ) => {
    const updated = [...footer.socialLinks];
    updated[index] = { ...updated[index], [field]: val };
    onFooterChange({ ...footer, socialLinks: updated });
  };

  const handleRemoveSocialLink = (index: number) => {
    const updated = footer.socialLinks.filter((_, i) => i !== index);
    onFooterChange({ ...footer, socialLinks: updated });
  };

  return (
    <div>
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">General &amp; Footer</h2>
          <p className="admin-section-subtitle">
            Hero text, social links, location, and copyright
          </p>
        </div>
      </div>

      {/* HERO SECTION SETTINGS */}
      <div className="admin-card">
        <h3 className="admin-card-title">Hero</h3>

        <div className="admin-form-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">Hero Title</label>
            <input
              type="text"
              className="admin-input"
              value={hero.title}
              onChange={(e) => handleHeroField("title", e.target.value)}
              placeholder="PARACORPSE"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Scroll Label</label>
            <input
              type="text"
              className="admin-input"
              value={hero.scrollCue}
              onChange={(e) => handleHeroField("scrollCue", e.target.value)}
              placeholder="SCROLL"
            />
          </div>
        </div>
      </div>

      {/* FOOTER & CONTACT SETTINGS */}
      <div className="admin-card">
        <h3 className="admin-card-title">Footer &amp; Contacts</h3>

        <div className="admin-form-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">Footer Title</label>
            <input
              type="text"
              className="admin-input"
              value={footer.wordmark}
              onChange={(e) => handleFooterField("wordmark", e.target.value)}
              placeholder="PARACORPSE"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Recruitment Title</label>
            <input
              type="text"
              className="admin-input"
              value={footer.recruitmentTitle}
              onChange={(e) =>
                handleFooterField("recruitmentTitle", e.target.value)
              }
              placeholder="RECRUITMENT"
            />
          </div>
        </div>

        <div className="admin-form-grid-3">
          <div className="admin-form-group">
            <label className="admin-label">Contact Email</label>
            <input
              type="email"
              className="admin-input"
              value={footer.contactEmail}
              onChange={(e) =>
                handleFooterField("contactEmail", e.target.value)
              }
              placeholder="paracorpse0@gmail.com"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">City / Region</label>
            <input
              type="text"
              className="admin-input"
              value={footer.locationCity}
              onChange={(e) =>
                handleFooterField("locationCity", e.target.value)
              }
              placeholder="MIASS, SOUTH URAL"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Country</label>
            <input
              type="text"
              className="admin-input"
              value={footer.locationCountry}
              onChange={(e) =>
                handleFooterField("locationCountry", e.target.value)
              }
              placeholder="RUSSIAN FEDERATION"
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Copyright</label>
          <input
            type="text"
            className="admin-input"
            value={footer.copyright}
            onChange={(e) => handleFooterField("copyright", e.target.value)}
            placeholder="PARACORPSE. ALL RIGHTS RESERVED."
          />
        </div>
      </div>

      {/* SOCIAL LINKS */}
      <div className="admin-card">
        <div className="admin-subsection-header">
          <h3 className="admin-card-title" style={{ margin: 0, border: "none", padding: 0 }}>
            Social Links ({footer.socialLinks.length})
          </h3>
          <button
            type="button"
            className="btn-secondary-action"
            onClick={handleAddSocialLink}
          >
            + Add Link
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {footer.socialLinks.map((link, idx) => (
            <div
              key={link.id}
              className="admin-social-row"
            >
              <input
                type="text"
                className="admin-input"
                value={link.label}
                onChange={(e) =>
                  handleUpdateSocialLink(idx, "label", e.target.value)
                }
                placeholder="Channel (e.g. VK)"
              />
              <input
                type="url"
                className="admin-input"
                value={link.url}
                onChange={(e) =>
                  handleUpdateSocialLink(idx, "url", e.target.value)
                }
                placeholder="https://..."
              />
              <button
                type="button"
                className="btn-sm-danger admin-delete-row-btn"
                onClick={() => handleRemoveSocialLink(idx)}
                aria-label="Remove link"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
