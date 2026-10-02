import type { ArticleContent, ArticleVisual } from '@/lib/blogs';

const assetRoot = '/blogs/resident-evil-4-analysis';
const placeholder = `${assetRoot}/hero-official.webp`;

// TODO
// Every slot uses the existing promotional image until gameplay captures are supplied.
// Replace each image's src independently; purpose and replacementNotes describe the final capture.
// annotations can later hold labels without changing the article's reading order.
export const re4Visuals = {
  hero: {
    id: 'hero',
    imagePurpose: 'hero-landscape',
    replacementNotes:
      'Replace with a wide RE4 Remake village/environment capture. This should establish atmosphere and location rather than explain a mechanic.',
    images: [
      {
        src: placeholder,
        alt: 'Leon in a wide village or environment view, establishing the location.',
        caption: '',
        annotations: [],
      },
    ],
  },
  positioning: {
    id: 'positioning',
    imagePurpose: 'gameplay-spatial-positioning',
    replacementNotes:
      'Replace with a gameplay capture from the village square showing multiple possible enemy approach directions and open movement space.',
    images: [
      {
        src: placeholder,
        alt: 'Leon in the open village square with Ganados approaching from multiple directions.',
        caption: 'Open space gives Leon room to move, but increases the number of approaches he must track.',
        annotations: [],
      },
    ],
  },
  refuge: {
    id: 'refuge',
    imagePurpose: 'level-design-refuge',
    replacementNotes:
      'Replace with a gameplay capture of the shotgun house showing the doorway, stairs, windows, or roof route. This image should support the idea that the house is a temporary tactical position, not permanent safety.',
    images: [
      {
        src: placeholder,
        alt: 'The shotgun house doorway, stairs and windows, showing entry and escape routes.',
        caption: 'The house reduces immediate exposure, but its multiple access points keep the position temporary.',
        annotations: [],
      },
    ],
  },
  spaceComparison: {
    id: 'spaceComparison',
    imagePurpose: 'comparison-open-vs-confined',
    replacementNotes:
      'Replace left with an open village combat capture. Replace right with an interior or doorway capture. The comparison should show that open spaces increase approach directions while confined spaces simplify tracking but reduce escape space.',
    images: [
      {
        src: placeholder,
        alt: 'The open village square with several enemy approach routes.',
        caption: 'More movement space, more directions to watch.',
        annotations: [],
      },
      {
        src: placeholder,
        alt: 'A confined interior with enemies approaching through a doorway.',
        caption: 'Fewer immediate angles, less room to escape.',
        annotations: [],
      },
    ],
  },
  kick: {
    id: 'kick',
    imagePurpose: 'gameplay-crowd-control',
    replacementNotes:
      'Replace with a gameplay capture showing a stagger-to-melee opportunity where nearby Ganados can also be displaced. The image should demonstrate that the kick changes the shape of the crowd, not only enemy health.',
    images: [
      {
        src: placeholder,
        alt: 'Leon kicking a staggered Ganado with nearby enemies within reach.',
        caption: 'A melee follow-up can buy space by disrupting several nearby threats.',
        annotations: [],
      },
    ],
  },
  houseDefense: {
    id: 'houseDefense',
    imagePurpose: 'encounter-house-defense',
    replacementNotes:
      'Replace with a Chapter 5 house-defense capture showing an active entry point such as a boarded window, ladder, or upper-floor threat. This should illustrate how the encounter adds pressure without physically shrinking the room.',
    images: [
      {
        src: placeholder,
        alt: 'Leon defending the house with Luis, with boarded windows and another active entry point visible.',
        caption:
          'Boarding windows and removing ladders temporarily reduces one source of pressure while others remain active.',
        annotations: [],
      },
    ],
  },
  parry: {
    id: 'parry',
    imagePurpose: 'gameplay-parry',
    replacementNotes:
      'Replace with a clear gameplay capture of Leon parrying an enemy attack. The image should support the idea that the knife can recover a bad situation immediately.',
    images: [
      {
        src: placeholder,
        alt: 'Leon parrying a weapon attack with his knife at the moment of contact.',
        caption: 'The knife can restore control in the moment, but using it consumes future defensive capacity.',
        annotations: [],
      },
    ],
  },
  repair: {
    id: 'repair',
    imagePurpose: 'ui-resource-cost',
    replacementNotes:
      'Replace with a UI screenshot showing Combat Knife durability or the Merchant repair option and peseta cost. This should make the future economic cost of defensive recovery visually explicit.',
    images: [
      {
        src: placeholder,
        alt: 'The Merchant repair menu showing Combat Knife durability and its peseta repair cost.',
        caption: 'Recovery carries forward into the economy when durability must later be repaired.',
        annotations: [],
      },
    ],
  },
  reliefComparison: {
    id: 'reliefComparison',
    imagePurpose: 'comparison-pressure-vs-relief',
    replacementNotes:
      'Replace left with the village during active combat. Replace right with the same or similar area after the bell. The comparison should show how the same space changes function when pressure disappears.',
    images: [
      {
        src: placeholder,
        alt: 'Leon in the village during active combat, with approaching Ganados.',
        caption: 'During combat: attention is spent tracking threats.',
        annotations: [],
      },
      {
        src: placeholder,
        alt: 'The village after the bell, with clear paths to search the buildings.',
        caption: 'After the bell: the same space becomes readable as an exploration space.',
        annotations: [],
      },
    ],
  },
  preparation: {
    id: 'preparation',
    imagePurpose: 'ui-preparation',
    replacementNotes:
      'Replace with an attaché-case screenshot showing weapons, ammunition, and crafting materials. This visual should support the transition from immediate survival to preparation for the next encounter.',
    images: [
      {
        src: placeholder,
        alt: 'An open attaché case with weapons, ammunition and crafting materials arranged in its grid.',
        caption: 'Quiet intervals turn survival outcomes into preparation choices.',
        annotations: [],
      },
    ],
  },
} satisfies Record<string, ArticleVisual>;

