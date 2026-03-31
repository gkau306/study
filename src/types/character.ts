export interface CharacterConfig {
  name: string;
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  eyeStyle: string;
  outfit: string;
  outfitColor: string;
  accessory: string;
}

export const SKIN_TONES = [
  { name: "Porcelain", color: "#fde8d0" },
  { name: "Fair", color: "#f5d5b8" },
  { name: "Peach", color: "#e8b896" },
  { name: "Warm", color: "#d4a373" },
  { name: "Tan", color: "#b5835a" },
  { name: "Brown", color: "#8d5524" },
  { name: "Deep", color: "#6b3a1f" },
  { name: "Dark", color: "#4a2810" },
] as const;

export const HAIR_STYLES = [
  { id: "short", name: "Short" },
  { id: "fluffy", name: "Fluffy" },
  { id: "long", name: "Long" },
  { id: "twintails", name: "Twintails" },
  { id: "ponytail", name: "Ponytail" },
  { id: "bob", name: "Bob" },
  { id: "messy", name: "Messy" },
  { id: "sideswept", name: "Side Swept" },
  { id: "curly", name: "Curly" },
  { id: "spiky", name: "Spiky" },
] as const;

export const HAIR_COLORS = [
  { name: "Black", color: "#2a1a3a" },
  { name: "Brown", color: "#6b3a2a" },
  { name: "Chestnut", color: "#8b4a2a" },
  { name: "Blonde", color: "#e8c84a" },
  { name: "Strawberry", color: "#d46a6a" },
  { name: "Lavender", color: "#9a7abf" },
  { name: "Sky Blue", color: "#6a9fd8" },
  { name: "Mint", color: "#6ac4a8" },
  { name: "Rose", color: "#d87aab" },
  { name: "White", color: "#dcd8e8" },
] as const;

export const EYE_STYLES = [
  { id: "sparkle", name: "Sparkle" },
  { id: "round", name: "Round" },
  { id: "happy", name: "Happy" },
  { id: "sleepy", name: "Sleepy" },
  { id: "wink", name: "Wink" },
  { id: "determined", name: "Determined" },
] as const;

export const OUTFITS = [
  { id: "tee", name: "T-Shirt" },
  { id: "hoodie", name: "Hoodie" },
  { id: "dress", name: "Dress" },
  { id: "robe", name: "Robe" },
  { id: "overalls", name: "Overalls" },
  { id: "cape", name: "Cape" },
] as const;

export const OUTFIT_COLORS = [
  { name: "Royal Purple", color: "#6a4c93" },
  { name: "Rose", color: "#c45b8a" },
  { name: "Sky", color: "#5b9bd5" },
  { name: "Forest", color: "#4a8c6f" },
  { name: "Sunset", color: "#d47a4a" },
  { name: "Midnight", color: "#2d3561" },
  { name: "Snow", color: "#d8d3e8" },
  { name: "Cherry", color: "#c0392b" },
  { name: "Gold", color: "#c8a84a" },
  { name: "Teal", color: "#3a8a8a" },
] as const;

export const ACCESSORIES = [
  { id: "none", name: "None" },
  { id: "witch_hat", name: "Witch Hat" },
  { id: "beret", name: "Beret" },
  { id: "bow", name: "Bow" },
  { id: "glasses", name: "Glasses" },
  { id: "cat_ears", name: "Cat Ears" },
  { id: "horns", name: "Horns" },
  { id: "halo", name: "Halo" },
  { id: "flower", name: "Flower" },
  { id: "crown", name: "Crown" },
] as const;

export const DEFAULT_CHARACTER: CharacterConfig = {
  name: "",
  skinTone: SKIN_TONES[0].color,
  hairStyle: HAIR_STYLES[0].id,
  hairColor: HAIR_COLORS[0].color,
  eyeStyle: EYE_STYLES[0].id,
  outfit: OUTFITS[0].id,
  outfitColor: OUTFIT_COLORS[0].color,
  accessory: ACCESSORIES[0].id,
};
