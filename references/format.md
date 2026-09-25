# `.jizura.json` 格式說明

JIZURA 網頁版用「開啟」讀進這個檔案時，會先放入預設值，再用檔案裡的欄位覆蓋。所以**只需要寫你想改的欄位**，沒寫的都會用預設值。不認得的欄位和零件代號會被忽略，不會讓網頁出錯。

所有零件、風格、字型的代號都在 `catalog.md`，**不要自己發明代號**：寫錯的代號不會報錯，只會悄悄失效，使用者也看不出原因。

## 目錄

1. [一個完整的例子](#1-一個完整的例子)
2. [歌詞 lyrics](#2-歌詞-lyrics)
3. [基本欄位](#3-基本欄位)
4. [滑桿 fx](#4-滑桿-fx)
5. [零件開關 enabled / only](#5-零件開關-enabled--only)
6. [逐行指定 overrides](#6-逐行指定-overrides)
7. [配色 colors](#7-配色-colors)
8. [字型 fonts](#8-字型-fonts)
9. [時間軸 timing](#9-時間軸-timing)
10. [交出去之前的自我檢查](#10-交出去之前的自我檢查)

## 1. 一個完整的例子

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

`only` 是本工具的簡寫，JIZURA 本身看不懂，交出去之前要展開成 `enabled`（見第 5 節）。

## 2. 歌詞 lyrics

一行就是一句。字串裡用 `\n` 換行。

| 寫法 | 效果 |
|---|---|
| `我還記得/黎明的顏色` | `/` 手動指定畫面切換的位置 |
| `*透明*` | 強調這個詞：字放大，用比較有衝擊感的效果 |
| 句尾 `!` | 閃光加畫面搖晃。**只認半形 `!`**，全形「！」會被當成一般文字，不會觸發 |
| `歌詞\|註解` | `\|` 後面的文字會在註解類版面裡以小字出現 |
| `[01:23.45]歌詞` | LRC 時間標記，這一句從 1 分 23.45 秒開始。同一句可以接好幾個時間（重複的副歌） |
| `[間奏]`、`[間奏 8]` | 間奏：沒有歌詞，只有背景和裝飾，`8` 是秒數。也接受 `[间奏]`、`[interlude]` |
| `[ti:曲名]`、`[ar:歌手]` | LRC 的曲名和歌手標記 |
| 空行 | 前後兩句之間留一點空白 |
| `#` 開頭的行 | 註解，會被忽略 |

**不要自己寫出受著作權保護的歌詞。** 使用者提供的歌詞照用即可；如果使用者只說了歌名，請他自己貼上歌詞。

使用者給的歌詞要**逐字**放進 `lyrics`，包括上表所有標記。不要為了「保險」刪掉 `[ti:]` 或把它搬到 `title`：JIZURA 讀得懂它，而且它不算進行號。

## 3. 基本欄位

| 欄位 | 可用的值 | 說明 |
|---|---|---|
| `title`、`artist` | 文字 | 會出現在標題卡和 HUD 上 |
| `lang` | `auto`、`ja`、`zh-Hant`、`zh-Hans`、`ko`、`en` | 歌詞語言，決定用哪一套字型。中文歌建議直接寫明 |
| `style` | catalog.md 的風格代號 | 配色加字型的組合 |
| `mood` | catalog.md 的氛圍代號，或 `null` | **只是標籤**，程式規劃時不會讀它。要得到該氛圍的感覺，必須照第 4、5 節寫 `fx` 和零件開關 |
| `extra` | `true` / `false`（預設 `false`） | 是否讓「首次公開版之後新增」的零件和風格被隨機選到。catalog.md 裡標 `extra` 的零件，要設成 `true` 才會出現 |
| `wa` | `true` / `false`（預設 `true`） | 是否讓和風零件（燈籠、障子、家紋等）被隨機選到。現代、西式或陰暗的題材建議設 `false` |
| `seed` | 整數 | 同一個數字，結果完全相同；換一個數字就換一種編排 |
| `aspect` | `16:9`、`9:16`、`4:3`、`3:4`、`1:1`、`4:5`、`21:9` | 畫面比例。短影音用 `9:16` |
| `res` | `720`、`1080`、`1440`、`2160` | 輸出解析度 |
| `keyBg` | `off`、`green`、`black` | 合成用背景：綠幕或黑底，只畫白色文字和效果 |

## 4. 滑桿 fx

| 欄位 | 範圍 | 意思 |
|---|---|---|
| `motion` | 0–1 | 動作的幅度和速度。陰鬱、抒情的歌往下調 |
| `glitch` | 0–1 | 故障效果的量 |
| `chroma` | 0–1 | 色彩錯位 |
| `decor` | 0–1 | 裝飾的量 |
| `density` | 0–1 | 片段的細碎程度：越高，一句歌詞被切成越多個畫面 |
| `texture` | 0–1 | 顆粒、紙紋等質感 |
| `bgSwitch` | 0–1 | 背景更換的頻率 |
| `flash` | `true` / `false` | 是否使用閃光 |
| `koma` | `0`、`12`、`8` | 每秒畫幾張：`0` 完全流暢，`12` 一拍二（動畫手感），`8` 一拍三 |
| `hud` | `auto`、`on`、`off` | 畫面四角的 HUD 資訊 |

想要某個氛圍的感覺時，照 catalog.md「氛圍」表的範圍取值。例如故障風：`motion` 0.6–0.9、`glitch` 0.75–1。混合兩種感覺時，可以自己在範圍之間取捨。

## 5. 零件開關 enabled / only

JIZURA 從「開著的零件」裡隨機挑選。規則是：**沒有明確寫 `false` 的零件都算開著。** 所以要「只用某幾個」，就得把同一類裡其他所有零件都寫成 `false`。

`enabled` 的形狀：

```json
"enabled": { "exit": { "cut": true, "explode": true, "blur": false, "...（該類其餘每個代號）": false } }
```

這很長，所以本工具提供簡寫 `only`，列出每一類「只用這些」：

```json
"only": { "exit": ["explode", "glassBreak", "shredOut"], "fx": ["shatter", "tvStatic"] }
```

- **能執行程式時**：寫 `only`，再執行 `node scripts/finalize.js draft.json 曲名.jizura.json`。腳本會展開成 `enabled`，並檢查所有規則。
- **不能執行程式時**（例如在聊天介面裡）：自己展開。`references/enabled-all.json` 裡每一類一行，列出該類**所有代號**且都是 `true`。對 `only` 裡的每一類，複製那一行放進 `enabled`，再把沒列在 `only` 裡的改成 `false`。展開完就刪掉 `only`，因為 JIZURA 看不懂它。沒有要篩選的類別不用複製。

**建議遵守的規則**：這是 JIZURA 自己「隨機生成」時的做法。違反了程式也不會壞，但影片品質會變差。

1. **每類至少留一定數量**，否則影片會一直重複同樣的效果：版面 layout ≥ 6、進場 enter ≥ 5、退場 exit ≥ 5、停留 hold ≥ 3、裝飾 decor ≥ 6、文字處理 treat ≥ 4、背景 bg ≥ 4、運鏡 cam ≥ 3、畫面效果 fx ≥ 4、轉場 trans ≥ 3。
   - 計算時要扣掉「`extra` 零件但 `"extra": false`」和「`wa` 零件但 `"wa": false`」的，因為那些不會被選到。
2. **這幾個保持開著**：`enter.cut`、`exit.cut`、`hold.still`、`treat.none`、`bg.none`、`cam.push`。它們是最樸素的選項，很短的片段需要直接切換時會用到。`finalize.js` 展開 `only` 時會自動補上。
3. 不需要限制的類別就整類不寫，全部維持開著。

真正要避免的是**代號寫錯**：寫錯的代號不會報錯，只會悄悄失效。

**怎麼挑零件**：看 catalog.md 的中文名和 English 名判斷。`tags` 只有作者定義的 7 種氛圍，所以像「陰森」這類不在其中的感覺，要靠名稱判斷：保留「碎裂、崩落、雜訊、閃爍」這類，避開「泡泡、貼紙、站名牌」這類明亮可愛或生活化的。**版面 layout 對整體氣氛影響最大**，想要統一的調性時，一定要連版面一起篩選。

## 6. 逐行指定 overrides

要讓某一句固定用某個效果時使用。key 是**從 0 開始的行號**，只計算真正的歌詞行；空行、`#` 註解、`[ti:]` 這類標記都不算，有 LRC 時間標記時則依時間排序。

```json
"overrides": {
  "3": { "exit": "glassBreak", "layout": "huge" },
  "5": { "single": true }
}
```

可用的欄位：`layout`、`enter`、`hold`、`exit`、`treat`、`bg`、`cam`、`trans`（各填一個代號），`decor`（代號陣列），`single: true`（這一句不切，整句用一個畫面）。逐行指定的零件就算在 `enabled` 裡被關掉也會使用。

## 7. 配色 colors

```json
"colors": { "enabled": true, "bg": "#0A0404", "fg": "#E8DCDC", "sub": "#8C6F6F",
            "accentOn": true, "accent": "#C8102E", "ghostA": "#7A0010", "ghostB": "#FF2A2A" }
```

- `enabled: true` 時，`bg`（背景）、`fg`（文字）、`sub`（次要文字）才會生效，而且只會替換風格裡的主要配色。
- `accentOn: true` 時，`accent`（強調色）和 `ghostA`、`ghostB`（色彩錯位的兩個顏色）才會生效，會套用到所有配色。程式會自動調整亮度來確保對比度。
- 顏色一律寫成 `#RRGGBB`。
- 風格本身的配色已經很接近需求時，就不要寫 `colors`。

## 8. 字型 fonts

```json
"fonts": { "display": "gothic_black", "serif": "mincho_black", "body": "gothic_med" }
```

`display`（標題級的大字）、`serif`（明體）、`body`（內文），代號見 catalog.md。歌詞是中文時，程式會自動換成對應的繁中或簡中字型，所以選代號時只要看它的「類型」（黑體、明體、圓體、手寫……）就好。不寫的話就用風格內建的字型。

## 9. 時間軸 timing

大部分情況**不需要寫**。使用者在網頁上匯入音樂後，程式會自動偵測節拍並對齊；也可以用「點擊對拍」手動對。

使用者有提供每句的時間時，建議寫成歌詞裡的 LRC 標記 `[mm:ss.xx]`，比 `timing.lineTimes` 直觀。`timing` 可用的欄位：`bpm`（0 = 自動）、`offset`（秒）、`snap`（是否吸附節拍）、`tail`（最後一句之後留幾秒）、`lineTimes`（`{"行號": 秒數}`）、`lineScale`（每句長度的倍率）。

## 10. 交出去之前的自我檢查

- [ ] 是合法的 JSON：沒有註解、沒有結尾多餘的逗號，字串裡的換行寫成 `\n`
- [ ] 所有代號都能在 catalog.md 找到
- [ ] 歌詞和使用者給的逐字相同，標記都還在
- [ ] 句尾要閃光的地方用的是半形 `!`
- [ ] 有用到 `extra` 零件或風格 → `"extra": true`；不要和風 → `"wa": false`
- [ ] 每類零件的數量有達到建議的下限，建議開著的 6 個都開著
- [ ] 已經沒有 `only`（能執行程式就交給 `finalize.js`，不能就自己展開）
- [ ] 想要的氛圍已經寫進 `fx`，沒有只寫 `mood`
