# Resident Evil 4 — content handoff

Title: **Buying Time in Resident Evil 4 Remake**

Thesis: The 2023 remake sustains pressure by making control temporary. Positioning, crowd control, and resource spending buy breathing room; changing approaches and finite defenses require the player to keep deciding how to use it.

Category: Game Analysis. Game: Resident Evil 4, 2023 main-campaign remake. Platform played: PC / Steam. Developer and publisher: Capcom.

## Article access

The normal `/blogs` index includes this article. Desktop and mobile navigation link to that index, and the card links to `/blogs/buying-time-resident-evil-4-remake`. The article's back link returns to `/blogs`. There are no environment gates, query switches, status badges, editorial banners, or screenshot placeholders in the site.

The third supplied attachment provides RE4 playtime: **15.2 hours**, installed at `public/blogs/resident-evil-4-analysis/steam-playtime.webp`. The Half-Life 2 and Dark Souls III captures are unused. Replace this same asset and update metadata if a newer capture is supplied.

## Outline

- Brief thesis and scope.
- A good position has an expiry date: village square, shotgun house, visibility/access/escape tradeoffs.
- Combat changes the shape of the crowd: stagger/melee, focused aim, house-defense entrances and escalation.
- The knife puts a price on recovery: parry and offensive uses share durability; repairs carry costs forward.
- Relief turns survival into preparation: post-bell exploration, crafting, case organization, Merchant decisions.
- Four actionable design takeaways.

## Relationship to the 2022 Wix teardown

Read the full original post at https://louiscch314.wixsite.com/website/post/the-teardown-analysis-of-resident-evil-4 (linked from the supplied blog index). The web reader could not retrieve Wix; its public server-rendered HTML was retrieved and read instead. Original post dated July 29, 2022, updated August 2, 2022; it explicitly analyzed the 2005 release.

Preserved conceptually, with all prose rewritten:

- Changing areas and enemies should change the player's tactics.
- Resource management connects immediate combat to longer-term planning.
- The inventory makes resources tangible.
- Ranged attacks and melee work together.
- Enemy approaches and obscured sightlines create pressure.
- Exploration rewards and the Merchant create useful relief between threats.
- Tension/relief is part of the core loop.

Removed or narrowed:

- General praise, historical genre/camera claims, and the claim that the camera creates identification impossible in earlier games.
- Extended narrative/cinematic discussion: valid separate subjects, but not support for this article's thesis.
- Repeated claims that most spaces are cramped, that players are always frightened, or that all challenges reliably produce flow. Geometry is now discussed through specific affordances and tradeoffs.
- A catalogue of enemy counters and weapon types, which lacked concrete encounters and blurred multiple systems.
- Exact adaptive-difficulty inputs/outputs and reactive ammunition-drop rules. These were not sufficiently verified for the remake and do not need to explain the observed encounters. Their omission is not a claim that adaptive systems are absent.

Outdated or materially rewritten for 2023:

- “Leon cannot move while aiming” is not applicable: the remake allows movement while aiming. Commitment is now analyzed through spacing, attention, and focused-reticle timing.
- The old treatment of melee as a free resource substitute is too broad. Contextual kicks and consumable knife actions need separate consideration; the new article distinguishes them.
- Broad QTE advice is removed. Contextual melee prompts and timed parries are discussed as specific actions, without copying the original's QTE framing.
- The old claim about aiming too long causing sway is replaced with Capcom's documented focused-reticle behavior.
- The 2005 inventory description is retained only at the shared grid-organization level. The remake's crafting and knife repair relationships are added and verified independently.

New analysis:

- Temporary control as the connection between spatial, combat, and economy systems.
- Good positions defined by benefit, failure condition, and an identifiable next move.
- Attacks evaluated through interruption and opportunities to act, as well as damage.
- The Chapter 5 boarded-window/upper-floor-ladder defense as changing access pressure.
- Knife durability as the price of recovery, including dependence and feedback tradeoffs.
- Unconverted crafting materials as retained flexibility; preparation as commitment.

The old system-by-system tour becomes one argument built from four connected sections. Each includes observation, example, behavioral interpretation, tradeoff, and a transferable principle. Interpretations are analysis, not claims about private developer intent. No new invented anecdotes are attributed to Louis.

## Gameplay shot list

All destinations are under `public/blogs/resident-evil-4-analysis/`. Use your own captures from the **2023 remake**, ideally 16:9 at 1920×1080 or better. Keep relevant gameplay UI. Do not replace these analytical slots with web screenshots.

