# 🚀 把「提示詞整理」網頁發佈到網路上

把 `tools-prompts.html` 變成一個**對外公開的網址**，分享給壽山國小家長。

---

## 📦 你需要上傳的檔案（只有 2 個）

```
tools-prompts.html          ← 主頁面
assets/agents-data.js        ← 20 位代理人資料
```

那是讓網頁能跑的最小組合。其他資料夾（vocab/recipe/pumpkin-songbook 等）**不用上傳**，因為這份 prompt 整理頁完全自包含。

---

## 🥇 推薦方案 1：GitHub Pages（最常用、永久免費）

**優點**：免費、無流量限制、有版本歷史、改完直接更新
**缺點**：需要先註冊 GitHub 帳號、第一次設定要 5 分鐘

### Step 1：註冊 GitHub
- 到 https://github.com 註冊免費帳號（用你的 email 即可）

### Step 2：建立新 Repo
1. 右上角「+」→「New repository」
2. **Repository name**：`pumpkin-dad-prompts`（這會變成網址的一部分）
3. 勾選「**Public**」（要公開才能用 GitHub Pages 免費）
4. 勾選「**Add a README file**」
5. 點「Create repository」

### Step 3：上傳檔案
1. 進到剛建的 repo 頁面
2. 點「**Add file**」→「**Upload files**」
3. **拖曳** `tools-prompts.html` 進去
4. 點「**Add file**」→「**Create new file**」
5. **檔名輸入**：`assets/agents-data.js` （注意要含 `assets/` 前綴，GitHub 會自動建資料夾）
6. **內容**：把你電腦上 `assets/agents-data.js` 的全部內容貼進去
7. 拉到頁面最下面，點「**Commit changes**」

### Step 4：把 `tools-prompts.html` 改名成 `index.html`
這樣網址會更乾淨（不用打 `/tools-prompts.html`）。
1. 點 `tools-prompts.html` 檔案
2. 點右上鉛筆「Edit」（或 `.` 鍵打開編輯器）
3. 上方檔名欄位改成 `index.html`
4. Commit

### Step 5：啟用 GitHub Pages
1. Repo 上方「**Settings**」分頁
2. 左邊選單「**Pages**」
3. 「Build and deployment」區塊：
   - Source 選 「**Deploy from a branch**」
   - Branch 選 「**main**」、Folder 選「**/ (root)**」
4. 點「Save」

### Step 6：等 1-2 分鐘 → 拿到網址
- 過 1-2 分鐘後重整 Pages 設定頁，最上方會顯示：
- **`https://你的帳號.github.io/pumpkin-dad-prompts/`**

把這條網址貼到家長 LINE / FB 群組就行。

### Step 7：之後要更新
直接在 GitHub 網頁上點檔案 → 編輯 → Commit，幾秒後網址就會更新。

---

## 🥈 方案 2：Netlify（拖拉就上線、最快）

**優點**：完全不用會 Git，把整個資料夾拖進瀏覽器就上線
**缺點**：免費版有流量上限（100GB/月，給家長分享絕對夠）

### 步驟
1. 到 https://app.netlify.com/drop
2. 把含有 `tools-prompts.html` + `assets/` 的資料夾**直接拖進網頁**
3. 等 30 秒 → 拿到網址（例如 `https://random-name-12345.netlify.app`）
4. 想換好記名字：登入 → Site settings → Change site name
5. 改完變成 `https://pumpkin-dad-prompts.netlify.app`

要更新就再拖一次即可。

---

## 🥉 方案 3：Cloudflare Pages（最快、CDN 全球）

**優點**：載入速度全球最快、免費無限流量
**缺點**：要綁信用卡（不會被收費，只是註冊驗證）

### 步驟
1. 註冊 https://pages.cloudflare.com
2. 「Upload assets」直接上傳資料夾
3. 拿到 `https://pumpkin-dad-prompts.pages.dev`

---

## 🎯 強烈推薦：GitHub Pages

對你這場景（壽山國小家長、不會大流量、要長期可改），GitHub Pages 是最佳選擇：
- ✅ 完全免費永久
- ✅ 改完直接生效
- ✅ 有版本記錄（哪天改壞可以還原）
- ✅ 之後其他簡報也能放（一個 repo = 一個網站）

---

## 💡 進階：綁定自己的網域（可選）

如果你有自己的網域（例如 `pumpkindad.com`），可以綁到 GitHub Pages：
1. Repo Settings → Pages → Custom domain 輸入你的網域
2. 到網域商（Namecheap / Cloudflare / Google Domains）設 CNAME 指向 `你的帳號.github.io`
3. 之後網址就變 `https://pumpkindad.com/prompts/`

---

## 📋 上傳前檢查清單

- [ ] `tools-prompts.html` 存在
- [ ] `assets/agents-data.js` 存在（裡面有 20 位代理人資料）
- [ ] 開瀏覽器在本地打開 `tools-prompts.html` 確認沒壞
- [ ] 點任一個「⧉ 複製」按鈕測試會跳「✓ 已複製」
- [ ] 切換 20 位代理人的「全部 / 學習 / 情緒...」分類能正常過濾

---

## 📌 上傳後分享範本（給家長 LINE / FB 用）

```
🎃 南瓜爸爸 AI 育兒講座 — 提示詞整理

謝謝大家來壽山國小聽講座！
講座中示範的 9 個工具 + 20 位親子 AI 代理人，
全部整理在這個網頁，可以直接複製 Prompt 回家用：

👉 https://你的帳號.github.io/pumpkin-dad-prompts/

有任何問題歡迎私訊問我 🍊
```

---

🎃 **南瓜爸爸 — 陳南宏 Terry**
