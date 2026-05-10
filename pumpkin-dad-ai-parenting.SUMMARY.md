# 🎃 南瓜爸爸 AI 育兒講座 — 專案總結（給下一個對話視窗用）

最後更新：2026-05-07

---

## 📁 檔案位置

| 項目 | 路徑 |
|---|---|
| **主簡報 HTML** | `/Users/chennanhong/Desktop/ClaudeCode/My Project/pumpkin-dad-ai-parenting.html` |
| **本機網址** | `http://localhost:8765/pumpkin-dad-ai-parenting.html` |
| **HTTP Server** | `python3 scripts/range_server.py 8765` ⚠️ 必須用這支，不能用內建 `http.server`（需 Range 才能拖曳音訊） |
| **資產資料夾** | `assets/`、`pumpkin-songbook/`、`vocab/`、`recipe/`、`pacman/`、`qishan-graph/` |

### 救援備份
- `pumpkin-dad-ai-parenting.backup-20260505-021205.html`（純 emoji 還原點）
- `pumpkin-dad-ai-parenting.backup-20260506-200251.html`（教稿大改前）
- `pumpkin-dad-remotion.backup-20260505-021155/`（Remotion 影片版本）
- `pumpkin-songbook/scripts/songbook-data.backup-*.js`

---

## 🎨 視覺系統

| 角色 | 色票 |
|---|---|
| 南瓜橘 | `#F58220` / `#FF8C42` |
| 棕（emphasis）| `var(--brown)` ≈ `#8B4513` |
| 米色背景 | `#FFF8F0` |
| 薄荷綠／桃色／米黃 | 點綴用 `#C8E6D5 / #FCE2C7 / #FCE7B8` |
| 字體 | Plus Jakarta Sans + **Fraunces**（英文大標）+ Noto Sans TC |

### 全域 AI / 英文大標規則 ⭐
所有 `<em>` 在 `.t-h1 / .t-h2 / .t-h3 / .poll-q / .af-name-en / .eng-em` 都會變 **棕色 + 斜體 + Fraunces**，與 P01 封面 AI 字體統一。

---

## 🗂 簡報結構（31 頁）

### 段一：開場定位（P1–P9）
P1 封面｜P2 關於我（左文右照片，已升版滿版裁圖）｜P3 教學×演講現場 gallery｜P4 200 工具｜**P5 投票①**｜P6 哪個 AI（7 顆可點按鈕）｜**P7 訂閱**（雙翻牌）｜P8 $20 月費 ⭐｜P9 課程目標

### 段二：觀念建立（P10–P14）
P10 35–50 歲優勢｜**P11 投票②**｜P12 老方法（時間／精力螢光強調）｜P13 學習加速 ⭐｜P14 瑣碎時間

### 段三：核心金句（P15）
P15 不是讓孩子學 AI ⭐⭐⭐

### 段四：六個生活範例（P16–P21）
P16 英文歌轉盤（**iframe → pumpkin-songbook**）｜**P17 拍照學單字**（iframe → vocab）｜P18 AI 說故事（**左文右繪本作家 Prompt 卡**）｜P19 Suno 把陽光裝進｜P20 AI 食譜（iframe → recipe）｜P21 AI 做吃豆人（iframe → pacman）

### 段五：進階整合（P22–P25）
P22 旗山旅遊知識樹（**iframe → qishan-graph，D3 力導向圖**）｜P23 旗山開場｜P24 AI 顧問｜**P25 三工具整合**（左步驟、右紅蘿蔔的祈求 Suno 播放器）

### 段六：互動收尾（P26–P31）
**P26 投票③**｜P27 三大迷思｜**P28 舉手計數**｜P29 Q&A｜P30 資源 QR｜P31 結語

---

## 🛠 各頁互動元件清單

| 頁 | 元件 | 行為 |
|---|---|---|
| P5/P11/P26 | poll-btn → reveal | 點選項、按「揭曉」整段答案出現 |
| P6 | `.ai-btn` | 7 顆可點按鈕：Gemini / ChatGPT / Claude / Copilot / Grok / Perplexity / Meta AI，hover 變橘 |
| P7 | `.p7-pair` 雙翻牌 | 兩格都用 `?` 蓋住，點任一邊整體翻面（右邊延遲 0.08s 接力） |
| P12/P13/P14/P22/P27 | `data-clickreveal="true"` + `.rv-click` | 內部元素逐項點擊展開 |
| P16 | iframe `pumpkin-songbook/index.html?v=20260506d` | 9 首歌卡 + 隨機抽歌 + 大張專輯封面 + MP3 試聽（已支援拖曳） |
| P17 | iframe `vocab/index.html?v=20260506b` | 拍照學單字工具，已刪除「（無需 API Key）」字樣 |
| P18 | `.p18-prompt` | 右邊深色 prompt 卡，可在框內捲動（`data-scroll-zone="true"` 不會翻頁），有「⧉ 複製」按鈕 |
| P19/P25 | `<audio controls preload="auto">` | Suno 音訊，**伺服器需支援 Range** 才能拖曳 |
| P22 | iframe `qishan-graph/index.html?v=20260506d` | D3 力導向圖、可拖節點、滾輪縮放、節點點擊展開詳情 |
| P28 | counter | 舉手按一下加一 |

---

## 📁 子應用 / iframe 清單

