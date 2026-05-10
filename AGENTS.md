# AGENTS.md

> 給 Codex / Claude / 任何接手 AI 代理人的工作守則。
> 先讀完這份，再開始動工。

---

## 專案是什麼

南瓜爸爸（陳南宏）的 AI 育兒講座簡報。**30 頁 HTML scroll-snap 簡報**，內嵌 4 個互動工具。
- 講者：陳南宏，南瓜虛擬科技共同創辦人暨美術總監
- 觀眾：35–50 歲家長
- 時間：120 分鐘
- 形式：本機瀏覽器全螢幕播放，**不是 PPT、不是 Reveal.js、不是 Slides.com**，是手寫 HTML + CSS + JS

---

## 第一件事：先讀文件

**動工前必讀順序：**

1. [`README.md`](README.md) — 整體 5 分鐘掌握
2. [`docs/SLIDES.md`](docs/SLIDES.md) — 知道每頁長什麼樣
3. [`docs/DESIGN.md`](docs/DESIGN.md) — 設計系統與動畫規範
4. [`docs/HANDOFF.md`](docs/HANDOFF.md) — 知道前一輪做到哪
5. [`docs/ROADMAP.md`](docs/ROADMAP.md) — 看當前待辦

**如果你要新增 / 大改頁面**，再加讀：

6. [`docs/frontend-slides-reference/README.md`](docs/frontend-slides-reference/README.md) — 這份簡報遵循的 Anthropic frontend-slides skill 知識複本

如果使用者只給你「修一下 P 幾」這種短指令，**不要直接改**，先讀 `SLIDES.md` 對應段落、確認你理解該頁原本要傳達什麼。

---

## 技術約定

### 編輯主簡報 `pumpkin-dad-ai-parenting.html`

- **每頁必須在 100vh 內完整呈現**，不能滾動。內容多就拆成兩頁。
- 所有尺寸用 `clamp(min, preferred, max)`，**禁止固定 px / rem**
- 圖片限制 `max-height: min(50vh, 400px)`
- 每頁 `<section class="slide">` 必須有 `overflow: hidden`
- 每頁有對應的 `<aside class="notes" data-slide="N">` 講者備註，**改頁面時別忘了同步改備註**
- 所有 `snum` 要對齊（`X / 30`）
- 修改後**必跑** `bash scripts/start.sh` 並手動翻頁驗證

### 編輯互動工具 `vocab/` `recipe/` 等

- 都是**單一 HTML 檔**，inline CSS + JS，零依賴
- 不要引入 React / Vue / build tool
- API 呼叫直接 `fetch()` Gemini REST endpoint
- API Key 用 `localStorage` 覆寫 + `DEFAULT_KEY` 預設

### 模型版本

- 多模態：`gemini-2.5-flash`（已驗證可用）
- 純文字：`gemini-2.5-flash` 或 `gemini-flash-latest`
- ❌ 不要用 `gemini-2.0-flash`（這把 Key 該模型額度卡 0）

### 字體

- 標題：`Fraunces`（Google Fonts）
- 內文：`Work Sans`（Google Fonts）
- **不要換成** Inter / Roboto / 系統字 / 思源宋

### 顏色

```css
--bg: #f5f3ee;          /* 主背景 暖米白 */
--text: #1a1a1a;        /* 主文字 */
--brown: #5a4a3a;       /* 主強調 咖啡棕 */
--rust: #a0522d;        /* hover 鏽橘 */
--warm: #e8d4c0;        /* 暖卡片 杏色 */
```

任何新增 UI 必須走這個 palette，**不要引入紫、藍、綠、粉**。例外：`vocab/index.html` 用紫色（Gemini 品牌風），`recipe/index.html` 用暖橘（料理感）—— 這是有意設計的差異化。

---

## 動工流程（每次接 task 都照做）

```
1. 讀 docs/HANDOFF.md → 知道上次到哪
2. 跑 bash scripts/start.sh → 開預覽
3. 翻到要改的那頁 → 截圖 / 觀察現況
4. 改 → 重整網頁驗證 → 確認 viewport 沒爆
5. 同步更新 docs/CHANGELOG.md（這次做了什麼）
6. 同步更新 docs/SLIDES.md（如果改的是頁面內容）
7. 如果改了素材路徑 → 更新 docs/ASSETS.md
8. git commit（commit 訊息照 conventional：feat/fix/docs/style/refactor）
```

---

## 常見任務 SOP

### 新增一頁

