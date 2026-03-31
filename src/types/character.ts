export type SkinTone = (typeof SKIN_TONES)[number]["color"];
export type HairStyle = (typeof HAIR_STYLES)[number]["id"];
export type HairColor = (typeof HAIR_COLORS)[number]["color"];
export type OutfitId = (typeof OUTFITS)[number]["id"];
export type AccessoryId = "none" | "glasses" | "headband" | "earring";
export type EyeStyle = (typeof EYE_STYLES)[number]["id"];

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
  { name: "Light", color: "#fdd2b5" },
  { name: "Fair", color: "#f5c5a3" },
  { name: "Medium", color: "#d4a373" },
  { name: "Tan", color: "#b5835a" },
  { name: "Brown", color: "#8d5524" },
  { name: "Dark", color: "#5c3310" },
] as const;

export const HAIR_STYLES = [
  { id: "short", name: "Short" },
  { id: "messy", name: "Messy" },
  { id: "long", name: "Long" },
  { id: "curly", name: "Curly" },
  { id: "ponytail", name: "Ponytail" },
  { id: "buzz", name: "Buzz" },
  { id: "bob", name: "Bob" },
  { id: "spiky", name: "Spiky" },
] as const;

export const HAIR_COLORS = [
  { name: "Black", color: "#1a1a1a" },
  { name: "Brown", color: "#5c3317" },
  { name: "Blonde", color: "#f0d060" },
  { name: "Red", color: "#c0392b" },
  { name: "Blue", color: "#3498db" },
  { name: "Pink", color: "#e84393" },
  { name: "Green", color: "#2ecc71" },
  { name: "White", color: "#ecf0f1" },
] as const;

export const EYE_STYLES = [
  { id: "normal", name: "Normal" },
  { id: "happy", name: "Happy" },
  { id: "sleepy", name: "Sleepy" },
  { id: "cool", name: "Cool" },
] as const;

export const OUTFITS = [
  { id: "tee", name: "T-Shirt" },
  { id: "hoodie", name: "Hoodie" },
  { id: "jacket", name: "Jacket" },
  { id: "sweater", name: "Sweater" },
] as const;

export const OUTFIT_COLORS = [
  { name: "Red", color: "#e74c3c" },
  { name: "Blue", color: "#3498db" },
  { name: "Green", color: "#2ecc71" },
  { name: "Purple", color: "#9b59b6" },
  { name: "Orange", color: "#e67e22" },
  { name: "Black", color: "#2c3e50" },
  { name: "White", color: "#ecf0f1" },
  { name: "Pink", color: "#e84393" },
] as const;

export const ACCESSORIES = [
  { id: "none", name: "None" },
  { id: "glasses", name: "Glasses" },
  { id: "headband", name: "Headband" },
  { id: "earring", name: "Earring" },
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
