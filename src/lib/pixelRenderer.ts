import { CharacterConfig } from "@/types/character";

// Chibi proportions: big head, tiny body
// Grid is 20 wide x 28 tall
const W = 20;
const H = 28;

function darken(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0xff) - amount);
  const b = Math.max(0, (num & 0xff) - amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function lighten(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function blend(hex1: string, hex2: string, t: number): string {
  const n1 = parseInt(hex1.replace("#", ""), 16);
  const n2 = parseInt(hex2.replace("#", ""), 16);
  const r = Math.round((n1 >> 16) * (1 - t) + (n2 >> 16) * t);
  const g = Math.round(((n1 >> 8) & 0xff) * (1 - t) + ((n2 >> 8) & 0xff) * t);
  const b = Math.round((n1 & 0xff) * (1 - t) + (n2 & 0xff) * t);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

type Grid = (string | null)[][];

function createGrid(): Grid {
  return Array.from({ length: H }, () => Array(W).fill(null));
}

function px(grid: Grid, x: number, y: number, color: string) {
  if (x >= 0 && x < W && y >= 0 && y < H) {
    grid[y][x] = color;
  }
}

function rect(grid: Grid, x: number, y: number, w: number, h: number, color: string) {
  for (let dy = 0; dy < h; dy++)
    for (let dx = 0; dx < w; dx++)
      px(grid, x + dx, y + dy, color);
}

// ─── HEAD (big round chibi head) ───
function drawHead(grid: Grid, skin: string) {
  const shadow = darken(skin, 20);
  // Main head shape: rounded 12x10 centered
  // Row 2: 8 wide
  rect(grid, 6, 2, 8, 1, skin);
  // Row 3: 10 wide
  rect(grid, 5, 3, 10, 1, skin);
  // Rows 4-9: 12 wide (full face)
  rect(grid, 4, 4, 12, 6, skin);
  // Row 10: 10 wide (chin rounding)
  rect(grid, 5, 10, 10, 1, skin);
  // Row 11: 6 wide (chin)
  rect(grid, 7, 11, 6, 1, skin);
  // Subtle shadow under chin
  rect(grid, 7, 11, 6, 1, shadow);
}

// ─── FACE ───
function drawFace(grid: Grid, skin: string, eyeStyle: string) {
  const blush = blend(skin, "#ff8888", 0.35);

  // Rosy cheeks (always — it's cute)
  px(grid, 5, 8, blush);
  px(grid, 6, 8, blush);
  px(grid, 13, 8, blush);
  px(grid, 14, 8, blush);

  // Mouth (tiny cute)
  px(grid, 9, 9, darken(skin, 50));
  px(grid, 10, 9, darken(skin, 50));

  switch (eyeStyle) {
    case "sparkle": {
      // 2x2 eyes with white sparkle highlight — big and cute
      px(grid, 7, 6, "#1a1020");
      px(grid, 8, 6, "#1a1020");
      px(grid, 7, 7, "#1a1020");
      px(grid, 8, 7, "#1a1020");
      px(grid, 12, 6, "#1a1020");
      px(grid, 11, 6, "#1a1020");
      px(grid, 12, 7, "#1a1020");
      px(grid, 11, 7, "#1a1020");
      // White sparkle
      px(grid, 7, 6, "#ffffff");
      px(grid, 11, 6, "#ffffff");
      // Lower sparkle dot
      px(grid, 8, 7, "#6a6a8a");
      px(grid, 12, 7, "#6a6a8a");
      break;
    }
    case "round": {
      // Simple round dot eyes
      px(grid, 7, 7, "#1a1020");
      px(grid, 8, 7, "#1a1020");
      px(grid, 11, 7, "#1a1020");
      px(grid, 12, 7, "#1a1020");
      // Highlight
      px(grid, 7, 7, "#ffffff");
      px(grid, 11, 7, "#ffffff");
      break;
    }
    case "happy": {
      // Closed happy curve eyes ^_^
      px(grid, 7, 7, "#1a1020");
      px(grid, 8, 6, "#1a1020");
      px(grid, 6, 7, "#1a1020");
      px(grid, 11, 7, "#1a1020");
      px(grid, 12, 6, "#1a1020");
      px(grid, 13, 7, "#1a1020");
      // Happy mouth
      px(grid, 9, 9, "#c06060");
      px(grid, 10, 9, "#c06060");
      px(grid, 8, 9, darken(skin, 40));
      px(grid, 11, 9, darken(skin, 40));
      break;
    }
    case "sleepy": {
      // Half-closed droopy eyes
      px(grid, 7, 7, "#1a1020");
      px(grid, 8, 7, "#1a1020");
      px(grid, 11, 7, "#1a1020");
      px(grid, 12, 7, "#1a1020");
      // Eyelid line
      px(grid, 7, 6, darken(skin, 25));
      px(grid, 8, 6, darken(skin, 25));
      px(grid, 11, 6, darken(skin, 25));
      px(grid, 12, 6, darken(skin, 25));
      // Zzz
      px(grid, 15, 4, "#8888cc");
      px(grid, 16, 3, "#8888cc");
      break;
    }
    case "wink": {
      // One open eye, one winking
      // Left eye open
      px(grid, 7, 6, "#1a1020");
      px(grid, 8, 6, "#1a1020");
      px(grid, 7, 7, "#1a1020");
      px(grid, 8, 7, "#1a1020");
      px(grid, 7, 6, "#ffffff");
      px(grid, 8, 7, "#6a6a8a");
      // Right eye wink
      px(grid, 11, 7, "#1a1020");
      px(grid, 12, 7, "#1a1020");
      px(grid, 13, 7, darken(skin, 30));
      // Cute mouth
      px(grid, 9, 9, "#c06060");
      px(grid, 10, 9, "#c06060");
      break;
    }
    case "determined": {
      // Slightly angled serious eyes
      px(grid, 7, 7, "#1a1020");
      px(grid, 8, 7, "#1a1020");
      px(grid, 11, 7, "#1a1020");
      px(grid, 12, 7, "#1a1020");
      // Brow
      px(grid, 6, 5, "#1a1020");
      px(grid, 7, 5, "#1a1020");
      px(grid, 8, 6, "#1a1020");
      px(grid, 12, 5, "#1a1020");
      px(grid, 13, 5, "#1a1020");
      px(grid, 11, 6, "#1a1020");
      // Highlights
      px(grid, 7, 7, "#ffffff");
      px(grid, 11, 7, "#ffffff");
      break;
    }
  }
}

// ─── HAIR ───
function drawHair(grid: Grid, style: string, color: string) {
  const hi = lighten(color, 35);
  const sh = darken(color, 25);

  switch (style) {
    case "short": {
      // Top cap
      rect(grid, 5, 1, 10, 2, color);
      rect(grid, 4, 2, 1, 3, color);
      rect(grid, 15, 2, 1, 3, color);
      // Fringe
      rect(grid, 5, 3, 3, 1, color);
      rect(grid, 12, 3, 3, 1, color);
      // Highlights
      px(grid, 7, 1, hi);
      px(grid, 10, 1, hi);
      break;
    }
    case "fluffy": {
      // Big fluffy volume
      rect(grid, 4, 0, 12, 3, color);
      rect(grid, 3, 1, 1, 4, color);
      rect(grid, 16, 1, 1, 4, color);
      // Extra fluff on top
      px(grid, 5, 0, color);
      px(grid, 14, 0, color);
      rect(grid, 6, 0, 8, 1, color);
      // Side volume
      rect(grid, 3, 3, 1, 4, color);
      rect(grid, 16, 3, 1, 4, color);
      // Fringe — cute wispy bangs
      rect(grid, 5, 3, 4, 1, color);
      rect(grid, 11, 3, 4, 1, color);
      px(grid, 6, 4, color);
      px(grid, 13, 4, color);
      // Highlights
      px(grid, 7, 0, hi);
      px(grid, 11, 0, hi);
      px(grid, 5, 1, hi);
      break;
    }
    case "long": {
      // Top
      rect(grid, 5, 1, 10, 2, color);
      rect(grid, 4, 2, 1, 3, color);
      rect(grid, 15, 2, 1, 3, color);
      // Long sides flowing down
      rect(grid, 3, 3, 1, 12, color);
      rect(grid, 16, 3, 1, 12, color);
      rect(grid, 2, 6, 1, 8, color);
      rect(grid, 17, 6, 1, 8, color);
      // Fringe
      rect(grid, 5, 3, 3, 1, color);
      rect(grid, 12, 3, 3, 1, color);
      // Tips taper
      px(grid, 3, 15, color);
      px(grid, 16, 15, color);
      px(grid, 2, 14, sh);
      px(grid, 17, 14, sh);
      // Highlights
      px(grid, 7, 1, hi);
      px(grid, 3, 6, hi);
      px(grid, 16, 6, hi);
      break;
    }
    case "twintails": {
      // Top
      rect(grid, 5, 1, 10, 2, color);
      rect(grid, 4, 2, 1, 3, color);
      rect(grid, 15, 2, 1, 3, color);
      // Fringe
      rect(grid, 5, 3, 4, 1, color);
      rect(grid, 11, 3, 4, 1, color);
      // Left twintail
      rect(grid, 2, 4, 2, 2, color);
      rect(grid, 1, 6, 2, 6, color);
      rect(grid, 1, 12, 2, 3, color);
      px(grid, 2, 15, color);
      // Right twintail
      rect(grid, 16, 4, 2, 2, color);
      rect(grid, 17, 6, 2, 6, color);
      rect(grid, 17, 12, 2, 3, color);
      px(grid, 17, 15, color);
      // Hair ties (accent)
      px(grid, 2, 5, "#ff6b8a");
      px(grid, 3, 5, "#ff6b8a");
      px(grid, 16, 5, "#ff6b8a");
      px(grid, 17, 5, "#ff6b8a");
      // Highlights
      px(grid, 8, 1, hi);
      px(grid, 1, 7, hi);
      px(grid, 18, 7, hi);
      break;
    }
    case "ponytail": {
      rect(grid, 5, 1, 10, 2, color);
      rect(grid, 4, 2, 1, 3, color);
      rect(grid, 15, 2, 1, 3, color);
      // Fringe
      rect(grid, 5, 3, 3, 1, color);
      px(grid, 6, 4, color);
      // Ponytail out the back right
      rect(grid, 15, 3, 2, 2, color);
      rect(grid, 16, 5, 2, 6, color);
      rect(grid, 17, 11, 1, 4, color);
      // Hair tie
      px(grid, 16, 4, "#ff6b8a");
      px(grid, 16, 5, "#ff6b8a");
      // Highlights
      px(grid, 8, 1, hi);
      px(grid, 17, 7, hi);
      break;
    }
    case "bob": {
      rect(grid, 4, 1, 12, 2, color);
      rect(grid, 3, 2, 1, 6, color);
      rect(grid, 16, 2, 1, 6, color);
      // Bob shape — rounded at jaw
      rect(grid, 3, 8, 2, 2, color);
      rect(grid, 15, 8, 2, 2, color);
      px(grid, 4, 10, color);
      px(grid, 15, 10, color);
      // Fringe — straight across
      rect(grid, 5, 3, 10, 1, color);
      rect(grid, 5, 4, 10, 1, color);
      // Highlights
      px(grid, 7, 1, hi);
      px(grid, 12, 1, hi);
      px(grid, 3, 5, hi);
      break;
    }
    case "messy": {
      rect(grid, 4, 0, 12, 3, color);
      rect(grid, 3, 1, 1, 4, color);
      rect(grid, 16, 1, 1, 4, color);
      // Messy spikes
      px(grid, 4, 0, color);
      px(grid, 15, 0, color);
      px(grid, 3, 0, color);
      px(grid, 16, 0, color);
      // Stray strands
      px(grid, 2, 2, color);
      px(grid, 17, 1, color);
      px(grid, 5, 0, hi);
      // Fringe — messy
      px(grid, 5, 3, color);
      px(grid, 7, 3, color);
      px(grid, 8, 4, color);
      px(grid, 12, 3, color);
      px(grid, 14, 3, color);
      // Highlights
      px(grid, 8, 0, hi);
      px(grid, 13, 0, hi);
      break;
    }
    case "sideswept": {
      rect(grid, 5, 1, 10, 2, color);
      rect(grid, 4, 2, 1, 3, color);
      rect(grid, 15, 2, 1, 3, color);
      // Side swept bangs — heavy on left
      rect(grid, 4, 3, 6, 1, color);
      rect(grid, 4, 4, 4, 1, color);
      px(grid, 4, 5, color);
      // Light on right
      px(grid, 14, 3, color);
      // Side flow
      rect(grid, 3, 4, 1, 7, color);
      px(grid, 2, 7, color);
      px(grid, 2, 8, color);
      // Highlights
      px(grid, 7, 1, hi);
      px(grid, 5, 3, hi);
      break;
    }
    case "curly": {
      rect(grid, 4, 0, 12, 3, color);
      rect(grid, 3, 1, 1, 5, color);
      rect(grid, 16, 1, 1, 5, color);
      // Curly bumps on sides
      px(grid, 2, 3, color);
      px(grid, 2, 5, color);
      px(grid, 2, 7, color);
      px(grid, 17, 3, color);
      px(grid, 17, 5, color);
      px(grid, 17, 7, color);
      // Flowing curls down
      rect(grid, 3, 6, 1, 6, color);
      rect(grid, 16, 6, 1, 6, color);
      px(grid, 2, 9, color);
      px(grid, 17, 9, color);
      // Fringe
      rect(grid, 5, 3, 3, 1, color);
      rect(grid, 12, 3, 3, 1, color);
      // Highlights
      px(grid, 7, 0, hi);
      px(grid, 12, 0, hi);
      px(grid, 3, 4, hi);
      px(grid, 16, 4, hi);
      break;
    }
    case "spiky": {
      rect(grid, 5, 1, 10, 2, color);
      // Spikes!
      px(grid, 5, 0, color);
      px(grid, 7, 0, color);
      px(grid, 9, 0, color);
      px(grid, 11, 0, color);
      px(grid, 14, 0, color);
      px(grid, 6, 0, hi);
      px(grid, 10, 0, hi);
      px(grid, 13, 0, hi);
      // Extra tall spikes
      px(grid, 8, 0, color);
      px(grid, 12, 0, color);
      // Sides
      rect(grid, 4, 2, 1, 3, color);
      rect(grid, 15, 2, 1, 3, color);
      // Fringe
      px(grid, 5, 3, color);
      px(grid, 7, 3, color);
      px(grid, 14, 3, color);
      break;
    }
  }
}

// ─── BODY & OUTFIT ───
function drawBody(grid: Grid, skin: string, outfit: string, outfitColor: string) {
  const oc = outfitColor;
  const od = darken(oc, 30);
  const ol = lighten(oc, 20);
  const skinD = darken(skin, 20);

  // Neck
  rect(grid, 8, 12, 4, 1, skin);

  // Base body shape (tiny chibi body)
  // Torso: rows 13-19
  rect(grid, 6, 13, 8, 7, oc);

  // Arms
  rect(grid, 4, 13, 2, 5, oc);
  rect(grid, 14, 13, 2, 5, oc);
  // Hands
  px(grid, 4, 18, skin);
  px(grid, 5, 18, skin);
  px(grid, 14, 18, skinD);
  px(grid, 15, 18, skinD);

  // Legs
  rect(grid, 7, 20, 2, 3, skin);
  rect(grid, 11, 20, 2, 3, skin);

  // Shoes (cute rounded)
  rect(grid, 6, 23, 3, 1, "#4a3a5a");
  rect(grid, 11, 23, 3, 1, "#4a3a5a");
  px(grid, 6, 22, "#4a3a5a");
  px(grid, 13, 22, "#4a3a5a");

  // Pants / bottom
  rect(grid, 6, 20, 8, 1, od);
  rect(grid, 7, 20, 2, 3, darken(oc, 15));
  rect(grid, 11, 20, 2, 3, darken(oc, 15));

  // Outfit details
  switch (outfit) {
    case "tee": {
      // Short sleeves — show skin on forearms
      rect(grid, 4, 16, 2, 2, skin);
      rect(grid, 14, 16, 2, 2, skin);
      // Collar
      px(grid, 8, 13, od);
      px(grid, 9, 13, ol);
      px(grid, 10, 13, od);
      px(grid, 11, 13, od);
      // Shirt bottom
      rect(grid, 6, 19, 8, 1, od);
      break;
    }
    case "hoodie": {
      // Hood behind head
      px(grid, 4, 10, oc);
      px(grid, 15, 10, oc);
      px(grid, 3, 11, oc);
      px(grid, 16, 11, oc);
      // Hoodie strings
      px(grid, 8, 13, ol);
      px(grid, 11, 13, ol);
      px(grid, 8, 14, ol);
      px(grid, 11, 14, ol);
      // Pocket
      rect(grid, 7, 17, 6, 2, od);
      rect(grid, 8, 17, 4, 1, ol);
      break;
    }
    case "dress": {
      // Dress flares out at bottom
      rect(grid, 5, 17, 10, 3, oc);
      rect(grid, 4, 19, 12, 1, oc);
      // Cute collar
      px(grid, 7, 13, ol);
      px(grid, 8, 13, "#ffffff");
      px(grid, 11, 13, "#ffffff");
      px(grid, 12, 13, ol);
      // Waist ribbon
      rect(grid, 6, 16, 8, 1, od);
      px(grid, 9, 16, lighten(oc, 40));
      px(grid, 10, 16, lighten(oc, 40));
      // Dress hem detail
      for (let x = 5; x < 15; x += 2) {
        px(grid, x, 19, ol);
      }
      // Legs peek below dress
      rect(grid, 7, 20, 2, 2, skin);
      rect(grid, 11, 20, 2, 2, skin);
      break;
    }
    case "robe": {
      // Flowing robe
      rect(grid, 4, 13, 12, 7, oc);
      rect(grid, 3, 15, 14, 5, oc);
      // Robe opening
      px(grid, 9, 14, od);
      px(grid, 9, 15, od);
      px(grid, 9, 16, od);
      px(grid, 9, 17, od);
      px(grid, 9, 18, od);
      px(grid, 10, 14, od);
      px(grid, 10, 15, od);
      // Inner robe
      px(grid, 10, 16, lighten(oc, 50));
      px(grid, 10, 17, lighten(oc, 50));
      // Belt/sash
      rect(grid, 4, 16, 12, 1, darken(oc, 50));
      px(grid, 8, 16, "#c8a84a");
      px(grid, 11, 16, "#c8a84a");
      // Robe hem
      rect(grid, 3, 19, 14, 1, od);
      // Sleeves drape
      px(grid, 3, 14, oc);
      px(grid, 16, 14, oc);
      px(grid, 2, 16, oc);
      px(grid, 17, 16, oc);
      break;
    }
    case "overalls": {
      // Show tee underneath
      const underColor = lighten(oc, 60);
      rect(grid, 6, 13, 8, 2, underColor);
      rect(grid, 4, 13, 2, 4, underColor);
      rect(grid, 14, 13, 2, 4, underColor);
      // Overalls
      rect(grid, 6, 15, 8, 5, oc);
      // Straps
      px(grid, 7, 13, oc);
      px(grid, 7, 14, oc);
      px(grid, 12, 13, oc);
      px(grid, 12, 14, oc);
      // Pocket
      rect(grid, 8, 16, 4, 2, od);
      // Buttons
      px(grid, 7, 15, "#c8a84a");
      px(grid, 12, 15, "#c8a84a");
      // Show skin on arms
      rect(grid, 4, 17, 2, 1, skin);
      rect(grid, 14, 17, 2, 1, skin);
      break;
    }
    case "cape": {
      // Under-shirt
      rect(grid, 6, 13, 8, 7, darken(oc, 20));
      rect(grid, 4, 13, 2, 5, darken(oc, 20));
      rect(grid, 14, 13, 2, 5, darken(oc, 20));
      // Cape flowing behind — extends to the sides
      rect(grid, 2, 12, 2, 9, oc);
      rect(grid, 16, 12, 2, 9, oc);
      px(grid, 1, 14, oc);
      px(grid, 18, 14, oc);
      px(grid, 1, 16, oc);
      px(grid, 18, 16, oc);
      // Cape clasp at neck
      px(grid, 7, 12, "#c8a84a");
      px(grid, 12, 12, "#c8a84a");
      px(grid, 8, 12, oc);
      px(grid, 11, 12, oc);
      // Cape bottom flow
      px(grid, 2, 21, oc);
      px(grid, 17, 21, oc);
      px(grid, 3, 20, od);
      px(grid, 16, 20, od);
      // Inner cape highlight
      px(grid, 2, 14, ol);
      px(grid, 17, 14, ol);
      break;
    }
  }
}

// ─── ACCESSORIES ───
function drawAccessory(grid: Grid, accessory: string, hairColor: string) {
  switch (accessory) {
    case "witch_hat": {
      // Brim
      rect(grid, 2, 1, 16, 1, "#2a1a3a");
      rect(grid, 3, 0, 14, 1, "#2a1a3a");
      // Cone
      rect(grid, 6, 0, 8, 1, "#2a1a3a");
      rect(grid, 7, -1, 6, 1, "#2a1a3a");
      // Only draw in-bounds for negative y
      px(grid, 7, 0, "#3a2a4a");
      px(grid, 8, 0, "#3a2a4a");
      rect(grid, 8, 0, 4, 1, "#3a2a4a");
      // Hat band
      rect(grid, 3, 1, 14, 1, "#6a4a8a");
      // Buckle/star
      px(grid, 9, 1, "#ffdd44");
      px(grid, 10, 1, "#ffdd44");
      // Hat highlight
      px(grid, 6, 0, lighten("#2a1a3a", 20));
      break;
    }
    case "beret": {
      rect(grid, 4, 0, 10, 2, "#c45b8a");
      rect(grid, 5, 0, 8, 1, "#d46b9a");
      px(grid, 3, 1, "#c45b8a");
      // Little nub on top
      px(grid, 9, 0, "#e07aaa");
      break;
    }
    case "bow": {
      // Big cute bow on top
      const bc = "#ff6b8a";
      const bd = darken(bc, 30);
      px(grid, 8, 0, bc);
      px(grid, 9, 0, bd);
      px(grid, 10, 0, bd);
      px(grid, 11, 0, bc);
      px(grid, 7, 1, bc);
      px(grid, 8, 1, bd);
      px(grid, 11, 1, bd);
      px(grid, 12, 1, bc);
      px(grid, 9, 1, "#ff4466");
      px(grid, 10, 1, "#ff4466");
      break;
    }
    case "glasses": {
      // Round cute glasses
      rect(grid, 6, 6, 3, 2, "#2a2a4a");
      rect(grid, 11, 6, 3, 2, "#2a2a4a");
      // Bridge
      px(grid, 9, 6, "#2a2a4a");
      px(grid, 10, 6, "#2a2a4a");
      // Lens shine
      px(grid, 7, 6, "#88aadd");
      px(grid, 12, 6, "#88aadd");
      // Clear inside
      px(grid, 7, 7, "#aaccff");
      px(grid, 12, 7, "#aaccff");
      break;
    }
    case "cat_ears": {
      const ec = darken(hairColor, 10);
      const inner = "#ffaaaa";
      // Left ear
      px(grid, 4, 0, ec);
      px(grid, 5, 0, ec);
      px(grid, 4, 1, ec);
      px(grid, 5, 1, inner);
      // Right ear
      px(grid, 14, 0, ec);
      px(grid, 15, 0, ec);
      px(grid, 14, 1, inner);
      px(grid, 15, 1, ec);
      break;
    }
    case "horns": {
      // Cute small horns
      px(grid, 5, 0, "#e8d8c0");
      px(grid, 5, 1, "#d8c8b0");
      px(grid, 4, 0, "#f0e8d8");
      px(grid, 14, 0, "#e8d8c0");
      px(grid, 14, 1, "#d8c8b0");
      px(grid, 15, 0, "#f0e8d8");
      break;
    }
    case "halo": {
      // Floating golden halo
      rect(grid, 6, 0, 8, 1, "#ffdd44");
      px(grid, 5, 0, "#eebb22");
      px(grid, 14, 0, "#eebb22");
      px(grid, 8, 0, "#ffee88");
      px(grid, 11, 0, "#ffee88");
      break;
    }
    case "flower": {
      // Cute flower on the side
      px(grid, 14, 2, "#ff88aa");
      px(grid, 15, 1, "#ff88aa");
      px(grid, 15, 3, "#ff88aa");
      px(grid, 16, 2, "#ff88aa");
      px(grid, 15, 2, "#ffdd44"); // center
      break;
    }
    case "crown": {
      // Tiny pixel crown
      rect(grid, 6, 0, 8, 1, "#c8a84a");
      rect(grid, 7, 1, 6, 1, "#c8a84a");
      px(grid, 6, 0, "#e8c84a");
      px(grid, 9, 0, "#e8c84a");
      px(grid, 13, 0, "#e8c84a");
      // Jewels
      px(grid, 8, 1, "#ff4466");
      px(grid, 10, 1, "#4488ff");
      px(grid, 12, 1, "#44dd88");
      break;
    }
  }
}

// ─── OUTLINE ───
function drawOutline(grid: Grid): Grid {
  const outlined = createGrid();
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (grid[y][x]) {
        outlined[y][x] = grid[y][x];
        const neighbors = [
          [x - 1, y],
          [x + 1, y],
          [x, y - 1],
          [x, y + 1],
        ];
        for (const [nx, ny] of neighbors) {
          if (nx >= 0 && nx < W && ny >= 0 && ny < H && !grid[ny][nx] && !outlined[ny][nx]) {
            outlined[ny][nx] = "#1a1020";
          }
        }
      }
    }
  }
  return outlined;
}

// ─── RENDER ───
export function renderCharacter(
  ctx: CanvasRenderingContext2D,
  config: CharacterConfig,
  scale: number = 4,
  offsetX: number = 0,
  offsetY: number = 0
) {
  const grid = createGrid();

  // Draw layers bottom to top
  drawHead(grid, config.skinTone);
  drawBody(grid, config.skinTone, config.outfit, config.outfitColor);
  drawHair(grid, config.hairStyle, config.hairColor);
  drawFace(grid, config.skinTone, config.eyeStyle);
  if (config.accessory !== "none") {
    drawAccessory(grid, config.accessory, config.hairColor);
  }

  const finalGrid = drawOutline(grid);

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (finalGrid[y][x]) {
        ctx.fillStyle = finalGrid[y][x]!;
        ctx.fillRect(offsetX + x * scale, offsetY + y * scale, scale, scale);
      }
    }
  }
}

export const CHAR_WIDTH = W;
export const CHAR_HEIGHT = H;
