# Handoff Brief

> 這份文件給「下一個接手的人或代理人」（不論是 Codex、Claude、其他 AI、或下一階段的你自己）。
> **3 分鐘讀完就能上手。**

---

## 1. 這個專案是什麼

南瓜爸爸（陳南宏）的 **AI 育兒講座**簡報專案。
- **30 頁** scroll-snap 自製 HTML 簡報（不是 PPT、不是 Reveal.js）
- **4 個內嵌互動工具**（單字、食譜、歌單、吃豆人）
- **120 分鐘**講座，已排好時間節奏
- 對象：**35–50 歲家長**

---

## 2. 目前狀態（2026-05-04）

### ✅ 已完成

- **30 頁全部完成**，內容、設計、互動都已就位
- **4 個互動工具**全部嵌入運作正常
  - 工具①「取出英文單字」`vocab/index.html` — 已測 Gemini 2.5 Flash API 通暢
  - 工具②「冰箱有什麼今天吃什麼」`recipe/index.html` — 同上
  - 工具③「南瓜家英文歌曲大冒險」`pumpkin-songbook/` — 純靜態
  - 工具④「吃豆人」`pacman/` — 純靜態
- **Speaker notes** 30 頁全有，按 S 鍵切換
- **滾輪行為**已修：游標在歌詞 / 結果框內滾動不會翻頁
- **API Key** 已內建在 `vocab/` 和 `recipe/` 的 `DEFAULT_KEY` 常數
- **資料夾結構**已整理（archive/ 收舊版本）

### ⏳ 開放議題（看 [`ROADMAP.md`](ROADMAP.md)）

- 部署到公開 URL（Vercel / GitHub Pages）— 尚未做
- API Key 在公開 repo 風險 — 已警告，需手動 rotate
- 部分頁面可加視覺擴充（P2、P17 等）— 詳見 ROADMAP

---

## 3. 工具規格

### 工具① `vocab/index.html`（P16）

**功能：** 上傳照片 → Gemini 多模態識別物品 → 列出英文單字 + 詞性 + 中文 + 發音

**技術：**
- 純前端 HTML + JS，零依賴
- 直接呼叫 `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`
- 發音用瀏覽器原生 `SpeechSynthesisUtterance`（macOS 上自動選 Samantha 美式女聲）
- 示範模式：不需 API Key 也能展示完整效果

**API Key 機制：**
```js
const DEFAULT_KEY = 'AIzaSy...';
function getKey() { return localStorage.getItem('GEMINI_API_KEY') || DEFAULT_KEY; }
```
使用者按右上角「設定 API Key」可覆寫。

**示範資料：**
```js
const DEMO_DATA = {
  imageUrl: './demo-flight.jpg',
  pins: [
    { label:'A', word:'Girl', pos:'noun', zh:'女孩', x:.46, y:.62 },
    { label:'B', word:'Stuffed animal', ... },
    // ... 7 個
  ]
};
```

### 工具② `recipe/index.html`（P19）

**功能：** 點選食材 / 調味料 / 工具 / 偏好 → AI 生成今晚食譜

**設計核心：**
- **不用拍照** — 解決「冰箱裡食物用塑膠袋包看不出來」的痛點
- 4 步驟漸進式 stepper
- 30+ 預設食材 chip + 自訂輸入
- 預先勾選常見調味料（鹽糖醬油胡椒）
- 「給孩子要少油少鹽」單選直擊家長痛點

**API：**
- 同樣 `gemini-2.5-flash`，純文字模式
- Markdown 輸出 → 自製 `mdToHtml()` 渲染

### 工具③ `pumpkin-songbook/`（P15）

**功能：** 9 首英文歌曲歌單，可隨機抽歌、看學習頁

**狀態：** 從 `Codex/2026-04-18-users-chennanhong-desktop-ai/pumpkin-songbook/` 複製來的，獨立維護。

**包含：** 9 首歌（Way Back Into Love / Lost Stars / Make You Mine / Lemon Tree / Something Just Like This / A Thousand Years / Zoo / Soda Pop / Free）

### 工具④ `pacman/`（P20）

**功能：** 可玩的吃豆人遊戲

**狀態：** 從 `~/pacman/` 複製來的，獨立維護。鍵盤方向鍵操作。

---

## 4. 講者個人資料

```
姓名：陳南宏
暱稱：南瓜爸爸
身份：南瓜虛擬科技 共同創辦人暨美術總監
專長：3D 場景、空間敘事、沉浸式互動、AI 流程整合
家庭：太太 Ann、女兒睿寶（6 歲）
玩偶：MOMO 貓頭鷹、努努（睿寶的玩具角色）
Email：nanhong@pumpkinvrar.com
```

**重要：** 寫文案時用第一人稱「我」、口氣要親切、不要裝專業、要有家庭場景。

---

## 5. 講座結構（120 分鐘）

```
A. 開場定位     P1–P9    27 分鐘
B. 觀念建立     P10–P14  18 分鐘
C. 六個生活範例 P15–P20  47 分鐘
D. 深入應用     P21–P24  14 分鐘
E. 互動收尾     P25–P30  14 分鐘
                          ─────
                          120 分鐘
```

詳細時間分配看 [`SLIDES.md`](SLIDES.md)。

---

## 6. 講座當天必做

