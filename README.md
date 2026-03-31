# StudyQuest

A social study app where you pick a pixel art character, hang out in cozy isometric rooms with friends, see what everyone's listening to or working on, poke each other, and level up by studying. Like Habbo Hotel meets Discord.

---

## Core Flow

1. **Sign up / Log in**
2. **Create your character** — pick from a pixel art sprite sheet (hair, skin, outfit, accessories)
3. **Land in your room** — a cozy isometric pixel room (your personal study space)
4. **See friends online** — their characters appear in your room or you can visit theirs
5. **Interact** — poke, react, see what they're listening to, check their status

---

## Features

### Pixel Character Creator
- **Pick your character** — choose from a sprite sheet of pixel art characters (like the reference images)
- **Customize** — swap hair, skin tone, outfit, accessories
- **Idle animations** — character bobs, reads a book, nods to music, sleeps when idle
- **Level up visuals** — character gets new outfits/effects as you level (sparkles, aura, cool hat)
- **Stats** — Focus, Stamina, Wisdom, Luck — go up as you study
- **XP & leveling** — earn XP from study sessions, tasks, streaks

### The Room (Isometric Pixel Art)
- **Your personal room** — cozy isometric pixel room (witch den, library, coffee shop, bedroom, rooftop)
- **Friends appear in your room** — when friends are online, their pixel characters show up sitting at the table, on the couch, at a desk
- **Interactive objects** — click the bookshelf, cauldron, radio, lamp — they do little animations
- **Room themes** — unlock/buy new room styles as you level up:
  - Witch's Study (cauldron, potions, spellbooks)
  - Cozy Bedroom (bed, fairy lights, plushies)
  - Library Corner (bookshelves, reading lamp, armchair)
  - Rooftop Night (city skyline, string lights, telescope)
  - Coffee Shop (espresso machine, pastries, chalkboard menu)
- **Room decorations** — place items: plants, books, candles, posters, pets
- **Day/night cycle** — room lighting changes based on real time

### Friends & Presence
- **Friends list** — add via username or invite link
- **See friends in your room** — their characters sit around, doing idle animations
- **Activity status** — see what each friend is doing:
  - Listening to "Tutti muoiono — Madame, BLANCO"
  - Working on "Chemistry Notes"
  - Studying for 2h 15m
  - On break
  - AFK / sleeping (character does sleep animation)
- **Visit friend's room** — tap a friend to teleport to their room, see their setup
- **Custom status** — "grinding orgo", "vibing", "do not disturb"

### Poke System
- **Poke friends** — tap a friend's character in the room to poke them
- **Poke types** — pixel animations:
  - Nudge (character bumps into them)
  - Throw paper ball
  - Send coffee (a pixel coffee cup slides over)
  - Wave
  - Pillow throw
- **Poke notification** — toast pops up with the pixel animation
- **Poke back** — one-tap response
- **Poke streak** — counter between two friends

### Now Playing / Activity
- **Music sharing** — connect Spotify or paste YouTube link
- **Pixel music player widget** — shows on your character/room like a little boombox or radio
- **See what friends are listening to** — hover over their character or check the room sidebar
- **Listen along** — click to open the same song
- **Working on** — set what subject/project you're on, visible to friends

### Study Tools (Personal)
- **Pomodoro timer** — pixel-style timer in your room (appears as an object like a clock or hourglass)
- **Task list** — notebook pinned to your room wall, check things off
- **XP rewards** — completing pomodoros and tasks gives XP
- **Streaks** — daily study streak, shown as a pixel flame on your character
- **Focus mode** — dims the room, character puts on headphones, mutes pokes

### Social & Gamification
- **Reactions** — send pixel emojis that float over friends' characters
- **Achievements** — "First All-Nighter", "7-Day Streak", "100 Pomodoros", unlock room items
- **Daily quests** — "Study 1 hour", "Poke 3 friends", "Complete 4 pomodoros"
- **Leaderboard** — opt-in weekly XP board among friends
- **Pet companion** — a pixel pet that hangs out in your room (cat, dog, frog, ghost)

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | Next.js 14+ (App Router) | SSR for profiles, client-side for room rendering |
| **Language** | TypeScript | Type safety across client/server |
| **Real-time** | PartyKit | Each room = a party. Handles presence, pokes, activity sync at the edge |
| **Auth** | NextAuth.js (Auth.js) | Discord/Google OAuth for accounts |
| **Database** | Supabase (Postgres) | Users, characters, friends, study logs, achievements |
| **Pixel Rendering** | HTML Canvas + sprite sheets | Isometric room rendering, character animations |
| **Sprite Engine** | Custom or PixiJS | Lightweight 2D rendering for the isometric room scene |
| **Styling** | Tailwind CSS | UI around the room (sidebar, modals, menus) |
| **Fonts** | "Press Start 2P" / pixel fonts | Match the pixel art aesthetic |
| **Music** | Spotify Web API + YouTube oEmbed | Now-playing data |
| **State** | Zustand | Client state for room, presence, UI |
| **Animations** | Sprite sheet frame animations + Framer Motion (UI) | Pixel animations in canvas, smooth UI transitions |
| **Deploy** | Vercel + PartyKit (Cloudflare) | Free tier friendly |

