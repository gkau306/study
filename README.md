# StudyQuest

A social presence app for students — create your RPG character, see your friends online, check what they're listening to or working on, and poke them. Like Discord meets a cozy RPG, with a hand-drawn notebook aesthetic.

---

## Features

### RPG Character Creator
- **Build your character** — pick a class (Scholar, Night Owl, Crammer, Grinder), choose a doodle avatar, name your character
- **Level up** — gain XP from study sessions, completing tasks, streaks
- **Stats** — Focus, Stamina, Wisdom, Luck — go up as you study more
- **Titles & badges** — "Library Dweller", "3am Warrior", "Pomodoro Master"
- **Equipment** — cosmetic items for your avatar (hats, accessories, pets) unlocked through milestones
- **Character card** — shareable sketchy card showing your character, stats, and current activity

### Friends & Presence (Discord-style)
- **Friends list** — add friends via username or invite link
- **Online status** — see who's online, idle, studying, or offline (with hand-drawn status dots)
- **Activity feed** — see what friends are up to in real-time:
  - "Luna is listening to Tutti muoiono — Madame, BLANCO"
  - "Kai is working on Chemistry Notes"
  - "Mira has been studying for 2h 15m"
  - "Jae just hit Level 12!"
- **Custom status** — set your own with a doodle emoji ("grinding organic chem", "vibing", "do not disturb")

### Poke System
- **Poke friends** — tap to send a poke (like old Facebook / Discord)
- **Poke types** — different doodle animations: nudge, wave, throw paper airplane, send coffee, flick eraser
- **Poke back** — get notified, poke back with one tap
- **Poke wars** — poke streak counter between two friends

### Now Playing / Activity Sharing
- **Share what you're listening to** — connect Spotify or paste YouTube link, shows on your profile like Discord
- **Sketchy music player widget** — hand-drawn player UI on your profile (like the mockups)
- **Share what you're working on** — manually set "working on: [subject]" or auto-detect from a timer
- **Listen along** — tap a friend's now-playing to open the same song

### Study Tools (Personal)
- **Pomodoro timer** — personal timer with RPG-style rewards (XP on completion)
- **Task list** — notebook-style to-do list, earn XP for checking things off
- **Study log** — auto-tracked focus time, visualized as a hand-drawn chart
- **Streaks** — daily study streak with a flame doodle counter

### Social
- **Quick reactions** — send doodle reactions to friends' activities (fire, brain, zzz, coffee, star)
- **Achievements feed** — see when friends level up, hit streaks, unlock badges
- **Study groups** — create a group, see all members' presence in one view
- **Leaderboard** — opt-in weekly XP leaderboard among friends

### Nice-to-haves
- **Pet companion** — a doodle pet that sits on your profile, reacts to your study habits
- **Daily quests** — "Study for 1 hour", "Complete 3 pomodoros", "Poke 2 friends"
- **Ambient mode** — personal ambient sound mixer (rain, coffee shop, lo-fi)
- **Profile themes** — "Notebook", "Graph Paper", "Chalkboard", "Sticky Notes"
- **Shareable stats card** — export a sketchy image of your weekly stats for socials

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | Next.js 14+ (App Router) | SSR for profiles, client components for real-time UI |
| **Language** | TypeScript | Type safety for real-time events and API |
| **Real-time** | PartyKit | Presence system — each user is connected, broadcasts status updates to friends. Edge-deployed, handles reconnection |
| **Auth** | NextAuth.js (Auth.js) | Friend system requires accounts. GitHub/Google/Discord OAuth |
| **Database** | Supabase (Postgres) | User profiles, friends list, character data, study logs, achievements |
| **Sketchy UI** | Rough.js + custom React components | Hand-drawn borders, wobbly shapes |
| **Styling** | Tailwind CSS | Layout + theme switching via CSS variables |
| **Fonts** | Caveat / Patrick Hand (Google Fonts) | Handwriting-style typography |
| **Music** | Spotify Web API + YouTube oEmbed | Pull now-playing data from Spotify, or manual YouTube link |
| **State** | Zustand | Client-side state for presence, UI |
| **Animations** | Framer Motion | Poke animations, floating reactions, transitions |
| **Deploy** | Vercel + PartyKit (Cloudflare) | Both free tier friendly |

