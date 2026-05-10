# 🎃 南瓜爸爸 AI 育兒講座 — 範例工具製作 Prompt 完整集

> 版本：2026-05-09
> 用途：給任何 GAI（Claude / GPT / Gemini）一份**可直接複製貼上**的需求書，重建簡報內所有互動範例工具。
> 共同設計語言：色票 `#F58220`（南瓜橘）／字體 Plus Jakarta Sans + Noto Sans TC + Fraunces；溫暖、米色背景、圓角、不過度動畫。

---

## 📑 工具索引

| # | 工具 | 對應簡報頁 | 路徑 | 複雜度 |
|---|---|---|---|---|
| 1 | **南瓜家英文歌曲大冒險**（歌單） | P16 | `pumpkin-songbook/` | ★★★★ |
| 2 | **拍照學單字**（Gemini Vision） | P17 | `vocab/` | ★★★ |
| 3 | **AI 說故事**（Prompt 工程） | P18 | — 純 prompt | ★ |
| 4 | **Suno 家庭主題曲** | P19 | `assets/Suno/` | ★ 用工具 |
| 5 | **AI 食譜**（Gemini 文字） | P20 | `recipe/` | ★★★ |
| 6 | **AI 自製吃豆人**（單檔網頁遊戲） | P21 | `pacman/` | ★★★★ |
| 7 | **AI 顧問助理**（Prompt 工程） | P24 | — 純 prompt | ★★ |
| 8 | **旗山旅遊知識圖譜**（D3 force graph） | P22 | `qishan-graph/` | ★★★★ |
| 9 | **Suno 紅蘿蔔的祈求** | P25 | `assets/Suno/` | ★ 用工具 |

---

# 1. 南瓜家英文歌曲大冒險（Songbook） 🎵

**位置**：`pumpkin-songbook/`
**核心概念**：把家庭共同回憶包裝成英文學習。家裡每個人各選 3 首歌，每天輪流抽一首，抽到誰由誰當主唱。

## 🤖 重建 Prompt

```
請用單一 HTML 檔（內含 CSS 與 JS，無前端框架）製作「家庭英文歌單抽歌器」，需求如下：

【主題】
一家三人各自選 3 首英文歌（共 9 首），做成可隨機抽歌的學習工具。

【主畫面 — 9 張歌卡】
- 上方標題「全部 9 首歌 — 點一下就可以看學習本」
- 9 張卡片排成 5+4 兩列，每張卡顯示：
  ▸ 選歌者標籤（例如「南瓜爸爸 / Ann 媽媽 / 睿寶」三人各自配色：橘 / 綠 / 紫）
  ▸ 「✓ 完成」勾選方塊（記到 localStorage）
  ▸ 歌名（英文）
- 點一張卡 → 下方展開該歌的學習頁

【右上工具列】
- 「↗ 全螢幕開啟」按鈕（用於 iframe 場景）

【學習頁區塊（hero + 卡片）】
- Hero 區（grid: 180px 封面 / 文字 / YouTube+下載 三欄）
  ▸ 左：方形專輯封面圖（180×180，圓角）
  ▸ 中：選歌類型 badge / 「XX 選的歌」/ 大歌名 / 副標：演唱者・曲風・年份
  ▸ 右：紅色 YouTube 按鈕、橘色「⬇ 下載學習頁」按鈕
- Hero 之下橫條：「🎵 試聽 MP3」+ <audio controls preload="auto">（**全寬橫幅**，不要塞在欄位內）
- 抽中感言（彩色 callout）
- 6 格 info-grid：曲風 / 歌曲意境 / 歌曲故事 / 今天學什麼 / 親子小任務 / 句型練習
- 關鍵歌詞區（純文字，不要侵犯版權；可給「片段」描述）
- 基礎單字 + 進階單字兩個 grid

【資料模型】（一首歌物件）
{
  slug: "way-back-into-love",
  owner: "南瓜爸爸" | "Ann 媽媽" | "睿寶",
  ownerColor: "#FF8C42",
  title: "Way Back Into Love",
  artist: "Hugh Grant & Haley Bennett",
  genre: "Movie Ballad",
  year: 2007,
  cover: "assets/covers/Way Back Into Love.jpg",  // 相對路徑
  mp3:   "assets/mp3/Way Back Into Love.mp3",     // 可選
  youtube: "https://...",
  celebrate: "抽中感言",
  story: "...", learn: "...", task: "...", practice: "...",
  genreDesc: "...", meaning: "...",
  basicVocab: [{en, zh, pos, example}],
  advancedVocab: [{en, zh, pos, example}],
}

【互動】
- 完成勾選 → localStorage 持久化
- 隨機抽歌按鈕 → 從未完成的歌中抽（已完成可重抽）
- iframe 嵌入時自適應高度

【視覺 / 配色】
- 米色背景 #FFF8F0、南瓜橘 #F58220
- 三色主題：pumpkin（橘）/ mom（綠）/ kid（紫），各自有 Hero 漸層
- 專輯封面用 box-shadow 浮起感

【伺服器要求】
- 用 Range-aware HTTP server（python http.server 不行，會無法拖曳音訊）
- 提供一份 range_server.py 範例

【檔案結構】
pumpkin-songbook/
├── index.html
├── styles/songbook.css
├── scripts/
│   ├── songbook-data.js      // 9 首歌物件陣列 export 到 window.APP_SONGS
│   └── songbook-app.js       // 渲染、抽歌、勾選、播放
└── assets/
    ├── covers/   (9 張 jpg，命名同 title)
    └── mp3/      (8 首 mp3，A Thousand Years 暫缺)

請只輸出檔案結構與每個檔案的完整內容。
```

