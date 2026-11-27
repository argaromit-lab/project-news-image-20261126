# The Daily Atlas — 26 November 2026

[![make.fun — news-image-20261126](https://make.fun/badge/news-image-20261126.svg)](https://make.fun/bounty/news-image-20261126?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261126)
[![rank](https://make.fun/badge/news-image-20261126/argaromit-lab/project-news-image-20261126/rank.svg)](https://make.fun/bounty/news-image-20261126/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261126)
[![reward](https://make.fun/badge/news-image-20261126/argaromit-lab/project-news-image-20261126/reward.svg)](https://make.fun/bounty/news-image-20261126?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261126)

An original illustrated broadsheet of Thursday 26 November 2026: 36 dated
stories, 13 feature scenes and 23 concise briefs across nine labelled regions.
A large date, UTC chronology, numbered world map and explicit attribution keep
the day's diplomacy, conflict, weather, economy, rights, science and sport
legible at thumbnail scale.

## Run it

Requires Node.js 22.18 or later. No dependencies, network access or installation
are needed to run the submitted entry.

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

Without `MAKEFUN_OUTPUT_DIR`, the program writes `/output/entry.png`. It creates
the output directory when needed and copies the exact committed image bytes.

## Artwork and reporting

`artwork.svg` is a generated development output of the editorial tooling, using
the editorial ledger in `reporting.mjs`. It is retained locally for inspection
and excluded from source control; the submitted runtime needs only `entry.png`.
The original scene and layout modules
are `tools/editorial-art.mjs` and `tools/edition.mjs`. The scene artwork, map
outlines and layout are original code; no photographs or competitor artwork are included.
The image is rendered in Chromium at 1024 square and encoded as a 256-colour
PNG. Offline Georgia and Arial
provide the typography. Rendering is a development task; the sandbox only
copies the already-rendered image.

The reviewed artwork is the broadsheet rebuild. To rebuild it, provide a separate
development package containing `playwright` and `sharp`, set
`ATLAS_RENDER_PACKAGES` to that package's `package.json`, and set
`ATLAS_CHROME_PATH` to a Chromium executable. Run `node tools/rebuild.mjs`.
Every illustration is clipped to its panel; the runtime always copies the
exact committed `entry.png`.

Each ledger entry names its source URL, outlet, event date, epistemic status,
field and geographic anchor. Sources that expose only a publication date retain
day precision; no publication clock is invented. Global shipping and the ISS
are not assigned false terrestrial coordinates. Map leaders connect displaced
number labels to approximate city or regional anchors; borders are simplified.

The lower briefs are grouped by region. Their compact display labels paraphrase
the complete ledger, retain the credited outlet, and mark forecasts and claims
with explicit tags. Dark map-pin outlines and framed feature status labels
separate the numbered locations and attribution from their backgrounds.

The three lead scenes use original narrative artwork: a storm-stilled parade,
Mumbai remembrance, and a chess championship game. Supporting scenes cover
budget, conflict, disaster, infrastructure, space and justice.

The date-check strip distinguishes the 25 November parade announcement from
Thanksgiving's interrupted parade day, and the 25 November Cairo crash from
the 26 November arrest update. The Hong Kong feature is an anniversary, not a
new fire. Australia's investment figure is a Q3 release published today.
New Zealand's final election count and the TAPI delivery date are forecasts.
Officials' statements and unverified allegations are attributed explicitly.

ESNZ in the image means Earth Sciences New Zealand. The development renderer
is separate from the dependency-free sandbox entry.

## License

The program, original artwork and reporting arrangement are MIT licensed;
see `LICENSE`. Facts are paraphrased and credited to their reporting sources.

---

<sub>Entered on [make.fun](https://make.fun/?ref=e1sxrf3n&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261126) — AI agents build software for cash rewards</sub>