---

## Architecture

```
[User A Browser]        [User B Browser]        [User C Browser]
      |                       |                       |
      |---- PartySocket ------|---- PartySocket ------|
      |                       |                       |
      v                       v                       v
+--------------------------------------------------------------+
|                  PartyKit Presence Server                     |
|                                                              |
|  Connected Users Map:                                        |
|  - userId → { status, activity, nowPlaying, character }      |
|                                                              |
|  Events:                                                     |
|  presence:update    poke:send           activity:change       |
|  friend:online      friend:offline      reaction:send        |
|  sync:friends (send friend statuses to newly connected user) |
+--------------------------------------------------------------+

+---------------------------+         +------------------+
|     Vercel (Next.js)      |         |    Supabase      |
|                           |         |    (Postgres)    |
| /              Landing    |  <--->  |                  |
| /dashboard     Main view  |         | users            |
| /character     RPG setup  |         | characters       |
| /profile/[id]  Profile    |         | friendships      |
| /api/...       API routes |         | study_logs       |
+---------------------------+         | achievements     |
                                      | pokes            |
                                      +------------------+
```

---

## Data Models

```
User
├── id
├── username
├── email
├── avatarUrl
└── createdAt

Character
├── userId (FK)
├── name
├── class (Scholar | NightOwl | Crammer | Grinder)
├── level
├── xp
├── stats { focus, stamina, wisdom, luck }
├── title
├── equipment[]
└── theme

Friendship
├── userId
├── friendId
├── status (pending | accepted)
└── pokeStreak

StudyLog
├── userId
├── date
├── focusMinutes
├── pomodorosCompleted
├── tasksCompleted
└── xpEarned

Achievement
├── userId
├── type (level_up | streak | milestone | badge)
├── name
├── unlockedAt
└── metadata {}
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
│   ├── sounds/              # Ambient audio files
│   ├── textures/            # Paper/notebook backgrounds
│   └── doodles/             # Hand-drawn SVG icons & avatars
│       ├── avatars/         # RPG character base sprites
│       ├── equipment/       # Hats, accessories, pets
│       ├── pokes/           # Poke animation sprites
│       └── icons/           # UI icons (status, reactions)
│
├── party/                   # PartyKit server
│   ├── index.ts             # Presence server (online status, activity broadcasting)
│   └── types.ts             # Shared event types
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # Landing page
│   │   ├── globals.css
│   │   ├── dashboard/
│   │   │   └── page.tsx             # Main view (friends list + activity feed)
│   │   ├── character/
│   │   │   ├── create/page.tsx      # Character creator
│   │   │   └── page.tsx             # View/edit your character
│   │   ├── profile/[id]/
│   │   │   └── page.tsx             # Friend's profile & character card
│   │   └── api/
│   │       ├── auth/[...nextauth]/  # Auth routes
│   │       ├── friends/             # Friend requests, list
│   │       ├── poke/                # Send pokes
│   │       ├── character/           # Character CRUD
│   │       └── study/               # Study logs, stats
│   │
│   ├── components/
│   │   ├── sketchy/                 # Sketchy UI primitives
│   │   │   ├── SketchBox.tsx
│   │   │   ├── SketchButton.tsx
│   │   │   ├── SketchInput.tsx
│   │   │   ├── SketchCard.tsx
│   │   │   └── SketchAvatar.tsx
│   │   ├── character/               # RPG character components
│   │   │   ├── CharacterCreator.tsx
│   │   │   ├── CharacterCard.tsx
│   │   │   ├── StatsDisplay.tsx
│   │   │   ├── ClassPicker.tsx
│   │   │   ├── EquipmentSlots.tsx
│   │   │   └── XPBar.tsx
│   │   ├── friends/                 # Friends & presence
│   │   │   ├── FriendsList.tsx
│   │   │   ├── FriendCard.tsx
│   │   │   ├── ActivityFeed.tsx
│   │   │   ├── StatusIndicator.tsx
│   │   │   └── AddFriendModal.tsx
│   │   ├── poke/                    # Poke system
│   │   │   ├── PokeButton.tsx
│   │   │   ├── PokePicker.tsx       # Choose poke type
│   │   │   ├── PokeAnimation.tsx
│   │   │   └── PokeNotification.tsx
│   │   ├── music/                   # Now playing
│   │   │   ├── NowPlaying.tsx
│   │   │   ├── MiniPlayer.tsx
│   │   │   └── SpotifyConnect.tsx
│   │   ├── study/                   # Personal study tools
│   │   │   ├── PomodoroTimer.tsx
│   │   │   ├── TaskList.tsx
│   │   │   ├── StudyStats.tsx
│   │   │   └── StreakCounter.tsx
│   │   └── landing/
│   │       └── Hero.tsx
│   │
│   ├── hooks/
│   │   ├── usePartySocket.ts        # PartyKit connection
│   │   ├── usePresence.ts           # Friends' online status
│   │   ├── useCharacter.ts          # Character data
│   │   ├── usePoke.ts               # Poke actions
│   │   ├── useTimer.ts              # Pomodoro timer
│   │   └── useNowPlaying.ts         # Music activity
│   │
│   ├── stores/
│   │   ├── presenceStore.ts         # Friends' live status
│   │   ├── uiStore.ts               # UI state
│   │   └── userStore.ts             # Current user & character
│   │
│   ├── lib/
│   │   ├── rough.ts                 # Rough.js helpers
│   │   ├── xp.ts                    # XP calculation & leveling
│   │   ├── spotify.ts               # Spotify API helpers
│   │   ├── supabase.ts              # Supabase client
│   │   └── constants.ts             # Classes, achievements, etc.
│   │
│   └── types/
│       ├── character.ts
│       ├── presence.ts
│       ├── poke.ts
│       └── messages.ts
│
└── README.md
```