---

## Architecture

```
[User A]              [User B]              [User C]
   |                     |                     |
   |--- PartySocket -----|--- PartySocket -----|
   |                     |                     |
   v                     v                     v
+------------------------------------------------------------+
|               PartyKit Room Server                         |
|                                                            |
|  Room State:                                               |
|  - participants[] (character sprite, position, animation)  |
|  - activities[] (nowPlaying, workingOn, studyTime)         |
|  - pokes[] (pending poke events)                           |
|                                                            |
|  Events:                                                   |
|  room:join/leave        character:move/animate             |
|  poke:send/receive      activity:update                    |
|  reaction:send          status:change                      |
|  sync:state             visit:room                         |
+------------------------------------------------------------+

+---------------------------+         +-------------------+
|     Vercel (Next.js)      |         |    Supabase       |
|                           |         |    (Postgres)     |
| /              Landing    |  <--->  |                   |
| /room          Your room  |         | users             |
| /create        Char maker |         | characters        |
| /room/[id]     Visit room |         | friendships       |
| /api/...       API routes |         | rooms             |
+---------------------------+         | study_logs        |
                                      | achievements      |
                                      | room_items        |
                                      +-------------------+
```

---

## Data Models

```
User
├── id
├── username
├── email
└── createdAt

Character
├── userId (FK)
├── name
├── spriteId (which base character from sprite sheet)
├── outfit { hair, top, bottom, accessory }
├── level
├── xp
├── stats { focus, stamina, wisdom, luck }
├── title
├── petId
└── equippedItems[]

Room
├── userId (FK, owner)
├── theme (witch_study | cozy_bedroom | library | rooftop | coffee_shop)
├── items[] { itemId, position: {x, y}, layer }
└── unlocked boolean

Friendship
├── userId
├── friendId
├── status (pending | accepted)
├── pokeStreak
└── lastPokedAt

StudyLog
├── userId
├── date
├── focusMinutes
├── pomodorosCompleted
├── tasksCompleted
└── xpEarned

Achievement
├── userId
├── type (level_up | streak | milestone | badge | room_unlock)
├── name
├── unlockedAt
└── rewardItemId
```

---

## Project Structure

