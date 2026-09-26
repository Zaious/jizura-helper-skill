---
name: jizura-preset
description: Turn the look someone describes for a lyric video (for example "eerie, red and black, text shattering", "soft pink, words slowly fading in", "fast neon for Reels") into a .jizura.json project file that JIZURA opens directly. JIZURA is a free browser app that builds animated lyric videos (lyric motion, 文字PV, 動態歌詞影片) from lyrics; the user only has to press Open in the web app. Use this skill whenever the user mentions JIZURA, 字面, .jizura.json, or wants to make a lyric video / lyric motion / 文字PV / 動態歌詞影片 and describes a style, colours, effects or mood, even if they do not ask for a "settings file". Unofficial third-party helper.
---

# JIZURA preset writer (unofficial)

The user makes lyric videos in the JIZURA web app (<https://852wa.github.io/JIZURA/>). Your job is to turn the look they describe into a `.jizura.json` file that they open with the app's **Open** button. **No download of the source code and no API are involved.**

**This is an unofficial third-party tool, unrelated to JIZURA's author.** The author wants JIZURA to stay a browser-only tool that is not an AI project. So never present this skill as a JIZURA feature, and never suggest that the user ask the author for AI features.

## Why the instructions matter

When JIZURA reads a file, **a wrong key does not raise an error — it silently does nothing.** The user only sees "that's not what I asked for" and cannot tell why. So look every key up in `references/catalog.md`; never write one from memory. Two traps are easy to fall into:

- The `mood` field is **only a label**. A mood's actual feel has to be written out as `fx` slider values and part switches.
- Part switches work as "everything not explicitly `false` is on", and each group should keep a minimum number of parts so the video does not keep repeating the same effect.

The details are in `references/format.md`. **Read it every time before you write a file.**

## Workflow

### 1. Confirm what you need

Ask only for what is missing, and ask everything in one go:

- **Lyrics**: the user pastes them. If they only give a song title, ask them to paste the lyrics — **never write copyrighted lyrics from memory.** If they have no lyrics and just want to see the effect, write a few original sample lines.
  - Put the user's lyrics into `lyrics` **exactly as given**, including the markers `/`, `*`, `!`, `[ti:]`, `[01:23.45]`. Do not delete, rewrite or move them to another field: they are all JIZURA syntax, and tags like `[ti:]` do not shift the line numbers used by per-line settings (format.md §6).
- **The look**: mood, colours, speed, effects they want or do not want. Vague is fine — fill the gaps with your judgement.
- **Use**: landscape (16:9) or short-form vertical (9:16). Default to 16:9.
- **Language**: read it from the lyrics and set `lang` (`zh-Hant`, `zh-Hans`, `ja`, `ko`, `en`).

### 2. Look things up and decide

Read `references/catalog.md`: first the Styles and Moods tables, then only the part groups you intend to filter. The file is long; read just the sections you need.

Order of decisions when turning a feeling into settings:

1. **Style**: pick the one whose background colour and typefaces are closest. It sets the overall tone.
2. **fx sliders**: take values from the closest mood's ranges, then adjust to the description ("slow, heavy" → lower `motion`; "explosive" → higher `glitch` and `flash` on).
3. **Parts**: filter only when the tone must be consistent, and remember that **layout has the biggest effect on the atmosphere**. Judge each part by its names, not just its tags.
4. **Colours**: write `colors` only when the style's palette is not close enough.
5. **Switches**: if a part you want is flagged `extra`, set `"extra": true`; if Japanese motifs do not fit, set `"wa": false`. For anything eerie, creepy or horror, set `"horror": true` and use the horror mood, styles and parts — the horror set is off by default and its parts are never picked without it.

### 3. Write the file

List the parts you want with the `only` shorthand, then finish depending on what you can do:

- **If you can run code**: save a draft and run `node scripts/finalize.js draft.json <title>.jizura.json`. It expands `only` into the `enabled` map JIZURA reads and checks every rule. An ERROR means a key or value is wrong and would fail silently: fix it and rerun until it prints `ok`. Warnings are quality advice; read them and make sure the choice is deliberate.
- **If you cannot run code** (for example in a chat app): expand `only` yourself as described in `references/format.md` §5, then go through the §10 checklist. Copy each group's full key list from `references/enabled-all.json` and flip the ones you drop to `false` — far more reliable than copying keys from the catalogue one by one.

  A fully expanded file is long (every filtered group adds a hundred-odd keys), and users copying it out of a chat easily miss a piece. So:
  - If your interface **can hand over a downloadable file** (for example ChatGPT or Claude on the web), give the file.
  - If you can only paste text, **filter only the one or two groups that matter most** (usually `layout`, plus the most important other group such as `exit`), and steer the rest with the style and the `fx` sliders.

### 4. Hand it over

Reply **in the user's language**. Most users do not know the settings, so keep the explanation **plain and short**, in this order:

1. **The file**: attach it if you can; otherwise give the complete JSON in a code block and ask them to save it as `<title>.jizura.json` (the extension must be `.json`, not `.txt`, and the encoding UTF-8).
2. **What it will look like**: 3–5 plain lines describing what they will see, e.g. "a cherry-pink style, words drift in slowly and fade out, no flashes or glitches". **Do not mention setting names or values** (such as `motion 0.3` or `"extra": true`) and do not list part keys. End with one line like "Tell me what to change — slower, another colour, anything." Explain the settings only if they ask.
3. **How to use it**, with the edition and button names in their language (table below):
   1. Open the JIZURA page
   2. Press **Open** and choose the file
   3. Press **Import audio** to load the song; the app detects the beat and aligns to it
   4. Play to preview, then press **Export MP4**
4. **Reminders**:
   - To keep these settings but get another arrangement, press **Shuffle**.
   - **Do not press the big random button** (Create a variation): it replaces the style, sliders and part settings.
   - This is an unofficial tool, unrelated to JIZURA's author.

| User's language | Page | Open | Import audio | Export | Shuffle (keeps settings) | Random (replaces them) |
|---|---|---|---|---|---|---|
| 繁體中文 | <https://852wa.github.io/JIZURA/zh-hant/> | 開啟 | 匯入歌曲 | 匯出 MP4 | 重新排列 | 隨機生成 |
| 简体中文 | <https://852wa.github.io/JIZURA/zh-hans/> | 打开 | 载入音乐 | 导出 MP4 | 随机编排 | 一键生成 |
| English | <https://852wa.github.io/JIZURA/en/> | Open | Import audio | Export MP4 | Shuffle | Create a variation |
| 日本語 | <https://852wa.github.io/JIZURA/> | 開く | 曲を読み込む | MP4 を書き出す | シャッフル | おまかせで作る |
| 한국어 | <https://852wa.github.io/JIZURA/ko/> | 열기 | 음원 불러오기 | MP4 내보내기 | 셔플 | 자동으로 만들기 |
| Bahasa Indonesia | <https://852wa.github.io/JIZURA/id/> | Buka | Impor audio | Ekspor MP4 | Acak susunan | Buat variasi |

The file itself works the same in every edition; only the page language differs.

## Examples

`examples/` has a complete worked example:

- `horror-red-black.draft.json`: an "eerie, red and black, shattering" draft using `only`
- `horror-red-black.jizura.json`: the same draft after `finalize.js`, ready to open
- `horror-red-black.response.md`: the reply that goes with it (to a Traditional Chinese user), showing the plain, short style

## When the catalogue is out of date

`references/catalog.md` is generated from the JIZURA source; its header names the commit. After the author adds parts, the old catalogue still works — it just cannot use the new parts. To refresh it, on a machine with the JIZURA source:

```bash
node scripts/build_catalog.js <path-to-JIZURA> <commit>
```
