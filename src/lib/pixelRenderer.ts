import { CharacterConfig } from "@/types/character";

const PIXEL = 4; // each "pixel" is 4x4 screen pixels
const W = 16; // character width in pixels
const H = 24; // character height in pixels

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

type Grid = (string | null)[][];

function createGrid(): Grid {
  return Array.from({ length: H }, () => Array(W).fill(null));
}

function setPixel(grid: Grid, x: number, y: number, color: string) {
  if (x >= 0 && x < W && y >= 0 && y < H) {
    grid[y][x] = color;
  }
}

function fillRect(
  grid: Grid,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
) {
  for (let dy = 0; dy < h; dy++) {
    for (let dx = 0; dx < w; dx++) {
      setPixel(grid, x + dx, y + dy, color);
    }
  }
}

function drawBody(grid: Grid, skin: string) {
  const skinDark = darken(skin, 30);

  // Head (6x6 centered)
  fillRect(grid, 5, 2, 6, 6, skin);
  // Ears
  setPixel(grid, 4, 4, skin);
  setPixel(grid, 11, 4, skin);
  // Neck
  fillRect(grid, 7, 8, 2, 1, skin);
  // Arms
  fillRect(grid, 3, 9, 2, 5, skin);
  fillRect(grid, 11, 9, 2, 5, skin);
  // Hands
  fillRect(grid, 3, 14, 2, 1, skinDark);
  fillRect(grid, 11, 14, 2, 1, skinDark);
  // Legs
  fillRect(grid, 5, 17, 2, 4, skin);
  fillRect(grid, 9, 17, 2, 4, skin);
  // Feet
  fillRect(grid, 4, 21, 3, 1, "#4a4a4a");
  fillRect(grid, 9, 21, 3, 1, "#4a4a4a");
  // Shoes
  fillRect(grid, 4, 22, 3, 1, "#333");
  fillRect(grid, 9, 22, 3, 1, "#333");
}

function drawEyes(grid: Grid, style: string) {
  switch (style) {
    case "normal":
      setPixel(grid, 6, 5, "#1a1a1a");
      setPixel(grid, 9, 5, "#1a1a1a");
      // Pupils (white highlight)
      break;
    case "happy":
      setPixel(grid, 6, 5, "#1a1a1a");
      setPixel(grid, 9, 5, "#1a1a1a");
      setPixel(grid, 6, 4, "#1a1a1a");
      setPixel(grid, 9, 4, "#1a1a1a");
      break;
    case "sleepy":
      setPixel(grid, 6, 5, "#1a1a1a");
      setPixel(grid, 9, 5, "#1a1a1a");
      setPixel(grid, 6, 4, "#555");
      setPixel(grid, 7, 4, "#555");
      setPixel(grid, 9, 4, "#555");
      setPixel(grid, 10, 4, "#555");
      break;
    case "cool":
      // Sunglasses
      fillRect(grid, 5, 4, 3, 2, "#1a1a1a");
      fillRect(grid, 8, 4, 3, 2, "#1a1a1a");
      setPixel(grid, 6, 5, "#2196f3");
      setPixel(grid, 9, 5, "#2196f3");
      break;
  }

  // Mouth
  if (style === "happy") {
    setPixel(grid, 7, 7, "#c0392b");
    setPixel(grid, 8, 7, "#c0392b");
  } else {
    setPixel(grid, 7, 7, darken("#c0392b", 40));
  }
}