```
study/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── partykit.json
│
├── public/
│   ├── sprites/
│   │   ├── characters/      # Pixel character sprite sheets (idle, sit, read, sleep, wave)
│   │   ├── rooms/           # Isometric room base tiles & backgrounds
│   │   ├── items/           # Room decoration sprites
│   │   ├── pets/            # Pet companion sprites
│   │   ├── effects/         # Poke animations, reactions, level-up sparkles
│   │   └── ui/              # Pixel UI elements (buttons, frames, icons)
│   └── sounds/
│       ├── poke.mp3
│       ├── levelup.mp3
│       ├── notification.mp3
│       └── ambient/         # Rain, coffee shop, lo-fi
│
├── party/                   # PartyKit server
│   ├── index.ts             # Room presence server
│   ├── poke.ts              # Poke event handling
│   └── types.ts             # Shared event types
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # Landing page
│   │   ├── globals.css
│   │   ├── room/
│   │   │   └── page.tsx             # Your room (main view)
│   │   ├── room/[id]/
│   │   │   └── page.tsx             # Visit friend's room
│   │   ├── create/
│   │   │   └── page.tsx             # Character creator
│   │   └── api/
│   │       ├── auth/[...nextauth]/
│   │       ├── friends/
│   │       ├── poke/
│   │       ├── character/
│   │       ├── room/
│   │       └── study/
│   │
│   ├── components/
│   │   ├── room/                    # Isometric room
│   │   │   ├── RoomCanvas.tsx       # Main canvas renderer (isometric pixel room)
│   │   │   ├── RoomScene.tsx        # Scene manager (characters, items, interactions)
│   │   │   ├── CharacterSprite.tsx  # Render a character in the room
│   │   │   ├── RoomItem.tsx         # Interactive room objects
│   │   │   ├── RoomThemePicker.tsx
│   │   │   └── MiniMap.tsx          # Shows who's in the room
│   │   ├── character/               # Character system
│   │   │   ├── CharacterCreator.tsx # Sprite sheet picker + customizer
│   │   │   ├── CharacterCard.tsx    # Profile card with pixel avatar
│   │   │   ├── StatsDisplay.tsx
│   │   │   ├── XPBar.tsx
│   │   │   └── LevelUpModal.tsx
│   │   ├── sidebar/                 # Room sidebar UI
│   │   │   ├── FriendsList.tsx      # Online friends + activity
│   │   │   ├── FriendCard.tsx       # Friend entry with status
│   │   │   ├── ActivityStatus.tsx   # What someone's doing
│   │   │   └── NowPlaying.tsx       # Music widget
│   │   ├── poke/
│   │   │   ├── PokeButton.tsx
│   │   │   ├── PokePicker.tsx
│   │   │   ├── PokeAnimation.tsx    # Canvas-based pixel animation
│   │   │   └── PokeToast.tsx
│   │   ├── study/
│   │   │   ├── PomodoroTimer.tsx    # Pixel-style timer
│   │   │   ├── TaskList.tsx
│   │   │   ├── StreakCounter.tsx
│   │   │   └── StudyStats.tsx
│   │   ├── ui/                      # Pixel-styled UI primitives
│   │   │   ├── PixelBox.tsx         # Pixel art bordered container
│   │   │   ├── PixelButton.tsx
│   │   │   ├── PixelInput.tsx
│   │   │   ├── PixelModal.tsx
│   │   │   └── PixelTooltip.tsx
│   │   └── landing/
│   │       └── Hero.tsx
│   │
│   ├── engine/                      # Isometric room engine
│   │   ├── IsometricRenderer.ts     # Canvas rendering for isometric tiles
│   │   ├── SpriteSheet.ts           # Sprite sheet loader & frame animator
│   │   ├── InteractionManager.ts    # Click detection on isometric objects
│   │   └── Camera.ts               # Room viewport / panning
│   │
│   ├── hooks/
│   │   ├── usePartySocket.ts
│   │   ├── usePresence.ts
│   │   ├── useRoom.ts              # Room state & rendering
│   │   ├── useCharacter.ts
│   │   ├── usePoke.ts
│   │   ├── useTimer.ts
│   │   └── useNowPlaying.ts
│   │
│   ├── stores/
│   │   ├── roomStore.ts
│   │   ├── presenceStore.ts
│   │   ├── uiStore.ts
│   │   └── userStore.ts
│   │
│   ├── lib/
│   │   ├── sprites.ts              # Sprite loading & caching
│   │   ├── isometric.ts            # Coordinate math (screen ↔ iso)
│   │   ├── xp.ts                   # XP & leveling formulas
│   │   ├── spotify.ts
│   │   ├── supabase.ts
│   │   └── constants.ts            # Room themes, character classes, etc.
│   │
│   └── types/
│       ├── character.ts
│       ├── room.ts
│       ├── presence.ts
│       ├── poke.ts
│       └── messages.ts
│
└── README.md
```

---

## Implementation Phases

### Phase 1: Character Creator & Room Shell
- Next.js + TypeScript + Tailwind + Supabase + Auth setup
- Pixel UI component library (PixelBox, PixelButton, etc.)
- Character creator: pick from sprite sheet, customize, name
- Basic isometric room canvas (static room background, your character rendered)
- Save character to database

### Phase 2: Friends & Presence
- PartyKit presence server
- Friend system: add, accept, reject
- Friends list sidebar with online/offline status
- Friends' characters appear in your room when they're online
- Character idle animations (sit, read, bob)

### Phase 3: Poke System & Interactions
- Click a friend's character in the room to interact
- Poke picker (nudge, paper ball, coffee, wave, pillow)
- Pixel poke animations on canvas
- Poke notifications (toast with sound)
- Poke streaks

### Phase 4: Activity & Music Sharing
- Spotify now-playing integration
- "Working on" manual status
- Activity shown on hover/sidebar for each friend
- Pixel boombox/radio in room shows current song
- Listen along

### Phase 5: Study Tools & XP
- Pomodoro timer (pixel hourglass in room)
- Task list (notebook on room wall)
- XP from completing pomodoros/tasks
- Leveling system with stat increases
- Streak counter (pixel flame)
- Focus mode (character puts on headphones)

### Phase 6: Rooms, Achievements & Polish
- Multiple room themes (unlock with levels)
- Room decoration placement
- Pet companions
- Achievement system & daily quests
- Day/night cycle
- Sound effects & ambient audio
- Visit friend's room
- Mobile responsive

---

## Aesthetic Guidelines

- **Pixel art everything** — characters, rooms, UI elements, icons
- **Isometric perspective** for rooms (like the witch's study reference)
- **Warm, cozy color palettes** — soft lighting, earthy tones, glowing accents
- **Pixel font** ("Press Start 2P" or similar) for headings, clean sans-serif for readability
- **Sprite sheet animations** — idle bobs, page flips, steam from coffee, flickering candles
- **Sound design** — soft poke sounds, level-up chime, ambient room sounds
- **UI frames** — pixel art bordered panels for sidebars, modals, tooltips
- **Day/night lighting** — room gets warmer/darker based on real time
- **No flat/modern UI** — everything should feel like it belongs in a cozy pixel game
