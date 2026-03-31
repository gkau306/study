"use client";

import { useState } from "react";
import {
  CharacterConfig,
  DEFAULT_CHARACTER,
  SKIN_TONES,
  HAIR_STYLES,
  HAIR_COLORS,
  EYE_STYLES,
  OUTFITS,
  OUTFIT_COLORS,
  ACCESSORIES,
} from "@/types/character";
import CharacterPreview from "./CharacterPreview";
import { ColorPicker, StylePicker } from "./OptionPicker";

const TABS = [
  { id: "body", label: "Body" },
  { id: "hair", label: "Hair" },
  { id: "face", label: "Face" },
  { id: "outfit", label: "Outfit" },
] as const;

type Tab = (typeof TABS)[number]["id"];

export default function CharacterCreator() {
  const [config, setConfig] = useState<CharacterConfig>(DEFAULT_CHARACTER);
  const [activeTab, setActiveTab] = useState<Tab>("body");
  const [saved, setSaved] = useState(false);

  const update = (partial: Partial<CharacterConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
    setSaved(false);
  };

  const handleSave = () => {
    if (!config.name.trim()) return;
    localStorage.setItem("studyquest-character", JSON.stringify(config));
    setSaved(true);
  };

  const randomize = () => {
    const pick = <T,>(arr: readonly T[]): T =>
      arr[Math.floor(Math.random() * arr.length)];

    update({
      skinTone: pick(SKIN_TONES).color,
      hairStyle: pick(HAIR_STYLES).id,
      hairColor: pick(HAIR_COLORS).color,
      eyeStyle: pick(EYE_STYLES).id,
      outfit: pick(OUTFITS).id,
      outfitColor: pick(OUTFIT_COLORS).color,
      accessory: pick(ACCESSORIES).id,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-8">
      <h1
        className="text-lg md:text-xl text-center tracking-wider"
        style={{ color: "var(--accent)" }}
      >
        Create Your Character
      </h1>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
        {/* Preview */}
        <div className="flex flex-col items-center gap-4">
          <CharacterPreview config={config} />

          {/* Name input */}
          <div className="flex flex-col gap-1 w-full max-w-[200px]">
            <input
              type="text"
              placeholder="Name..."
              value={config.name}
              onChange={(e) => update({ name: e.target.value.slice(0, 12) })}
              maxLength={12}
              className="text-center text-xs px-3 py-2 outline-none w-full"
              style={{
                background: "var(--bg-card)",
                color: "var(--text)",
                border: "2px solid #333",
                fontFamily: "inherit",
              }}
            />
            <span
              className="text-[8px] text-right"
              style={{ color: "var(--text-muted)" }}
            >
              {config.name.length}/12
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={randomize}
              className="px-4 py-2 text-[9px] uppercase tracking-wider transition-all hover:scale-105"
              style={{
                background: "var(--accent-soft)",
                color: "var(--text)",
                border: "2px solid #666",
              }}
            >
              Random
            </button>
            <button
              onClick={handleSave}
              disabled={!config.name.trim()}
              className="px-4 py-2 text-[9px] uppercase tracking-wider transition-all hover:scale-105 disabled:opacity-40"
              style={{
                background: config.name.trim()
                  ? "var(--accent)"
                  : "var(--bg-card)",
                color: "#fff",
                border: "2px solid var(--accent)",
              }}
            >
              {saved ? "Saved!" : "Save"}
            </button>
          </div>
        </div>

        {/* Options panel */}
        <div
          className="w-full max-w-md p-5"
          style={{
            background: "var(--bg-panel)",
            border: "3px solid #333",
            boxShadow: "4px 4px 0 rgba(0,0,0,0.3)",
          }}
        >
          {/* Tabs */}
          <div className="flex gap-1 mb-6">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex-1 py-2 text-[9px] uppercase tracking-wider transition-all"
                style={{
                  background:
                    activeTab === tab.id
                      ? "var(--accent)"
                      : "var(--bg-card)",
                  color:
                    activeTab === tab.id ? "#fff" : "var(--text-muted)",
                  borderBottom:
                    activeTab === tab.id
                      ? "2px solid var(--accent)"
                      : "2px solid transparent",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex flex-col gap-5">
            {activeTab === "body" && (
              <ColorPicker
                label="Skin Tone"
                options={SKIN_TONES}
                selected={config.skinTone}
                onSelect={(color) => update({ skinTone: color })}
              />
            )}

            {activeTab === "hair" && (
              <>
                <StylePicker
                  label="Hair Style"
                  options={HAIR_STYLES}
                  selected={config.hairStyle}
                  onSelect={(id) => update({ hairStyle: id })}
                />
                <ColorPicker
                  label="Hair Color"
                  options={HAIR_COLORS}
                  selected={config.hairColor}
                  onSelect={(color) => update({ hairColor: color })}
                />
              </>
            )}

            {activeTab === "face" && (
              <>
                <StylePicker
                  label="Eyes"
                  options={EYE_STYLES}
                  selected={config.eyeStyle}
                  onSelect={(id) => update({ eyeStyle: id })}
                />
                <StylePicker
                  label="Accessory"
                  options={ACCESSORIES}
                  selected={config.accessory}
                  onSelect={(id) => update({ accessory: id })}
                />
              </>
            )}

            {activeTab === "outfit" && (
              <>
                <StylePicker
                  label="Style"
                  options={OUTFITS}
                  selected={config.outfit}
                  onSelect={(id) => update({ outfit: id })}
                />
                <ColorPicker
                  label="Color"
                  options={OUTFIT_COLORS}
                  selected={config.outfitColor}
                  onSelect={(color) => update({ outfitColor: color })}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
