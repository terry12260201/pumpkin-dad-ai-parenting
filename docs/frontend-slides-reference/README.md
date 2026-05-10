# frontend-slides Skill 參考文件

> 這些檔案**不是 skill 本身**，而是 skill 的「知識複本」，給 Codex / 任何接手代理人**參考用**。
> 原始 skill 安裝在 `~/.claude/skills/frontend-slides/`（Claude Code 專用，無法移植）。

---

## 為什麼需要這份參考？

這份簡報（`pumpkin-dad-ai-parenting.html`）是用 Anthropic 的 **frontend-slides skill** 製作的。
Skill 規定了一套「**zero-dependency 動畫豐富 HTML 簡報**」的設計原則。

如果你（或 Codex / 其他代理人）要繼續維護這個簡報，需要遵循同一套原則，
否則之後加的頁面會和現有的不協調。

---

## 文件清單

| 檔案 | 用途 |
|---|---|
| [`SKILL.md`](SKILL.md) | Skill 主規範（Phase 0–6 工作流程、設計原則） |
| [`viewport-base.css`](viewport-base.css) | **必須遵守的響應式 CSS**（已內嵌在主簡報） |
| [`html-template.md`](html-template.md) | HTML 結構與 JS 功能規範 |
| [`animation-patterns.md`](animation-patterns.md) | 動畫片段與情緒對應 |
| [`STYLE_PRESETS.md`](STYLE_PRESETS.md) | 12 個視覺風格預設 |
| [`README-original.md`](README-original.md) | Skill 原始 README |

---

## 對這個專案來說最重要的三條原則

### 1. Viewport Fitting（不可協商）

每張投影片必須在 100vh 內完整呈現，**不能滾動**。內容多就拆成兩頁。
- 所有尺寸用 `clamp(min, preferred, max)`
- 圖片 `max-height: min(50vh, 400px)`
- `.slide` 必須有 `overflow: hidden`

### 2. 內容密度上限

| 投影片類型 | 上限 |
|---|---|
| 標題頁 | 1 標題 + 1 副標 + 可選 tagline |
| 內容頁 | 1 標題 + 4-6 個 bullet **或** 1 標題 + 2 段落 |
| Feature 網格 | 1 標題 + 6 張卡片（2×3 或 3×2） |
| 程式碼頁 | 1 標題 + 8-10 行程式碼 |
| 引言頁 | 1 引言（最多 3 行）+ 出處 |
| 圖片頁 | 1 標題 + 1 張圖（max 60vh） |

**超過上限 → 拆頁，不能塞。**

### 3. 不要走「AI slop」風格

避免：
- ❌ 過用 Inter / Roboto / Arial / 系統字
- ❌ 紫色漸層配白底（被用爛了）
- ❌ 可預測的版面與元件
- ❌ 缺乏脈絡的萬用設計

要做：
- ✅ 獨特、有書卷氣的字體（如本專案用的 Fraunces）
- ✅ 提交一致的審美主張
- ✅ 高衝擊力的單一動畫時刻（staggered reveal），勝過散落的微互動
- ✅ 用漸層、幾何、紋理建立氛圍

---

## 本專案的設計選擇（已遵守 skill）

| 規範項 | 本專案實作 |
|---|---|
| Viewport fitting | ✅ 全頁 100vh，`overflow:hidden`，clamp() |
| 不用系統字 | ✅ Fraunces（標題）+ Work Sans（內文） |
| 不用紫色漸層 | ✅ 暖米色 + 咖啡棕 |
| 動畫聚焦進場 | ✅ `.rv` staggered reveal |
| 內容密度 | ✅ 多數頁 ≤ 6 個 bullet 或 1 標題 + 2 段 |
| 直角邊框 | ✅ `border-radius:0` 全頁一致 |

詳細視覺規範看 [`../DESIGN.md`](../DESIGN.md)。

---

## 如果你（Codex）要新增頁面

1. 先讀 [`SKILL.md`](SKILL.md) 的 Phase 3「Generate Presentation」段落
2. 先讀 [`viewport-base.css`](viewport-base.css)，理解必備的響應式 CSS
3. 對照 [`../DESIGN.md`](../DESIGN.md) 看本專案的具體選擇
4. 對照 [`../SLIDES.md`](../SLIDES.md) 看現有 30 頁的內容結構
5. 動手前先在腦中跑過：「這頁在 1280×720 顯示會不會爆？」

---

## 為什麼把這些檔案放進專案？

因為：
- **Skill 在你個人 Claude 帳號下，Codex 拿不到**
- **這份簡報的設計依據必須能離開 Claude 還能傳承**
- **任何接手代理人都能直接讀 markdown，不需要 Skill 機制**

如果你以後想完整還原 skill：
```bash
# 複製回 Claude Code skill 路徑
cp -r docs/frontend-slides-reference/ ~/.claude/skills/frontend-slides/
# 可能需要補一些 skill 特有的 metadata，但核心知識都在
```

但日常維護**不需要**還原 skill，直接讀這份參考即可。
