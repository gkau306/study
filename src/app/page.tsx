"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-4">
      <div className="flex flex-col items-center gap-3">
        <h1
          className="text-2xl md:text-3xl tracking-wider"
          style={{ color: "var(--accent)" }}
        >
          StudyQuest
        </h1>
        <p
          className="text-[10px] text-center max-w-xs leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Create your pixel character. Study with friends. Level up.
        </p>
      </div>

      <button
        onClick={() => router.push("/create")}
        className="px-8 py-4 text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
        style={{
          background: "var(--accent)",
          color: "#fff",
          border: "3px solid var(--accent)",
          boxShadow: "4px 4px 0 var(--accent-soft)",
          fontFamily: "inherit",
        }}
      >
        Start
      </button>

      <div
        className="flex gap-1 mt-4"
        style={{ color: "var(--text-muted)" }}
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2"
            style={{
              background: "var(--accent-soft)",
              animation: `pulse 1.5s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