function drawHair(grid: Grid, style: string, color: string) {
  const highlight = lighten(color, 30);

  switch (style) {
    case "short":
      fillRect(grid, 5, 1, 6, 2, color);
      fillRect(grid, 4, 2, 1, 3, color);
      fillRect(grid, 11, 2, 1, 3, color);
      setPixel(grid, 5, 1, highlight);
      break;

    case "messy":
      fillRect(grid, 4, 0, 8, 3, color);
      setPixel(grid, 4, 3, color);
      setPixel(grid, 12, 2, color);
      setPixel(grid, 3, 1, color);
      setPixel(grid, 11, 0, color);
      setPixel(grid, 6, 0, highlight);
      setPixel(grid, 8, 0, highlight);
      break;

    case "long":
      fillRect(grid, 5, 0, 6, 3, color);
      fillRect(grid, 4, 1, 1, 8, color);
      fillRect(grid, 11, 1, 1, 8, color);
      fillRect(grid, 3, 4, 1, 5, color);
      fillRect(grid, 12, 4, 1, 5, color);
      setPixel(grid, 6, 0, highlight);
      setPixel(grid, 7, 0, highlight);
      break;

    case "curly":
      fillRect(grid, 4, 0, 8, 3, color);
      fillRect(grid, 3, 1, 1, 6, color);
      fillRect(grid, 12, 1, 1, 6, color);
      setPixel(grid, 3, 7, color);
      setPixel(grid, 12, 7, color);
      setPixel(grid, 4, 8, color);
      setPixel(grid, 11, 8, color);
      // Curl texture
      setPixel(grid, 5, 0, highlight);
      setPixel(grid, 8, 0, highlight);
      setPixel(grid, 3, 3, highlight);
      setPixel(grid, 12, 3, highlight);
      break;

    case "ponytail":
      fillRect(grid, 5, 0, 6, 3, color);
      fillRect(grid, 4, 1, 1, 4, color);
      fillRect(grid, 11, 1, 1, 4, color);
      // Ponytail
      fillRect(grid, 11, 3, 2, 2, color);
      fillRect(grid, 12, 5, 2, 3, color);
      fillRect(grid, 13, 8, 1, 2, color);
      setPixel(grid, 6, 0, highlight);
      break;

    case "buzz":
      fillRect(grid, 5, 1, 6, 2, color);
      setPixel(grid, 4, 2, color);
      setPixel(grid, 11, 2, color);
      setPixel(grid, 6, 1, highlight);
      setPixel(grid, 9, 1, highlight);
      break;

    case "bob":
      fillRect(grid, 4, 0, 8, 3, color);
      fillRect(grid, 3, 2, 1, 5, color);
      fillRect(grid, 12, 2, 1, 5, color);
      fillRect(grid, 4, 7, 1, 1, color);
      fillRect(grid, 11, 7, 1, 1, color);
      setPixel(grid, 5, 0, highlight);
      setPixel(grid, 9, 0, highlight);
      break;

    case "spiky":
      fillRect(grid, 5, 1, 6, 2, color);
      // Spikes
      setPixel(grid, 5, 0, color);
      setPixel(grid, 7, 0, color);
      setPixel(grid, 9, 0, color);
      setPixel(grid, 4, 0, color);
      setPixel(grid, 10, 0, color);
      setPixel(grid, 6, -1 + 1, highlight); // row 0
      setPixel(grid, 8, 0, highlight);
      setPixel(grid, 4, 2, color);
      setPixel(grid, 11, 2, color);
      break;
  }
}

