const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const MUSIC_DIR = "/Users/chennanhong/Desktop/AI 育兒/英文歌曲";
const OUTPUT_DIR = path.join(ROOT, "songs");

const COVER_FILES = {
  "way-back-into-love": "Way Back Into Love.jpg",
  "lost-stars": "Lost Stars.jpg",
  "make-you-mine": "Make You Mine.jpg",
  "lemon-tree": "Lemon Tree.jpg",
  "something-just-like-this": "Something Just Like This.jpg",
  "a-thousand-years": "a thousand years .jpg",
  "zoo": "ZOO.jpg",
  "soda-pop": "Soda Pop.jpg",
  "free": "Free.jpg"
};

const RTF_FILES = {
  "way-back-into-love": "Way Back Into Love.rtf",
  "lost-stars": "Lost Stars.rtf",
  "make-you-mine": "Make You Mine.rtf",
  "lemon-tree": "Lemon Tree.rtf",
  "something-just-like-this": "Something Just Like This.rtf",
  "a-thousand-years": "A Thousand Years.rtf",
  "zoo": "ZOO.rtf",
  "soda-pop": "Soda Pop.rtf",
  "free": "Free.rtf"
};

function loadSongs() {
  const context = { window: {} };
  vm.createContext(context);
  const dataJs = fs.readFileSync(path.join(ROOT, "scripts", "songbook-data.js"), "utf8");
  vm.runInContext(dataJs, context);
  return context.window.APP_SONGS || [];
}

function loadTemplate() {
  const context = { window: {} };
  vm.createContext(context);
  const templateJs = fs.readFileSync(path.join(ROOT, "scripts", "download-template.js"), "utf8");
  vm.runInContext(templateJs, context);
  return context.window.SongbookDownload;
}

function readLyrics(slug) {
  const file = RTF_FILES[slug];
  if (!file) return "";
  const output = execFileSync("textutil", ["-convert", "txt", "-stdout", path.join(MUSIC_DIR, file)], {
    encoding: "utf8"
  });
  return output
    .replace(/\r/g, "")
    .replace(/^.*?(?:\n\n|\u2028)/s, "")
    .replace(/\u2028/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function main() {
  const songs = loadSongs();
  const template = loadTemplate();
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const song of songs) {
    const enriched = {
      ...song,
      cover: `file://${encodeURI(path.join(MUSIC_DIR, COVER_FILES[song.slug] || ""))}`,
      fullLyrics: readLyrics(song.slug)
    };
    const html = template.buildSongHtml(enriched);
    fs.writeFileSync(path.join(OUTPUT_DIR, `${song.slug}.html`), html, "utf8");
  }

  console.log(`Generated ${songs.length} song pages in ${OUTPUT_DIR}`);
}

main();