| 路徑 | 用途 | 已知狀態 |
|---|---|---|
| `pumpkin-songbook/` | 9 首英文歌 cards + 學習頁 + MP3 試聽 | ✅ 封面換大圖、MP3 寬條、preload=auto |
| `pumpkin-songbook/assets/covers/` | 9 張原圖封面 | ✅ |
| `pumpkin-songbook/assets/mp3/` | 8 首 MP3（缺 A Thousand Years） | ⚠️ A Thousand Years 沒 MP3 |
| `vocab/` | Gemini 拍照取單字 | ✅ |
| `recipe/` | 食材 → 食譜 | — |
| `pacman/` | AI 生成吃豆人遊戲 | — |
| `qishan-graph/` | D3 力導向旗山知識圖譜 | ✅ NEW（本次新增） |

---

## ⚠️ 重要：必須用 range_server.py

**現在的 server**：`python3 scripts/range_server.py 8765`

**為什麼**：Python 內建 `http.server` 不支援 HTTP Range，導致 `<audio>` 不能拖曳時間軸。`range_server.py` 是寫好的替代版本。

**怎麼啟動**（如果伺服器停了）：
```bash
cd "/Users/chennanhong/Desktop/ClaudeCode/My Project"
lsof -ti :8765 | xargs kill 2>/dev/null
python3 scripts/range_server.py 8765 &
```

**怎麼驗證 Range 有效**：
```bash
curl -I -H "Range: bytes=0-100" "http://localhost:8765/任何mp3"
# 應該回 206 Partial Content（不是 200 OK）
```

---

## 📜 P18 GAI Prompt 模板（也存進簡報的右邊 panel 了）

完整版，給「兒童繪本作家與說書人」風格：

> 你是一名專業的兒童繪本作家與說書人，特別擅長為國小 1～6 年級的孩子創作故事。你的說書風格溫暖、輕鬆、有畫面感⋯⋯
>
> **主角群**：
> - **睿寶**：6 歲女孩、好奇、慢熱、相信合作
> - **MOMO（貓頭鷹）**：智慧軍師
> - **小夜心（刺蝟）**：細膩守護
> - **橘子（紅狸貓）**：行動開心果
> - **趴趴（史努比）**：暖心陪伴
>
> **輸出格式**：故事名稱 / 適合年齡 / 故事開場 / 正文故事 / 角色互動 / 小小啟發 / 親子提問

直接打開簡報 P18 → 右邊「⧉ 複製」按鈕一鍵帶走。

---

## ✅ 已完成的所有工作（按時間順序）

### 第一階段 — Remotion 影片化（完成）
建立 `pumpkin-dad-remotion/` 專案，31 頁全部寫成 Remotion compositions（橫版+直版），可以 `npm install && npm start` 開預覽。

### 第二階段 — 3D 圖示嘗試與還原
做過 emoji → 3D 圖示替換、又全部還原回 emoji 版本。`assets/icons-3d/` 留 46 張 PNG（萬一要救）。

### 第三階段 — 教稿大修（本次）
- P01 封面文案改成「AI 科技讓我們一起變得更有料、更有底氣地陪伴下一代成長。」
- P02 四條 bullet 改寫（10 年 3D／VR-AR／工作創作學習日常／爸爸先生）
- P03 標題改「經常出席各式的活動、擔任講師、技術交流」
- P06 加 Grok / Perplexity / Meta AI，全部改成可點按鈕
- P07 雙翻牌（兩邊都遮、同時揭曉）
- P11 標題改「各位家長們，平常用什麼方式來自我學習？」
- P12「時間」「精力」加底色螢光放大
- P16 修：① 封面顯示（路徑 file:// → 相對路徑）② 換大張原圖 ③ MP3 寬條 ④ Range server
- P17 刪掉「（無需 API Key）」
- P18 左右切版、右邊深色 GAI Prompt 卡（兒童繪本作家版）、可框內捲動、複製按鈕
- P19 audio preload=auto + width:100% + Range 可拖曳
- P22 整合 D3 力導向旗山知識圖譜（左圖右問題）
- P25 改左右版、紅蘿蔔的祈求 Suno 播放器移到右邊

### 全域
- `.t-h1 em / .t-h2 em / .t-h3 em / .poll-q em / .af-name-en / .eng-em` 全部統一 = P01 AI 棕色斜體 Fraunces
- 全域 cache-buster `?v=20260506d`

---

## 🔄 已知未做事項

- [ ] A Thousand Years.mp3（要的話放 `pumpkin-songbook/assets/mp3/`）
- [ ] 單獨頁（s4 / s10 / s25 / s27）的講者 notes 還是舊的
- [ ] 全篇 speaker notes 還沒做最終校對
- [ ] Remotion 版本（影片化）還停在最初版，沒同步到最近的教稿大修

---

## 📌 給下一個對話視窗的開場提示（複製即用）

> 我有一份 HTML 簡報 `/Users/chennanhong/Desktop/ClaudeCode/My Project/pumpkin-dad-ai-parenting.html`，南瓜爸爸 AI 育兒講座，31 頁 scroll-snap。
>
> **伺服器要用 `python3 scripts/range_server.py 8765`**（Python 內建 http.server 不支援 Range，audio 拖曳會失效），跑在 `http://localhost:8765/`。
>
> 主色 `#F58220`，英文大標都用 Fraunces 棕色斜體（class `.eng-em` 或 `<em>` in headings）。核心訊息：「不是讓孩子學 AI，而是讓家長變得更有料、更有底氣」。
>
> 詳細頁面結構與已完成工作見 `pumpkin-dad-ai-parenting.SUMMARY.md`。

---

🎃 **南瓜爸爸 — 陳南宏 Terry**
南瓜虛擬科技 共同創辦人 / 美術總監
