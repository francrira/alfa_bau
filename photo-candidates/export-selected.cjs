const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");
const convert = require(path.join(process.env.TEMP, "alfa-photo-review/node_modules/heic-convert"));
const selection = [
  ["Erdbau bagger tiefbau", "IMG_8680.HEIC", "excavation"],
  ["Erdbau bagger tiefbau", "IMG_7464.HEIC", "site-team"],
  ["Erdbau bagger tiefbau", "IMG_8440.HEIC", "shaft-installation"],
  ["kanalbau", "IMG_7482.HEIC", "utility-ducts"],
  ["kanalbau", "IMG_8495.HEIC", "trench-pipework"],
  ["kanalbau", "IMG_9320.HEIC", "drainage-connections"],
  ["kanalbau", "IMG_9343.HEIC", "duct-entry"],
  ["pfalaster arbeit", "IMG_8246.HEIC", "paved-path"],
  ["pfalaster arbeit", "IMG_8218.HEIC", "paving-detail"],
  ["pfalaster arbeit", "IMG_9496.HEIC", "outdoor-steps"],
  ["pfalaster arbeit", "IMG_9685.HEIC", "paving-worker"],
  ["pfalaster arbeit", "IMG_7381.HEIC", "paving-along-tracks"],
];
(async () => {
  const output = path.resolve("public/images/work");
  fs.mkdirSync(output, { recursive: true });
  const manifest = [];
  for (const [directory, filename, name] of selection) {
    const source = path.join(__dirname, directory, filename);
    const input = Buffer.from(await convert({ buffer: fs.readFileSync(source), format: "JPEG", quality: 1 }));
    const large = await sharp(input).rotate().resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 70, effort: 6 }).toBuffer({ resolveWithObject: true });
    fs.writeFileSync(path.join(output, name + ".webp"), large.data);
    const small = await sharp(input).rotate().resize({ width: 640, withoutEnlargement: true }).webp({ quality: 68, effort: 6 }).toBuffer({ resolveWithObject: true });
    fs.writeFileSync(path.join(output, name + "-640.webp"), small.data);
    manifest.push({ name, source: directory + "/" + filename, width: large.info.width, height: large.info.height, bytes: large.data.length });
    console.log(name + ": " + large.info.width + "x" + large.info.height + ", " + Math.round(large.data.length / 1024) + " KB");
  }
  fs.writeFileSync(path.join(__dirname, "WEBSITE-EXPORTS.json"), JSON.stringify(manifest, null, 2) + "\n");
})().catch(error => { console.error(error); process.exit(1); });