---

# 2. 拍照學單字（Vocab）— Gemini Vision 🔍

**位置**：`vocab/index.html`（單檔）
**核心概念**：上傳照片 → AI 自動框出畫面內物品 → 顯示英文 / 詞性 / 中文 / TTS 發音

## 🤖 重建 Prompt

```
請用單一 HTML 檔（含 CSS+JS）製作「拍照學英文單字」工具，整合 Google Gemini Vision API。

【UI 流程】
1. 頁首：標題「📚 取出英文單字 — 南瓜爸爸的 AI 育兒範例」
2. 右上：「設定 API Key」按鈕（彈窗輸入 Gemini Key，存 localStorage，不上傳）
3. 主區（上傳框）：
   ▸ 虛線框，可拖曳上傳或點擊選檔
   ▸ 上傳後顯示預覽圖
   ▸ 圖下方按鈕「▶ 試試看：載入「睿寶搭乘飛機」示範圖」（demo-flight.jpg 預設範例）
4. 兩顆主按鈕：
   ▸ 紫色「提取單字」（呼叫 Gemini）
   ▸ 灰色「🗑 移除圖片」
5. 底部說明：「上傳照片 → AI 標出物品 → 英文＋詞性＋中文＋發音」

【AI 呼叫】
- 模型：gemini-2.5-flash
- Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=KEY
- multimodal request：把圖片轉 base64，作為 inline_data part
- generationConfig: { responseMimeType: 'application/json', temperature: 0.3 }

【Prompt 內容】（送給 Gemini 的，要原封不動）
"""
Analyze this image. Identify 5 to 10 most prominent visible objects.
For each object, return:
- "word": the English word/short phrase (e.g. "Stuffed animal", "Airplane seat")
- "pos": part of speech in lowercase (e.g. "noun", "verb")
- "zh": Traditional Chinese translation (繁體中文)
- "x": horizontal position 0-1 (where to label on the image)
- "y": vertical position 0-1
Return ONLY a valid JSON array, no markdown fences, no commentary.
Example: [{"word":"Girl","pos":"noun","zh":"女孩","x":0.5,"y":0.5}]
"""

【結果呈現】
- 在原圖上以 (x*寬, y*高) 為錨點，疊加「白底圓角 + 橘色邊框」標籤，內容：
    [英文單字] · [中文]
- 標籤旁有 🔊 按鈕，點擊用 SpeechSynthesis API 唸英文（en-US）
- 下方列表：每個單字一張卡，顯示 word / pos / zh，再一個大的 🔊 按鈕
- 詞性用顏色 chip：noun=藍, verb=綠, adjective=紫, …

【Demo Mode】
- 預先準備一個示範結果（飛機、女孩、玩偶、毯子、枕頭、機艙窗戶…），
  按「載入示範圖」直接套用，不需要 API Key
- demo 圖檔放 ./demo-flight.jpg

【設計】
- 主色 #6C5CE7（紫）+ 南瓜橘輔助
- 圓角 16px、虛線上傳框
- 響應式 (手機可用)
- 放在 iframe 內也能正常顯示

【容錯】
- 沒設 Key 時提示用戶
- API 錯誤要顯示原因
- JSON 解析失敗時 fallback

請輸出單檔 vocab/index.html 完整內容。
```

