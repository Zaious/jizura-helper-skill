# JIZURA parts and styles catalogue

> Generated from the JIZURA source by `scripts/build_catalog.js` (commit `94413f7`). Do not edit by hand.
> Columns: `key` is what goes into the file; 中文 is the name shown in the Traditional Chinese edition; English is the English edition's name; `tags` are the author's mood tags.
> `flags`: `extra` = added after the first public version (only picked at random with `"extra": true`); `wa` = Japanese motif (never picked at random with `"wa": false`); `special` = internal, do not touch.

## Contents

- [Styles](#styles)
- [Moods](#moods)
- [Fonts](#fonts)
- [layout — how each cut is laid out](#layout)
- [enter — entrance animation](#enter)
- [hold — motion while on screen](#hold)
- [exit — exit animation](#exit)
- [decor — decorations (0 to several per cut)](#decor)
- [treat — text treatment (outline, extrude, offset…)](#treat)
- [bg — background graphic (one per line)](#bg)
- [cam — camera move](#cam)
- [fx — screen effects (flash, glitch and other events)](#fx)
- [trans — transition between cuts](#trans)

## Styles

| key | 中文 | English | Description | Suits moods | flags |
|---|---|---|---|---|---|
| `noir` | 暗黑色差 | Noir Chroma | Black and white with cyan and amber color offsets |  |  |
| `crimson` | 深紅訊號 | Crimson Signal | Deep red, monochrome type and damaged data |  |  |
| `caution` | 警示 | Caution | Yellow, red and blue with instrument graphics |  |  |
| `magenta` | 普普洋紅 | Pop Magenta | Hot pink, round bold type and callout lines |  |  |
| `paper` | 紙與墨 | Paper and Ink | Paper texture, indigo, magenta and serif echoes |  |  |
| `hud` | 暗色 HUD | Dark HUD | Charcoal, fine frames, orange accents and eclipses |  |  |
| `mint` | 薄荷終端機 | Mint Terminal | Black, teal and lime with scan effects |  |  |
| `specimen` | 字型樣本 | Type Specimen | Ink colored background with serif annotations |  |  |
| `transit` | 交通指標 | Transit | Olive and yellow with signage and halftone |  |  |
| `blueprint` | 藍圖 | Blueprint | Blue, white and black graphic collage |  |  |
| `rouge` | 胭脂漸層 | Rouge Gradient | Light gray and red gradients with capsules |  |  |
| `mono` | 單色 RGB | Mono RGB | Gray space, white serif and bold RGB separation |  |  |
| `sakura` | 櫻花 | Sakura | Soft cherry pink and plum with rounded and serif type | emotional, calm | extra |
| `ocean` | 深海 | Deep Sea | Navy, glowing cyan, bubbles and light sans type | calm, emotional | extra |
| `sunset` | 夕陽漸層 | Sunset Gradient | Orange to violet, bold serif and backlight | emotional, pop | extra |
| `forest` | 森林手帖 | Forest Notebook | Moss, natural paper and pencil lettering | calm, editorial, emotional | extra |
| `vapor` | 蒸氣波 | Vaporwave | Pastel pink and blue with VHS bloom | pop, emotional, glitch | extra |
| `newsprint` | 報紙 | Newsprint | Gray paper, black and red with halftone registration | editorial, graphic | extra |
| `synth80` | 合成器 80s | Synth 80s | Black with neon magenta, cyan and scanlines | pop, glitch, emotional | extra |
| `kraft` | 牛皮紙 | Kraft Paper | Warm paper, red and indigo stamps and washi tape | pop, editorial, graphic | extra |
| `candy` | 糖果 | Candy | Mint and fruit pastel colors with bouncing letters | pop | extra |
| `acid` | 酸性 | Acid | Black, acid green and magenta with distressed type | glitch, graphic | extra |
| `sumi` | 墨與朱 | Ink and Vermilion | Japanese paper, brush lettering and red seals | calm, emotional, editorial | extra |
| `gold` | 金夜 | Golden Night | Deep black, gold foil, ivory serif and glints | emotional, calm, editorial | extra |

## Moods

The `mood` field is only a label. For a mood's feel, write values from these slider ranges into `fx`, and favour parts carrying that tag (see format.md).

| key | 中文 | English | fx slider ranges | Preferred layout / enter / exit |
|---|---|---|---|---|
| `glitch` | 故障風 | Glitch | motion 0.6–0.9; glitch 0.75–1; chroma 0.75–1; decor 0.3–0.6; density 0.6–0.9; texture 0.5–0.9; bgSwitch 0.3–0.6 | layout: center, condensed, huge, tile, marquee, vcols, scatter, stack<br>enter: slice, scramble, assemble, flicker, zoom, stretch<br>exit: glitch, slice, explode, fall |
| `calm` | 沉靜 | Gentle | motion 0.3–0.55; glitch 0.05–0.25; chroma 0.2–0.5; decor 0.2–0.5; density 0.25–0.45; texture 0.5–0.85; bgSwitch 0.1–0.3 | layout: center, vcols, gloss, stack, circle, type, mixed<br>enter: blur, type, wipe, assemble<br>exit: blur, drift, wipe, shrink |
| `pop` | 普普 | Pop | motion 0.7–1; glitch 0.1–0.35; chroma 0.3–0.6; decor 0.6–1; density 0.5–0.8; texture 0.2–0.5; bgSwitch 0.4–0.8 | layout: mixed, scatter, wave, labels, pill, ring, huge, diag, center<br>enter: pop, drop, spin, stretch, zoom<br>exit: scatter, shrink, stretch, blur |
| `graphic` | 圖形感 | Graphic | motion 0.5–0.8; glitch 0.2–0.5; chroma 0.4–0.7; decor 0.7–1; density 0.5–0.8; texture 0.4–0.7; bgSwitch 0.3–0.7 | layout: diag, labels, marquee, tile, condensed, huge, circle, pill<br>enter: wipe, slice, stretch, zoom<br>exit: wipe, slice, stretch |
| `editorial` | 編輯排版 | Editorial | motion 0.4–0.65; glitch 0.1–0.3; chroma 0.2–0.45; decor 0.4–0.7; density 0.35–0.6; texture 0.6–0.9; bgSwitch 0.2–0.4 | layout: gloss, vcols, mixed, stack, type, center, circle<br>enter: type, blur, wipe, assemble<br>exit: blur, drift, wipe |
| `emotional` | 感性 | Emotional | motion 0.55–0.85; glitch 0.3–0.6; chroma 0.5–0.85; decor 0.3–0.6; density 0.4–0.7; texture 0.6–1; bgSwitch 0.2–0.5 | layout: huge, center, vcols, stack, condensed, mixed, circle<br>enter: assemble, blur, zoom, wipe, slice<br>exit: drift, explode, fall, blur |
| `chaos` | 全都來 | Anything goes | motion 0.5–1; glitch 0.3–1; chroma 0.4–1; decor 0.4–1; density 0.45–0.9; texture 0.3–1; bgSwitch 0.3–0.9 |  |

## Fonts

Used in `fonts.display` / `fonts.serif` / `fonts.body`. For Chinese or Korean lyrics the app swaps in matching faces automatically.

| key | Name | Kind | Weight |
|---|---|---|---|
| `gothic_black` | Noto Sans JP Black | gothic | 900 |
| `gothic_bold` | Noto Sans JP Bold | gothic | 700 |
| `gothic_med` | Noto Sans JP Medium | gothic | 500 |
| `gothic_light` | Noto Sans JP Light | gothic | 300 |
| `dela` | Dela Gothic One | display | 400 |
| `zenkaku` | Zen Kaku Gothic New Black | gothic | 900 |
| `mincho_black` | Zen Old Mincho Black | mincho | 900 |
| `mincho_bold` | Noto Serif JP Bold | mincho | 700 |
| `mincho` | Noto Serif JP Medium | mincho | 500 |
| `mincho_light` | Noto Serif JP Light | mincho | 300 |
| `tokumin` | Kaisei Tokumin | mincho | 800 |
| `round` | M PLUS Rounded 1c | round | 800 |
| `pop` | Mochiy Pop One | display | 400 |
| `dot` | DotGothic16 | pixel | 400 |
| `brush` | Yuji Syuku | brush | 400 |
| `mono` | IBM Plex Mono | mono | 500 |
| `reggae` | Reggae One | display | 400 |
| `rampart` | Rampart One | display | 400 |
| `potta` | Potta One | brush | 400 |
| `kiwi` | Kiwi Maru | round | 500 |
| `klee` | Klee One | hand | 600 |
| `shippori` | Shippori Mincho B1 | mincho | 800 |
| `sansui` | IBM Plex Sans JP | gothic | 500 |

## layout

**layout — how each cut is laid out** — 140 parts

| key | 中文 | English | tags | flags |
|---|---|---|---|---|
| `center` | 置中 | Center | glitch, calm, pop, editorial, emotional |  |
| `mixed` | 大小混排 | Mixed | calm, pop, editorial, emotional |  |
| `vcols` | 直書 | Vertical text | glitch, calm, editorial, emotional |  |
| `marquee` | 流動橫幅 | Scrolling banner | glitch, graphic |  |
| `tile` | 滿版鋪排 | Tiled text | glitch, graphic |  |
| `scatter` | 散落 | Scatter | glitch, pop |  |
| `ring` | 環形 | Ring | pop |  |
| `wave` | 波浪軌跡 | Wave | pop |  |
| `huge` | 超出畫面 | Oversized text | glitch, pop, graphic, emotional |  |
| `labels` | 標籤貼 | Labels | pop, graphic |  |
| `condensed` | 瘦長壓縮 | Condensed | glitch, graphic, emotional |  |
| `gloss` | 註解 | Annotation | calm, editorial |  |
| `type` | 打字 | Type | calm, editorial |  |
| `diag` | 斜帶 | Diagonal band | pop, graphic |  |
| `circle` | 圓窗 | Circle | calm, graphic, editorial, emotional |  |
| `stack` | 殘影堆疊 | Echo stack | glitch, calm, editorial, emotional |  |
| `pill` | 膠囊 | Pill | pop, graphic |  |
| `lowerThird` | 下方字卡 | Lower third | editorial, calm, emotional |  |
| `corners` | 對角配置 | Opposite corners | graphic, editorial, calm |  |
| `staircase` | 階梯 | Staircase | graphic, pop, editorial |  |
| `zigzag` | 鋸齒 | Zigzag | pop, graphic |  |
| `arcTop` | 彩虹弧 | Rainbow arc | pop, emotional, graphic |  |
| `spiral` | 螺旋 | Spiral | emotional, graphic, calm |  |
| `gridCells` | 方格 | Grid cells | graphic, editorial, pop |  |
| `dropCap` | 首字放大 | Drop cap | editorial, emotional, calm |  |
| `justified` | 版心 | Justified | editorial, calm, emotional |  |
| `frameBox` | 畫框 | Picture frame | editorial, calm, graphic |  |
| `bubble` | 對話框 | Bubble | pop, emotional |  |
| `subtitleBar` | 字幕條 | Subtitle bar | emotional, calm, editorial |  |
| `ticker` | 新聞跑馬燈 | Ticker | pop, glitch, graphic |  |
| `splitScreen` | 二分割 | Split screen | graphic, pop, editorial |  |
| `mirror` | 鏡像 | Mirror | calm, emotional, graphic |  |
| `sideways` | 橫躺直書 | Sideways text | editorial, graphic, pop |  |
| `edgeFrame` | 沿邊環繞 | Edge frame | graphic, editorial, glitch |  |
| `perspective` | 景深 | Perspective | graphic, emotional, glitch |  |
| `hanko` | 落款 | Signature seal | calm, emotional, editorial | wa |
| `genkou` | 稿紙 | Manuscript paper | calm, editorial, emotional | wa |
| `panels` | 漫畫分格 | Comic panels | pop, graphic, emotional |  |
| `filmstrip` | 底片 | Filmstrip | emotional, calm, graphic |  |
| `quote` | 引用 | Quote | editorial, emotional, calm |  |
| `ruler` | 尺寸線 | Dimension lines | graphic, editorial, glitch |  |
| `searchBar` | 搜尋框 | Search bar | pop, graphic |  |
| `chat` | 聊天 | Chat | pop, emotional |  |
| `notification` | 通知 | Notification | pop, emotional, calm |  |
| `ticket` | 票券 | Ticket | pop, graphic, editorial |  |
| `rain` | 文字雨 | Letter rain | glitch, graphic, emotional |  |
| `hanging` | 吊掛 | Hanging | pop, calm, emotional |  |
| `orbit` | 環繞 | Orbit | calm, graphic, emotional |  |
| `tunnel` | 隧道 | Tunnel | glitch, graphic, emotional |  |
| `wordCloud` | 文字雲 | Word cloud | pop, editorial, graphic |  |
| `bounceLine` | 彈跳 | Bouncing line | pop |  |
| `elastic` | 橡皮筋 | Elastic | pop, graphic |  |
| `crossBands` | 交叉帶 | Crossing bands | graphic, pop, glitch |  |
| `stickerBomb` | 貼紙 | Sticker collage | pop, graphic |  |
| `neon` | 霓虹 | Neon | calm, emotional |  |
| `keycaps` | 鍵帽 | Keycaps | pop, graphic |  |
| `bubbles` | 泡泡 | Bubbles | pop, calm |  |
| `slotMachine` | 拉霸機 | Slot machine | pop, glitch |  |
| `flipBoard` | 翻牌看板 | Flip board | graphic, editorial |  |
| `credits` | 片尾名單 | End credits | calm, editorial, emotional |  |
| `zoomRepeat` | 連續放大 | Zoom repeat | glitch, emotional, graphic |  |
| `splitHalves` | 上下分割 | Split halves | graphic, glitch, editorial |  |
| `columnsBig` | 大小直排 | Contrasting columns | editorial, calm, emotional |  |
| `circleWords` | 同心圓 | Concentric words | graphic, calm, editorial |  |
| `dotMatrix` | 點陣顯示 | Dot matrix | graphic, glitch, pop |  |
| `depthStack` | 景深重疊 | Depth stack | graphic, emotional, glitch |  |
| `typeSpecimen` | 字型樣本 | Type specimen | editorial, graphic |  |
| `kanjiFocus` | 單字強調 | Character focus | emotional, editorial, calm |  |
| `halfVertical` | 直橫混排 | Mixed vertical type | editorial, graphic |  |
| `curtain` | 布幕 | Curtain | emotional, pop, graphic |  |
| `equalizer` | 等化器 | Equalizer | pop, graphic, glitch |  |
| `tape` | 膠帶 | Tape | pop, editorial, graphic |  |
| `magazine` | 雜誌跨頁 | Magazine spread | editorial, calm, emotional | extra |
| `headlineDeck` | 標題與導言 | Headline and deck | editorial, graphic, calm | extra |
| `contents` | 目錄 | Contents | editorial, calm | extra |
| `footnote` | 註腳 | Footnote | editorial, calm, emotional | extra |
| `proofread` | 校樣 | Proof sheet | editorial, graphic, calm | extra |
| `numbered` | 編號 | Numbered | graphic, editorial, pop | extra |
| `poster` | 海報 | Poster | graphic, pop, editorial | extra |
| `swissGrid` | 瑞士網格 | Swiss grid | graphic, editorial, calm | extra |
| `dictionary` | 辭典 | Dictionary | editorial, calm, emotional | extra |
| `ema` | 繪馬 | Ema wish plaque | emotional, calm, pop | extra, wa |
| `ransom` | 剪報字 | Cutout letters | pop, glitch, graphic | extra |
| `newspaper` | 報紙 | Newspaper | editorial, graphic, pop | extra |
| `vinyl` | 黑膠唱片 | Vinyl record | emotional, pop, calm | extra |
| `cassette` | 卡帶 | Cassette | emotional, pop, calm | extra |
| `bookSpine` | 書背 | Book spine | calm, editorial, emotional | extra |
| `polaroid` | 拍立得 | Polaroid | emotional, calm, pop | extra |
| `stampSheet` | 郵票版張 | Stamp sheet | pop, graphic, calm | extra |
| `postcard` | 明信片 | Postcard | emotional, calm, editorial | extra, wa |
| `letterPaper` | 信紙 | Letter paper | emotional, calm | extra, wa |
| `calendar` | 月曆 | Calendar | pop, editorial, calm | extra |
| `chochin` | 燈籠 | Paper lantern | emotional, calm, pop | extra, wa |
| `routeMap` | 路線圖 | Route map | graphic, pop, editorial | extra |
| `stationSign` | 站名牌 | Station sign | graphic, pop, editorial | extra |
| `noren` | 暖簾 | Noren curtain | calm, emotional, graphic | extra, wa |
| `tanzaku` | 短籤 | Wish strip | emotional, calm, pop | extra, wa |
| `omikuji` | 御神籤 | Fortune slip | emotional, calm, editorial | extra, wa |
| `kakejiku` | 掛軸 | Hanging scroll | calm, emotional, editorial | extra, wa |
| `shoji` | 障子 | Shoji screen | calm, emotional, graphic | extra, wa |
| `clapper` | 場記板 | Clapperboard | pop, graphic, editorial | extra |
| `warningLabel` | 警告標籤 | Warning label | graphic, glitch, pop | extra |
| `priceTag` | 價格標籤 | Price tag | pop, graphic | extra |
| `nameTag` | 名牌 | Name tag | pop, emotional | extra |
| `stickyNotes` | 便利貼 | Sticky notes | pop, emotional, calm | extra |
| `karuta` | 歌牌 | Karuta card | pop, emotional, editorial | extra, wa |
| `cube` | 立方體 | Cube | graphic, pop | extra |
| `cylinder` | 圓柱 | Cylinder | graphic, calm, emotional | extra |
| `flipCards` | 翻卡 | Flipping cards | pop, graphic | extra |
| `accordion` | 風琴摺 | Accordion | pop, graphic, editorial | extra |
| `flag` | 飄揚的旗 | Flag | emotional, pop, graphic | extra |
| `ribbon` | 緞帶 | Ribbon | pop, emotional, graphic | extra |
| `pendulum` | 鐘擺 | Pendulum | calm, pop, emotional | extra |
| `pile` | 文字堆 | Letter pile | pop, emotional, graphic | extra |
| `blocks` | 積木 | Blocks | pop, graphic | extra |
| `balloons` | 文字氣球 | Letter balloons | pop, emotional, calm | extra |
| `magnets` | 磁鐵 | Magnets | pop, graphic | extra |
| `tiles` | 文字磁磚 | Letter tiles | pop, editorial, graphic | extra |
| `bulbs` | 燈泡招牌 | Marquee bulbs | pop, emotional, graphic | extra |
| `ledScroll` | 電子跑馬燈 | LED ticker | pop, graphic, glitch | extra |
| `billboard` | 看板 | Billboard | pop, emotional, graphic | extra |
| `crowdBubbles` | 對話框群 | Speech bubble crowd | pop, emotional, editorial | extra |
| `crossword` | 填字遊戲 | Crossword | editorial, graphic, pop | extra |
| `wordSearch` | 找字遊戲 | Word search | pop, graphic, editorial | extra |
| `puzzle` | 拼圖 | Puzzle | pop, graphic, emotional | extra |
| `shadowPlay` | 皮影戲 | Shadow puppets | emotional, calm, graphic | extra |
| `kaleido` | 萬花筒 | Kaleidoscope | glitch, emotional, graphic | extra |
| `dominoes` | 骨牌 | Dominoes | pop, graphic | extra |
| `burst` | 爆炸 | Burst | pop, graphic, emotional | extra |
| `fisheye` | 魚眼鏡頭 | Fisheye lens | pop, graphic, glitch | extra |
| `wall` | 牆面透視 | Perspective wall | graphic, editorial, emotional | extra |
| `origami` | 摺紙 | Origami | calm, pop, emotional | extra, wa |
| `zipper` | 拉鍊 | Zipper | pop, graphic, emotional | extra |
| `sliceStack` | 切片堆疊 | Sliced layers | glitch, graphic, pop | extra |
| `glitchGrid` | 故障網格 | Glitch grid | glitch, graphic | extra |
| `mosaicTiles` | 磁磚拼畫 | Mosaic tiles | pop, graphic, glitch | extra |
| `maskReveal` | 文字窗 | Text window | graphic, pop, emotional | extra |
| `contour` | 等高線 | Contour | calm, graphic, emotional | extra |
| `halftoneBig` | 網點巨字 | Oversized halftone text | pop, graphic, editorial | extra |
| `stencil` | 鏤空模板 | Stencil | graphic, pop, editorial | extra |

## enter

**enter — entrance animation** — 100 parts

| key | 中文 | English | tags | flags |
|---|---|---|---|---|
| `cut` | 直切 | Cut |  |  |
| `assemble` | 分解→聚合 | Break apart and assemble | glitch, calm, editorial, emotional |  |
| `slice` | 切片 | Slice | glitch, graphic, emotional |  |
| `type` | 打字 | Type | calm, editorial |  |
| `pop` | 彈出 | Pop | pop |  |
| `drop` | 落下 | Drop | pop |  |
| `stretch` | 伸縮 | Stretch | glitch, pop, graphic |  |
| `wipe` | 擦除 | Wipe | calm, graphic, editorial, emotional |  |
| `blur` | 模糊 | Blur | calm, editorial, emotional |  |
| `spin` | 旋轉 | Spin | pop |  |
| `flicker` | 閃爍 | Flicker | glitch |  |
| `scramble` | 亂碼 | Scramble | glitch |  |
| `zoom` | 縮放 | Zoom | glitch, pop, graphic, emotional |  |
| `riseMask` | 由下浮現 | Reveal from below | editorial, graphic, calm, emotional |  |
| `dropMask` | 由上浮現 | Reveal from above | editorial, graphic, pop |  |
| `slideL` | 從左滑入 | Slide from left | editorial, calm, pop |  |
| `slideR` | 從右滑入 | Slide from right | editorial, graphic, pop |  |
| `slideWhole` | 整體滑入 | Slide in together | pop, graphic |  |
| `flipX` | 縱軸翻轉 | Flip on vertical axis | pop, graphic, editorial |  |
| `flipY` | 橫軸翻轉 | Flip on horizontal axis | pop, graphic |  |
| `domino` | 骨牌 | Domino | pop |  |
| `fold` | 摺疊展開 | Fold | graphic, editorial |  |
| `unroll` | 捲軸展開 | Unroll | calm, editorial, emotional |  |
| `strokeDraw` | 線稿到上色 | Draw outlines, then fill | calm, emotional, editorial |  |
| `outlineFill` | 輪廓→填色 | Outline to fill | graphic, pop, editorial |  |
| `splitJoin` | 上下合體 | Join from top and bottom | graphic, editorial |  |
| `vSlice` | 縱向切片 | Vertical slices | graphic, glitch |  |
| `shutter` | 快門 | Shutter | graphic, editorial |  |
| `iris` | 光圈 | Iris | pop, emotional, graphic |  |
| `diagWipe` | 斜向擦除 | Diagonal wipe | graphic, editorial, pop |  |
| `blinds` | 百葉窗 | Blinds | graphic, editorial |  |
| `checker` | 棋盤格 | Checker | graphic, glitch, pop |  |
| `randomOrder` | 隨機順序 | Random letter order | pop, glitch |  |
| `bounceBig` | 大跳躍 | Big bounce | pop |  |
| `squashDrop` | 壓扁著地 | Squash landing | pop |  |
| `rubber` | 橡皮拉伸 | Rubber | pop |  |
| `glitchIn` | 故障浮現 | Glitch in | glitch |  |
| `echoIn` | 殘影聚合 | Echoes converge | graphic, emotional, pop |  |
| `whip` | 急甩 | Whip | pop, graphic |  |
| `skewIn` | 傾斜 | Skew in | editorial, graphic |  |
| `trackIn` | 字距收攏 | Tighten letter spacing | calm, editorial, emotional |  |
| `trackOut` | 字距擴張 | Expand letter spacing | calm, editorial, pop |  |
| `blurStagger` | 模糊錯落 | Staggered blur | calm, emotional |  |
| `fadeStagger` | 逐字淡入 | Letter by letter fade | calm, emotional |  |
| `waveIn` | 波浪起伏 | Wave in | pop, emotional |  |
| `spiralIn` | 螺旋聚合 | Spiral assembly | pop, emotional |  |
| `zoomOut` | 巨大→原尺寸 | Oversized to normal | pop, graphic, glitch |  |
| `resolve` | 解碼 | Resolve | glitch, editorial |  |
| `magnet` | 磁吸 | Magnet | pop, graphic |  |
| `inkBleed` | 暈染 | Ink bleed | calm, emotional |  |
| `neonOn` | 霓虹點亮 | Neon on | glitch, emotional, pop |  |
| `cursorSweep` | 游標掃過 | Cursor sweep | editorial, graphic |  |
| `stamp` | 蓋章 | Stamp | pop, graphic |  |
| `springIn` | 彈簧 | Spring in | pop | extra |
| `pendulum` | 鐘擺 | Pendulum | pop, emotional, calm | extra |
| `rollIn` | 滾入 | Roll in | pop, graphic | extra |
| `slingshot` | 彈弓 | Slingshot | pop, graphic | extra |
| `rockSettle` | 搖晃著地 | Wobble to rest | pop | extra |
| `bounceBall` | 彈跳球 | Bounce ball | pop, emotional | extra |
| `snapRail` | 吸附對齊 | Snap into alignment | graphic, pop, editorial | extra |
| `fanOpen` | 扇子展開 | Folding fan opens | emotional, graphic, calm | extra, wa |
| `cylinder` | 圓柱旋轉 | Cylinder | graphic, pop, editorial | extra |
| `shuffle` | 洗牌 | Shuffle | pop, glitch, graphic | extra |
| `stopMotion` | 定格動畫 | Stop motion | pop, emotional | extra |
| `ripple` | 漣漪 | Ripple | emotional, calm, graphic | extra |
| `zipper` | 拉鍊 | Zipper | graphic, pop | extra |
| `zoomAlt` | 交錯縮放 | Zoom alt | pop, graphic, glitch | extra |
| `tiltUp` | 站起 | Tilt up | graphic, editorial, pop | extra |
| `stickerPeel` | 貼上貼紙 | Apply sticker | pop, graphic, editorial | extra |
| `crumple` | 揉皺還原 | Uncrumple | pop, graphic, emotional | extra |
| `noteUnfold` | 展開信紙 | Unfold letter | emotional, calm, graphic | extra |
| `tornJoin` | 撕紙拼合 | Join torn pieces | graphic, emotional, pop | extra |
| `splitFlap` | 翻牌 | Split flap display | glitch, editorial, graphic | extra |
| `overexpose` | 過曝 | Overexpose | emotional, pop, glitch | extra |
| `glint` | 反光一閃 | Glint | editorial, emotional, graphic | extra |
| `loupe` | 放大鏡 | Loupe | editorial, pop, calm | extra |
| `filmFeed` | 底片捲動 | Film feed | emotional, glitch, editorial | extra |
| `backlight` | 逆光 | Backlight | emotional, calm | extra |
| `lightLeak` | 漏光 | Light leak | emotional, calm, pop | extra |
| `heatHaze` | 熱浪扭曲 | Heat haze | emotional, calm, glitch | extra |
| `crtOn` | CRT 開機 | CRT powers on | glitch, pop, graphic | extra |
| `interlace` | 交錯掃描 | Interlace | glitch, graphic, editorial | extra |
| `loadingBar` | 載入條 | Loading bar | graphic, editorial, glitch | extra |
| `dither` | 遞色 | Dither | glitch, graphic | extra |
| `odometer` | 數字滾輪 | Rolling number drum | glitch, editorial, pop | extra |
| `matrixRain` | 資料雨 | Data rain | glitch, graphic | extra |
| `hatchFill` | 斜線→實心 | Hatch fill | graphic, editorial | extra |
| `brushReveal` | 筆觸掃出 | Brush reveal | emotional, editorial, calm | extra, wa |
| `inkDrop` | 墨滴 | Ink drop | calm, emotional, graphic | extra |
| `quarters` | 四方聚合 | Converge from four sides | graphic, pop | extra |
| `invertBox` | 反轉挖空 | Invert box | graphic, editorial, pop | extra |
| `printRegister` | 套印錯位 | Color plates align | graphic, pop, editorial | extra |
| `echoCount` | 數拍進場 | Count in | pop, graphic, glitch | extra |
| `liquidFill` | 水位上升 | Liquid rises | emotional, calm, pop | extra |
| `windBlown` | 乘風而來 | Wind blown | emotional, calm | extra |
| `strokeOrder` | 逐筆書寫 | Stroke by stroke | calm, emotional, editorial | extra |
| `clockWipe` | 順時針 | Clock wipe | graphic, pop, editorial | extra |
| `shadowFirst` | 影子先落 | Shadow first | pop, graphic, emotional | extra |
| `bubbles` | 泡泡 | Bubbles | pop, emotional, calm | extra |
| `tokoroten` | 擠壓成條 | Extruded noodles | pop, graphic | extra |

## hold

**hold — motion while on screen** — 38 parts

| key | 中文 | English | tags | flags |
|---|---|---|---|---|
| `still` | 靜止 | Still | calm, editorial, emotional, graphic |  |
| `jitter` | 抖動 | Jitter | glitch, pop |  |
| `drift` | 漂移 | Drift | calm, emotional, editorial |  |
| `breathe` | 呼吸 | Breathe | calm, emotional |  |
| `wave` | 波浪 | Wave | pop |  |
| `glitchtick` | 故障 | Glitch tick | glitch |  |
| `float` | 輕飄飄 | Float | calm, emotional |  |
| `sway` | 搖曳 | Sway | calm, emotional |  |
| `pulse` | 脈動 | Pulse | pop, graphic |  |
| `shimmer` | 閃耀 | Shimmer | emotional, calm |  |
| `colorRun` | 流動色彩 | Traveling color | pop, graphic |  |
| `rotateSlow` | 緩慢旋轉 | Rotate slow | calm, editorial |  |
| `trackBreathe` | 字距呼吸 | Breathing letter spacing | calm, editorial |  |
| `skewWobble` | 斜向搖晃 | Skew wobble | pop, glitch |  |
| `beatHop` | 隨拍跳動 | Hop to the beat | pop |  |
| `hWave` | 橫向波浪 | Horizontal wave | pop, emotional |  |
| `heartbeat` | 心跳 | Heartbeat | emotional, pop |  |
| `orbitSmall` | 小圓周運動 | Small orbit | calm, pop |  |
| `jelly` | 果凍 | Jelly | pop |  |
| `scanBand` | 掃描帶 | Scanning band | glitch, graphic |  |
| `noiseDrift` | 雜訊漂移 | Drifting noise | calm, emotional |  |
| `tilt` | 翹翹板 | Tilt | calm, editorial |  |
| `zoomSlow` | 緩慢推近 | Slow push | calm, emotional, editorial |  |
| `stretchPulse` | 隨拍橫向拉伸 | Stretch to the beat | pop, graphic |  |
| `glitchJump` | 偶爾錯位 | Occasional glitch jump | glitch |  |
| `echoTrail` | 殘影拖尾 | Echo trail | emotional, glitch |  |
| `glowFlicker` | 燭火搖曳 | Flickering glow | calm, emotional | extra |
| `windGust` | 陣風 | Wind gust | pop, emotional | extra |
| `dangle` | 懸吊 | Dangle | calm, emotional | extra |
| `eqBounce` | 隨音量伸縮 | Audio level bounce | pop, graphic | extra |
| `flashBox` | 隨拍反轉 | Invert to the beat | pop, graphic, glitch | extra |
| `glintSweep` | 光澤掃過 | Passing highlight | graphic, calm | extra |
| `flipSwap` | 偶爾翻面 | Occasional flip | glitch, pop | extra |
| `shadowSway` | 影子搖晃 | Swaying shadow | calm, emotional | extra |
| `magnetJiggle` | 磁力 | Magnet jiggle | pop, glitch | extra |
| `typeRattle` | 打字震動 | Typewriter rattle | editorial, glitch | extra |
| `focusRack` | 移焦 | Rack focus | calm, emotional | extra |
| `pluckString` | 撥弦 | Plucked string | pop, emotional | extra |

## exit

**exit — exit animation** — 86 parts

| key | 中文 | English | tags | flags |
|---|---|---|---|---|
| `cut` | 直切 | Cut |  |  |
| `explode` | 爆散 | Explode | glitch, emotional |  |
| `fall` | 崩落 | Crumble and fall | glitch, emotional |  |
| `drift` | 霧散 | Drift away | calm, editorial, emotional |  |
| `slice` | 切片退場 | Slice | glitch, graphic |  |
| `wipe` | 擦除退場 | Wipe | calm, graphic, editorial |  |
| `shrink` | 收縮 | Shrink | calm, pop |  |
| `blur` | 模糊退場 | Blur | calm, pop, editorial, emotional |  |
| `stretch` | 伸縮退場 | Stretch | pop, graphic |  |
| `scatter` | 飛散 | Scatter | pop |  |
| `glitch` | 故障退場 | Glitch | glitch |  |
| `sinkMask` | 下沉 | Sink out | calm, editorial, graphic |  |
| `riseOut` | 向上消失 | Rise out | calm, emotional, editorial |  |
| `slideOutL` | 向左滑出 | Slide left | pop, graphic |  |
| `slideOutR` | 向右滑出 | Slide right | pop, graphic |  |
| `flipOutX` | 關門 | Doors close | graphic, pop, editorial |  |
| `flipOutY` | 啪地倒下 | Flip down | pop, graphic |  |
| `foldOut` | 摺疊收起 | Fold out | graphic, editorial |  |
| `squash` | 壓扁 | Squash | glitch, pop, graphic |  |
| `trackOutWide` | 字距散開 | Spread letter spacing | calm, emotional, editorial |  |
| `collapse` | 吸入 | Collapse inward | pop, graphic |  |
| `zoomThrough` | 衝向鏡頭 | Zoom through | emotional, pop |  |
| `zoomFar` | 退向遠方 | Recede into distance | emotional, calm |  |
| `spinOut` | 旋轉消失 | Spin away | pop |  |
| `twist` | 扭轉 | Twist | pop, graphic |  |
| `waveOut` | 波浪崩解 | Wave out | pop, emotional |  |
| `blurOutStagger` | 逐字模糊 | Blur letters in sequence | calm, emotional |  |
| `undraw` | 回到線稿 | Return to outlines | editorial, calm, graphic |  |
| `outlineOut` | 填色褪去 | Fill fades to outline | graphic, emotional |  |
| `irisClose` | 光圈 | Iris closes | graphic, pop, editorial |  |
| `diagWipeOut` | 斜向擦除 | Diag wipe out | graphic, editorial |  |
| `blindsClose` | 百葉窗 | Blinds close | graphic, editorial |  |
| `checkerOut` | 棋盤格 | Checker out | graphic, glitch |  |
| `splitApart` | 上下裂開 | Split top and bottom | graphic, pop |  |
| `vSliceDrop` | 縱向切片掉落 | Vertical slices fall | graphic, glitch |  |
| `melt` | 融化 | Melt | emotional, glitch |  |
| `dissolve` | 碎散 | Crumble away | calm, emotional |  |
| `backspace` | 退格刪除 | Backspace | editorial, glitch |  |
| `scrambleOut` | 變成符號 | Become symbols | glitch |  |
| `glitchDissolve` | 化為方塊 | Glitch into blocks | glitch |  |
| `echoOut` | 殘響 | Echo out | emotional, calm |  |
| `whipOut` | 急甩 | Whip out | pop, graphic |  |
| `gravity` | 重力墜落 | Fall with gravity | pop, emotional |  |
| `popOut` | 迸裂 | Pop out | pop |  |
| `burn` | 燒毀 | Burn away | emotional, glitch |  |
| `sweepCover` | 橫條遮蓋 | Covered by a bar | graphic, editorial, pop |  |
| `shatterLite` | 四分飛散 | Shatter into quarters | pop, glitch |  |
| `peelOff` | 撕下貼紙 | Peel off sticker | pop, graphic | extra |
| `crumpleOut` | 揉成紙團丟掉 | Crumple and toss | pop, emotional | extra |
| `tearOut` | 撕掉 | Tear away | emotional, graphic | extra |
| `scorchOut` | 燒焦消失 | Scorch away | emotional, glitch | extra |
| `overexposeOut` | 過曝泛白 | Blow out to white | emotional, calm, pop | extra |
| `scanOut` | 掃描線消除 | Scanline erase | glitch, graphic | extra |
| `stripesOut` | 條紋消除 | Stripes out | graphic, pop | extra |
| `halftoneOut` | 化為網點 | Dissolve to halftone | graphic, calm | extra |
| `eraserOut` | 黑板擦擦掉 | Chalkboard erase | editorial, calm | extra |
| `vacuumOut` | 吸入一點 | Vacuum to a point | pop, graphic | extra |
| `sandOut` | 化沙飛散 | Scatter as sand | emotional, calm | extra |
| `shredOut` | 碎紙機 | Shred out | graphic, pop | extra |
| `dominoOut` | 骨牌倒下 | Domino out | pop, graphic | extra |
| `hingeOut` | 單邊脫落 | Loose hinge | pop, editorial | extra |
| `rocketOff` | 發射升空 | Rocket away | pop | extra |
| `bounceOff` | 彈跳離開 | Bounce off | pop | extra |
| `balloonOff` | 氣球飛走 | Float off like a balloon | emotional, calm, pop | extra |
| `deflateOut` | 洩氣飛走 | Deflate and fly | pop | extra |
| `hazeOut` | 消失於熱浪 | Haze out | emotional, calm | extra |
| `glassBreak` | 玻璃碎裂 | Break like glass | graphic, pop, glitch | extra |
| `zipOut` | 拉鍊 | Zip out | graphic, pop | extra |
| `clapShut` | 中央閉合 | Close at center | graphic, pop | extra |
| `lampOff` | 熄燈 | Lights out | glitch, emotional | extra |
| `slotOut` | 拉霸轉動 | Slot out | glitch, pop | extra |
| `clockOut` | 時鐘擦除 | Clock out | graphic, editorial | extra |
| `matrixOut` | 數位雨 | Digital rain | glitch | extra |
| `tornadoOut` | 龍捲風 | Tornado | pop | extra |
| `rollUpOut` | 捲起 | Roll up out | graphic, editorial | extra |
| `snakeOut` | 排隊離開 | Leave in a line | calm, pop | extra |
| `flutterOut` | 飄落 | Flutter down | emotional, calm | extra |
| `rollOff` | 滾走 | Roll off | pop | extra |
| `fanClose` | 收起扇子 | Folding fan closes | graphic, editorial, emotional | extra, wa |
| `rgbSplitOut` | 分色 | Split into RGB | glitch, pop | extra |
| `shockOut` | 衝擊波 | Shockwave | pop, graphic | extra |
| `floodOut` | 淹沒 | Submerge | emotional, calm | extra |
| `slashOut` | 一刀兩斷 | Sliced in two | graphic, emotional, pop | extra |
| `mosaicOut` | 馬賽克 | Mosaic out | glitch, graphic | extra |
| `scribbleOut` | 亂塗抹消 | Scribble away | editorial, emotional, pop | extra |
| `candleOut` | 吹熄 | Blow out | emotional, calm | extra |

## decor

**decor — decorations (0 to several per cut)** — 115 parts

| key | 中文 | English | tags | flags |
|---|---|---|---|---|
| `brackets` | 框角標記 | Corner marks | graphic, editorial |  |
| `rings` | 座標圓 | Coordinate rings | graphic, emotional |  |
| `dots` | 點狀圓環 | Dotted ring | pop, graphic |  |
| `arrows` | 箭頭 | Arrows | pop, graphic |  |
| `slash` | 斜線 | Slash | glitch, graphic |  |
| `sparks` | 火花 | Sparks | pop |  |
| `leaders` | 引線 | Leader lines | editorial, calm |  |
| `waveform` | 波形 | Waveform | emotional, calm |  |
| `barcode` | 條碼 | Barcode | glitch, graphic |  |
| `grid` | 網格 | Grid | graphic, editorial |  |
| `stripes` | 條紋 | Stripes | graphic, pop |  |
| `blobs` | 墨漬 | Ink stains | pop, emotional |  |
| `bars` | 粗糙色帶 | Rough bands | graphic, glitch |  |
| `shapes` | 幾何圖形 | Shapes | pop, graphic |  |
| `counter` | 大數字 | Large numbers | graphic, editorial |  |
| `crosshair` | 十字準線 | Crosshair | graphic, editorial, glitch |  |
| `cropMarks` | 裁切標記 | Crop marks | editorial, graphic, calm |  |
| `reticle` | 鎖定框 | Reticle | glitch, graphic |  |
| `radar` | 雷達 | Radar | glitch, graphic |  |
| `progressRing` | 進度環 | Progress ring | graphic, editorial, calm |  |
| `timecodeBar` | 時間碼 | Timecode bar | editorial, glitch, graphic |  |
| `rulerEdge` | 邊緣尺規 | Ruler edge | editorial, graphic, calm |  |
| `dimension` | 尺寸線 | Dimension | editorial, graphic |  |
| `indexNum` | 流水號 | Sequence number | editorial, graphic, calm |  |
| `dateStamp` | 相片日期 | Photo date stamp | emotional, pop, calm |  |
| `qrBlock` | QR 風格方塊 | QR inspired blocks | graphic, glitch, pop |  |
| `glitchRects` | 故障碎片 | Glitch rects | glitch |  |
| `concentricSquares` | 同心方框 | Concentric squares | graphic, calm, editorial |  |
| `triangleSpin` | 旋轉三角 | Triangle spin | graphic, pop, glitch |  |
| `lineBurst` | 放射線 | Line burst | pop, graphic, emotional |  |
| `plusGrid` | 十字網格 | Plus grid | graphic, editorial, calm |  |
| `guides` | 參考線 | Guide lines | editorial, graphic, calm |  |
| `waveLine` | 波浪線 | Wave line | calm, emotional, graphic |  |
| `spiralLine` | 漩渦 | Spiral line | graphic, pop, calm |  |
| `halftonePatch` | 網點 | Halftone patch | graphic, pop, editorial |  |
| `checkerStrip` | 棋盤格帶 | Checker strip | pop, graphic |  |
| `beatRing` | 節拍圓環 | Beat ring | pop, emotional, calm |  |
| `orbitDots` | 環繞圓點 | Orbit dots | calm, emotional, graphic |  |
| `constellation` | 星座 | Constellation | calm, emotional, editorial |  |
| `confetti` | 彩紙 | Confetti | pop, emotional |  |
| `petals` | 花瓣 | Petals | emotional, calm, pop | wa |
| `rainStreaks` | 雨絲 | Rain streaks | emotional, calm, glitch |  |
| `snow` | 雪 | Snow | calm, emotional |  |
| `lightLeak` | 漏光 | Light leak | emotional, calm, pop |  |
| `bokeh` | 散景光點 | Bokeh | emotional, calm, pop |  |
| `speedCorner` | 集中線 | Speed lines | pop, emotional, glitch |  |
| `risingParticles` | 上升粒子 | Rising particles | emotional, calm, glitch |  |
| `twinkle` | 閃爍星光 | Twinkle | pop, emotional, calm |  |
| `brushStroke` | 筆刷痕 | Brush stroke | emotional, editorial, pop | wa |
| `tapePieces` | 紙膠帶 | Masking tape | pop, emotional, editorial |  |
| `scribbleCircle` | 手繪圈 | Scribble circle | pop, emotional, editorial |  |
| `scribbleUnder` | 手繪底線 | Hand drawn underline | pop, emotional, editorial |  |
| `crossOut` | 推敲筆記 | Editorial marks | editorial, emotional |  |
| `highlightMark` | 螢光筆 | Highlight mark | pop, editorial, emotional |  |
| `heartsStars` | 愛心與星星 | Hearts stars | pop, emotional |  |
| `watermarkKanji` | 浮水印大字 | Large watermark character | editorial, emotional, calm |  |
| `verticalStrip` | 直書條 | Vertical text strip | editorial, calm, emotional |  |
| `romajiLine` | 羅馬字 | Romanized line | editorial, calm, graphic |  |
| `bracketsJP` | 方頭括號 | Japanese corner brackets | pop, graphic, editorial |  |
| `seal` | 落款 | Red seal | editorial, emotional, calm | wa |
| `kamon` | 家紋 | Family crest | editorial, calm, emotional | extra, wa |
| `seigaiha` | 青海波 | Seigaiha wave pattern | calm, emotional, editorial | extra, wa |
| `asanoha` | 麻葉紋 | Asanoha hemp leaf pattern | calm, editorial, emotional | extra, wa |
| `hanabi` | 煙火 | Fireworks | emotional, pop, calm | extra |
| `chochin` | 燈籠 | Paper lantern | emotional, pop, calm | extra, wa |
| `shimenawa` | 注連繩 | Sacred rope | editorial, emotional, calm | extra, wa |
| `sensu` | 扇子 | Folding fan | emotional, editorial, calm | extra, wa |
| `tsukiKumo` | 雲中月 | Moon and clouds | emotional, calm, editorial | extra, wa |
| `momiji` | 楓葉 | Maple leaves | emotional, calm | extra, wa |
| `namiGashira` | 浪頭 | Wave crest | emotional, editorial, graphic | extra, wa |
| `kasumi` | 霞 | Mist | calm, emotional, editorial | extra, wa |
| `hexGrid` | 六角網格 | Hex grid | glitch, graphic | extra |
| `spectrumRing` | 環形頻譜 | Spectrum ring | glitch, pop, graphic | extra |
| `dataColumns` | 資料列 | Data columns | glitch, editorial, graphic | extra |
| `spinner` | 載入中 | Spinner | glitch, pop, graphic | extra |
| `headingTape` | 方位刻度 | Heading tape | glitch, graphic, editorial | extra |
| `glyphLock` | 文字鎖定 | Glyph lock | glitch, graphic, editorial | extra |
| `atomOrbit` | 原子軌道 | Atom orbit | graphic, glitch, calm | extra |
| `sonarArcs` | 聲波 | Sonar arcs | pop, emotional, graphic | extra |
| `circuit` | 電路 | Circuit | glitch, graphic | extra |
| `swatches` | 色票 | Swatches | editorial, graphic | extra |
| `ruledLines` | 橫線筆記 | Ruled notebook | editorial, calm, emotional | extra |
| `registration` | 套準標記 | Registration marks | editorial, graphic, glitch | extra |
| `punchHoles` | 打孔 | Punch holes | editorial, calm, graphic | extra |
| `staple` | 釘書針 | Staple | editorial, pop, emotional | extra |
| `paperClip` | 迴紋針 | Paper clip | editorial, pop, emotional | extra |
| `indexTabs` | 索引標籤 | Index tabs | editorial, pop, graphic | extra |
| `vines` | 藤蔓 | Vines | emotional, calm, pop | extra |
| `cloudPuffs` | 雲朵 | Cloud puffs | calm, pop, emotional | extra |
| `starField` | 星空 | Star field | calm, emotional | extra |
| `moonPhases` | 月相 | Moon phases | calm, emotional, editorial | extra |
| `sunRays` | 陽光 | Sun rays | emotional, pop, calm | extra |
| `rainRipples` | 雨滴漣漪 | Rain ripples | calm, emotional | extra |
| `bubbles` | 肥皂泡 | Bubbles | pop, emotional, calm | extra |
| `smoke` | 煙 | Smoke | calm, emotional, editorial | extra |
| `dandelion` | 蒲公英 | Dandelion seeds | calm, emotional | extra |
| `fireflies` | 螢火蟲 | Fireflies | emotional, calm | extra |
| `memphis` | 孟菲斯 | Memphis | pop, graphic | extra |
| `zigzagRibbon` | 鋸齒緞帶 | Zigzag ribbon | pop, graphic | extra |
| `polkaPatch` | 圓點 | Polka patch | pop, graphic, calm | extra |
| `stripeCircle` | 條紋圓 | Stripe circle | graphic, pop | extra |
| `decoCorners` | 裝飾角 | Deco corners | editorial, graphic, calm | extra |
| `halfCircles` | 半圓堆疊 | Half circles | graphic, pop, calm | extra |
| `loopArrows` | 循環箭頭 | Loop arrows | graphic, pop, editorial | extra |
| `starburst` | 星芒 | Starburst | pop, graphic | extra |
| `tally` | 畫正字 | Tally marks | editorial, pop, emotional | extra |
| `cursorClick` | 游標 | Cursor click | pop, graphic, glitch | extra |
| `windowChrome` | 視窗 | Window frame | pop, graphic, glitch | extra |
| `progressBar` | 進度條 | Progress bar | pop, graphic, glitch | extra |
| `toggleSwitch` | 切換開關 | Toggle switch | pop, graphic | extra |
| `notifBell` | 通知 | Notification bell | pop, emotional | extra |
| `likeCounter` | 按讚數 | Like counter | pop, emotional | extra |
| `mediaControls` | 播放按鈕 | Playback controls | pop, graphic, emotional | extra |
| `volumeBars` | 音量 | Volume bars | pop, glitch, graphic | extra |
| `musicNotes` | 音符 | Music notes | pop, emotional, calm | extra |

## treat

**treat — text treatment (outline, extrude, offset…)** — 52 parts

| key | 中文 | English | tags | flags |
|---|---|---|---|---|
| `none` | 無 | None |  |  |
| `outline` | 空心字 | Hollow letters | graphic, pop, glitch, emotional |  |
| `outlineFill` | 描邊 | Outlined text | pop, graphic |  |
| `doubleOutline` | 雙層描邊 | Double outline | pop, graphic |  |
| `extrude` | 立體字 | Extruded text | pop, graphic |  |
| `longShadow` | 長陰影 | Long shadow | pop, graphic |  |
| `hardShadow` | 錯位陰影 | Hard shadow | pop, graphic, glitch |  |
| `softShadow` | 柔和陰影 | Soft shadow | calm, emotional, editorial |  |
| `glow` | 發光 | Glow | emotional, calm, glitch |  |
| `marker` | 螢光筆 | Marker highlight | pop, graphic, editorial |  |
| `underline` | 底線 | Underline | editorial, calm, graphic |  |
| `strike` | 刪除線 | Strikethrough | glitch, editorial, emotional |  |
| `boxed` | 方框字 | Boxed text | graphic, editorial, pop |  |
| `gradientV` | 垂直漸層 | Vertical gradient | emotional, pop |  |
| `splitColor` | 上下雙色 | Two tone split | pop, graphic |  |
| `halftone` | 網點 | Halftone | pop, graphic |  |
| `stripes` | 條紋 | Stripes | pop, graphic |  |
| `hatch` | 斜線 | Hatch | graphic, editorial, glitch |  |
| `dotted` | 點線輪廓 | Dotted outline | calm, editorial, graphic |  |
| `alternate` | 交錯配色 | Alternating colors | pop, graphic |  |
| `italic` | 斜體 | Italic | editorial, pop, emotional |  |
| `wide` | 扁平字 | Wide letters | graphic, pop |  |
| `tall` | 瘦長字 | Tall letters | editorial, calm, graphic, emotional |  |
| `echoOutline` | 輪廓殘響 | Echoed outline | glitch, emotional, graphic |  |
| `emphasisDots` | 著重號 | Emphasis dots | editorial, emotional, calm |  |
| `neonOutline` | 霓虹燈管 | Neon tubing | glitch, emotional, pop | extra |
| `chrome` | 鍍鉻 | Chrome | pop, graphic | extra |
| `rainbow` | 彩虹色 | Rainbow | pop, emotional | extra |
| `glitchSplit` | 色版錯位 | Misregistered colors | glitch, pop | extra |
| `shadowStack` | 多重陰影 | Shadow stack | pop, graphic | extra |
| `stencilGap` | 鏤空字 | Stencil gaps | graphic, editorial, glitch | extra |
| `waterline` | 水位 | Waterline | emotional, pop, calm | extra |
| `karaoke` | 卡拉 OK | Karaoke | emotional, pop, editorial | extra |
| `sizeWave` | 大小節奏 | Rhythmic letter sizes | pop, graphic, editorial | extra |
| `rotateAlt` | 搖擺字 | Alternating angles | pop, emotional | extra |
| `baselineShift` | 高低錯落 | Staggered baseline | pop, graphic | extra |
| `fauxBold` | 超粗 | Extra bold | graphic, pop, editorial | extra |
| `circled` | 圓圈字 | Circled letters | pop, graphic, editorial | extra |
| `bracketsQuote` | 引號 | Quotation marks | editorial, emotional, calm | extra |
| `reflection` | 倒影 | Reflection | emotional, calm, editorial | extra |
| `inline` | 內框線 | Inline | editorial, pop, graphic | extra |
| `sticker` | 貼紙描邊 | Sticker outline | pop, graphic | extra |
| `gradientSweep` | 光澤掃過 | Gradient sweep | pop, emotional | extra |
| `kerningWide` | 寬字距 | Wide letter spacing | editorial, calm, emotional | extra |
| `monoGrid` | 稿紙風 | Manuscript grid | editorial, calm, emotional | extra, wa |
| `outlineOffset` | 錯位空心字 | Offset outline | pop, graphic, editorial | extra |
| `toneShadow` | 網點陰影 | Halftone shadow | pop, graphic, editorial | extra |
| `fadeChars` | 餘韻 | Fading letters | emotional, calm | extra |
| `cutShift` | 切割錯位 | Offset cut | graphic, glitch, pop | extra |
| `focusPull` | 模糊移焦 | Focus shift | emotional, calm, editorial | extra |
| `spotChar` | 單字標記 | Highlighted character | pop, graphic, editorial, emotional | extra |
| `ransom` | 剪貼字 | Cutout letters | pop, glitch, graphic | extra |

## bg

**bg — background graphic (one per line)** — 62 parts

| key | 中文 | English | tags | flags |
|---|---|---|---|---|
| `none` | 素色 | Solid color |  |  |
| `auroraRibbons` | 極光 | Aurora ribbons | emotional, calm | extra |
| `meshBlobs` | 網格漸層 | Mesh blobs | calm, emotional, pop | extra |
| `duotoneSweep` | 雙色掃動 | Duotone sweep | calm, pop, graphic, emotional | extra |
| `horizonGlow` | 行星邊緣 | Horizon glow | emotional, calm, editorial | extra |
| `seigaiha` | 青海波 | Seigaiha waves | calm, editorial, graphic | extra, wa |
| `asanoha` | 麻葉紋 | Asanoha pattern | calm, editorial, graphic, emotional | extra, wa |
| `houndstooth` | 千鳥格 | Houndstooth | graphic, editorial, pop | extra |
| `herringbone` | 人字紋 | Herringbone | editorial, calm, graphic | extra |
| `argyle` | 菱格紋 | Argyle | pop, graphic, editorial | extra |
| `tartan` | 蘇格蘭格紋 | Tartan | pop, calm, editorial | extra |
| `chevron` | V 形紋 | Chevron | pop, graphic | extra |
| `isoCubes` | 立方體 | Iso cubes | graphic, pop, calm | extra |
| `hexGrid` | 六角網格 | Hex grid | graphic, glitch, calm | extra |
| `triTess` | 三角馬賽克 | Tri tess | graphic, calm, emotional | extra |
| `moire` | 摩爾紋 | Moire | glitch, graphic, calm | extra |
| `squareTunnel` | 方形隧道 | Square tunnel | glitch, graphic, pop | extra |
| `spiralArms` | 漩渦 | Spiral arms | glitch, pop, graphic | extra |
| `topoLines` | 等高線 | Contour lines | calm, editorial, graphic | extra |
| `ridgePlot` | 山脊線圖 | Mountain ridges | editorial, emotional, calm | extra |
| `starfield` | 星空 | Starfield | emotional, calm | extra |
| `nightMoon` | 月夜 | Moonlit night | emotional, calm, editorial | extra |
| `skyline` | 街景 | Skyline | emotional, editorial, pop | extra |
| `sunsetSun` | 夕陽 | Sunset sun | emotional, calm, pop | extra |
| `oceanWaves` | 海浪 | Ocean waves | calm, emotional, editorial | extra |
| `rainWindow` | 雨窗 | Rain window | emotional, calm, editorial | extra |
| `snowLayers` | 雪 | Snow layers | calm, emotional | extra |
| `fireworks` | 煙火 | Fireworks | pop, emotional | extra |
| `cloudLayers` | 雲 | Cloud layers | calm, emotional, pop | extra |
| `mountains` | 山巒 | Mountains | calm, emotional, editorial | extra |
| `filmStrip` | 底片 | Filmstrip | editorial, emotional, glitch | extra |
| `vhsBand` | VHS 雜訊 | VHS noise band | glitch, emotional | extra |
| `tornPaper` | 撕紙 | Torn paper | editorial, emotional, pop | extra |
| `godRays` | 光芒 | Light rays | emotional, calm, editorial | extra |
| `vignettePulse` | 彩色暗角 | Pulsing vignette | emotional, calm, pop | extra |
| `kaleidoscope` | 萬花筒 | Kaleidoscope | pop, glitch, emotional | extra |
| `marble` | 大理石 | Marble | calm, editorial, emotional | extra |
| `paperCut` | 剪紙 | Paper cutout | pop, emotional, calm | extra |
| `sunburst` | 放射 | Sunburst | pop, graphic |  |
| `concentric` | 同心圓 | Concentric | calm, graphic, emotional |  |
| `halftoneFade` | 網點漸層 | Halftone fade | pop, graphic, editorial |  |
| `bigStripes` | 大斜紋 | Big stripes | graphic, pop |  |
| `splitV` | 左右雙色 | Vertical color split | graphic, editorial, pop |  |
| `splitH` | 上下雙色 | Horizontal color split | graphic, editorial, calm |  |
| `splitDiag` | 斜向雙色 | Diagonal color split | graphic, pop |  |
| `gradientSweep` | 漸層 | Gradient sweep | calm, emotional, pop |  |
| `spotlight` | 聚光燈 | Spotlight | emotional, calm, editorial |  |
| `tvBars` | 電視彩條 | TV color bars | glitch, graphic, emotional |  |
| `checker` | 棋盤格 | Checker | graphic, pop |  |
| `bigChar` | 巨大文字 | Oversized letters | editorial, emotional, graphic, calm |  |
| `speedLines` | 集中線 | Speed lines | pop, emotional, graphic |  |
| `scanBars` | 掃描線帶 | Scan bars | calm, glitch, editorial |  |
| `dotGrid` | 點狀網格 | Dot grid | calm, editorial, graphic |  |
| `retroGrid` | 復古網格 | Retro grid | pop, glitch, graphic |  |
| `bokehBg` | 散景光點 | Bokeh | emotional, calm, pop |  |
| `particlesBg` | 飛舞粒子 | Floating particles | emotional, calm, pop |  |
| `ripples` | 漣漪 | Ripples | calm, emotional, graphic |  |
| `polka` | 圓點 | Polka | pop, graphic |  |
| `eqBars` | 背景等化器 | Equalizer bars | pop, glitch, graphic |  |
| `borderFrame` | 粗框 | Border frame | graphic, pop, editorial |  |
| `letterbox` | 電影黑邊 | Cinema letterbox | emotional, editorial, calm |  |
| `noiseField` | 雜訊擾動 | Moving noise | glitch, emotional |  |

## cam

**cam — camera move** — 28 parts

| key | 中文 | English | tags | flags |
|---|---|---|---|---|
| `push` | 緩慢推近 | Slow push in | calm, editorial, emotional, graphic, pop, glitch |  |
| `orbitDrift` | 環繞 | Orbit drift | calm, emotional, graphic | extra |
| `barrelRoll` | 桶滾 | Barrel roll | pop, glitch, graphic | extra |
| `pendulumSway` | 鐘擺 | Pendulum sway | emotional, pop, calm | extra |
| `focusIn` | 對焦 | Focus in | emotional, calm, editorial | extra |
| `rackFocus` | 失焦 | Rack focus | emotional, calm, editorial | extra |
| `earthquake` | 地震 | Earthquake | glitch, pop, emotional | extra |
| `floatNoise` | 漂浮 | Floating camera | calm, emotional | extra |
| `vertigo` | 暈眩變焦 | Dolly zoom | emotional, glitch | extra |
| `tiltDown` | 鏡頭下搖 | Tilt down | calm, editorial, emotional | extra |
| `spiralIn` | 漩渦變焦 | Spiral zoom | pop, graphic, emotional | extra |
| `snapPan` | 快速橫搖 | Snap pan | pop, glitch, graphic | extra |
| `jelly` | 果凍晃動 | Elastic wobble | pop, graphic | extra |
| `pullOut` | 拉遠 | Pull out | calm, emotional, editorial |  |
| `panL` | 向左橫搖 | Pan left | calm, editorial, emotional, graphic |  |
| `panR` | 向右橫搖 | Pan right | calm, editorial, emotional, graphic |  |
| `tiltUp` | 鏡頭上搖 | Tilt up | calm, emotional, editorial |  |
| `dutch` | 斜角鏡頭 | Dutch angle | emotional, glitch, graphic |  |
| `handheld` | 手持 | Handheld | emotional, calm, editorial |  |
| `beatPunch` | 隨拍放大 | Zoom on beat | pop, glitch, graphic |  |
| `whipIn` | 急甩推入 | Whip in | pop, glitch, graphic |  |
| `crashZoom` | 急速變焦 | Crash zoom | pop, glitch, emotional |  |
| `bounce` | 彈跳 | Bounce | pop, graphic |  |
| `roll` | 滾轉 | Roll | emotional, calm, glitch |  |
| `driftDiag` | 斜向漂移 | Diagonal drift | calm, emotional, editorial, graphic |  |
| `shakeHard` | 劇烈搖晃 | Strong shake | glitch, pop, emotional |  |
| `dollyIn` | 推軌 | Dolly in | emotional, calm, editorial |  |
| `stepZoom` | 分段變焦 | Stepped zoom | pop, graphic, glitch |  |

## fx

**fx — screen effects (flash, glitch and other events)** — 66 parts

| key | 中文 | English | tags | flags |
|---|---|---|---|---|
| `chroma` | 色彩錯位跳動 | Chromatic jump | glitch, emotional, pop, graphic |  |
| `shake` | 搖晃 | Shake | pop, glitch, emotional |  |
| `slice` | 切片故障 | Slice glitch | glitch |  |
| `block` | 區塊故障 | Block glitch | glitch |  |
| `invert` | 反轉 | Invert | glitch, graphic |  |
| `flash` | 閃光 | Flash | pop, emotional, glitch |  |
| `zoom` | 縮放模糊 | Zoom blur | pop, emotional |  |
| `mosaic` | 馬賽克 | Mosaic | glitch |  |
| `radialChroma` | 放射色差 | Radial color fringing | glitch, emotional, pop | extra |
| `bloomFlash` | 光暈 | Bloom flash | pop, emotional, calm | extra |
| `bulge` | 魚眼 | Fisheye distortion | pop, graphic, glitch | extra |
| `pixelSort` | 像素排序 | Pixel sort | glitch | extra |
| `interlace` | 交錯掃描 | Interlace | glitch, emotional | extra |
| `macroBlock` | 區塊雜訊 | Compression blocks | glitch | extra |
| `halftone` | 網點 | Halftone | pop, graphic, editorial | extra |
| `duotone` | 雙色調 | Duotone | pop, emotional, graphic | extra |
| `ditherBit` | 1 位元遞色 | 1 bit dither | glitch, graphic, pop | extra |
| `rotateSnap` | 角度急轉 | Angle snap | pop, graphic, glitch | extra |
| `echoFrames` | 殘影回聲 | Frame echoes | emotional, pop, glitch | extra |
| `kaleido` | 萬花筒 | Kaleidoscope | pop, graphic, emotional | extra |
| `bandInvert` | 帶狀反轉 | Inverted band | glitch, graphic | extra |
| `lightRays` | 光芒 | Light rays | emotional, pop, calm | extra |
| `anamorphic` | 橫向光斑 | Anamorphic flare | emotional, pop, calm | extra |
| `heartbeat` | 心跳 | Heartbeat | emotional, calm | extra |
| `tvStatic` | 雪花雜訊 | TV static | glitch, emotional | extra |
| `dustScratches` | 底片刮痕 | Film scratches | emotional, calm, editorial | extra |
| `filmAdvance` | 底片捲動 | Film advance | emotional, editorial, calm | extra |
| `perspectiveTilt` | 透視搖晃 | Perspective tilt | pop, graphic, emotional | extra |
| `ripple` | 漣漪 | Ripple | emotional, calm, pop | extra |
| `focusLines` | 集中線 | Focus lines | pop, graphic, emotional | extra |
| `speedLines` | 速度線 | Speed lines | pop, graphic | extra |
| `starGlint` | 星芒閃光 | Star glint | pop, emotional | extra |
| `colorBars` | 彩條 | Color bars | pop, graphic, glitch | extra |
| `zoomStutter` | 連續縮放 | Zoom stutter | pop, graphic, glitch | extra |
| `negativeRing` | 反轉圓環 | Inverted ring | graphic, pop, glitch | extra |
| `edgeDetect` | 邊緣偵測 | Edge detect | graphic, glitch, editorial | extra |
| `shatter` | 玻璃碎裂 | Glass shatter | glitch, pop, emotional | extra |
| `defocus` | 失焦 | Out of focus | emotional, calm, editorial | extra |
| `snapshot` | 快門 | Snapshot | pop, emotional, editorial | extra |
| `squash` | 伸縮 | Squash | pop, graphic | extra |
| `scanBar` | 掃描 | Scan bar | graphic, editorial, glitch | extra |
| `loopScroll` | 橫向循環 | Loop scroll | pop, graphic, glitch | extra |
| `panelWipe` | 面板擦除 | Panel wipe | pop, graphic |  |
| `irisTrans` | 光圈 | Iris trans | pop, editorial |  |
| `doors` | 門 | Doors | graphic, pop |  |
| `blindsTrans` | 百葉窗 | Blinds trans | graphic, editorial |  |
| `rgbSplit` | RGB 分離 | RGB separation | glitch, emotional |  |
| `smear` | 橫向拖影 | Smear | glitch |  |
| `vhsRoll` | VHS 滾動 | VHS roll | glitch, emotional |  |
| `trackingNoise` | 磁軌雜訊 | Tracking noise | glitch, emotional |  |
| `mirrorFlash` | 鏡像 | Mirror flash | glitch, graphic |  |
| `strobe` | 頻閃 | Strobe | glitch, pop |  |
| `posterize` | 色調分離 | Posterization | glitch, pop, graphic |  |
| `hueShift` | 色相偏移 | Hue shift | glitch, pop, emotional |  |
| `tileShift` | 磁磚錯位 | Tile shift | glitch, graphic |  |
| `filmBurn` | 底片燒灼 | Film burn | emotional, calm, editorial |  |
| `whipBlur` | 急甩模糊 | Whip blur | pop, graphic, emotional |  |
| `blackFrame` | 黑畫格 | Black frame | editorial, emotional, glitch |  |
| `whiteFrame` | 白畫格 | White frame | emotional, pop |  |
| `gridRepeat` | 分割畫面 | Grid repeat | pop, graphic, glitch |  |
| `waveWarp` | 波浪扭曲 | Wave warp | emotional, glitch |  |
| `pixelDrift` | 像素偏移 | Pixel drift | glitch |  |
| `zoomPunch` | 縮放重擊 | Zoom punch | pop, graphic, glitch |  |
| `lightSweep` | 光束掃過 | Light sweep | pop, emotional, calm |  |
| `crtOff` | 映像管關機 | CRT powers off | glitch, emotional |  |
| `splitSlide` | 上下滑移 | Split slide | graphic, pop, glitch |  |

## trans

**trans — transition between cuts** — 20 parts

| key | 中文 | English | tags | flags |
|---|---|---|---|---|
| `wipe` | 邊緣擦除 | Edge wipe | graphic, editorial, pop | extra |
| `diagonalWipe` | 斜帶擦除 | Diagonal band wipe | pop, graphic | extra |
| `clockWipe` | 時鐘擦除 | Clock wipe | graphic, pop, editorial | extra |
| `irisOpen` | 光圈開啟 | Iris opens | emotional, pop, editorial | extra |
| `pushSlide` | 推移 | Push | graphic, pop, editorial | extra |
| `cover` | 覆蓋 | Cover | editorial, graphic, calm | extra |
| `uncover` | 揭開 | Uncover | editorial, calm, emotional | extra |
| `zoomThrough` | 穿越縮放 | Zoom through | pop, emotional, glitch | extra |
| `doorsOpen` | 對開門 | Double doors | graphic, pop, emotional | extra |
| `blinds` | 百葉窗轉場 | Blinds | graphic, editorial, calm | extra |
| `checker` | 棋盤格轉場 | Checkerboard | pop, graphic | extra |
| `blockDissolve` | 方塊崩解 | Block dissolve | glitch, graphic | extra |
| `whipPan` | 急甩橫搖 | Whip pan | pop, emotional, glitch | extra |
| `spinOut` | 旋轉轉出 | Spin out | pop, glitch | extra |
| `inkBlob` | 墨漬 | Ink blot | emotional, calm, pop | extra |
| `shatterTiles` | 磁磚崩落 | Shattering tiles | glitch, pop, emotional | extra |
| `sliceShift` | 長條錯位 | Sliding strips | glitch, graphic, pop | extra |
| `cubeTurn` | 立方體 | Cube turn | graphic, pop | extra |
| `flashCross` | 閃光轉場 | Flash cut | emotional, pop, calm | extra |
| `pixelate` | 馬賽克轉場 | Pixel transition | glitch, pop | extra |