```bash
# 1. 進專案
cd "/Users/chennanhong/Desktop/ClaudeCode/My Project"

# 2. 啟動本機 server
bash scripts/start.sh

# 3. 瀏覽器開
open "http://localhost:8080/pumpkin-dad-ai-parenting.html"

# 4. 全螢幕 (F11 / ⌘ Ctrl ⇧ F)，瀏覽器 zoom 100%

# 5. 翻 P3、P15、P16、P18、P19、P20、P29 確認 iframe 和影音都載入

# 6. 確認 Wi-Fi（API 工具需要網路）
```

---

## 7. 給接手代理人的工作 SOP

每次有新 task：

1. **讀 [`ROADMAP.md`](ROADMAP.md)** — 看待辦清單
2. **讀 [`SLIDES.md`](SLIDES.md) 對應頁** — 理解該頁設計意圖
3. **跑 `bash scripts/start.sh`** — 開預覽
4. **動手改** — 遵循 [`AGENTS.md`](../AGENTS.md) 的技術約定
5. **手動翻頁驗證** — 不要只看 code，要看實際畫面
6. **更新 [`CHANGELOG.md`](CHANGELOG.md)** — 寫這次做了什麼
7. **如果改頁面** → 同步更新 [`SLIDES.md`](SLIDES.md)
8. **如果動素材** → 同步更新 [`ASSETS.md`](ASSETS.md)
9. **commit**

---

## 8. 移到 Codex 的步驟

### A. 推到 GitHub

```bash
cd "/Users/chennanhong/Desktop/ClaudeCode/My Project"
git init -b main
git add .
git commit -m "Initial commit: pumpkin-dad AI parenting talk (30 slides + 4 tools)"

# 用 GitHub CLI（推薦）
gh repo create pumpkin-dad-ai-parenting --private --source=. --push

# 或手動：
# 1. 在 github.com 開新 repo
# 2. git remote add origin git@github.com:你的帳號/pumpkin-dad-ai-parenting.git
# 3. git push -u origin main
```

### B. 開 Codex Task

1. 到 [chatgpt.com](https://chatgpt.com) 開 Codex 介面
2. 連接你的 GitHub
3. 選這個 repo
4. **第一個任務建議貼這個 prompt：**

> 我把南瓜爸爸 AI 育兒講座的簡報移過來。
> 請先讀 `AGENTS.md` + `docs/HANDOFF.md` + `docs/ROADMAP.md`，
> 確認你理解這個專案的架構與當前狀態後，
> 列出你看到的 ROADMAP 待辦清單，
> 我們再決定先做哪一個。

### C. ⚠️ 重要：rotate API Key

在推到 GitHub 之前：

```bash
# 移除 vocab/index.html 的 DEFAULT_KEY
sed -i '' "s/AIzaSyDGsbgwhiLL96isTCe58Bl4psCkuI9f0Z8/YOUR_KEY_HERE/g" vocab/index.html recipe/index.html
```

或者把這把 Key 從現有 repo 移除，去 [aistudio.google.com/apikey](https://aistudio.google.com/apikey) 撤銷重發新的，新 Key 自己填回去。**Github 公開 repo 的 Key 會被自動爬蟲偷走。**

---

## 9. 已知坑點

### 坑①：iframe 必須 HTTP server
- ❌ 直接點 HTML（file://）→ Safari 會擋 iframe
- ✅ 用 `python3 -m http.server 8080` 或 `bash scripts/start.sh`

### 坑②：Gemini 2.0 Flash 模型額度卡 0
- 已知這把 Key 在 `gemini-2.0-flash` 是 RESOURCE_EXHAUSTED
- 工具用 `gemini-2.5-flash` 沒問題

### 坑③：scroll-snap 攔截滾輪
- 已修：可滾動容器加 `data-scroll-zone="true"` 即可
- 全域 wheel handler 會檢查 boundary

### 坑④：講者備註 S 鍵衝突
- 編輯 contenteditable 元素時 S 鍵會被誤判
- 已加 `if (e.target.getAttribute('contenteditable')) return;`

### 坑⑤：中文檔名空格
- 部分檔名有空格，URL encode 後變 `%20`
- Vercel 偶爾出怪事 → 部署前可考慮 rename

---

## 10. 緊急聯絡

- **講者本人：** 陳南宏（nanhong@pumpkinvrar.com）
- **如果代理人卡住：** 先停下來問本人，**不要假設**
- **如果發現 bug：** 寫進 `ROADMAP.md` 不要悶著

---

## 11. 整體 Repo 結構速查

```
My Project/
├── README.md                  ← 入口
├── AGENTS.md                  ← 工作守則
├── docs/
│   ├── SLIDES.md              ← 30 頁逐頁內容
│   ├── DESIGN.md              ← 設計系統
│   ├── ASSETS.md              ← 素材清單
│   ├── HANDOFF.md             ← 你正在看
│   ├── CHANGELOG.md           ← 開發紀錄
│   └── ROADMAP.md             ← 待辦
├── pumpkin-dad-ai-parenting.html
├── vocab/
├── recipe/
├── pumpkin-songbook/
├── pacman/
├── assets/
├── scripts/start.sh
└── archive/                   ← 舊版本
```

---

**讀完這份，動工前再看一次 [`AGENTS.md`](../AGENTS.md) 的「不要做的事 ❌」清單。**
