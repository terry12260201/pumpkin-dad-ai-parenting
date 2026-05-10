// 南瓜家英文歌曲大冒險 — 互動邏輯
(function () {
  // Disabled: covers now come from songbook-data.js (relative ../assets/covers/) so they load over http://
  const SONG_COVER_FILES = {};
  let songs = window.APP_SONGS ? window.APP_SONGS.map(normalizeSongAssets) : [];

  // DOM
  const $ = (id) => document.getElementById(id);
  const stageOwner = $("stageOwner");
  const stageTitle = $("stageTitle");
  const stageSub = $("stageSub");
  const statusText = $("statusText");
  const revealButton = $("revealButton");
  const quickPickButton = $("quickPickButton");
  const resetButton = $("resetButton");
  const exportButton = $("exportButton");
  const importButton = $("importButton");
  const importFile = $("importFile");
  const printBookletButton = $("printBookletButton");
  const songNav = $("songNav");
  const emptyState = $("emptyState");
  const detailSection = $("detailSection");
  const detailHero = $("detailHero");
  const coverImage = $("coverImage");
  const ownerBadge = $("ownerBadge");
  const resultBadge = $("resultBadge");
  const songTitle = $("songTitle");
  const songMeta = $("songMeta");
  const youtubeLink = $("youtubeLink");
  const downloadLink = $("downloadLink");
  const celebrateText = $("celebrateText");
  const songStory = $("songStory");
  const songLearn = $("songLearn");
  const songTask = $("songTask");
  const songPractice = $("songPractice");
  const lyricList = $("lyricList");
  const basicVocabGrid = $("basicVocabGrid");
  const advancedVocabGrid = $("advancedVocabGrid");
  const missionBox = $("missionBox");
  const confettiLayer = $("confettiLayer");
  const genreDescBox = $("genreDescBox");
  const meaningBox = $("meaningBox");

  const STORAGE_KEY = "pumpkin-songbook-completed-v1";
  let completedSlugs = new Set();
  let revealing = false;
  let currentIndex = null;
  let currentDownloadUrl = "";
  let currentBookletUrl = "";
  let audioContext;
  function normalizeSongAssets(song) {
    const next = { ...song };
    const localCoverFile = SONG_COVER_FILES[next.slug];
    if (localCoverFile) {
      next.cover = toFileUrl(localCoverFile);
    } else if (!next.cover || isBrokenLegacyAsset(next.cover)) {
      next.cover = buildCoverSvgDataUri(next);
    }
    if (next.lyricsDownload && isBrokenLegacyAsset(next.lyricsDownload)) {
      delete next.lyricsDownload;
    }
    return next;
  }

  function isBrokenLegacyAsset(value) {
    return typeof value === "string" && value.includes("/pumpkin_v3/");
  }

  function toFileUrl(path) {
    return `file://${encodeURI(path)}`;
  }

  function buildCoverSvgDataUri(song) {
    const palette = {
      "南瓜爸爸": { start: "#ffb347", end: "#ff7a59", accent: "#8a3a2a" },
      "Ann 媽媽": { start: "#7ed1c4", end: "#2a9d8f", accent: "#1f6f66" },
      "睿寶": { start: "#a991ff", end: "#7b5cff", accent: "#4a2fb3" }
    };
    const theme = palette[song.owner] || palette["南瓜爸爸"];
    const title = escapeSvg(song.title || "Pumpkin Song");
    const artist = escapeSvg(song.artist || "");
    const album = escapeSvg(song.album || "英文歌曲學習本");
    const owner = escapeSvg(song.owner || "南瓜家");
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${theme.start}"/>
            <stop offset="100%" stop-color="${theme.end}"/>
          </linearGradient>
        </defs>
        <rect width="600" height="600" rx="48" fill="url(#bg)"/>
        <circle cx="485" cy="120" r="86" fill="rgba(255,255,255,0.12)"/>
        <circle cx="112" cy="492" r="120" fill="rgba(255,255,255,0.10)"/>
        <rect x="40" y="40" width="520" height="520" rx="36" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.38)" stroke-width="3"/>
        <text x="70" y="110" font-size="34" font-family="Arial, sans-serif" font-weight="700" fill="white">${owner} 選曲</text>
        <text x="70" y="210" font-size="60" font-family="Arial, sans-serif" font-weight="800" fill="white">${title}</text>
        <text x="70" y="270" font-size="28" font-family="Arial, sans-serif" fill="rgba(255,255,255,0.92)">${artist}</text>
        <text x="70" y="334" font-size="24" font-family="Arial, sans-serif" fill="rgba(255,255,255,0.88)">${album}</text>
        <g transform="translate(70 394)">
          <circle cx="56" cy="56" r="56" fill="rgba(255,255,255,0.22)"/>
          <circle cx="56" cy="56" r="14" fill="white"/>
          <rect x="134" y="16" width="272" height="18" rx="9" fill="rgba(255,255,255,0.82)"/>
          <rect x="134" y="50" width="220" height="18" rx="9" fill="rgba(255,255,255,0.52)"/>
          <rect x="134" y="84" width="176" height="18" rx="9" fill="rgba(255,255,255,0.36)"/>
        </g>
        <text x="70" y="538" font-size="28" font-family="Arial, sans-serif" font-weight="700" fill="${theme.accent}">Pumpkin Family Songbook</text>
      </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function escapeSvg(v) {
    return String(v)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&apos;");
  }

  // ===== 音效 =====
  function ensureAudio() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === "suspended") audioContext.resume();
  }
  function tone(freq, dur, type = "sine", vol = 0.03, delay = 0) {
    if (!audioContext) return;
    const now = audioContext.currentTime + delay;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(vol, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.connect(gain); gain.connect(audioContext.destination);
    osc.start(now); osc.stop(now + dur + 0.04);
  }
  function playClick() { ensureAudio(); tone(520, 0.12, "triangle", 0.04); tone(760, 0.16, "triangle", 0.03, 0.05); }
  function playSelect(step) { ensureAudio(); tone(380 + (step % 6) * 42, 0.07, "square", 0.02); tone(760 + (step % 4) * 35, 0.05, "triangle", 0.008, 0.015); }
  function playWin() { ensureAudio(); tone(523, 0.16, "triangle", 0.05); tone(659, 0.18, "triangle", 0.05, 0.08); tone(784, 0.22, "triangle", 0.06, 0.16); tone(1046, 0.3, "sine", 0.04, 0.28); }

  // ===== 彩帶 =====
  function confetti() {
    const colors = ["#ff7a59", "#ffbf3c", "#2a9d8f", "#7b5cff", "#e25d7c"];
    for (let i = 0; i < 80; i++) {
      const p = document.createElement("span");
      p.className = "confetti";
      p.style.left = (Math.random() * 100) + "%";
      p.style.background = colors[i % colors.length];
      p.style.animationDelay = (Math.random() * 220) + "ms";
      p.style.setProperty("--drift", ((Math.random() - 0.5) * 42) + "vw");
      p.style.setProperty("--spin", (Math.random() * 720 - 360) + "deg");
      confettiLayer.appendChild(p);
    }
    setTimeout(() => { confettiLayer.innerHTML = ""; }, 2500);
  }

  // ===== 狀態 =====
  function loadCompleted() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) completedSlugs = new Set(arr);
    } catch (e) { completedSlugs = new Set(); }
  }
  function saveCompleted() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedSlugs])); }
    catch (e) {}
  }
  function isCompleted(song) { return completedSlugs.has(song.slug); }
  function availableIndexes() {
    return songs.map((s, i) => [s, i]).filter(([s]) => !isCompleted(s)).map(([, i]) => i);
  }

  // ===== 主題切換 =====
  function ownerThemeClass(owner) {
    if (owner === "南瓜爸爸") return "theme-pumpkin";
    if (owner === "Ann 媽媽") return "theme-mom";
    return "theme-kid";
  }

  // ===== 渲染 =====
  function setActiveNav(index) {
    [...songNav.children].forEach((node, i) => {
      const song = songs[i];
      node.classList.toggle("active", i === index);
      node.classList.toggle("done", isCompleted(song));
    });
  }

  function renderStage(song, prefix) {
    stageOwner.textContent = `${prefix}｜${song.owner}`;
    stageOwner.style.background = song.ownerColor + "22";
    stageOwner.style.color = song.ownerAccent || song.ownerColor;
    stageTitle.textContent = song.title;
    stageSub.textContent = `${song.artist} · ${song.genre}`;
  }

  function renderLyrics(song) {
    lyricList.innerHTML = song.keyLyrics
      .map(
        (l) =>
          `<div class="lyric-block">
            <div class="lyric-label">English Lyrics</div>
            <div class="lyric-en">${escapeHtml(l.en)}</div>
            <div class="lyric-label lyric-label-zh">中文注音</div>
            <div class="lyric-zh">${l.zh}</div>
          </div>`
      )
      .join("");
  }

  function renderVocab(song) {
    basicVocabGrid.innerHTML = song.basicVocab.map((v) => vocabCard(v, "basic")).join("");
    advancedVocabGrid.innerHTML = song.advancedVocab.map((v) => vocabCard(v, "advanced")).join("");
  }
  function vocabCard(v, kind) {
    return `<div class="word-card ${kind}">
      <div class="word-row">
        <span class="w-en">${escapeHtml(v.en)}</span>
        <span class="w-type">${escapeHtml(v.type)}</span>
        <span class="w-ph">${escapeHtml(v.ph)}</span>
      </div>
      <div class="w-zh">${v.zh}</div>
      <div class="w-ex">${escapeHtml(v.ex)}</div>
    </div>`;
  }

  function renderDetail(index, badgeText) {
    const song = songs[index];
    currentIndex = index;
    emptyState.style.display = "none";
    detailSection.classList.add("show");

    const themeClass = ownerThemeClass(song.owner);
    detailHero.className = "detail-hero " + themeClass;
    detailSection.className = "detail-section show " + themeClass;

    coverImage.src = song.cover;
    coverImage.alt = song.title + " cover";
    coverImage.onerror = function () {
      coverImage.style.display = "none";
      const box = coverImage.parentElement;
      if (!box.querySelector(".cover-placeholder")) {
        const ph = document.createElement("div");
        ph.className = "cover-placeholder";
        ph.textContent = "🎵";
        box.appendChild(ph);
      }
    };
    coverImage.style.display = "block";
    const existingPh = coverImage.parentElement.querySelector(".cover-placeholder");
    if (existingPh) existingPh.remove();

    ownerBadge.textContent = `${song.owner} 選的歌`;
    ownerBadge.style.background = song.ownerColor + "22";
    ownerBadge.style.color = song.ownerAccent || song.ownerColor;
    resultBadge.textContent = badgeText;
    songTitle.textContent = song.title;
    songMeta.textContent = `${song.artist} · ${song.genre} · ${song.year || ""}`;
    youtubeLink.href = song.youtube;

    // 內建 <audio controls> 試聽（如果該歌曲有 mp3 欄位）— 仿 P19 寫法
    const mp3Wrap = document.getElementById("mp3Wrap");
    const mp3Player = document.getElementById("mp3Player");
    if (mp3Wrap && mp3Player) {
      if (song.mp3) {
        mp3Wrap.hidden = false;
        mp3Player.src = song.mp3;
        mp3Player.pause();
        mp3Player.currentTime = 0;
      } else {
        mp3Wrap.hidden = true;
        mp3Player.removeAttribute("src");
      }
    }
    celebrateText.textContent = song.celebrate;
    songStory.textContent = song.story;
    songLearn.textContent = song.learn;
    songTask.textContent = song.task;
    songPractice.textContent = song.practice;
    genreDescBox.innerHTML = song.genreDesc;
    meaningBox.innerHTML = song.meaning;

    renderLyrics(song);
    renderVocab(song);
    missionBox.innerHTML = `<strong>🎯 親子任務：</strong>${song.mission}`;

    updateDownloadLink(song);
    renderStage(song, badgeText);
    setActiveNav(index);
  }

  function updateDownloadLink(song) {
    if (currentDownloadUrl) URL.revokeObjectURL(currentDownloadUrl);
    downloadLink.href = `./songs/${song.slug}.html`;
    downloadLink.removeAttribute("download");
    downloadLink.target = "_blank";
    downloadLink.rel = "noopener";
    downloadLink.textContent = "📖 開啟單曲學習頁";
    downloadLink.classList.remove("disabled");
  }

  // ===== 建立卡片 =====
  function buildNav() {
    songNav.innerHTML = "";
    songs.forEach((song, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.style.setProperty("--owner-color", song.ownerColor);
      btn.classList.toggle("done", isCompleted(song));
      btn.innerHTML = `
        <div class="song-topline">
          <span class="owner-mini" style="background:${song.ownerColor};">${escapeHtml(song.owner)}</span>
          <label class="done-wrap">
            <input type="checkbox" ${isCompleted(song) ? "checked" : ""}>
            <span>完成</span>
          </label>
        </div>
        <div class="song-main-title">${escapeHtml(song.title)}</div>
      `;
      btn.addEventListener("click", (e) => {
        if (e.target instanceof HTMLInputElement || e.target.tagName === "LABEL") return;
        if (revealing) return;
        playClick();
        renderDetail(index, "手動選歌");
        statusText.textContent = `目前顯示：${song.owner} 的《${song.title}》`;
      });
      const cb = btn.querySelector("input");
      cb.addEventListener("click", (e) => e.stopPropagation());
      cb.addEventListener("change", (e) => {
        if (e.target.checked) completedSlugs.add(song.slug);
        else completedSlugs.delete(song.slug);
        saveCompleted();
        setActiveNav(currentIndex ?? -1);
      });
      songNav.appendChild(btn);
    });
  }

  // ===== 抽歌 =====
  function startReveal(finalIndex, badgeText) {
    if (revealing) return;
    revealing = true;
    revealButton.disabled = true;
    quickPickButton.disabled = true;
    playClick();
    statusText.textContent = "選歌中，看看今天會抽到哪一首...";
    const pool = availableIndexes();
    if (!pool.length) {
      revealing = false;
      revealButton.disabled = false;
      quickPickButton.disabled = false;
      return;
    }
    let step = 0;
    const total = 18;
    const timer = setInterval(() => {
      const preview = pool[Math.floor(Math.random() * pool.length)];
      renderStage(songs[preview], "選歌中");
      setActiveNav(preview);
      playSelect(step++);
      if (step >= total) {
        clearInterval(timer);
        renderDetail(finalIndex, badgeText);
        confetti();
        playWin();
        statusText.textContent = `恭喜抽到 ${songs[finalIndex].owner} 的《${songs[finalIndex].title}》`;
        revealing = false;
        revealButton.disabled = false;
        quickPickButton.disabled = false;
      }
    }, 150);
  }

  // ===== 匯入匯出重設 =====
  function exportSongs() {
    const payload = {
      exportedAt: new Date().toISOString(),
      completedSlugs: [...completedSlugs],
      songs: songs
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pumpkin-songbook-export.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    statusText.textContent = "已匯出歌單 JSON。";
  }
  function importSongsFromFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (Array.isArray(data.songs) && data.songs.length) {
          songs = data.songs.map(normalizeSongAssets);
          if (Array.isArray(data.completedSlugs)) {
            completedSlugs = new Set(data.completedSlugs);
            saveCompleted();
          }
          buildNav();
          currentIndex = null;
          detailSection.classList.remove("show");
          emptyState.style.display = "block";
          statusText.textContent = `已匯入 ${songs.length} 首歌。`;
        } else {
          alert("檔案格式不正確：找不到 songs 陣列。");
        }
      } catch (err) {
        alert("無法解析 JSON：" + err.message);
      }
    };
    reader.readAsText(file);
  }
  function resetCompleted() {
    if (!confirm("確定要重設所有完成狀態嗎？")) return;
    completedSlugs.clear();
    saveCompleted();
    buildNav();
    setActiveNav(currentIndex ?? -1);
    statusText.textContent = "已重設完成狀態，所有歌曲都可以重新抽。";
  }
  function openBooklet() {
    if (currentBookletUrl) URL.revokeObjectURL(currentBookletUrl);
    const html = window.SongbookDownload.buildBookletHtml(songs);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    currentBookletUrl = URL.createObjectURL(blob);
    const win = window.open(currentBookletUrl, "_blank");
    if (!win) {
      // 若被擋，退回下載
      const a = document.createElement("a");
      a.href = currentBookletUrl;
      a.download = "pumpkin-songbook-整本活動冊.html";
      a.click();
      statusText.textContent = "活動冊已下載 — 直接打開再按 Cmd+P 列印。";
    } else {
      statusText.textContent = "整本活動冊已開啟新分頁，按 Cmd+P 即可列印。";
    }
  }

  // ===== 工具 =====
  function escapeHtml(v) {
    return String(v)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  // ===== 綁定 =====
  revealButton.addEventListener("click", () => {
    const pool = availableIndexes();
    if (!pool.length) {
      playClick();
      statusText.textContent = "所有歌都完成了！點「重設完成狀態」可以重新開始。";
      return;
    }
    const finalIndex = pool[Math.floor(Math.random() * pool.length)];
    startReveal(finalIndex, "隨機抽中");
  });
  quickPickButton.addEventListener("click", () => {
    if (revealing) return;
    const pool = availableIndexes();
    if (!pool.length) {
      playClick();
      statusText.textContent = "所有歌都完成了！點「重設完成狀態」可以重新開始。";
      return;
    }
    const idx = pool[Math.floor(Math.random() * pool.length)];
    playClick();
    renderDetail(idx, "快速抽中");
    confetti();
    playWin();
    statusText.textContent = `快速抽到 ${songs[idx].owner} 的《${songs[idx].title}》`;
  });
  resetButton.addEventListener("click", resetCompleted);
  exportButton.addEventListener("click", exportSongs);
  importButton.addEventListener("click", () => importFile.click());
  importFile.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) importSongsFromFile(file);
    importFile.value = "";
  });
  printBookletButton.addEventListener("click", openBooklet);

  // ===== 啟動 =====
  loadCompleted();
  buildNav();
})();
