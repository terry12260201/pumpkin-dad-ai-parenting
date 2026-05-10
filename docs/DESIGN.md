# Design System

> 整份簡報的視覺語言、動態、互動規範。
> 任何 UI 修改都要遵循這份規範。

---

## 設計氣質

> **像是一位 35 歲的爸爸，週末早上在自家陽台，一邊喝著手沖咖啡，一邊用筆記本把這幾年的學習整理給朋友聽。**

- 不是矽谷新創 deck（太酷）
- 不是企業簡報（太硬）
- 不是社群貼文（太快）
- 是「**有點復古的雜誌專欄 + 真實的家庭日常 + 紮實的工具示範**」

---

## 色彩 Palette

主簡報用 cream / brown 編輯誌調：

```css
:root {
  --bg:          #f5f3ee;        /* 整片底色 — 暖米白，像老書頁 */
  --text:        #1a1a1a;        /* 主文字 — 接近黑但不死黑 */
  --text-sub:    #555048;        /* 副文字 — 暖灰 */
  --text-muted:  #8a847c;        /* 標籤、提示 — 淡灰褐 */
  --brown:       #5a4a3a;        /* 主強調色 — 咖啡棕 */
  --rust:        #a0522d;        /* 互動 hover — 紅棕（鏽橘）*/
  --warm:        #e8d4c0;        /* 暖卡片背景 — 杏色 */
  --border:      rgba(26,26,26,0.13);
  --border-md:   rgba(26,26,26,0.22);
}
```

工具子網頁刻意使用差異化色：

| 工具 | 主色 | 為什麼 |
|---|---|---|
| `vocab/` | 紫色 `#6366f1` | Gemini 品牌風 |
| `recipe/` | 暖橘 `#c2410c` | 料理感 |

---

## 字體

```css
--font-d: 'Fraunces', serif;       /* 標題 — 義大利體斜體有書卷感 */
--font-b: 'Work Sans', sans-serif; /* 內文 — 乾淨、現代、好讀 */
```

**禁止使用**：Inter, Roboto, Arial, system-ui, 思源宋, 思源黑

### 字級階層

```css
.t-h1       { font: 900 clamp(2.4rem,5.5vw,5rem)/1     var(--font-d); letter-spacing:-.03em; }
.t-h2       { font: 900 clamp(1.6rem,3.5vw,3rem)/1.05  var(--font-d); letter-spacing:-.02em; }
.t-h3       { font: 700 clamp(1rem,2vw,1.6rem)/1.2     var(--font-d); }
.t-body     { font: 300 clamp(.8rem,1.4vw,1.05rem)/1.7 var(--font-b); max-width:64ch; }
.t-italic   { font: italic 700 clamp(1rem,2vw,1.7rem)/1.4 var(--font-d); color:var(--brown); }
.t-eyebrow  { font: 600 clamp(.55rem,.9vw,.7rem)/1     var(--font-b);
              letter-spacing:.28em; text-transform:uppercase; color:var(--text-muted); }
.t-small    { font: 400 clamp(.65rem,1vw,.82rem)/1.5   var(--font-b); color:var(--text-muted); }
```

`em` 在 h1/h2 內變成棕色斜體（用來強調關鍵字）：
```css
.t-h1 em { font-style:italic; font-weight:700; color:var(--brown); }
```

---

## 排版規範

### Viewport Fitting（**不可協商**）

- 每張 `.slide` 必須 `height:100vh; height:100dvh; overflow:hidden;`
- **所有尺寸用 `clamp(min, preferred, max)`**，禁止固定 px / rem
- 圖片 `max-height: min(50vh, 400px)`
- 內容多到爆 → 拆兩頁，**不准滾動**

### 間距 Tokens

```css
.gap-s  { gap:clamp(6px,1.2vh,12px); }
.gap-m  { gap:clamp(12px,2vh,22px); }
.gap-l  { gap:clamp(18px,3vh,32px); }
```

頁面內邊距：`clamp(1.6rem, 4.5vw, 4.5rem)`

### 容器寬度

| 類型 | 寬度 |
|---|---|
| 標準頁 | `min(88vw, 900px)` |
| 大型工具 / iframe 頁 | `96vw` |
| 投票頁置中元素 | `min(88vw, 820px)` |

### Breakpoints（為 1280×720 / 1080p / 4K 適配）