function drawOutfit(grid: Grid, outfit: string, color: string) {
  const dark = darken(color, 30);
  const light = lighten(color, 20);

  // Base torso area
  fillRect(grid, 5, 9, 6, 8, color);

  switch (outfit) {
    case "tee":
      fillRect(grid, 5, 9, 6, 6, color);
      // Sleeves
      fillRect(grid, 3, 9, 2, 3, color);
      fillRect(grid, 11, 9, 2, 3, color);
      // Collar
      setPixel(grid, 7, 9, dark);
      setPixel(grid, 8, 9, dark);
      // Bottom edge
      fillRect(grid, 5, 15, 6, 1, dark);
      // Highlight
      setPixel(grid, 6, 10, light);
      break;

    case "hoodie":
      fillRect(grid, 5, 9, 6, 7, color);
      fillRect(grid, 3, 9, 2, 5, color);
      fillRect(grid, 11, 9, 2, 5, color);
      // Hood line
      fillRect(grid, 5, 8, 6, 1, color);
      setPixel(grid, 4, 8, color);
      setPixel(grid, 11, 8, color);
      // Pocket
      fillRect(grid, 6, 13, 4, 2, dark);
      // Drawstrings
      setPixel(grid, 7, 9, light);
      setPixel(grid, 8, 9, light);
      setPixel(grid, 7, 10, light);
      setPixel(grid, 8, 10, light);
      break;

    case "jacket":
      fillRect(grid, 5, 9, 6, 7, color);
      fillRect(grid, 3, 9, 2, 5, color);
      fillRect(grid, 11, 9, 2, 5, color);
      // Jacket opening
      setPixel(grid, 7, 10, dark);
      setPixel(grid, 7, 11, dark);
      setPixel(grid, 7, 12, dark);
      setPixel(grid, 7, 13, dark);
      setPixel(grid, 7, 14, dark);
      // Inner shirt
      setPixel(grid, 8, 10, "#ecf0f1");
      setPixel(grid, 8, 11, "#ecf0f1");
      setPixel(grid, 8, 12, "#ecf0f1");
      // Collar
      setPixel(grid, 6, 9, dark);
      setPixel(grid, 9, 9, dark);
      break;

    case "sweater":
      fillRect(grid, 5, 9, 6, 7, color);
      fillRect(grid, 3, 9, 2, 5, color);
      fillRect(grid, 11, 9, 2, 5, color);
      // Ribbing pattern
      for (let x = 5; x < 11; x++) {
        if (x % 2 === 0) {
          setPixel(grid, x, 15, dark);
          setPixel(grid, x, 9, dark);
        }
      }
      // Collar (turtleneck)
      fillRect(grid, 6, 8, 4, 1, color);
      setPixel(grid, 7, 8, dark);
      setPixel(grid, 8, 8, dark);
      break;
  }

  // Pants (always dark jeans)
  fillRect(grid, 5, 16, 6, 1, "#2c3e50");
  fillRect(grid, 5, 17, 2, 4, "#34495e");
  fillRect(grid, 9, 17, 2, 4, "#34495e");
  // Belt
  fillRect(grid, 5, 16, 6, 1, "#5d4e37");
  setPixel(grid, 7, 16, "#f0d060");
}

function drawAccessory(grid: Grid, accessory: string) {
  switch (accessory) {
    case "glasses":
      fillRect(grid, 5, 4, 2, 2, "#333");
      fillRect(grid, 9, 4, 2, 2, "#333");
      setPixel(grid, 7, 4, "#333");
      setPixel(grid, 8, 4, "#333");
      setPixel(grid, 6, 5, "#87ceeb");
      setPixel(grid, 9, 5, "#87ceeb");
      break;
    case "headband":
      fillRect(grid, 4, 2, 8, 1, "#e94560");
      setPixel(grid, 5, 2, lighten("#e94560", 30));
      break;
    case "earring":
      setPixel(grid, 4, 5, "#f0d060");
      setPixel(grid, 4, 6, "#f0d060");
      break;
  }
}

function drawOutline(grid: Grid) {
  const outlined = createGrid();
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (grid[y][x]) {
        outlined[y][x] = grid[y][x];
        // Check neighbors for outline
        const neighbors = [
          [x - 1, y],
          [x + 1, y],
          [x, y - 1],
          [x, y + 1],
        ];
        for (const [nx, ny] of neighbors) {
          if (nx >= 0 && nx < W && ny >= 0 && ny < H && !grid[ny][nx]) {
            outlined[ny][nx] = "#111";
          }
        }
      }
    }
  }
  return outlined;
}

export function renderCharacter(
  ctx: CanvasRenderingContext2D,
  config: CharacterConfig,
  scale: number = PIXEL,
  offsetX: number = 0,
  offsetY: number = 0
) {
  const grid = createGrid();

  drawBody(grid, config.skinTone);
  drawOutfit(grid, config.outfit, config.outfitColor);
  drawHair(grid, config.hairStyle, config.hairColor);
  drawEyes(grid, config.eyeStyle);
  if (config.accessory !== "none") {
    drawAccessory(grid, config.accessory);
  }

  const finalGrid = drawOutline(grid);

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (finalGrid[y][x]) {
        ctx.fillStyle = finalGrid[y][x]!;
        ctx.fillRect(
          offsetX + x * scale,
          offsetY + y * scale,
          scale,
          scale
        );
      }
    }
  }
}

export const CHAR_WIDTH = W;
export const CHAR_HEIGHT = H;