export const residentEvil4: ArticleContent = {
  title: 'Buying Time in Resident Evil 4 Remake',
  slug: 'buying-time-resident-evil-4-remake',
  summary: 'How positioning, crowd control, and resource choices buy a little breathing room in the remake.',
  category: 'game-analysis',
  thumbnail: { src: placeholder, alt: 'Leon on a misty woodland path in Resident Evil 4 Remake.' },
  heroVisual: re4Visuals.hero,
  experienceNote: 'Played on PC via Steam · Original RE4 — 23.9 hours · RE4 Remake — 15.2 hours',
  playtimeMedia: [],
  assetRoot,
  heroCredit: 'Official promotional screenshot · © CAPCOM CO., LTD. · via Steam',
  heroSource: 'https://store.steampowered.com/app/2050650/Resident_Evil_4/',
  intro: [
    'What I find interesting about Resident Evil 4 Remake is that having more ways to fight does not make the player feel safe for long. A doorway, a kick, or a well-timed parry can make a difficult situation manageable, but each only solves part of the problem.',
    'The remake creates pressure by letting the player buy temporary control rather than permanent safety. The village fight, the house defense with Luis, and the time between encounters show how combat and resource management support each other. This analysis focuses on the 2023 main campaign.',
  ],
  sections: [
    {
      id: 'positions',
      title: '01 / A good position has an expiry date',
      blocks: [
        {
          type: 'paragraph',
          text: 'The opening village fight gives the player several places to go, but none removes the need to pay attention. In the square, Leon has room to move around enemies. The problem is that Ganados can approach from different directions, including outside the camera view.',
        },
        { type: 'figure', visual: re4Visuals.positioning },
        {
          type: 'paragraph',
          text: 'The shotgun house offers a different tradeoff. Its doorway makes enemies easier to track, and the W-870 upstairs gives the player another way to handle a crowd. However, enemies can enter through the building and its windows. Staying inside eventually becomes its own problem.',
        },
        { type: 'figure', visual: re4Visuals.refuge },
        {
          type: 'paragraph',
          text: 'The stairs, upstairs window, and roof route matter because they give the player somewhere to go when the position stops working. Moving away is part of using the house well. The square and house offer different ways to manage attention and escape space.',
        },
        { type: 'figure', visual: re4Visuals.spaceComparison },
        {
          type: 'paragraph',
          text: 'I think this is what makes the village useful as an early encounter: it encourages planning, then asks the player to change that plan. The next route needs to be readable under pressure.',
        },
      ],
      takeaway: 'Give a useful position a readable reason to stop working, and a clear next move.',
    },
    {
      id: 'crowd-control',
      title: '02 / Combat changes the shape of the crowd',
      blocks: [
        {
          type: 'paragraph',
          text: 'A shot does more than remove health. Staggering a Ganado creates a melee opportunity, and a kick can also catch nearby enemies. That makes the arrangement of the crowd important: an opening on one enemy can help with several others, if Leon can reach it safely.',
        },
        { type: 'figure', visual: re4Visuals.kick },
        {
          type: 'paragraph',
          text: 'The space after a kick is useful for reloading, moving, or choosing another target. This changes ammunition efficiency. A shotgun shell that interrupts a close group may be worth spending even if it is an expensive way to kill one enemy.',
        },
        {
          type: 'paragraph',
          text: 'The remake lets Leon move while aiming, but there is still a reason to slow down. A focused reticle improves stagger and critical-hit chances. Waiting for that better shot competes with the need to stop an enemy now.',
        },
        { type: 'figure', visual: re4Visuals.houseDefense },
        {
          type: 'paragraph',
          text: 'The Chapter 5 house defense with Luis takes this idea into the environment. Boarding a window or removing a ladder delays an approach, while other threats remain active. Upper-floor entries and the Brute add pressure without making the room physically smaller. Combat and level design are asking the same question: which part of the fight needs attention first?',
        },
      ],
      takeaway: 'Judge attacks by the opportunities they create, as well as the damage they deal.',
    },
    {
      id: 'knife',
      title: '03 / The knife puts a price on recovery',
      blocks: [
        {
          type: 'paragraph',
          text: 'The knife gives Leon a way to respond when an eligible attack gets too close. A parry can prevent a hit without first creating distance. It is a useful chance to recover, but it consumes durability, leaving less protection for later.',
        },
        { type: 'figure', visual: re4Visuals.parry },
        {
          type: 'paragraph',
          text: 'Stealth kills and knife follow-ups use that same durability. Spending it offensively can remove a threat before it costs ammunition or health; saving it keeps a defensive option available. Those choices compete with each other.',
        },
        { type: 'figure', visual: re4Visuals.repair },
        {
          type: 'paragraph',
          text: 'That cost continues at the Merchant, where repairing the Combat Knife uses pesetas that could go towards another purchase or upgrade. Surviving a close call can therefore affect preparation for the next encounter, even without losing health.',
        },
        {
          type: 'paragraph',
          text: 'I like this connection between immediate recovery and longer-term planning. It needs clear durability feedback and other workable responses when the knife runs out. Parry timing also varies by difficulty, so the skill required is not identical in every playthrough.',
        },
      ],
      takeaway: 'Make recovery cost something, but keep other responses viable when that resource runs out.',
    },
    {
      id: 'preparation',
      title: '04 / Relief turns survival into preparation',
      blocks: [
        {
          type: 'paragraph',
          text: 'After the bell ends the opening fight, the village becomes a place to search. The same buildings that were escape routes now hold supplies and things the player may have missed. With no attackers demanding attention, there is also time to understand the space.',
        },
        { type: 'figure', visual: re4Visuals.reliefComparison },
        {
          type: 'paragraph',
          text: 'This is why relief matters beyond giving the player a rest. Searching changes what they carry, while revisiting the area helps explain where a position went wrong. There is time to learn from the fight.',
        },
        { type: 'figure', visual: re4Visuals.preparation },
        {
          type: 'paragraph',
          text: 'Crafting turns that breathing room into a choice. Gunpowder and Resources (S) are shared by handgun ammunition and shotgun shell recipes. Keeping materials preserves options; crafting commits them to a particular response. The attaché case shows those supplies, but fitting an item does not answer when to spend it.',
        },
        {
          type: 'paragraph',
          text: 'The Merchant extends that planning through repairs, upgrades, and selling treasure. In my original RE4 analysis, I focused on how his appearance relieves tension. Here, I think the stronger connection is what the player takes back into danger: a repaired knife, different ammunition, or a weapon they chose to improve.',
        },
      ],
      takeaway:
        'Give quiet intervals something useful to do: help players understand the last fight and prepare for the next.',
    },
  ],
  takeaways: [
    { title: 'Design the loss of control.', text: 'Make the next move readable when a position fails.' },
    { title: 'Give tools a time value.', text: 'A cleared route or a chance to reload can matter as much as damage.' },
    {
      title: 'Price recovery without making it mandatory.',
      text: 'Keep alternatives available when a defense runs out.',
    },
    {
      title: 'Make relief change the next fight.',
      text: 'Let exploration, crafting, and repairs carry survival into preparation.',
    },
  ],
  sources: [
    {
      title: 'Game Developer: The remake’s knife system',
      url: 'https://www.gamedeveloper.com/design/why-it-s-good-resident-evil-4-s-knife-system',
      note: 'Secondary verification of Combat Knife repair at the Merchant using pesetas.',
    },
    {
      title: 'Resident Evil 4 on Steam',
      url: 'https://store.steampowered.com/app/2050650/Resident_Evil_4/',
      note: '2023 PC game identity, Capcom credits, and official hero screenshot.',
    },
    {
      title: 'Capcom official manual: Player Actions',
      url: 'https://game.capcom.com/manual/re4/en/ps5/page/2/2',
      note: 'Focused reticle, melee, knife durability, and repair guidance. Button labels are platform-specific; this article does not use them as PC bindings.',
    },
    {
      title: 'Capcom official manual: Crafting',
      url: 'https://game.capcom.com/manual/re4/en/ps5/page/4/2',
      note: 'Shared materials and ammunition recipes.',
    },
    {
      title: 'Xbox Wire: Updated combat with producer Yoshiaki Hirabayashi',
      url: 'https://news.xbox.com/en-us/2023/03/10/talking-resident-evil-4-updated-combat/',
      note: 'Primary interview on knife actions, movement while aiming, and difficulty-dependent parry timing.',
    },
    {
      title: 'PowerPyx: Remake Chapter 1 walkthrough',
      url: 'https://www.powerpyx.com/resident-evil-4-remake-chapter-1-walkthrough/',
      note: 'Secondary cross-check for shotgun house routes and the post-bell transition.',
    },
    {
      title: 'Push Square: Remake Chapter 5 walkthrough',
      url: 'https://www.pushsquare.com/guides/resident-evil-4-remake-chapter-5-walkthrough',
      note: 'Secondary cross-check for boarding windows, upper-floor ladders, and the Brute.',
    },
  ],
};