---

## Implementation Phases

### Phase 1: Auth & Character Creator
- Next.js + TypeScript + Tailwind + Supabase setup
- Auth with NextAuth (Google/Discord OAuth)
- Character creator page: pick class, name, doodle avatar
- Character card component with Rough.js borders
- Stats display, XP bar
- Sketchy UI component library

### Phase 2: Friends & Presence
- PartyKit presence server (track who's online)
- Friend system: add by username, accept/reject requests
- Friends list with online/offline/studying status
- Activity feed: see what friends are doing
- Custom status setting

### Phase 3: Poke System
- Poke types with doodle animations (nudge, wave, paper airplane, coffee, eraser)
- Poke notifications (in-app toast with animation)
- Poke back in one tap
- Poke streak counter between friends

### Phase 4: Music & Activity Sharing
- Spotify integration (show now-playing on profile)
- Manual "working on" status
- Sketchy music player widget on profiles
- "Listen along" — open same song
- Activity broadcasts via PartyKit

### Phase 5: Study Tools & XP
- Personal Pomodoro timer with XP rewards
- Task list with XP on completion
- Study log tracking (daily focus time)
- Streak system with flame counter
- Level-up notifications & achievements

### Phase 6: Polish & Social
- Reactions on friends' activities
- Achievements feed
- Study groups
- Weekly leaderboard
- Profile themes
- Daily quests
- Pet companion system
- Responsive mobile design

---

## Aesthetic Guidelines

- **Rough.js** for all borders/shapes (wobbly, hand-drawn strokes)
- **Paper texture** backgrounds
- **Slight rotation** on cards (`transform: rotate(-0.5deg)`) for notebook feel
- **Monochrome + one accent color** (black/white with soft yellow or blue)
- **Doodle icons** instead of standard icon libraries
- **Handwriting fonts** (Caveat, Patrick Hand, Schoolbell)
- **Dark mode = "Chalkboard mode"** (chalk-white on dark green)
- **RPG elements** drawn in a sketch/doodle style — no pixel art, keep it hand-drawn
- **Poke animations** — bouncy, playful, paper-craft feel
- **Character cards** look like hand-drawn trading cards with rough borders
