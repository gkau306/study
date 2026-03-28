# StudyTogether

A collaborative study session web app where you share a link, friends join, and you all study together with shared music, synced timers, and a cozy hand-drawn notebook aesthetic.

---

## Features

### Core
- **Room creation** — one click, get a shareable link (no signup required)
- **Shared music queue** — anyone can add songs, upvote/downvote to reorder, now-playing synced for everyone (YouTube embed)
- **Synced Pomodoro timer** — 25/5 or custom intervals, everyone sees the same countdown, visual focus/break transitions
- **Presence** — see who's in the room with little doodle avatars

### Social
- **Doodle chat** — text chat with sketchy speech-bubble style
- **Reactions** — floating hand-drawn reaction doodles across the screen (pencil star, coffee cup, brain, zzz)
- **Status** — "focusing", "on break", "brb", "vibing" shown under each avatar

### Productivity
- **Task list** — personal to-do list in a notebook-style lined area
- **Focus stats** — track pomodoro cycles completed, hand-drawn bar chart
- **Session history** — "you studied 2h 15m today" with a sketchy progress ring

### Vibes
- **Ambient sounds mixer** — rain, coffee shop, fireplace, lo-fi static with sliders to mix
- **Room themes** — "Notebook", "Graph Paper", "Chalkboard", "Sticky Notes" — each changes background texture and color palette
- **Background doodles** — subtle animated doodles floating in the background (stars, clouds, music notes)

### Nice-to-haves
- **Sticky notes** — drag around the screen, shared or personal
- **Music history** — scroll back through played tracks
- **Shared doodle canvas** — draw together during breaks
- **Room leaderboard** — opt-in gamified focus stats with hand-drawn trophy doodles

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | Next.js 14+ (App Router) | SSR for landing page, client components for room UI, API routes |
| **Language** | TypeScript | Type safety across client and server, especially for real-time message schemas |
| **Real-time** | PartyKit | Each room = one "party" with persistent state. Handles WebSockets, reconnection, edge deployment. No server infra to manage |
| **Sketchy UI** | Rough.js + custom React components | Hand-drawn borders, wobbly shapes. Thin component library wrapping Rough.js SVG rendering |
| **Styling** | Tailwind CSS + CSS custom properties | Tailwind for layout, CSS variables for theme switching |
| **Fonts** | Caveat / Patrick Hand (Google Fonts) | Handwriting-style typography |
| **Music** | YouTube IFrame API | Free, no API key needed for playback, leader-based sync |
| **Ambient Audio** | Howler.js | Robust layered audio with individual volume control |
| **State** | Zustand | Lightweight client state management |
| **Persistence** | localStorage + PartyKit Durable Storage | User prefs in localStorage, room state in PartyKit storage |
| **Animations** | Framer Motion | Smooth transitions, floating reactions, page-flip effects |
| **Deploy** | Vercel (Next.js) + PartyKit (Cloudflare edge) | Both have free tiers |

---

## Architecture

