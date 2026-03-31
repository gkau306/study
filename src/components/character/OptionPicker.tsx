"use client";

interface ColorOption {
  name: string;
  color: string;
}

interface TextOption {
  id: string;
  name: string;
}

export function ColorPicker({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: readonly ColorOption[];
  selected: string;
  onSelect: (color: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-[10px] uppercase tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </label>
      <div className="flex gap-2 flex-wrap">
        {options.map((opt) => (
          <button
            key={opt.color}
            onClick={() => onSelect(opt.color)}
            title={opt.name}
            className="w-8 h-8 transition-transform hover:scale-110"
            style={{
              backgroundColor: opt.color,
              border:
                selected === opt.color
                  ? "3px solid var(--accent)"
                  : "2px solid #333",
              boxShadow:
                selected === opt.color ? "0 0 8px var(--accent)" : "none",
              transform: selected === opt.color ? "scale(1.15)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function StylePicker({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: readonly TextOption[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-[10px] uppercase tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </label>
      <div className="flex gap-2 flex-wrap">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className="px-3 py-2 text-[9px] uppercase tracking-wider transition-all"
            style={{
              background:
                selected === opt.id ? "var(--accent)" : "var(--bg-card)",
              color: selected === opt.id ? "#fff" : "var(--text-muted)",
              border:
                selected === opt.id
                  ? "2px solid var(--accent)"
                  : "2px solid #333",
              boxShadow:
                selected === opt.id
                  ? "0 0 8px rgba(233, 69, 96, 0.4)"
                  : "none",
            }}
          >
            {opt.name}
          </button>
        ))}
      </div>
    </div>
  );
}