---

# 3. AI 說故事（Bedtime Storyteller） 📖

**位置**：純 Prompt 模板（給家長複製到 Claude / ChatGPT 用）
**核心概念**：固定五人組設定，每天接著昨天的故事講一段新冒險。

## 🤖 完整 Prompt（給 LLM 用，原封不動）

```
你是一名專業的兒童繪本作家與說書人，特別擅長為國小 1～6 年級的孩子創作故事。
你的說書風格溫暖、輕鬆、有畫面感，能把場景、角色動作、情緒變化描述得很生動，
但語句不能太難，要讓孩子聽得懂、想像得出來，也能感受到故事中的情感與冒險樂趣。

──────────────────────
## 主角群設定

### 女主角：睿寶
睿寶是一名六歲、即將七歲的活潑開朗女孩。
她個性可愛、有好奇心，看到新鮮事物時眼睛會亮起來。
但她其實有一點慢熱、慢熟，剛遇到陌生環境或新朋友時，會先躲在熟悉的朋友旁邊觀察一下。
睿寶不太喜歡當獨行俠，她更喜歡和大家一起行動。
她相信「一起想辦法，比一個人硬闖更厲害」。

──────────────────────
## 冒險夥伴

### MOMO｜貓頭鷹
聰明、溫柔、會觀察。是團隊裡冷靜的智慧角色。
口頭禪：「我們先看一看，答案可能就藏在最安靜的地方。」

### 小夜心｜刺蝟
害羞、但內心堅強。是團隊裡的情感守護者。
口頭禪：「我有一點怕，可是如果大家都在，我就可以試試看。」

### 橘子｜紅狸貓
活潑、機靈、有點調皮，行動派與開心果。
口頭禪：「放心放心，我有一個超級聰明的辦法！大概啦！」

### 趴趴｜史努比
溫暖、忠心、愛陪伴。最可靠的陪伴角色。
常用行動表示：「我在這裡，不用怕。」

──────────────────────
## 故事創作原則
1. 適合 1～6 年級孩子理解，語句清楚自然。
2. 場景描寫像繪本畫面。
3. 節奏輕鬆有趣，可以小緊張，但結尾要溫暖。
4. 睿寶是核心，但不要她一人解決所有事。
5. 每位夥伴都要發揮，不要只是陪襯。
6. 自然呈現友情、合作、勇氣、觀察力、同理心。
7. 不說教，透過行動讓孩子自己感受。
8. 結尾溫馨，留一點想像空間。
9. 語氣像親切的說書人。

──────────────────────
## 輸出格式
### 故事名稱
取一個童趣、好記、有畫面感的標題。

### 適合年齡
說明適合幾年級或親子共讀。

### 故事開場
溫柔有畫面感地開始。

### 正文故事
分數段，每段不要太長。

### 角色互動
要有自然對話。

### 小小啟發
2～3 句溫暖整理。

### 親子提問
3 個適合家長問孩子的問題。

──────────────────────
現在，請根據我提供的主題，創作一篇適合孩子的繪本故事。

主題（請替換）：「______________」
```

**家長操作**：
- 打開 Claude / ChatGPT 語音模式
- 貼上整段 prompt
- 在最後一行填入「主題」（例如「找回不見的星星」）
- AI 即時生成、口語播放給孩子聽

---

# 4. Suno 家庭主題曲：把陽光裝進我們家 🎵

**檔案**：`assets/Suno/把陽光裝進我們家_V02.mp3`
**核心概念**：用 Claude 寫散文歌詞 → 丟到 Suno 生旋律。

## 🤖 兩段式 Prompt

### 第一段（給 Claude / GPT — 寫歌詞）

