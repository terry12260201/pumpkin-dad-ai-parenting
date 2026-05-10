#!/usr/bin/env python3
"""Replace emoji characters in HTML with <img> tags using 3D PNG icons."""
import re

import sys
SRC = sys.argv[1] if len(sys.argv) > 1 else "/Users/chennanhong/Desktop/ClaudeCode/My Project/pumpkin-dad-ai-parenting-3d.html"

# emoji → (filename, alt)
ICON_MAP = {
    "🎃": ("icon-01-pumpkin-dad.png", "南瓜爸爸"),
    "🌸": ("icon-02-mom.png", "媽媽"),
    "👧": ("icon-03-ruibao.png", "睿寶"),
    "🦉": ("icon-04-momo-owl.png", "MOMO 貓頭鷹"),
    "🦔": ("icon-05-xiao-ye-xin-hedgehog.png", "小夜心"),
    "🦝": ("icon-06-xiao-juzi-red-panda.png", "小橘子"),
    "🐶": ("icon-07-papa-dog.png", "趴趴"),
    "🎤": ("icon-08-microphone.png", "麥克風"),
    "🏛": ("icon-09-government.png", "政府"),
    "🌏": ("icon-10-globe.png", "地球"),
    "🎨": ("icon-12-palette.png", "美術"),
    "📚": ("icon-13-books.png", "書"),
    "🎯": ("icon-14-target.png", "目標"),
    "🏠": ("icon-15-house.png", "家"),
    "🔧": ("icon-16-wrench.png", "工具"),
    "📺": ("icon-17-tv.png", "電視"),
    "🔍": ("icon-18-magnifier.png", "搜尋"),
    "💻": ("icon-19-laptop.png", "筆電"),
    "☕": ("icon-21-coffee.png", "咖啡"),
    "🚌": ("icon-22-school-bus.png", "公車"),
    "🚽": ("icon-23-toilet.png", "馬桶"),
    "🚶": ("icon-24-walking.png", "走路"),
    "✈️": ("icon-25-plane.png", "飛機"),
    "🥚": ("icon-26-egg.png", "蛋"),
    "🧅": ("icon-27-onion.png", "洋蔥"),
    "🥔": ("icon-28-potato.png", "馬鈴薯"),
    "🥕": ("icon-29-carrot.png", "紅蘿蔔"),
    "🍗": ("icon-30-chicken.png", "雞肉"),
    "🍅": ("icon-31-tomato.png", "番茄"),
    "🎵": ("icon-32-music-note.png", "音符"),
    "💎": ("icon-33-diamond.png", "Gemini"),
    "📒": ("icon-34-notebook.png", "NotebookLM"),
    "✋": ("icon-35-hand.png", "舉手"),
    "❓": ("icon-36-question.png", "問題"),
    "💡": ("icon-37-lightbulb.png", "答案"),
    "✨": ("icon-38-sparkles.png", "閃光"),
    "⏱": ("icon-39-stopwatch.png", "計時"),
    "⭐": ("icon-40-star.png", "星"),
    "✓": ("icon-41-check.png", "勾"),
    "✗": ("icon-42-cross.png", "叉"),
    "📷": ("icon-44-instagram.png", "Instagram"),
    "💬": ("icon-45-line.png", "LINE"),
    "♪": ("icon-46-music-note-alt.png", "音符"),
    # alias
    "✅": ("icon-41-check.png", "✅"),
    "🌐": ("icon-33-diamond.png", "Gemini"),
    "📸": ("icon-44-instagram.png", "拍照"),
    "🎼": ("icon-32-music-note.png", "音樂"),
}

def to_img(emoji):
    f, alt = ICON_MAP[emoji]
    return f'<img class="icon-3d" src="assets/icons-3d/{f}" alt="{alt}">'

with open(SRC, "r", encoding="utf-8") as fp:
    html = fp.read()

# inject CSS once before </style> closing of first big style block
css_inject = """
/* === 3D Icon replacement === */
.icon-3d{
  display:inline-block;
  width:1em;height:1em;
  vertical-align:-.15em;
  object-fit:contain;
}
.pb-emoji .icon-3d,
.spw-icon .icon-3d,
.answer-icon .icon-3d,
.step-n .icon-3d{
  width:100%;height:100%;
  vertical-align:middle;
}
"""
# insert before the very first </style>
html = html.replace("</style>", css_inject + "</style>", 1)

# replace, longest emoji first (handles ✈️ before ✈)
for emoji in sorted(ICON_MAP.keys(), key=len, reverse=True):
    html = html.replace(emoji, to_img(emoji))

with open(SRC, "w", encoding="utf-8") as fp:
    fp.write(html)

print("✅ Done")
