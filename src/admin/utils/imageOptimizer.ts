/**
 * Client-side image optimizer using HTML Canvas.
 * Resizes large photos to a max dimension and compresses them to WebP/JPEG,
 * producing base64 data ready for the GitHub Contents API without any backend.
 */

export interface OptimizedImageResult {
  fileName: string;
  base64: string; // Pure base64 without "data:image/...;base64," prefix
  dataUrl: string; // Full data URL for immediate local preview
  sizeBytes: number;
  isGif?: boolean;
}

export async function optimizeAndEncodeImage(
  file: File,
  maxDimension = 1600,
  quality = 0.85
): Promise<OptimizedImageResult> {
  return new Promise((resolve, reject) => {
    const isGif =
      file.type === "image/gif" ||
      file.name.toLowerCase().endsWith(".gif");

    // Generate clean filename: timestamp + sanitized original name
    const cleanName = file.name
      .toLowerCase()
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-z0-9_.-]/g, "_");

    if (isGif) {
      // 25 MB limit for GitHub Contents API uploads
      const MAX_GIF_SIZE = 25 * 1024 * 1024;
      if (file.size > MAX_GIF_SIZE) {
        reject(
          new Error(
            `GIF file is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum allowed size is 25 MB.`
          )
        );
        return;
      }

      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Failed to read GIF file"));
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (!dataUrl) {
          reject(new Error("Failed to read GIF data"));
          return;
        }
        const commaIndex = dataUrl.indexOf(",");
        const base64 = commaIndex !== -1 ? dataUrl.slice(commaIndex + 1) : "";
        if (!base64) {
          reject(new Error("Failed to extract base64 from GIF"));
          return;
        }

        const fileName = `${Date.now()}-${cleanName}.gif`;
        resolve({
          fileName,
          base64,
          dataUrl,
          sizeBytes: file.size,
          isGif: true,
        });
      };
      reader.readAsDataURL(file);
      return;
    }

    const ext =
      file.type === "image/png"
        ? "png"
        : file.type === "image/webp"
        ? "webp"
        : "jpg";
    const fileName = `${Date.now()}-${cleanName}.${ext}`;

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Failed to load image into canvas"));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Downscale proportionally if larger than maxDimension
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to create 2D canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        const mimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
        const dataUrl = canvas.toDataURL(mimeType, quality);
        const commaIdx = dataUrl.indexOf(",");
        const base64 = commaIdx !== -1 ? dataUrl.slice(commaIdx + 1) : "";
        const sizeBytes = Math.round((base64.length * 3) / 4);

        resolve({
          fileName,
          base64,
          dataUrl,
          sizeBytes,
          isGif: false,
        });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
