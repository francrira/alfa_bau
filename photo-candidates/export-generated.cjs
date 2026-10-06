const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");
const sources = [
  ["C:/Users/frira/.codex/generated_images/01a0fca7-dbb7-71b2-a280-746ac537ee15/exec-420057a4-d8fa-4db8-a5cd-5f503b341b2c.png", "wheel-loader"],
  ["C:/Users/frira/.codex/generated_images/01a0fca7-dbb7-71b2-a280-746ac537ee15/exec-222b136b-ac2c-448a-8253-d5cb0dcc62ae.png", "tipper-truck"],
];
(async () => {
  const output = path.resolve("public/images/generated");
  fs.mkdirSync(output, { recursive: true });
  for (const [source, name] of sources) {
    for (const width of [1280, 640]) {
      const info = await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 76, effort: 6 }).toFile(path.join(output, name + (width === 640 ? "-640" : "") + ".webp"));
      console.log(name + " " + width + ": " + Math.round(info.size / 1024) + " KB");
    }
  }
})().catch(error => { console.error(error); process.exit(1); });