```
[Browser A]          [Browser B]          [Browser C]
      |                    |                    |
      |--- PartySocket ----|--- PartySocket ----|
      |                    |                    |
      v                    v                    v
+-----------------------------------------------------------+
|               PartyKit Server (per room)                  |
|                                                           |
|  Room State:                                              |
|  - participants[]    - timer { duration, remaining }      |
|  - musicQueue[]      - currentTrack                       |
|  - chatMessages[]    - roomSettings                       |
|                                                           |
|  Events:                                                  |
|  timer:start/pause/reset    queue:add/vote/skip           |
|  chat:message/reaction      room:join/leave/settings      |
|  sync:state (full broadcast to new joiners)               |
+-----------------------------------------------------------+
            |
   [PartyKit Durable Storage]


+-------------------+
| Vercel (Next.js)  |
|                   |
| /           Landing page
| /room/[id]  Room page
| /api/room   Create room
+-------------------+
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
│   ├── sounds/          # Ambient audio (rain, coffeeshop, fireplace, library)
│   ├── textures/        # Paper/notebook backgrounds
│   └── doodles/         # Hand-drawn SVG icons
│
├── party/               # PartyKit server
│   ├── index.ts         # Main room logic
│   ├── timer.ts         # Timer state machine
│   ├── queue.ts         # Music queue logic
│   └── types.ts         # Shared message & state types
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Landing page
│   │   ├── globals.css
│   │   └── room/[id]/
│   │       ├── page.tsx         # Room page
│   │       └── loading.tsx
│   │
│   ├── components/
│   │   ├── sketchy/             # Sketchy UI primitives
│   │   │   ├── SketchBox.tsx
│   │   │   ├── SketchButton.tsx
│   │   │   ├── SketchInput.tsx
│   │   │   ├── SketchCard.tsx
│   │   │   ├── SketchSlider.tsx
│   │   │   ├── SketchToggle.tsx
│   │   │   └── SketchProgress.tsx
│   │   ├── room/               # Room components
│   │   ├── timer/              # Pomodoro timer
│   │   ├── music/              # Music queue & player
│   │   ├── chat/               # Chat & reactions
│   │   ├── ambient/            # Ambient sounds
│   │   ├── stats/              # Focus statistics
│   │   └── landing/            # Landing page
│   │
│   ├── hooks/
│   │   ├── usePartySocket.ts
│   │   ├── useRoomState.ts
│   │   ├── useTimer.ts
│   │   ├── useQueue.ts
│   │   ├── useAmbient.ts
│   │   └── useStats.ts
│   │
│   ├── stores/                 # Zustand stores
│   │   ├── roomStore.ts
│   │   ├── uiStore.ts
│   │   └── userStore.ts
│   │
│   ├── lib/
│   │   ├── rough.ts
│   │   ├── roomId.ts
│   │   ├── youtube.ts
│   │   └── constants.ts
│   │
│   └── types/
│       ├── room.ts
│       ├── timer.ts
│       ├── music.ts
│       └── messages.ts
│
└── README.md
```

---

## Implementation Phases

### Phase 1: Foundation
- Next.js + TypeScript + Tailwind setup
- PartyKit project setup
- Sketchy component library (Rough.js wrappers)
- Landing page with "Create Room" / "Join Room"
- Room page with real-time presence (join via link, see who's connected)

### Phase 2: Pomodoro Timer
- Server-side timer state machine (idle → working → break → long break)
- Synced countdown broadcast to all clients
- Rough.js circular progress ring
- Configurable durations
- Focus/break mode UI transitions

### Phase 3: Music Queue
- Add tracks via YouTube URL
- Shared queue with upvote/downvote reordering
- YouTube IFrame embed with leader-based playback sync
- Skip vote (majority required)
- Now-playing display with sketchy album-art frame

### Phase 4: Chat, Reactions & Ambient Sounds
- Text chat sidebar with speech-bubble style
- Floating doodle reactions (Framer Motion)
- Ambient sound mixer with Howler.js (rain, coffee shop, fireplace, library)
- Auto-status during focus mode

### Phase 5: Stats, Themes & Polish
- Focus stats (pomodoros completed, total time) stored in localStorage
- Room themes (Notebook, Graph Paper, Chalkboard, Sticky Notes)
- Shared to-do list
- Responsive design, loading states, error handling, reconnection UI

### Phase 6: Deploy
- Vercel (Next.js) + PartyKit (Cloudflare edge)
- Cross-browser testing

---

## Aesthetic Guidelines

- **Rough.js** for all borders/shapes (wobbly, hand-drawn strokes)
- **Paper texture** backgrounds
- **Slight rotation** on cards (`transform: rotate(-0.5deg)`) for notebook feel
- **Monochrome + one accent color** (black/white with soft yellow or blue)
- **Doodle icons** instead of standard icon libraries
- **Handwriting fonts** (Caveat, Patrick Hand, Schoolbell)
- **Dark mode = "Chalkboard mode"** (chalk-white on dark green)
- **Loading states** as animated doodles (spinning pencil, bouncing eraser)