```css
@media(max-height:700px) { /* 縮小標題、內邊距 */ }
@media(max-height:600px) { /* 隱藏 nav dots、更緊湊 */ }
@media(max-height:500px) { /* 極小螢幕 fallback */ }
@media(prefers-reduced-motion:reduce) { /* 動畫降速 */ }
```

---

## 邊角與裝飾

- **全部直角** `border-radius:0`（編輯誌風格，不要圓角的 SaaS 感）
- 卡片用 `1.5px` 實線邊框
- box 左上有 3px 棕色短線當「胎記」
  ```css
  .box::before {
    content:''; display:block;
    width:clamp(24px,4vw,40px); height:3px;
    background:var(--brown); margin-bottom:clamp(8px,1.2vh,14px);
  }
  ```
- `.box-accent` 用棕色邊（強調）
- `.tag` 大寫字距 .18em，淡邊框，不填色

### Geometry 裝飾

頁面角落淡圓圈當留白節奏：

```css
.geo {
  position:absolute; border-radius:50%;
  border:1px solid var(--border);
  pointer-events:none;
}
.geo-lg { width:clamp(260px,36vw,480px); height:相同; }
.geo-md { width:clamp(180px,26vw,340px); height:相同; }
.geo-sm { width:clamp(100px,16vw,200px); height:相同; }
```

位置：`pos-tr / pos-bl / pos-tl / pos-br / pos-cr / pos-cl`，opacity .28-.45 讓它淡淡的。

細點和細線：
```css
.geo-dot     { 5×5 棕色圓點 }
.geo-line-h  { 漸層淡水平線 }
.geo-line-v  { 漸層淡垂直線 }
```

---

## 動態（Motion）

### 設計哲學

> **每張投影片進場一次，元素由下方淡入（18px translateY），時序錯開（每個 +.10s）。沒有飛舞、沒有閃爍，只有沉著的「東西到位了」感。**

### 動畫 Tokens

```css
--ease: cubic-bezier(0.16, 1, 0.3, 1);   /* 自然減速，不彈跳 */
duration: .65s（進場）/ .5s（揭曉）/ .25s（hover）
```

### Reveal 系統

```css
.rv {
  opacity:0; transform:translateY(18px);
  transition:opacity .65s var(--ease), transform .65s var(--ease);
}
.slide.in .rv { opacity:1; transform:none; }

/* 時序錯開 */
.rv:nth-child(1) { transition-delay:.05s }
.rv:nth-child(2) { transition-delay:.15s }
.rv:nth-child(3) { transition-delay:.25s }
/* ... 一直到 .55s */
```

點擊逐一揭曉：
```css
.rv-click {
  opacity:0; transform:translateY(14px);
  transition:opacity .5s var(--ease), transform .5s var(--ease);
  pointer-events:none;
}
.rv-click.shown { opacity:1; transform:none; pointer-events:auto; }
```

### 進階動畫

- **數字計數器**：1.4s easeOutCubic（`1 - Math.pow(1-prog, 3)`）
- **投票按鈕**：點擊後填棕變白字、emoji `transform:scale(1.2)`
- **揭曉答案**：`scale(.96) → scale(1)` + opacity 0→1
- **粒子**：3 個投票頁背景，6-12 個小棕點，緩緩往上飄（120vh）
- **互動 hover**：所有按鈕 `.25s ease-in-out`

### 不要做的事

- ❌ 不要用 spin / bounce / shake / wobble
- ❌ 不要循環動畫（除了背景粒子和 click hint blink）
- ❌ 不要 stagger 超過 6 個元素（會等太久）

---

## 互動元件目錄

### 1. Reveal（進場淡入）
所有 `.rv` 元素，翻頁時觸發。

### 2. Click-Reveal（點擊逐一揭曉）
```html
<section data-clickreveal="true">
  <ul>
    <li class="rv-click">第一個</li>
    <li class="rv-click">第二個</li>
  </ul>
</section>
```
按空白鍵或滑鼠左鍵 → 下一個顯示，全部顯示後才允許翻頁。

### 3. 數字計數器
```html
<div class="count-display" data-target="200" data-from="0">0</div>
```
進入頁面時觸發。

### 4. 投票（Poll）
```html
<button class="poll-btn" onclick="pickPoll(this,'sN')">
  <span class="pb-emoji">🎵</span>
  選項文字
</button>
<button class="reveal-btn" onclick="revealAnswer('sN')">揭曉 ▶</button>
<div class="poll-answer" id="ans-sN">...</div>
```

