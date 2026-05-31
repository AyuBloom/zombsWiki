---
title: _MakeBlendField Deep Dive - zombs.io Wiki
head:
  - - meta
    - property: 'og:title'
      content: _MakeBlendField Deep Dive - zombs.io Wiki
  - - meta
    - name: description
      content: Diving into the inner workings of `_MakeBlendField`.
  - - meta
    - property: 'og:description'
      content: Diving into the inner workings of `_MakeBlendField`.
---
# `_MakeBlendField` Deep Dive

::: warning
This section of the documentation is incomplete.
:::

::: info
This article is a minor rewording of the original `_MakeBlendField` in-depth analysis written by [benji / symere](https://github.com/symerebysil). You can find it in this [GitHub Gist](https://gist.github.com/symerebysil/e385752d8a4549512ffb08ed098f3871#file-08_i_dont_understand-md).
:::

## History

### All releases

| # | Date | Details | Size |
|--|---|---|---|
| 1 | 2021-04-27 | *"Add a challenge / response system to help cut down on bot connections"* | 23.8 KiB |
| 2 | 2021-11-15 | *"Reduce bot flooding with challenge / response upgrades"* | 24.2 KiB |
| 3 | 2022-01-31 | *"Internal infrastructure maintenance"* | 25.7 KiB |
| 4 | 2022-03-23 | - | 296.0 KiB |
| 5 | 2023-01-09 | *"The game now runs over https, which should fix some redirect loop errors"* | 303.6 KiB |
| 6 | 2024-02-29 | *"Security update"* | 854.3 KiB |
| 7 | 2025-04-01 | - | 884.1 KiB |
| 8 | 2025-08-08 | - | 1594.1 KiB |

### Release-to-release Comparisons

Aligning per-function body sizes by index (meaningful only when the function count/order is stable):

| Version Pair | Function Count | Size Difference | Changes |
|------|-------|-------|--------|
| v1→v2 | 63→63 | +335 B | **Trivial patch — 97% of functions byte-identical** |
| v2→v3 | 63→64 | +1.6 KB | Recompile (+1 function shifts indices) |
| v3→v4 | 64→304 | +273 KB | **Full rebuild** — anti-bot system added |
| v4→v5 | 304→271 | +8 KB | Recompile, slight function-count drop (more inlining) |
| v5→v6 | 271→669 | +557 KB | **Full rebuild** — scale to 25 validators + bigger blob |
| v6→v7 | 669→691 | +30 KB | minor revision (+22 functions) |
| v7→v8 | 691→691 | **+727 KB** | frozen architecture; payload + re-obfuscation |

#### Notable Function Size Changes 

| Function | Size Change (Bytes) | Delta (Bytes) | Description |
| :--- | :--- | :--- | :--- |
| #35 | 565 → 595,173 | +594,608 | The current `__wasm_call_ctors` blob unpacker |
| #34 | 285,886 → 5 | -285,881 | Was the old unpacker slot, now emptied to a 5-byte stub |
| #150 / #289 / #130 / ... | - | ~+9,000..+12,000 | Validators that are re-obfuscated to be bigger (per function) |

### Per-version Protocol Constants
| Constant | v1–3 | v4–5 | v6–8 | Derived From |
|----------|------|------|------|-------------|
| **validators** (count) | **1** | **10** | **25** | Count of `i32.const 20 / i32.rem_u` (one per validator) |
| **challenge size** | not 132 (smaller) | **132 B** | **132 B** | `i32.const 132` absent in v1–3, present from v4 |
| **response size** | **64 B** | 64 B (likely) | **64 B** | Live measurement (v1); documentation (v8) |
| **dispatch** | command-code → 1 core | MBF loops over 10 handlers | `challenge[4] % 25` → 1 of 25 | Replay (v1); decompilation (v4); documentation (v8) |
| **MT state wrap** | `% 624` | `% 624` | `% 624` | MT19937 (present in all versions) |

## Credits

- In-depth analysis: [benji / symere](https://github.com/symerebysil) - A great deal of research about `_MakeBlendField` in general was done by him (in just 3 days!).
- Minor reformatting: AyuBloom

## Additional Notes

This article repleaces an old overview of `_MakeBlendField` (v6). You can still find it [here](/architecture/engine/main/network/mbf/v6_overview).
