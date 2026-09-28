import { useState, useRef } from "react";
import { resolveMediaUrl } from "../../data";
import {
  optimizeAndEncodeImage,
  type OptimizedImageResult,
} from "../utils/imageOptimizer";

interface PhotoUploaderProps {
  currentPhotoUrl?: string;
  label: string;
  onPhotoSelected: (result: OptimizedImageResult) => void;
  onPhotoRemoved?: () => void;
}

export function PhotoUploader({
  currentPhotoUrl,
  label,
  onPhotoSelected,
  onPhotoRemoved,
}: PhotoUploaderProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [infoText, setInfoText] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayUrl = localPreview || (currentPhotoUrl ? resolveMediaUrl(currentPhotoUrl) : "");

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (JPG, PNG, WebP)");
      return;
    }

    try {
      setIsProcessing(true);
      setInfoText("Optimizing photo...");
      const result = await optimizeAndEncodeImage(file);
      setLocalPreview(result.dataUrl);
      setInfoText(`Optimized: ${(result.sizeBytes / 1024).toFixed(0)} KB`);
      onPhotoSelected(result);
    } catch (e: any) {
      alert(`Failed to process photo: ${e.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    setLocalPreview(null);
    setInfoText("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onPhotoRemoved) {
      onPhotoRemoved();
    }
  };

  return (
    <div className="admin-form-group">
      <span className="admin-label">{label}</span>
      <div
        className="photo-uploader-box"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="photo-preview-container">
          {displayUrl ? (
            <img
              src={displayUrl}
              alt="Preview"
              className="photo-preview-img"
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
                fontSize: "0.72rem",
                fontFamily: "var(--font-mono)",
                textAlign: "center",
                padding: "8px",
              }}
            >
              No photo
            </div>
          )}
        </div>

        <div className="photo-upload-meta">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />

          <div className="photo-upload-actions">
            <button
              type="button"
              className="btn-secondary-action"
              disabled={isProcessing}
              onClick={() => fileInputRef.current?.click()}
            >
              {isProcessing
                ? "Compressing..."
                : displayUrl
                ? "Replace Photo"
                : "Choose Photo"}
            </button>

            {displayUrl && (
              <button
                type="button"
                className="btn-sm-danger"
                onClick={handleRemove}
              >
                Remove Photo
              </button>
            )}
          </div>

          <div
            style={{
              fontSize: "0.74rem",
              color: infoText.includes("Optimized")
                ? "var(--signal-white)"
                : "var(--text-muted)",
              marginTop: "0.5rem",
              fontFamily: "var(--font-mono)",
            }}
          >
            {infoText || "Drag and drop photo here or choose file"}
          </div>
        </div>
      </div>
    </div>
  );
}
