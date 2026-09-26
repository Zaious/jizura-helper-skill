# The `.jizura.json` format

When the JIZURA web app opens this file, it starts from its defaults and then applies the fields in the file. So **write only the fields you want to change**; everything else keeps its default. Unknown fields and part keys are ignored and never break the page.

Every part, style and font key is listed in `catalog.md`. **Never invent a key**: a wrong key raises no error, it just silently does nothing, and the user cannot tell why.

## Contents

1. [A complete example](#1-a-complete-example)
2. [Lyrics](#2-lyrics)
3. [Basic fields](#3-basic-fields)
4. [fx sliders](#4-fx-sliders)
5. [Part switches: enabled / only](#5-part-switches-enabled--only)
6. [Per-line settings: overrides](#6-per-line-settings-overrides)
7. [Colours](#7-colours)
8. [Fonts](#8-fonts)
9. [Timing](#9-timing)
10. [Checklist before handing it over](#10-checklist-before-handing-it-over)

## 1. A complete example

```json
{
  "title": "紅線",
  "artist": "",
  "lyrics": "走廊的燈/又熄了一盞\n牆上的影子不是我的\n*紅線*纏住了手腕\n整座城都在崩塌!",
  "lang": "zh-Hant",
  "style": "crimson",
  "mood": "glitch",
  "extra": true,
  "wa": false,
  "seed": 6660,
  "aspect": "16:9",
  "fx": { "motion": 0.45, "glitch": 1, "chroma": 0.9, "decor": 0.3, "density": 0.6, "texture": 0.9, "bgSwitch": 0.2, "flash": true, "koma": 12, "hud": "auto" },
  "colors": { "enabled": true, "bg": "#0A0404", "fg": "#E8DCDC", "sub": "#8C6F6F", "accentOn": true, "accent": "#C8102E", "ghostA": "#7A0010", "ghostB": "#FF2A2A" },
  "only": {
    "exit": ["explode", "fall", "glitch", "splitApart", "dissolve", "shredOut", "glassBreak", "slashOut"]
  }
}
```

`only` is this tool's shorthand. JIZURA does not understand it, so it must be expanded into `enabled` before you hand the file over (§5).

## 2. Lyrics

One line per lyric line. Write line breaks as `\n` inside the string.

| Syntax | Effect |
|---|---|
| `I remember/the dawn` | `/` marks a manual cut (where the screen switches) |
| `*transparent*` | emphasises the word: larger, with more striking effects |
| trailing `!` | flash plus screen shake. **Only the half-width `!` works**; a full-width `！` is treated as ordinary punctuation |
| `lyric\|note` | the text after `\|` shows as small annotation text in annotation layouts |
| `[01:23.45]lyric` | LRC timestamp: this line starts at 1 min 23.45 s. A line may carry several timestamps (repeated choruses) |
| `[間奏]`, `[間奏 8]` | instrumental break: no lyrics, only background and decoration; `8` is seconds. `[间奏]`, `[interlude]`, `[간주]` also work |
| `[ti:title]`, `[ar:artist]` | LRC title and artist tags |
| blank line | a short pause between the lines around it |
| line starting with `#` | a comment, ignored |

**Never write copyrighted lyrics yourself.** Use the lyrics the user provides; if they only give a song title, ask them to paste the lyrics.

Put the user's lyrics into `lyrics` **exactly**, markers included. Do not delete `[ti:]` "to be safe" or move it into `title`: JIZURA understands it and it does not count as a line.

## 3. Basic fields

| Field | Values | Meaning |
|---|---|---|
| `title`, `artist` | text | shown on the title card and HUD |
| `lang` | `auto`, `ja`, `zh-Hant`, `zh-Hans`, `ko`, `en` | lyric language; picks the font set. Set it explicitly for Chinese lyrics |
| `style` | a style key from catalog.md | colour scheme plus typefaces |
| `mood` | a mood key from catalog.md, or `null` | **only a label** — the planner never reads it. To get a mood's feel, write `fx` and the part switches (§4, §5) |
| `extra` | `true` / `false` (default `false`) | whether parts and styles added after the first public version can be picked. Parts flagged `extra` in catalog.md need `true` |
| `wa` | `true` / `false` (default `true`) | whether Japanese-motif parts (lanterns, shoji, family crests…) can be picked. Use `false` for modern, western or dark themes |
| `horror` | `true` / `false` (default `false`) | the horror set: 52 parts (flashlight, door gap, CCTV, ouija board, blink-creep, pulled down…) and three horror styles. **Its parts are never picked unless this is `true`** — set it for eerie, creepy or horror requests |
| `typo` | `true` / `false` (default `true`) | the typographic (文字PV) set |
| `kinetic` | `true` / `false` (default `true`) | the kinetic-typography set (word-by-word beats, swings, slams) |
| `seed` | integer | the same number gives exactly the same result; another number gives another arrangement |
| `aspect` | `16:9`, `9:16`, `4:3`, `3:4`, `1:1`, `4:5`, `21:9` | frame shape; `9:16` for short-form vertical video |
| `res` | `720`, `1080`, `1440`, `2160` | output resolution |
| `keyBg` | `off`, `green`, `black` | compositing background: green screen or black, drawing only white text and effects |

## 4. fx sliders

| Field | Range | Meaning |
|---|---|---|
| `motion` | 0–1 | how big and fast the motion is. Lower it for dark or tender songs |
| `glitch` | 0–1 | amount of glitch effects |
| `chroma` | 0–1 | colour offset (RGB split) |
| `decor` | 0–1 | amount of decoration |
| `density` | 0–1 | how finely lines are cut: higher splits a line into more screens |
| `texture` | 0–1 | grain, paper and similar texture |
| `bgSwitch` | 0–1 | how often the background changes |
| `flash` | `true` / `false` | whether flashes are used |
| `koma` | `0`, `12`, `8` | drawings per second: `0` fully smooth, `12` on twos (anime feel), `8` on threes |
| `hud` | `auto`, `on`, `off` | the small info text in the frame corners |

For a mood's feel, take values from the ranges in catalog.md's Moods table. For example glitch: `motion` 0.6–0.9, `glitch` 0.75–1. To mix two feelings, choose between their ranges.

## 5. Part switches: enabled / only

JIZURA picks at random from the parts that are switched on. The rule: **every part not explicitly `false` is on.** So "use only these" means writing every other part of that group as `false`.

The shape of `enabled`:

```json
"enabled": { "exit": { "cut": true, "explode": true, "blur": false, "...(every other key of the group)": false } }
```

That is long, so this tool offers the shorthand `only`, listing "use only these" per group:

```json
"only": { "exit": ["explode", "glassBreak", "shredOut"], "fx": ["shatter", "tvStatic"] }
```

- **If you can run code**: write `only`, then run `node scripts/finalize.js draft.json <title>.jizura.json`. It expands `enabled` and checks every rule.
- **If you cannot run code** (for example in a chat app): expand it yourself. `references/enabled-all.json` has one line per group listing **every key** of that group, all `true`. For each group in `only`, copy that line into `enabled` and change every key not listed in `only` to `false`. Then delete `only`, because JIZURA does not understand it. Groups you are not filtering need no line at all.

**Recommended rules** — this is what JIZURA's own random pick does. Breaking them does not break the app, but the video gets worse.

1. **Keep a minimum number per group**, or the video keeps repeating the same effect: layout ≥ 6, enter ≥ 5, exit ≥ 5, hold ≥ 3, decor ≥ 6, treat ≥ 4, bg ≥ 4, cam ≥ 3, fx ≥ 4, trans ≥ 3.
   - Do not count parts that cannot be picked: `extra` parts while `"extra": false`, `wa` parts while `"wa": false`, and parts of a set (`horror`, `typo`, `kinetic`) whose switch is off.
2. **Keep these on**: `enter.cut`, `exit.cut`, `hold.still`, `treat.none`, `bg.none`, `cam.push`. They are the plainest options, used when a very short cut needs a clean switch. `finalize.js` adds them back when expanding `only`.
3. Leave groups you do not need to restrict out entirely, so everything in them stays on.

What really matters is **getting the keys right**: a wrong key raises no error, it just silently does nothing.

**Choosing parts**: judge by the Chinese and English names in catalog.md, plus the author's mood tags. For eerie or horror requests, use the `horror` mood: set `"horror": true`, take `fx` from the horror mood's ranges, pick a horror style (`hrRuin`, `hrNightRec`, `hrCurse`) or a dark one, and favour parts tagged `horror`. For a feel no tag covers, judge from the names: avoid bright, cute or everyday parts like bubbles, stickers, station signs when the tone is dark. **Layout has the biggest effect on the overall atmosphere**; for a consistent tone, filter layouts too.

## 6. Per-line settings: overrides

Use these to pin a line to a specific effect. The key is the **0-based line number**, counting only real lyric lines: blank lines, `#` comments and tags like `[ti:]` do not count; with LRC timestamps the lines are ordered by time.

```json
"overrides": {
  "3": { "exit": "glassBreak", "layout": "huge" },
  "5": { "single": true }
}
```

Available fields: `layout`, `enter`, `hold`, `exit`, `treat`, `bg`, `cam`, `trans` (one key each), `decor` (an array of keys), `single: true` (keep the whole line on one screen). A part set here is used even if it is switched off in `enabled`.

**An override also skips the layout's own length check**, and some layouts were built for short Japanese lines. Checked by rendering long English lines:

- `condensed` removes every space and only fits about 10 characters; `mixed` removes every space and drops characters past about 16. Use them only for short lines ("VISION", "No seat.").
- `center` wraps about every 11 characters and can split a long word in two. Fine for short lines; avoid it for long Latin-script lines.
- For long lines, these keep spaces and whole words: `frameBox`, `lowerThird`, `headlineDeck`, `splitScreen`, `justified`, `quote`, `poster` (also `subtitleBar`, `magazine`, `stack`, `typeSpecimen`, `warningLabel`).

`finalize.js` warns when an override puts a long line into `condensed`, `mixed` or `center`.

## 7. Colours

```json
"colors": { "enabled": true, "bg": "#0A0404", "fg": "#E8DCDC", "sub": "#8C6F6F",
            "accentOn": true, "accent": "#C8102E", "ghostA": "#7A0010", "ghostB": "#FF2A2A" }
```

- `bg` (background), `fg` (text) and `sub` (secondary text) apply only with `enabled: true`, and only replace the style's main scheme.
- `accent` and `ghostA` / `ghostB` (the two colour-offset colours) apply only with `accentOn: true`, across every scheme. The app adjusts their brightness for contrast.
- Always write colours as `#RRGGBB`.
- Leave `colors` out when the style's palette already fits.

## 8. Fonts

```json
"fonts": { "display": "gothic_black", "serif": "mincho_black", "body": "gothic_med" }
```

`display` (headline-size text), `serif` (mincho/serif), `body` (body text); keys are in catalog.md. For Chinese or Korean lyrics the app swaps in matching Chinese or Korean faces automatically, so just pick by the font's kind (gothic, mincho, round, hand…). Leave `fonts` out to use the style's own.

## 9. Timing

Usually **leave it out**. After the user imports audio in the app, it detects the beat and aligns to it, or they can tap to sync.

If the user gives start times for each line, write them as LRC tags `[mm:ss.xx]` in the lyrics, which is clearer than `timing.lineTimes`. Fields in `timing`: `bpm` (0 = auto), `offset` (seconds), `snap` (snap to beat), `tail` (seconds after the last line), `lineTimes` (`{"line number": seconds}`), `lineScale` (line length multiplier).

## 10. Checklist before handing it over

- [ ] Valid JSON: no comments, no trailing commas, line breaks inside strings written as `\n`
- [ ] Every key can be found in catalog.md, and no field is invented
- [ ] The lyrics match the user's exactly, markers included
- [ ] Lines meant to flash end in a half-width `!`
- [ ] Using `extra` parts or styles → `"extra": true`; no Japanese motifs → `"wa": false`; using horror parts → `"horror": true`
- [ ] Each group meets the recommended minimum, and the six recommended parts are on
- [ ] No `only` left (expanded by `finalize.js`, or by hand)
- [ ] The wanted mood is written into `fx`, not just into `mood`
