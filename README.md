# jizura-preset（非官方）

用一句話描述你想要的感覺，讓 AI 幫你產生 [JIZURA](https://github.com/852wa/JIZURA) 的設定檔。

> **這是非官方的第三方工具，和 JIZURA 及其作者沒有任何關係。** JIZURA 是一個不使用 AI、只靠瀏覽器運作的動態歌詞影片工具。這個專案只是幫你的 AI 助理看懂 JIZURA 的設定檔格式，JIZURA 本身完全沒有被修改。遇到問題請回報到這裡，不要去打擾 JIZURA 的作者。

![「陰森、紅黑、破碎」範例的畫面](examples/horror-red-black.preview.jpg)

## 怎麼用

1. 把這個 skill 交給你的 AI（方法見下一節）。
2. 告訴它你的歌詞和想要的感覺，例如「陰森、紅黑色、字會碎掉，做成直式短影音」。
3. AI 會產生一個 `.jizura.json` 檔案。
4. 打開 JIZURA 繁中版 <https://852wa.github.io/JIZURA/zh-hant/>，按「**開啟**」選這個檔案，再按「**匯入歌曲**」載入音樂，播放確認後按「**匯出 MP4**」。

想在保留這套設定的前提下換一種編排，按「重新排列」；「隨機生成」會把所有設定換掉。

## 交給不同的 AI

| AI | 做法 |
|---|---|
| Claude（claude.ai、Claude Code） | 把整個資料夾當作 skill 安裝。Claude Code 放在 `~/.claude/skills/jizura-preset/` |
| ChatGPT | 建立自訂 GPT，把 `SKILL.md`、`references/format.md`、`references/catalog.md` 上傳為知識檔，並把 `SKILL.md` 的內容貼進指示欄 |
| 其他 AI | 在對話開頭依序貼上 `SKILL.md`、`references/format.md`，再貼 `references/catalog.md` 裡需要的段落 |

能執行程式的 AI（例如 Claude Code）會自動用 `scripts/finalize.js` 檢查設定檔。在聊天介面裡的 AI 無法執行程式，會照 `format.md` 的檢查清單自己核對。

## 內容

```
SKILL.md                  給 AI 看的主要說明
references/format.md      .jizura.json 的格式與規則
references/catalog.md     風格、氛圍、字型、707 個零件的代號與中文名（自動產生）
references/catalog.json   同上，給程式用
references/enabled-all.json  每類零件的完整代號清單，讓不能執行程式的 AI 複製後修改
scripts/finalize.js       展開 only 簡寫、檢查設定檔（node）
scripts/build_catalog.js  從 JIZURA 原始碼重新產生目錄（node）
examples/                 範例：陰森、紅黑、破碎
```

## 更新目錄

JIZURA 新增零件後，拿最新的 JIZURA 原始碼重新產生：

```bash
git clone https://github.com/852wa/JIZURA.git
node scripts/build_catalog.js JIZURA $(git -C JIZURA rev-parse --short HEAD)
```

## 授權

本專案的程式與說明採用 MIT License。

`references/catalog.md` 和 `references/catalog.json` 裡的零件、風格、字型名稱與設定值，是從 JIZURA 原始碼整理出來的：

> JIZURA — Copyright (c) 2026 hakoniwa — MIT License — <https://github.com/852wa/JIZURA>