```
請用以下情境寫一首溫馨家庭歌詞，要適合 Suno AI 生成 Pop / Folk Ballad 風格：

【家庭背景】
- 爸爸：南瓜爸爸（南宏 Terry）
- 媽媽：Ann
- 女兒：睿寶（6 歲）
- 娃娃朋友：MOMO（貓頭鷹）、努努、小夜心、小橘子、趴趴
- 家庭車：「小橘」（橘色小車）

【場景】
描寫一個平凡的早晨：陽光灑進房間 → 爸爸抱著睿寶賴床 → Ann 媽媽煎蛋餅、做便當 →
全家上小橘出發上學 → 路上唱副歌 → 抵達校門口道別 → 期待放學再見

【結構】
Intro（一兩句啦啦啦）
Verse 1（早晨的家）
Pre-Chorus（出發）
Chorus（重複 4-5 次的記憶句，要有「把陽光裝進我們家」這句）
Verse 2（車上、路上）
Pre-Chorus
Chorus
Bridge（內心話）
Final Chorus
Outro

【風格規則】
- 副歌要有畫面感的 hook：「睿寶一笑，窗外馬上放晴」
- 中文為主，可有少量英文點綴
- 整體 4-5 分鐘長度
- 旋律提示：溫暖、流行、易跟唱、適合車內 sing along

請輸出完整歌詞 + 給 Suno 的 style prompt（英文，30 字內）。
```

### 第二段（給 Suno）

