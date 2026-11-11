import fs from "fs";
import path from "path";

export interface StorageResult {
  success: boolean;
  filePath?: string;
  error?: string;
}

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Menyimpan file yang diunggah ke folder lokal `public/uploads/`
 * Modul ini dibungkus rapi sehingga di Step 4 dapat dialihkan ke cloud storage (Vercel Blob / Cloudinary)
 */
export async function saveFile(file: File): Promise<StorageResult> {
  try {
    if (!file) {
      return { success: false, error: "File tidak ditemukan" };
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return {
        success: false,
        error: "Format file tidak didukung. Gunakan JPG, PNG, atau WebP.",
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        error: "Ukuran file terlalu besar. Maksimal 5MB.",
      };
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Buat nama file unik dan aman
    const ext = path.extname(file.name) || ".png";
    const cleanBase = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .substring(0, 20);
    const uniqueFileName = `${Date.now()}-${cleanBase}${ext}`;
    const destinationPath = path.join(uploadsDir, uniqueFileName);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(destinationPath, buffer);

    return {
      success: true,
      filePath: `/uploads/${uniqueFileName}`,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Gagal menyimpan file",
    };
  }
}

/**
 * Menghapus file lokal jika ada
 */
export async function deleteFile(relativeWebPath: string): Promise<boolean> {
  try {
    if (!relativeWebPath || !relativeWebPath.startsWith("/uploads/")) {
      return false;
    }
    const filename = path.basename(relativeWebPath);
    const filePath = path.join(process.cwd(), "public", "uploads", filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

