// Build a favicon / app icon: white ScaleaOS emblem on an ink dark square,
// so it stays visible on light browser tabs (like dexscreener's icon).
import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const SRC = path.join(root, "public", "logo.png"); // transparent white emblem

const ink = { r: 6, g: 7, b: 10, alpha: 1 }; // #06070a

async function build(size, outPath) {
  const inner = Math.round(size * 0.82);
  const emblem = await sharp(SRC)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: ink } })
    .composite([{ input: emblem, gravity: "center" }])
    .png()
    .toFile(outPath);
  console.log(`✓ ${outPath} (${size}x${size})`);
}

await build(256, path.join(root, "src", "app", "icon.png"));
await build(180, path.join(root, "src", "app", "apple-icon.png"));
await build(512, path.join(root, "public", "icon-512.png")); // for OG / PWA use