| Section | Exact capture and framing | Purpose / suggested moment | Filename |
| --- | --- | --- | --- |
| A good position has an expiry date | Wide view from near an edge of the village square: Leon, two separated Ganado approaches, and the shotgun house or another escape route visible. | Chapter 1 opening fight, after enemies engage but before the frame is crowded beyond readability. Shows movement space competing with attention across approaches. | `village-pressure.webp` |
| Combat changes the shape of the crowd | Downstairs in Luis's house: one boarded window, one active entrance, and the staircase in the same frame; include approaching enemies if readable. | Chapter 5 house defense after boarding a window. Shows that controlling one entry does not remove the rest of the spatial problem. | `cabin-entry-control.webp` |
| The knife puts a price on recovery | Leon's knife contacting a weapon-wielding Ganado's attack; sparks/contact readable and the knife durability gauge visible. | A village fight with a single clear attacker. Keep HUD; a short gameplay recording can provide a usable frame. Shows the immediate defensive action and its finite resource. | `knife-parry-cost.webp` |
| Relief turns survival into preparation | Crafting menu with handgun ammo and shotgun shell recipes, material counts, and existing ammo visible where UI permits. | Any quiet point with both recipes available. Do not manipulate the inventory to imply artificial scarcity. Shows shared materials and competing uses. | `crafting-choice.webp` |

The media component checks whether each named file exists. Missing media is omitted. After supplying a file, restart the server/rebuild to include it. Capture instructions remain in this document and the content data; they are never displayed to readers.

## Official hero and attribution

Selected: official Steam screenshot 0 for app **2050650** (the 2023 remake): Leon on a misty forest path, 1920×1080, landscape, no overlaid title text. Used for hero and blog-card thumbnail, never as personal analytical evidence.

- Source page: https://store.steampowered.com/app/2050650/Resident_Evil_4/
- Original asset: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/ss_59d1b19964cc532213df92c8287b75a0bffeb33c.1920x1080.jpg
- Local optimized asset: `public/blogs/resident-evil-4-analysis/hero-official.webp`
- Visible credit: “Official promotional screenshot · © CAPCOM CO., LTD. · via Steam” linked to the source page.
- Provenance checked through Steam appdetails; developers/publishers are CAPCOM Co., Ltd. This is attributed promotional material, not a Louis gameplay capture. Attribution is not a claim of a separate image license.

## Research record

Accessed October 1, 2026. This article discusses the 2023 main campaign, avoiding later-game examples that would imply campaign completion from the supplied playtime.

| Source | Verification use |
| --- | --- |
| https://store.steampowered.com/app/2050650/Resident_Evil_4/ and https://store.steampowered.com/api/appdetails?appids=2050650 | Remake PC identity, Capcom developer/publisher, official screenshot provenance. No pricing or player metrics used. |
| https://game.capcom.com/manual/re4/en/ps5/page/2/2 | Focused reticle improves stagger/critical-hit chances; parry consumes durability; contextual melee. Indexed manual text was accessible, while direct requests were restricted. PS5 bindings are not presented as PC controls. |
| https://www.gamedeveloper.com/design/why-it-s-good-resident-evil-4-s-knife-system | Secondary verification of Merchant repair and peseta cost; its design argument is not reused. |
| https://game.capcom.com/manual/re4/en/ps5/page/4/2 | Handgun and shotgun ammunition share Resources (S) and gunpowder. No exact recipe quantities are reproduced. |
| https://news.xbox.com/en-us/2023/03/10/talking-resident-evil-4-updated-combat/ | Producer interview verifying aim movement, knife actions, and difficulty-dependent parry timing. No private-intent extrapolation. |
| https://blog.playstation.com/2022/10/20/new-resident-evil-4-trailer-resident-evil-village-gold-edition-demo-and-more-revealed-in-todays-resident-evil-showcase/ | Capcom-authored showcase context: remake-specific knife changes and official gameplay. |
| https://www.powerpyx.com/resident-evil-4-remake-chapter-1-walkthrough/ | Necessary secondary check of exact shotgun-house route and post-bell exploration. No exact kill/time thresholds used. |
| https://www.pushsquare.com/guides/resident-evil-4-remake-chapter-5-walkthrough | Necessary secondary check of planks, ladders, and Brute in the house defense. No exact spawning thresholds used. |

The implementation links a small source list at the end of the article. Gameplay-effect arguments are deductions from these verified mechanics and arrangements, not sourced claims about measured player outcomes.

## Implementation files

- `lib/articles/resident-evil-4.ts`: article content, metadata, capture slots, source links.
- `lib/blogs.ts`: reusable article/media model, draft status, article registry.
- `components/BlogArticleDetail.tsx`: readable article layout, context panel, captions, sources, file-aware media.
- `app/blogs/[slug]/page.tsx`: reusable detail route, 404 handling, metadata.
- `app/blogs/page.tsx`: normal article index.
- `components/BlogArticles.tsx`: draft badge in the existing card/filter component.
- `public/blogs/resident-evil-4-analysis/hero-official.webp`: official Steam image.
- `public/blogs/resident-evil-4-analysis/steam-playtime.webp`: supplied personal evidence.
- `docs/resident-evil-4-editorial-review.md`: this editorial/research/capture handoff.

## Current verification

Normal index/card/category/back navigation checked in isolated Playwright Chromium. Production article URL returns 200; no preview controls or noindex metadata remain. Mobile 390px has no horizontal overflow. Lint, typecheck, and production webpack build pass. The managed browser and temporary production server were closed. No commit, push, or deploy performed.