### 5. 舉手計數器
```html
<button class="hc-btn" onclick="changeCount(-1)">−</button>
<div class="hc-num" id="hcNum">0</div>
<button class="hc-btn" onclick="changeCount(1)">+</button>
```

### 6. 迷思卡片
```html
<div class="myth-card" data-myth-q="..." data-myth-a="...">
  <span class="myth-q-t">問題</span>
  <span class="myth-a-t">答案</span>
</div>
```

### 7. 工具 iframe
```html
<div class="tool-frame-wrap">
  <a class="tool-open-btn" href="./tool/index.html" target="_blank">↗ 全螢幕開啟</a>
  <iframe src="./tool/index.html" loading="lazy"></iframe>
</div>
```

### 8. 講者備註
```html
<aside class="notes" data-slide="N">
  講者要講的話，可以用 <strong> 強調。
</aside>
```
按 S 鍵浮動面板從底部滑入，按 Esc 關閉。

### 9. 可滾動容器
```html
<div data-scroll-zone="true" style="overflow-y:auto;max-height:32vh;">
  ...
</div>
```
**沒加 `data-scroll-zone="true"` 會被翻頁攔截！**

---

## 全域 UI

### 進度條
```css
#pbar { 頁面頂端 2px 棕色，隨翻頁延伸 }
```

### 頁碼
```html
<div class="snum">01 / 30</div>
```
左下角小字，淡灰褐。

### 鍵盤提示
```html
<div class="kbhint">← → 換頁 · S 講者備註</div>
```
右下角小字，僅標題頁顯示。

### 點導覽
```html
<nav id="ndots"></nav>
```
右側中軸 30 個 5×5 點，當前頁變棕色 scale 1.5×。

---

## 講者備註面板

```css
#notes-panel {
  position:fixed; left/right/bottom:0;
  background:rgba(26,26,26,.95); color:#f5f3ee;
  max-height:38vh; overflow-y:auto;
  transform:translateY(100%);
  transition:transform .35s var(--ease);
  border-top:2px solid var(--brown);
}
#notes-panel.on { transform:translateY(0); }
```

按 S → 滑入；按 S 或 Esc → 滑出。
內容自動讀取當前 slide 的 `<aside class="notes" data-slide="N">`。

---

## 編輯模式（隱藏功能）

按 E 或滑鼠移到左上角 80×80px：
- 所有 `[contenteditable]` 元素邊框變橘色虛線
- 點擊文字 → 直接編輯
- Ctrl+S → 匯出修改後的 HTML 檔
- E / Esc → 退出

```css
body.edit [contenteditable] {
  outline:2px dashed rgba(160,82,45,.35);
}
body.edit [contenteditable]:focus {
  outline:2px solid var(--rust);
  background:rgba(255,255,255,.55);
}
```

---

## 子工具設計差異化

### `vocab/` — 紫色 Gemini 風
```css
--primary:   #6366f1;
--primary-dk:#4f46e5;
--accent:    #ede9fe;
```
字體：Inter + Noto Sans TC
氣質：乾淨、AI 感、現代

### `recipe/` — 暖橘料理風
```css
--primary:   #c2410c;
--primary-dk:#9a3412;
--accent:    #fed7aa;
--bg:        linear-gradient(135deg, #fff8f1, #fef3e2);
```
字體：Inter + Noto Sans TC
氣質：溫暖、家庭、料理

### `pumpkin-songbook/` — 橘紅漸層
（獨立維護，已存在）

### `pacman/` — 黑底經典
（獨立維護，已存在）

---

## 視覺檢核清單

每次改完 UI，跑一遍：

- [ ] 1280×720 畫面所有頁完整顯示，無滾動
- [ ] 1920×1080 畫面文字不會太小
- [ ] 投影片轉場順暢（按 ←→ / 滾輪）
- [ ] 講者備註可開可關（S 鍵）
- [ ] 浮動點導覽當前頁高亮正確
- [ ] 進度條跟著翻頁
- [ ] iframe 在 P15/16/19/20 都載入
- [ ] 計數器在 P3/P7/P9 動起來
- [ ] 投票在 P4/P10/P25 可點
- [ ] 點擊揭曉在 P11/P13/P22/P26 可逐項展開
- [ ] 字體載入（不應該看到 fallback Times New Roman）
- [ ] 所有圖片無破圖