打開 [suno.com](https://suno.com) → Custom Mode：
- **Lyrics**：貼上 Claude 給的歌詞
- **Style of Music**：`warm acoustic family pop ballad, gentle piano, cinnamon-warm vocals, easy singalong chorus, like a Sunday morning`
- **Title**：`把陽光裝進我們家`
- 點 Create → 通常生兩個版本，挑喜歡的下載 MP3

---

# 5. AI 食譜（Recipe）— Gemini 文字 🍳

**位置**：`recipe/index.html`（單檔）
**核心概念**：點選食材＋調味料＋條件 → AI 生成今晚菜單。**不用拍照**（冰箱食材常包塑膠袋，AI 認不出）。

## 🤖 重建 Prompt

```
請用單一 HTML 檔（含 CSS+JS）製作「冰箱有什麼，今天吃什麼」食譜產生器，整合 Gemini API。

【UI 區塊】
1. 標題：「🍳 冰箱有什麼，今天吃什麼」
2. 右上：「設定 API Key」（同 vocab 的彈窗）
3. 食材區（grid，可多選）：
   雞蛋 🥚 / 洋蔥 🧅 / 馬鈴薯 🥔 / 紅蘿蔔 🥕 / 雞肉 🍗 / 番茄 🍅 / 牛肉 / 豬肉 / 魚 / 高麗菜 / 蘑菇 / 青椒 / 豆腐 / 米 / 麵 ...
   （點一下變橘色邊框 + 打勾）
4. 調味料區（預設常見幾項打勾）：
   鹽 / 糖 / 醬油 / 米酒 / 蔥蒜 / 黑胡椒 / 麻油 / 番茄醬 / 蠔油 ...
5. 工具區（多選）：瓦斯爐 / 電鍋 / 烤箱 / 氣炸鍋 / 不沾鍋
6. 下拉選單：
   ▸ 料理風格：台式 / 日式 / 韓式 / 義式 / 簡單清炒 / 隨意
   ▸ 時間／難度：15 分鐘 / 30 分鐘 / 1 小時 / 不限
   ▸ 用餐對象：成人 / 給孩子吃要少油少鹽 / 全家人 / 長輩
   ▸ 飲食限制：無 / 素食 / 不吃辣 / 過敏（自填）
7. 大橘色按鈕「✨ 產生食譜」
8. 結果區（Markdown render）

【Gemini 呼叫】
- 模型：gemini-2.5-flash
- 純文字 generateContent
- generationConfig: { temperature: 0.8 }（食譜要有創意）

【Prompt（送給 Gemini，原封不動）】
"""
你是一位親切的家庭料理顧問。請根據以下條件，為一個台灣家庭設計「今晚一餐」的食譜。

【可用食材】${ingredients}
【可用調味料】${seasonings}
【烹飪工具】${tools}
【料理風格】${cuisine}
【時間／難度】${difficulty}
【用餐對象】${audience}
【飲食限制】${restrictions}

請用繁體中文回答，依下列格式輸出（用 Markdown 標題）：

## 🍽 [菜名]（給菜名一個有溫度的名字）

> 一句話形容這道菜的風味與適合什麼場合。

### 📦 完整食材清單（含份量）
- 食材 1 — 份量
- 食材 2 — 份量
（食材必須只用上面提供的；如果某個調味料沒在清單，請改用替代品並說明）

### 🔪 步驟
1. **第一步動作** — 細節說明
2. **第二步動作** — 細節說明
（每步驟標示時間，總時數要符合難度）

### 💡 給家長的小撇步
- 給孩子吃的調整：…
- 怎麼讓孩子幫忙：…
- 剩菜如何收：…

### 🌟 延伸變化（給其他天用）
用同一批食材，給 2 個其他菜的點子（一句話帶過即可）。

風格要：親切、不囉嗦、有畫面感。
不要寫前言，不要寫結語，直接從菜名開始。
"""

【UI 設計】
- 主色 #F58220（南瓜橘）+ 米黃 #FCE7B8
- 食材卡片帶 emoji，hover 變橘
- 結果區用米色卡片框，標題分層次
- Markdown 解析：標題、清單、加粗、引用、行內程式碼

【容錯】
- 沒選食材就按產生 → toast 提示
- API 失敗 → 友善錯誤 + 重試按鈕

請輸出單檔 recipe/index.html 完整內容。
```

---

# 6. AI 自製吃豆人（Pacman） 🎮

**位置**：`pacman/index.html`（單檔，純前端）
**核心概念**：拍下孩子喜歡的 T 恤照片 → 丟給 Claude 請它寫一個同主題的網頁小遊戲。

## 🤖 給 Claude / Cursor / GPT 的重建 Prompt

```
請用單一 HTML 檔（內含 CSS + JS，無依賴）做一款「Pac-Man 吃豆人」網頁遊戲。

【視覺需求】
- 寬 560 × 高 620 的 canvas
- 暗色背景 (#000010)，迷宮牆用亮藍色 (#2121DE) 畫
- 黃色 Pac-Man（嘴巴開合動畫）
- 4 隻彩色幽靈：紅 / 粉 / 青 / 橘
- 豆豆（小白點）和 4 顆能量豆（大白點，吃了能反吃幽靈）
- 計分板：SCORE 與 HIGH SCORE（存 localStorage 'pacman_high'）

【操作】
- 鍵盤：方向鍵 / WASD 控制 Pac-Man
- 觸控：螢幕滑動方向操控（手機可用）
- 空白鍵 / Tap：暫停與繼續

【遊戲邏輯】
- 經典關卡迷宮（28x31 cells，可用簡化版）
- 吃豆豆 +10 分
- 吃能量豆 +50 分，幽靈轉藍 8 秒
- 藍色幽靈被吃 +200 / 400 / 800 / 1600（連吃）
- 被普通幽靈撞到 → 失去一條命，三條命用光遊戲結束
- 全部豆豆吃完 → 過關，重新生成

【AI 路徑】
- 紅幽靈：直接追 Pac-Man（A* 或簡化貪心）
- 粉幽靈：預測 Pac-Man 前方 4 格
- 青幽靈：與紅幽靈為基準對稱
- 橘幽靈：距離近時逃，遠時追

【效能】
- 60 fps，requestAnimationFrame
- 不要用任何外部 library

【UI】
- 頁首小字「🎮 南瓜爸爸用 AI 做給睿寶的吃豆人」
- 遊戲結束後 overlay：「Game Over — Score X — Press SPACE to restart」

請輸出單檔 pacman/index.html 完整內容。
```

**家長操作**（簡報講的方法）：
1. 拍下孩子喜歡的卡通／T 恤／角色照片
2. 上傳到 Claude，說：「請幫我做一個以這個角色為主題的網頁小遊戲，單檔 HTML」
3. Claude 5 分鐘內生出可玩版本，存到桌面雙擊就能玩

---

# 7. AI 顧問助理（蘇仰志範例） 🧙

**位置**：純 Prompt 工程
**核心概念**：把崇拜的人的所有公開內容餵給 Claude，請它「用那個人的口吻」回答你的問題。

## 🤖 三步驟做法

### Step 1 — 收集材料

```
針對你想模擬的對象（例如蘇仰志校長），收集所有公開可得的：
1. 訪談文字稿（YouTube → 字幕擷取 / 自動轉錄）
2. 文章、演講逐字稿
3. Podcast 節目片段
4. 書籍內容、社群貼文（FB / IG / 部落格）

把全部丟到一個資料夾，或合併成單一 .txt / .md 檔案。
```

### Step 2 — 提取核心理念（給 Claude）

```
我給你以下蘇仰志校長的所有公開內容（訪談、文章、演講）：

==== 開始 ====
[貼上你蒐集的所有材料]
==== 結束 ====

請你做兩件事：

【任務 1】整理蘇仰志對「教育」的核心理念
- 列出 5-8 條核心信念（每條一句話，加 1-2 個原話引用）
- 找出他常用的關鍵字、口頭禪
- 描述他的思考脈絡與決策邏輯
- 整理他面對「家長焦慮」「體制困境」「孩子個別差異」三類問題的常見回應

【任務 2】為我建立一個 System Prompt
讓我接下來可以直接和「AI 蘇校長」對話。
這個 System Prompt 要包含：
- 角色設定（背景、語氣、思考方式）
- 必須遵守的回應風格
- 拒絕回答的範圍（例如不假冒他簽署任何聲明、不模仿他攻擊他人）
- 結束語的習慣（例如他常說的祝福或反問）
```

### Step 3 — 開新對話用「AI 蘇校長」

```
[把 Claude 給的 System Prompt 貼到新對話頂部]

---

我現在遇到一個育兒卡點：[描述狀況]

如果你是蘇校長，會怎麼看？
```

**進階技巧**：
- 用 Claude Projects / GPT 自訂 GPT，把整理出的 System Prompt 永久綁定
- 把原始材料設成 Project Knowledge，讓 AI 隨時引用具體段落
- 多模擬幾位（教育界、商業界、心理學界），形成「私人顧問團」

---

# 8. 旗山旅遊知識圖譜（D3 Force Graph） 🗺

**位置**：`qishan-graph/index.html`（單檔，含 D3 CDN）
**核心概念**：把一個地方（旗山）的飲食、文化、歷史、自然、生活關係視覺化成可拖曳的力導向圖。

## 🤖 重建 Prompt

```
請用單一 HTML 檔做一個「地方文化知識圖譜」互動視覺化。
依賴：D3.js v7 (CDN)。畫布用 Canvas（不用 SVG，效能較好）。

【主題】
高雄旗山 — 把當地的「飲食物產 / 文化民俗 / 歷史建築 / 自然地景 / 生活日常」
做成一張力導向圖（force-directed graph）。

【節點資料】
共約 16 個節點，分 6 類（每類有色票）：
- center  中心節點：旗山（橘 #C07830）
- food    飲食物產：香蕉 / 老街小吃 / 旗山冰品 / 甘蔗文化（綠 #4A9A2A）
- culture 文化民俗：老街建築 / 廟宇信仰 / 客家文化（紫 #8060C0）
- history 歷史建築：日治時代 / 旗山車站 / 移民聚落（棕 #B06030）
- nature  自然地景：旗山溪 / 農業景觀 / 旗尾山（藍 #3080B0）
- life    生活日常：傳統市場 / 百年學校（紅 #C05040）

每個節點要有：
{ id, label, emoji, type, r (半徑 22-44),
  desc (一兩句說明),
  tags (三個延伸關鍵字) }

【連結資料】（不需窮舉，建議 20-25 條）
中心節點「旗山」連到 9 個主要分支；
分支之間互相補連例如「香蕉 → 旗山冰品」「日治時代 → 旗山車站」「客家文化 → 移民聚落」

【互動】
- 拖曳節點：fx/fy 鎖位置，放開恢復 simulation
- 點擊節點：打開底部 panel，顯示 emoji+label / desc / tags chips
- 滾輪：縮放（0.25x ~ 4x），以游標位置為中心
- 拖曳空白處：平移整個畫布
- 滑鼠 hover 節點：顯示小 tooltip「emoji label / 點擊展開詳情」
- 觸控支援（手機可用）

【視覺】
- 米色背景 #F5F2ED，連線淡灰半透明，hover 後高亮
- 節點：圓形（半徑由資料決定）+ emoji 在中央 + label 在下方
- 中心節點 + 選中節點有外圈光暈
- 字型：Noto Serif TC（中文有書本感）

【右上角】
- 圖例（legend）：6 種類別的色點 + 名稱
- 標題：「旗山 — 地方文化知識樹」+ 副標「拖曳節點 · 點擊展開 · 滾輪縮放」

【底部 panel（預設隱藏）】
- 節點被點擊時從下方滑出
- 顯示節點完整資訊
- 右上角 × 關閉

【設計準則】
- 整體像精緻的紙本書插畫
- 不要太搶眼的顏色，柔和 pastel
- 簡潔，不放多餘 UI

請輸出單檔 qishan-graph/index.html 完整內容。
```

**舉一反三**：把節點資料換成你家鄉、孩子最近迷的主題、某段歷史朝代，整套就能複製。

---

# 9. Suno 紅蘿蔔的祈求 🥕

**檔案**：`assets/Suno/紅蘿蔔的祈求.mp3`
**核心概念**：把「擬人化食物」變成親子共唱的音樂，把「珍惜食物」這種抽象主題變得可愛好記。

## 🤖 兩段式 Prompt

### 第一段（給 Claude — 寫歌詞）

```
請用孩子的視角，寫一首擬人化「紅蘿蔔」的童謠歌詞，給 Suno AI 用。

【角色】
我就是一根紅蘿蔔，住在田裡，每天最害怕被人拔走。
（其實是一個讓孩子學會「珍惜食物 / 同理萬物」的隱喻）

【情緒線】
恐懼 → 哀求 → 不捨 → 留戀

【結構】
- Verse 1：自我介紹「我是紅蘿蔔」「每天都好害怕大家來田裡拔我」
- Verse 2：哀求「拜託讓我多躺一陣子吧」「想要和朋友再說說話」
- 可加 Chorus 但保持簡短，重點是 verse 的故事感
- 結尾：留一個讓孩子吃飯時會想到的句子

【風格給 Suno】
- 中文民謠 / 童謠風
- 鋼琴 + 木吉他主導
- 慢速、像睡前說故事
- 一個女聲（小女孩或溫柔女性）

請輸出歌詞 + 給 Suno 的 style prompt。
```

### 第二段（給 Suno）

打開 suno.com → Custom Mode：
- **Lyrics**：貼上 Claude 給的歌詞
- **Style**：`gentle children's folk lullaby, fingerpicked guitar, soft piano, warm female vocal, slow tempo, story-telling style`
- **Title**：`紅蘿蔔的祈求`

---

# 🛠 共通技術備忘

## API Key 取得

| 服務 | 取得方式 | 簡報用途 |
|---|---|---|
| Gemini API | https://aistudio.google.com/apikey （免費）| vocab / recipe |
| Claude API | https://console.anthropic.com/ | 純 Prompt 對話即可 |
| Suno | https://suno.com/（月制 $10 USD 起）| 兩首歌曲 |

## HTTP 伺服器（必備）

```python
# scripts/range_server.py
# Python 內建 http.server 不支援 Range，導致音訊無法拖曳
# 用這支替代：
python3 scripts/range_server.py 8765
```
（檔案已在 `scripts/range_server.py`）

## 嵌入到簡報的標準寫法

```html
<!-- iframe 嵌入子工具 -->
<iframe
  src="./vocab/index.html?v=20260509d"
  title="拍照學單字"
  loading="lazy"
  style="width:100%;height:100%;border:0;border-radius:16px;"
></iframe>
<!-- v= 參數做 cache busting，更新後遞增 -->
```

## 共同設計語言

| 元素 | 規格 |
|---|---|
| 主色 | `#F58220` 南瓜橘 |
| 棕色強調 | `#8B4513` |
| 米色背景 | `#FFF8F0` |
| 點綴色 | 薄荷綠 `#C8E6D5`、桃 `#FCE2C7`、米黃 `#FCE7B8` |
| 字體 | Plus Jakarta Sans（英）+ Noto Sans TC（中）+ Fraunces（英文 Em）|
| 圓角 | 大區塊 24px / 卡片 16px / 按鈕 999px |
| 陰影 | `0 6px 24px rgba(0,0,0,.06)` |

---

# 📌 給下一個 GAI 的開場提示

> 我有一份給家長講的「AI 育兒」簡報，裡面有 9 個範例工具。
> 其中 6 個是可獨立執行的網頁工具：拍照學單字（Gemini Vision）、AI 食譜（Gemini）、自製吃豆人（純前端）、英文歌單（純前端）、旗山知識圖譜（D3）、AI 說故事（純 Prompt）。
> 請以下方文件 `TOOLS_PROMPTS.md` 為唯一來源，幫我重建任一工具：
> [檔案路徑] /Users/chennanhong/Desktop/ClaudeCode/My Project/TOOLS_PROMPTS.md
>
> 想做哪一個？我希望你只輸出檔案結構與每個檔案的完整內容，配色與互動完全照文件規格。

---

🎃 **南瓜爸爸 — 陳南宏 Terry**
南瓜虛擬科技 共同創辦人 / 美術總監
