# 南瓜爸爸的 AI 育兒講座

> 30 頁互動式 HTML 簡報 + 4 個內嵌互動工具，給 35–50 歲家長的 AI 育兒入門。
> 講者：陳南宏（南瓜爸爸）— 南瓜虛擬科技共同創辦人暨美術總監

---

## ⚡ 快速啟動

```bash
# 進入專案資料夾
cd "/Users/chennanhong/Desktop/ClaudeCode/My Project"

# 啟動本機 server（必須，否則 iframe 會被擋）
bash scripts/start.sh
# 或直接：python3 -m http.server 8080
```

開瀏覽器：

```
http://localhost:8080/pumpkin-dad-ai-parenting.html
```

| 操作 | 鍵 |
|---|---|
| 上下頁 | `←` `→` 或 `Space` |
| 講者備註 | `S`（再按一次關閉，或 `Esc`） |
| 編輯模式 | `E` 或滑鼠移到左上角 |
| 直接跳頁 | 點右側點導覽 |

---

## 📁 專案結構

```
My Project/
├── README.md                       ← 你正在看
├── AGENTS.md                       ← 給 Codex / 接手代理人的工作守則
│
├── pumpkin-dad-ai-parenting.html   ← 主簡報（30 頁，1815 行）
│
├── vocab/index.html                ← 工具①：照片學單字（Gemini 2.5）
├── recipe/index.html               ← 工具②：AI 食譜助理（Gemini 2.5）
├── pumpkin-songbook/index.html     ← 工具③：英文歌曲歌單（純靜態）
├── pacman/index.html               ← 工具④：吃豆人遊戲（純靜態）
│
├── assets/                         ← 簡報引用素材
│   ├── 自我介紹/
│   ├── Suno/
│   ├── 工具影片/
│   ├── QR/
│   ├── 英文單字/
│   ├── 親子故事/
│   ├── 食譜/
│   ├── 吃豆人_t恤原圖.jpg
│   └── 吃豆人_遊戲畫面.png
│
├── docs/                           ← 完整文件
│   ├── SLIDES.md                   ← 30 頁逐頁內容對照
│   ├── DESIGN.md                   ← 設計系統規範
│   ├── ASSETS.md                   ← 全素材清單（含未用備援）
│   ├── HANDOFF.md                  ← 交接給 Codex 的快速 brief
│   ├── CHANGELOG.md                ← 開發歷程紀錄
│   ├── ROADMAP.md                  ← 待辦與擴展點
│   └── frontend-slides-reference/  ← Anthropic skill 知識複本（給接手代理人）
│
├── scripts/
│   └── start.sh                    ← 啟動本機 server
│
└── archive/                        ← 舊版設計探索（不影響運行）
```

---

## 🎯 講座核心訊息

> **「這不是讓孩子學 AI，而是讓家長變得更有料、更有底氣。」**

120 分鐘，6 個生活範例，3 場互動投票，2 個深入應用，所有 demo 都在簡報內可玩。

---

## 🛠 講前檢查清單

1. ✅ 本機 server 已起 `bash scripts/start.sh`
2. ✅ 瀏覽器 zoom 100%，全螢幕（F11 / `⌘ Ctrl ⇧ F`）
3. ✅ 翻到 P3 → 確認影片載入
4. ✅ 翻到 P15 → 確認歌單 iframe
5. ✅ 翻到 P16 → 點「載入示範圖」→ 點「提取單字」→ 確認 Gemini 回傳
6. ✅ 翻到 P18 → 按播放，把游標移到歌詞框內滾動，確認不會翻頁
7. ✅ 翻到 P19 → 食譜工具 → 試生成一份
8. ✅ 翻到 P20 → 吃豆人 iframe → 玩兩秒
9. ✅ 翻到 P29 → 三個 QR 圖載入

---

## 🔑 API Key

**Gemini API Key 已內建** 在 `vocab/index.html` 和 `recipe/index.html` 的 `DEFAULT_KEY` 常數。

⚠️ **講座結束後請至 [aistudio.google.com/apikey](https://aistudio.google.com/apikey) 撤銷舊 Key 並重新申請**，避免外流被盜刷。

模型使用：`gemini-2.5-flash`（多模態，速度快，免費額度足夠）

---

## 📚 詳細文件

- 想看每頁長什麼樣 → [`docs/SLIDES.md`](docs/SLIDES.md)
- 想理解設計語言 / 視覺風格 → [`docs/DESIGN.md`](docs/DESIGN.md)
- 想找某張照片在哪 → [`docs/ASSETS.md`](docs/ASSETS.md)
- 接手 Codex 看哪份？ → [`docs/HANDOFF.md`](docs/HANDOFF.md)
- 之前改了什麼？ → [`docs/CHANGELOG.md`](docs/CHANGELOG.md)
- 還可以做什麼？ → [`docs/ROADMAP.md`](docs/ROADMAP.md)

---

## 🚀 移交給 Codex 的步驟

```bash
# 1. 進專案
cd "/Users/chennanhong/Desktop/ClaudeCode/My Project"

# 2. 推到 GitHub（如果尚未）
git init -b main
git add .
git commit -m "Initial commit: pumpkin-dad AI parenting talk"
gh repo create pumpkin-dad-ai-parenting --private --source=. --push

# 3. 在 Codex 開新 task，指向這個 repo
#    Codex 會讀 AGENTS.md 知道怎麼工作
```

詳細步驟見 [`docs/HANDOFF.md`](docs/HANDOFF.md)。
