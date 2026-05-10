// A4 學習本下載模板 — 依歌曲 owner 換配色
// 產出風格：沿用使用者範例的注音卡片學習本

(function () {
  const THEME = {
    "南瓜爸爸": {
      bg: "#fff9ef",
      gradient: "linear-gradient(135deg, #ffb347 0%, #ff7a59 55%, #e25d7c 100%)",
      shadow: "#cf4c3a",
      accent: "#cf4c3a",
      soft: "#fff4ec",
      softer: "#ffe8dc",
      border: "#ffd8c5",
      rtColor: "#8a3a2a",
      missionBg: "linear-gradient(135deg, #fff4ec 0%, #ffd8c5 100%)"
    },
    "Ann 媽媽": {
      bg: "#f5fbf9",
      gradient: "linear-gradient(135deg, #7ed1c4 0%, #2a9d8f 55%, #1f6f66 100%)",
      shadow: "#1f6f66",
      accent: "#1f6f66",
      soft: "#e8f5f3",
      softer: "#d0eae5",
      border: "#a9d7d1",
      rtColor: "#1f6f66",
      missionBg: "linear-gradient(135deg, #e8f5f3 0%, #bfe1dc 100%)"
    },
    "睿寶": {
      bg: "#faf7ff",
      gradient: "linear-gradient(135deg, #a991ff 0%, #7b5cff 55%, #5a3bd4 100%)",
      shadow: "#5a3bd4",
      accent: "#5a3bd4",
      soft: "#f0ecff",
      softer: "#e0d6ff",
      border: "#c4b3ff",
      rtColor: "#5a3bd4",
      missionBg: "linear-gradient(135deg, #f0ecff 0%, #d0c2ff 100%)"
    }
  };

  function escapeHtml(v) {
    return String(v)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  // 注意：zh/titleZhRuby/meaning 等欄位已經包含 <ruby>，直接插入不要 escape
  function keyLyricsHtml(song) {
    return song.keyLyrics
      .map(
        (l) => `<div class="lyric-block">
      <div class="lyric-label">English Lyrics</div>
      <div class="lyric-en">${escapeHtml(l.en)}</div>
      <div class="lyric-label lyric-label-zh">中文注音</div>
      <div class="lyric-zh">${l.zh}</div>
    </div>`
      )
      .join("\n");
  }

  function fullLyricsHtml(song) {
    if (!song.fullLyrics) return "";
    const blocks = String(song.fullLyrics)
      .trim()
      .split(/\n{2,}/)
      .map((block) =>
        block
          .split("\n")
          .map((line) => `<div class="full-lyric-line">${escapeHtml(line)}</div>`)
          .join("")
      )
      .filter(Boolean);
    if (!blocks.length) return "";
    return `
<div class="sh">🎤 完整英文歌詞</div>
<div class="full-lyrics">
  ${blocks.map((block) => `<div class="full-lyric-block">${block}</div>`).join("\n")}
</div>`;
  }

  function vocabCard(v, kind) {
    return `<div class="word-card ${kind}">
    <div class="row1"><span class="w-en">${escapeHtml(v.en)}</span><span class="w-type">${escapeHtml(v.type)}</span><span class="w-ph">${escapeHtml(v.ph)}</span></div>
    <div class="w-zh">${v.zh}</div>
    <div class="w-ex">${escapeHtml(v.ex)}</div>
  </div>`;
  }

  function buildSongHtml(song) {
    const t = THEME[song.owner] || THEME["南瓜爸爸"];
    const basic = song.basicVocab.map((v) => vocabCard(v, "basic")).join("\n");
    const advanced = song.advancedVocab.map((v) => vocabCard(v, "advanced")).join("\n");

    return `<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
<meta charset="UTF-8">
<title>${escapeHtml(song.title)} — 南瓜家學習本</title>
<style>
  @page { size: A4; margin: 10mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: "PingFang TC","Microsoft JhengHei","Noto Sans TC",sans-serif;
    background: ${t.bg}; color: #2a1805;
    padding: 10px; max-width: 210mm; margin: 0 auto; line-height: 1.5;
  }
  ruby { ruby-position: inter-character; ruby-align: center; margin-right: 3px; }
  rt { font-size: 0.55em; color: ${t.rtColor}; font-weight: 400; letter-spacing: 0;
       font-family: "Noto Sans TC", "PingFang TC", sans-serif; }
  .lyric-zh, .col-box p, .hero-subtitle { line-height: 2.1; }
  .w-zh { line-height: 2.0; }

  .hero {
    display: flex; align-items: stretch; gap: 14px;
    background: ${t.gradient};
    border-radius: 16px; padding: 14px;
    color: #fff; box-shadow: 0 4px 0 ${t.shadow};
    margin-bottom: 12px;
  }
  .cover-box {
    width: 110px; height: 110px; border-radius: 12px; overflow: hidden;
    flex-shrink: 0; border: 3px solid #fff;
    box-shadow: 0 4px 12px rgba(0,0,0,.3);
    background: rgba(0,0,0,.1);
    display: flex; align-items: center; justify-content: center;
  }
  .cover-box img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .cover-placeholder {
    font-size: 10px; text-align: center; padding: 8px;
    color: rgba(255,255,255,.9); line-height: 1.4;
  }
  .hero-meta { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
  .hero-title { font-size: 22px; font-weight: 900; letter-spacing: .02em; line-height: 1.1; }
  .hero-subtitle { font-size: 13px; opacity: .95; margin-top: 4px; }
  .hero-artist { font-size: 14px; margin-top: 6px; opacity: .95; }
  .owner-pill {
    display: inline-block; background: #fff; color: ${t.accent};
    padding: 3px 12px; border-radius: 12px;
    font-size: 12px; font-weight: 700; margin-top: 6px;
  }

  .info-card {
    background: #fff; border: 2px solid ${t.border}; border-radius: 12px;
    padding: 10px 14px; margin-bottom: 10px;
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px 14px;
  }
  .info-row { font-size: 12px; }
  .info-label { color: ${t.accent}; font-weight: 700; font-size: 11px; display: block; }
  .info-value { color: #2a1805; font-weight: 600; }

  .sh {
    font-size: 15px; font-weight: 900; color: ${t.accent};
    margin: 12px 0 6px; padding: 4px 10px;
    background: linear-gradient(90deg, ${t.soft} 0%, transparent 100%);
    border-left: 4px solid ${t.accent}; border-radius: 4px;
  }

  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
  .col-box {
    background: #fff; border: 2px solid ${t.border}; border-radius: 12px;
    padding: 10px 12px;
  }
  .col-box .ct { font-size: 13px; font-weight: 900; color: ${t.accent}; margin-bottom: 4px; }
  .col-box p { font-size: 12.5px; color: #3d1f08; }

  .lyric-block {
    background: ${t.soft}; border-left: 5px solid ${t.accent}; border-radius: 10px;
    padding: 10px 14px; margin-bottom: 6px;
  }
  .lyric-label {
    display: inline-block;
    margin-bottom: 4px;
    padding: 2px 8px;
    border-radius: 999px;
    background: rgba(255,255,255,0.78);
    color: ${t.accent};
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .04em;
    text-transform: uppercase;
  }
  .lyric-label-zh {
    margin-top: 8px;
    margin-bottom: 2px;
    background: rgba(61,31,8,0.08);
    color: #6b5b4a;
    text-transform: none;
  }
  .lyric-en {
    font-size: 14px; font-weight: 700; color: ${t.accent}; line-height: 1.5;
    font-family: 'Comic Sans MS', 'Arial', sans-serif;
  }
  .lyric-zh { font-size: 12.5px; color: #3d1f08; margin-top: 3px; }

  .full-lyrics { margin-top: 4px; }
  .full-lyric-block {
    background: #fff;
    border: 2px solid ${t.border};
    border-radius: 12px;
    padding: 10px 14px;
    margin-bottom: 8px;
  }
  .full-lyric-line {
    font-size: 13px;
    line-height: 1.7;
    color: #2a1805;
    font-family: 'Comic Sans MS', 'Arial', sans-serif;
  }

  .word-section-label {
    font-size: 11px; font-weight: 700; color: ${t.accent};
    margin: 8px 0 4px; padding-left: 4px;
    letter-spacing: .05em;
  }
  .word-grid {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px;
  }
  .word-card {
    background: #fff; border: 1px solid ${t.border}; border-radius: 8px;
    padding: 5px 8px 6px;
  }
  .word-card.basic    { border-left: 4px solid ${t.accent}; background: #fff; }
  .word-card.advanced { border-left: 4px solid ${t.accent}; background: ${t.soft}; }
  .word-card .row1 {
    display: flex; align-items: baseline; gap: 6px; flex-wrap: wrap;
  }
  .w-en { font-weight: 800; color: ${t.accent}; font-size: 13px;
          font-family: 'Comic Sans MS', 'Arial', sans-serif; }
  .w-type { font-size: 9.5px; color: #fff; background: ${t.accent}; padding: 1px 5px; border-radius: 4px; font-weight: 700; }
  .w-ph { font-size: 9.5px; color: #888; }
  .w-zh { font-size: 11.5px; color: #3d1f08; margin-top: 2px; }
  .w-ex { font-size: 10px; color: #5a3a1a; font-style: italic; margin-top: 2px; line-height: 1.35; }

  .mission {
    background: ${t.missionBg};
    border-radius: 12px; padding: 10px 14px; margin-top: 10px;
    font-size: 12.5px; color: #3d1f08; line-height: 1.7;
  }
  .mission .t { font-weight: 900; color: ${t.accent}; }

  @media print { body { background: #fff; padding: 0; } }
</style>
</head>
<body>

<div class="hero">
  <div class="cover-box">
    <img src="${escapeHtml(song.cover)}" alt="${escapeHtml(song.title)} cover"
      onerror="this.style.display='none';this.parentNode.innerHTML='<div class=&quot;cover-placeholder&quot;>封面圖<br>${escapeHtml(song.title)}</div>'">
  </div>
  <div class="hero-meta">
    <div>
      <div class="hero-title">${escapeHtml(song.title)}</div>
      <div class="hero-subtitle">${song.titleZhRuby}</div>
      <div class="hero-artist">— ${escapeHtml(song.artist)}</div>
    </div>
    <div><span class="owner-pill">${escapeHtml(song.owner)}選的歌</span></div>
  </div>
</div>

<div class="info-card">
  <div class="info-row"><span class="info-label">創作人</span><span class="info-value">${escapeHtml(song.creator || "—")}</span></div>
  <div class="info-row"><span class="info-label">發行年份</span><span class="info-value">${escapeHtml(song.year || "—")} 年</span></div>
  <div class="info-row"><span class="info-label">收錄專輯</span><span class="info-value">${escapeHtml(song.album || "—")}</span></div>
  <div class="info-row"><span class="info-label">演唱者</span><span class="info-value">${escapeHtml(song.artist)}</span></div>
</div>

<div class="two-col">
  <div class="col-box">
    <div class="ct">🎼 曲風</div>
    <p>${song.genreDesc}</p>
  </div>
  <div class="col-box">
    <div class="ct">💡 歌曲意境</div>
    <p>${song.meaning}</p>
  </div>
</div>

<div class="sh">🎵 英文歌詞重點片段（英文原句 + 中文注音）</div>
${keyLyricsHtml(song)}
${fullLyricsHtml(song)}

<div class="sh">📚 精選單字 20 個（基礎 ${song.basicVocab.length} + 進階 ${song.advancedVocab.length}）</div>

<div class="word-section-label">🟡 基礎 ${song.basicVocab.length} 個 — 睿寶一定要會</div>
<div class="word-grid">
${basic}
</div>

<div class="word-section-label">🟠 進階 ${song.advancedVocab.length} 個 — 爸媽一起學</div>
<div class="word-grid">
${advanced}
</div>

<div class="mission">
  <span class="t">🎯 親子任務：</span>${song.mission}
</div>

</body>
</html>`;
  }

  function buildBookletHtml(songs) {
    const pages = songs
      .map((song, idx) => {
        const inner = buildSongHtml(song);
        // 取出 body 內容（剝除 <!DOCTYPE>~<body> 殼）
        const match = inner.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        const body = match ? match[1] : "";
        return `<section class="page" style="page-break-after: ${idx === songs.length - 1 ? 'auto' : 'always'};">${body}</section>`;
      })
      .join("\n");

    // 各歌曲已經 inline 樣式寫在 body 內 — 把每首歌做成獨立完整 HTML 區塊再串起
    // 為了讓一頁換一頁，我們把每首歌包一個 iframe-like 的 section
    // 但這樣 CSS 無法共享。改採 shadow DOM 會太複雜，這裡採取：把 <style> 留在頁首，並以 CSS 變數隔離主題。
    // 簡單起見：產出 9 份獨立 iframe 的 booklet，用 srcdoc。
    return buildBookletIframes(songs);
  }

  function buildBookletIframes(songs) {
    const iframes = songs
      .map((song, idx) => {
        const html = buildSongHtml(song);
        const escaped = html.replaceAll('"', "&quot;");
        return `<iframe class="pg" srcdoc="${escaped}" loading="${idx === 0 ? 'eager' : 'lazy'}"></iframe>`;
      })
      .join("\n");

    return `<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
<meta charset="UTF-8">
<title>南瓜家英文歌曲大冒險 — 整本活動冊</title>
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #f2e9d8; font-family: "PingFang TC","Noto Sans TC",sans-serif; }
  .cover {
    width: 210mm; min-height: 297mm;
    margin: 12px auto;
    padding: 40mm 20mm;
    background: linear-gradient(160deg, #ffb347 0%, #ff7a59 40%, #2a9d8f 70%, #7b5cff 100%);
    color: #fff; text-align: center;
    border-radius: 8px;
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    page-break-after: always;
  }
  .cover h1 { font-size: 48px; font-weight: 900; letter-spacing: 0.04em; margin-bottom: 16px; text-shadow: 0 4px 0 rgba(0,0,0,.15); }
  .cover .sub { font-size: 18px; opacity: 0.95; }
  .cover .list { margin-top: 40px; font-size: 14px; opacity: 0.95; line-height: 2; background: rgba(255,255,255,.18); border-radius: 12px; padding: 18px 28px; }
  iframe.pg {
    display: block;
    width: 210mm;
    height: 297mm;
    border: none;
    margin: 12px auto;
    background: #fff;
    box-shadow: 0 4px 18px rgba(0,0,0,.15);
    page-break-after: always;
  }
  @media print {
    body { background: #fff; }
    .cover, iframe.pg { box-shadow: none; margin: 0; }
  }
</style>
</head>
<body>
  <section class="cover">
    <h1>第一屆<br>南瓜家英文歌曲大冒險</h1>
    <div class="sub">親子英文歌曲學習本</div>
    <div class="list">
      ${songs.map((s) => `${s.owner}｜${s.title}`).join("<br>")}
    </div>
  </section>
  ${iframes}
  <script>
    // 頁面全部載完後觸發列印（使用者可取消）
    window.addEventListener("load", function () {
      setTimeout(function(){ /* window.print(); */ }, 400);
    });
  </script>
</body>
</html>`;
  }

  window.SongbookDownload = {
    buildSongHtml,
    buildBookletHtml
  };
})();
