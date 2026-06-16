// Make the black background of the ScaleaOS emblem transparent.
// White-on-black logo → derive alpha from luminance so the emblem stays
// crisp & glowing while the black field drops out with feathered edges.
import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "..", "public", "logo-src.png");
const OUT = path.join(__dirname, "..", "public", "logo.png");

const SIZE = 512; // crisp, square master

const img = sharp(SRC).resize(SIZE, SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 1 } });
const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const lo = 14;   // below this luminance => fully transparent
const hi = 130;  // above this => fully opaque emblem
for (let i = 0; i < data.length; i += channels) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  let a = (lum - lo) / (hi - lo);
  a = a < 0 ? 0 : a > 1 ? 1 : a;
  // smoothstep for softer falloff
  a = a * a * (3 - 2 * a);
  // lift emblem toward white so lines read clean on any backdrop
  const lift = 0.35;
  data[i] = Math.min(255, r + (255 - r) * lift);
  data[i + 1] = Math.min(255, g + (255 - g) * lift);
  data[i + 2] = Math.min(255, b + (255 - b) * lift);
  data[i + 3] = Math.round(a * 255);
}

await sharp(data, { raw: { width, height, channels } }).png().toFile(OUT);
console.log(`✓ transparent logo written: ${OUT} (${width}x${height})`);