1. 決定插入位置 → 後續所有頁的 `id="sN"`、`snum`、`data-slide` 都要 +1
2. 全域 `X / 30` 改成 `X / 31`（用 `replace_all`）
3. 新頁要有 `<aside class="notes" data-slide="N">` 講者備註
4. 更新 `docs/SLIDES.md` 加入該頁
5. 更新 `docs/CHANGELOG.md`

### 移除一頁

1. 確認該頁沒有被別處引用（grep `id="sN"`、`'sN'` 所有出現）
2. 後續所有頁 `id` / `snum` / `data-slide` 都要 -1
3. 全域 `X / 30` 改成 `X / 29`
4. 更新 `docs/SLIDES.md` 與 `docs/CHANGELOG.md`

### 嵌入新工具

1. 工具放在 `tool-name/index.html`（單檔）
2. 主簡報用 `<iframe src="./tool-name/index.html">` 嵌入
3. iframe 容器用 `.tool-frame-wrap`（已存在）
4. 加「↗ 全螢幕開啟」按鈕（class `.tool-open-btn`）
5. 工具的 API Key 寫 `DEFAULT_KEY` + `localStorage` 覆寫機制

### 修改素材

1. 原始素材在 `/Users/chennanhong/Desktop/AI 育兒/`（不要動）
2. 簡報用素材在 `./assets/`（複製品）
3. 新增素材：先複製到 `./assets/`，再從簡報引用相對路徑

---

## 不要做的事 ❌

1. ❌ **不要改檔名 / 移動 `pumpkin-dad-ai-parenting.html`** —— 會破壞使用者書籤
2. ❌ **不要引入 npm / build tool / framework** —— 整份必須維持單檔可開
3. ❌ **不要刪 `archive/`** —— 是設計探索的歷史紀錄
4. ❌ **不要改 `pumpkin-songbook/` `pacman/` 內部** —— 那是另外維護的子專案
5. ❌ **不要把 API Key push 到公開 repo** —— 在 `.gitignore` 排除或改空字串
6. ❌ **不要刪 speaker notes** —— 即使你看不到，使用者按 S 會用
7. ❌ **不要用 emoji 取代真實內容** —— 講者文案是經過深思的，不要簡化

---

## 該做的事 ✅

1. ✅ **改完一定跑 server 驗證**，不要只看 code
2. ✅ **保留南瓜爸爸的口氣**：第一人稱、親切、有家庭場景、不裝專業
3. ✅ **遇到不確定的設計選擇，先問使用者**，特別是涉及顏色、字體、版面結構
4. ✅ **每次完成 task，更新 CHANGELOG.md**
5. ✅ **如果改了內容讓某張投影片爆版**，主動拆頁
6. ✅ **如果素材壞掉**，先檢查相對路徑、再檢查檔名是否包含特殊字元

---

## 互動行為清單（不要破壞）

| 元素 | 觸發 | 行為 |
|---|---|---|
| `.rv` | 翻頁 | 元素由下淡入 |
| `.rv-click` | 點擊或空白 | 逐項揭曉 |
| 計數器 | 翻頁 | 數字從 0 跑到目標 1.4s |
| 投票 | 點擊 | 按鈕填棕變白字 |
| 揭曉答案 | 點擊 | 答案框 scale up |
| 迷思卡片 | 點擊 | 展開答案 |
| 滾輪 | 滾動 | 翻頁 |
| 滾輪在 `data-scroll-zone` 內 | 滾動 | 內部滾動，不翻頁 |
| `S` 鍵 | 按下 | 顯示講者備註 |
| `E` 鍵 | 按下 | 進入編輯模式 |

如果你新增可滾動的元素（例如歌詞、結果列表），記得加 `data-scroll-zone="true"`，否則使用者滾兩下就跳頁了。

---

## 給 Codex 的特別提醒

如果你是 OpenAI Codex：
- 你看不到 `.claude/` 目錄裡的東西，那是 Claude Code 的設定，**忽略它**
- `.gstack/` 同理，是另一個工具的設定
- **唯一可信的真相是 `docs/`** —— 文件比 chat history 更可靠

如果你是 Claude Code：
- 你看得到 `.claude/`，但不要為了這個專案在裡面寫東西，這個專案的所有狀態都應該在 `docs/`
- 使用者隨時可能切到 Codex，所以**所有判斷依據都要落到 docs/**

---

## 緊急聯絡

- 講者：陳南宏（南瓜爸爸）
- Email：nanhong@pumpkinvrar.com
- 如果問題真的卡住，去問使用者本人，**不要假設**
