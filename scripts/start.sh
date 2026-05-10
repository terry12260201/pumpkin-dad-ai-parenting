#!/usr/bin/env bash
# scripts/start.sh — 啟動本機 server，開瀏覽器看簡報
# 用法： bash scripts/start.sh

set -e

PORT="${PORT:-8080}"
HTML="pumpkin-dad-ai-parenting.html"

# 切到專案根目錄（不論在哪呼叫）
cd "$(dirname "$0")/.."

# 檢查主簡報檔
if [ ! -f "$HTML" ]; then
  echo "❌ 找不到 $HTML — 請在專案根目錄執行"
  exit 1
fi

# 檢查 port 是否被佔用
if lsof -nP -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; then
  echo "ℹ️  Port $PORT 已有服務在跑（可能上次沒關）"
  echo "   → 直接開瀏覽器：http://localhost:$PORT/$HTML"
  open "http://localhost:$PORT/$HTML" 2>/dev/null || true
  exit 0
fi

# 啟動 server
echo "🚀 在 port $PORT 啟動 server..."
echo "   專案目錄：$(pwd)"
echo ""
echo "📺 簡報網址：http://localhost:$PORT/$HTML"
echo "🛑 按 Ctrl+C 結束"
echo ""

# 自動開瀏覽器（macOS）
( sleep 0.8 && open "http://localhost:$PORT/$HTML" 2>/dev/null ) &

# 啟動 Python http server
python3 -m http.server "$PORT"
