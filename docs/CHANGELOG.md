# Changelog

> 開發歷程紀錄。新 entry 寫在最上面。

---

## 2026-05-04 · 整理為可移交專案包

**做了什麼**
- 建立完整 `docs/` 文件結構（README / AGENTS / SLIDES / DESIGN / ASSETS / HANDOFF / CHANGELOG / ROADMAP）
- 移除舊版本檔案到 `archive/`（pumpkin-dad-bold-signal.html / pumpkin-dad-dark-botanical.html / CLAUDE_DESIGN_BRIEF.md / heka-database-schema.md）
- 建立 `scripts/start.sh` 一鍵啟動本機 server
- 寫 `.gitignore` 排除暫存與密鑰
- 初始化 git repo，準備推到 GitHub 給 Codex 接手

**為什麼**
使用者要把專案從 Claude 移到 Codex 繼續開發，需要完整文件 + 乾淨結構。

---

## 2026-05-03 · 三大改動

### 改①：歌詞滾輪不翻頁（P18）
- `pumpkin-dad-ai-parenting.html` 新增 `findScrollableAncestor()` helper
- wheel handler 加 boundary 偵測，游標在可滾動容器內且未到邊界時 return early
- 歌詞框加 `data-scroll-zone="true"` 標記

### 改②：Pac-Man 從 P24 → P20（範例 6）
- 把吃豆人從「深入範例 3」改成「範例 6」，放到 5 個短打範例之後
- 新增頁面巨型編號 `06` 與「親子互動 · 從照片到遊戲」eyebrow
- 原 P20-P23（旗山系列＋AI 顧問）整段往後推一位 → P21-P24
- 全部 ID（`s20`-`s24`）、`snum`、`data-slide`、JS handler 引用都同步更新
- P25 投票文案：「5 個範例」→「6 個範例」，新增第 6 顆按鈕「🎮 AI 做小遊戲」

### 改③：AI 食譜互動工具（全新 `recipe/index.html`）
- 解決痛點：「冰箱裡食物用塑膠袋包，AI 拍照看不出來」
- 設計：用點選 + 文字輸入，不靠拍照
- 4 步驟 stepper：食材 / 調味料工具 / 偏好 / 食譜
- 30+ 預設食材 chip + 自訂輸入框
- 預設常用調味料已勾選（鹽糖醬油胡椒 + 瓦斯爐）
- 「給孩子要少油少鹽」單選打中目標族群
- Sticky 浮動產生按鈕 + 即時摘要
- Markdown 食譜輸出 + 換一份 / 複製 / 列印按鈕
- 用同一把 Gemini API Key + `gemini-2.5-flash`
- 替換 P19 原本的純文字步驟頁面為 iframe

**為什麼**
- 滾輪卡頁讓使用者讀歌詞很煩
- 吃豆人作為「使用 → 創造」的範例，放在範例集裡比深入範例更合適
- 食譜需要的是即拿即用工具，不是流程圖

---

## 2026-05-03（早些時候） · 加入 API Key

- 把 Gemini API Key `AIzaSy...uI9f0Z8` 寫進 `vocab/index.html` 的 `DEFAULT_KEY`
- 同時測試 `gemini-2.0-flash` 額度卡 0 → 改用 `gemini-2.5-flash` 通暢
- 端到端測試睿寶飛機照 → API 正確回傳 7 個物件 + 標籤位置

**為什麼**
免去每次操作都要手動貼 Key 的麻煩，講座當天直接用。

⚠️ 安全提醒：講座結束後須撤銷此 Key 重新申請。

---

## 2026-05-03（更早） · 純前端 vocab 工具

- 從零打造 `vocab/index.html`（單檔 HTML + inline CSS/JS）
- 完全取代原本的 React + Vite + Express 版本
- 不需 npm install、不需 dev server，瀏覽器直接跑
- 直接呼叫 Gemini REST API
- 內建示範模式（不需 Key 也能展示）
- 用瀏覽器原生 SpeechSynthesis 做發音

**為什麼**
原本指向 `localhost:3000` 的 iframe 在沒跑 Node server 時顯示「localhost 拒絕連線」。
寫成純前端後，整個簡報變成真正的 zero-dependency 包。

---

## 2026-05-02 · 第二輪大改

### 改①：P2 自我介紹加照片 + 新版 bio
- 新增 `assets/自我介紹/陳南宏單獨照.png`
- 改成左右兩欄版面：左照片 + 右文字
- bio 從「老師」改為「南瓜虛擬科技共同創辦人暨美術總監」
- 加 5 個 tags（VR/XR · 3D 場景 · AI 流程 · 專案統籌 · 教學經驗）

### 改②：P3 加入 200 工具影片
- 嵌入 `assets/工具影片/科技 × 軟體應用_使用工具.mp4`
- 保留巨型「200」計數器
- max-height 32vh 不破版

### 改③：P15 加寬
- iframe 從 `max-width:1100px` 改成 `96vw`
- 高度從 62vh 加到 72vh

### 改④：P16 加寬 + 離線 fallback
- 同樣 96vw / 68vh
- 加 fallback 卡片：iframe 載入失敗時顯示啟動指令

### 改⑤：新增 P24 吃豆人（後來移到 P20）
- 新增 `assets/吃豆人_t恤原圖.jpg` 和 `assets/吃豆人_遊戲畫面.png`
- 複製 `~/pacman/` 到 `pacman/`
- 創建左右分欄頁面：左 iframe 遊戲、右 T 恤照片 + 步驟

### 改⑥：總頁數 29 → 30
- 全域 `X / 29` → `X / 30`

---

## 2026-05-02（早些時候） · 第一輪大整理

### 改①：刪除白蘿蔔頁
- 移除原 P21「白蘿蔔 8 問題」整頁
- 原 P20「旗山＋白蘿蔔 intro」改為「旗山一日遊」單一範例
- 原 P22 旗山問題樹遞補為新 P21

### 改②：P15 換成 iframe 嵌入歌單
- 移除原 canvas 轉盤
- 改用 iframe 嵌入 `pumpkin-songbook/index.html`
- 複製整份 songbook 到專案

### 改③：P25 投票補上第 5 顆按鈕
- 原本 4 顆，加上「🎼 Suno 家庭音樂」
- 文案維持「5 個範例」

### 改④：P18 Suno 完整內容
- 加音檔 `assets/Suno/把陽光裝進我們家_V02.mp3`
- 加 Suno 公開連結
- 嵌入完整歌詞（後來改成全段滾動框）

### 改⑤：新增 P28 QR 資源頁
- 三張 QR Code（FB / IG / LINE）
- 從 `AI 育兒/資源 QR Code 頁/` 複製到 `assets/QR/`

### 改⑥：30 頁全加 speaker notes
- 每頁 `<aside class="notes" data-slide="N">`
- 按 S 鍵切換浮動面板
- P1-P14 用使用者提供的逐字稿
- P15 之後延伸撰寫，每頁 50-120 字

---

## 2026-04-XX · 初版

由 Claude 與使用者共同設計、開發 30 頁 HTML 簡報。
原始版本檔保存在 `archive/`：
- `pumpkin-dad-bold-signal.html`（深色強烈版本探索）
- `pumpkin-dad-dark-botanical.html`（深綠植物版本探索）
- 最終定稿：暖米色 + 咖啡棕編輯誌風（即現行版本）
