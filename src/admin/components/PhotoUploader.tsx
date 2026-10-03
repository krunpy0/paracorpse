import { useState, useRef, useEffect } from "react";
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
  aspectRatio?: "square" | "wide";
  maxDimension?: number;
  hint?: string;
  allowGif?: boolean;
}

export function PhotoUploader({
  currentPhotoUrl,
  label,
  onPhotoSelected,
  onPhotoRemoved,
  aspectRatio = "square",
  maxDimension = 1600,
  hint,
  allowGif = true,
}: PhotoUploaderProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [infoText, setInfoText] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!currentPhotoUrl) {
      setLocalPreview(null);
      setInfoText("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [currentPhotoUrl]);

  const displayUrl = localPreview || (currentPhotoUrl ? resolveMediaUrl(currentPhotoUrl) : "");
  const isGif = Boolean(
    displayUrl &&
      (displayUrl.toLowerCase().includes(".gif") || displayUrl.startsWith("data:image/gif"))
  );

  const handleFile = async (file: File) => {
    const isFileGif = file.type === "image/gif" || file.name.toLowerCase().endsWith(".gif");
    if (!allowGif && isFileGif) {
      alert("GIF files are not supported for this field. Please select JPG, PNG, or WebP.");
      return;
    }

    const isImage = file.type.startsWith("image/") || isFileGif;
    if (!isImage) {
      alert(`Please select an image file (JPG, PNG, WebP${allowGif ? ", GIF" : ""})`);
      return;
    }

    try {
      setIsProcessing(true);
      setInfoText(isFileGif ? "Loading GIF animation..." : "Optimizing photo...");
      const result = await optimizeAndEncodeImage(file, maxDimension);
      setLocalPreview(result.dataUrl);
      const sizeDisplay =
        result.sizeBytes >= 1024 * 1024
          ? `${(result.sizeBytes / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(result.sizeBytes / 1024)} KB`;

      setInfoText(result.isGif ? `GIF ready: ${sizeDisplay}` : `Optimized: ${sizeDisplay}`);
      onPhotoSelected(result);
    } catch (e: any) {
      alert(`Failed to process file: ${e.message}`);
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
        <div
          className={`photo-preview-container ${
            aspectRatio === "wide" ? "photo-preview-wide" : ""
          }`}
        >
          {displayUrl ? (
            <>
              <img
                src={displayUrl}
                alt="Preview"
                className="photo-preview-img"
              />
              {isGif && <span className="photo-preview-gif-badge">GIF</span>}
            </>
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
              No media
            </div>
          )}
        </div>

        <div className="photo-upload-meta">
          <input
            type="file"
            ref={fileInputRef}
            accept={allowGif ? "image/*,image/gif,.gif" : "image/*"}
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
                ? "Processing..."
                : displayUrl
                ? "Replace Media"
                : allowGif
                ? "Choose Photo / GIF"
                : "Choose Photo"}
            </button>

            {displayUrl && (
              <button
                type="button"
                className="btn-sm-danger"
                onClick={handleRemove}
              >
                Remove Media
              </button>
            )}
          </div>

          <div
            style={{
              fontSize: "0.74rem",
              color:
                infoText.includes("Optimized") || infoText.includes("GIF ready")
                  ? "var(--signal-white)"
                  : "var(--text-muted)",
              marginTop: "0.5rem",
              fontFamily: "var(--font-mono)",
            }}
          >
            {infoText || hint || `Drag and drop media here or choose file${allowGif ? " (JPG, PNG, WebP, GIF)" : ""}`}
          </div>
        </div>
      </div>
    </div>
  );
}
