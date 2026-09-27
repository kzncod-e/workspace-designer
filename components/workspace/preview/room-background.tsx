"use client";

import React from "react";
import { LightingMode } from "@/types/workspace";

interface RoomBackgroundProps {
  lightingMode: LightingMode;
}

export function RoomBackground({ lightingMode }: RoomBackgroundProps) {
  // Styles for different lighting vibes in Bali
  const config = {
    daylight: {
      wallGradient: "from-stone-100 via-stone-50 to-amber-50/40",
      floorColor: "#EADBC8",
      floorLines: "rgba(180, 150, 120, 0.25)",
      windowSky: "linear-gradient(180deg, #93C5FD 0%, #BAE6FD 60%, #E0F2FE 100%)",
      sunlightGlow: "opacity-40",
      sunRay: "rgba(255, 245, 220, 0.35)",
      palmColor: "#15803D",
    },
    sunset: {
      wallGradient: "from-orange-100/60 via-amber-50 to-rose-100/40",
      floorColor: "#DDB892",
      floorLines: "rgba(160, 110, 80, 0.3)",
      windowSky: "linear-gradient(180deg, #F97316 0%, #FB923C 45%, #FDE047 100%)",
      sunlightGlow: "opacity-60",
      sunRay: "rgba(254, 215, 170, 0.45)",
      palmColor: "#431407",
    },
    midnight: {
      wallGradient: "from-slate-900 via-slate-950 to-zinc-950",
      floorColor: "#1E293B",
      floorLines: "rgba(100, 116, 139, 0.15)",
      windowSky: "linear-gradient(180deg, #090D16 0%, #0F172A 60%, #1E1B4B 100%)",
      sunlightGlow: "opacity-15",
      sunRay: "rgba(99, 102, 241, 0.1)",
      palmColor: "#064E3B",
    },
  }[lightingMode];

  return (
    <g id="room-background">
      {/* Back Wall */}
      <defs>
        <linearGradient id="wall-grad-daylight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5F5F4" />
          <stop offset="70%" stopColor="#FAF8F5" />
          <stop offset="100%" stopColor="#EFECE6" />
        </linearGradient>

        <linearGradient id="wall-grad-sunset" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FED7AA" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#FFEDD5" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FDBA74" stopOpacity="0.6" />
        </linearGradient>

        <linearGradient id="wall-grad-midnight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B0F19" />
          <stop offset="60%" stopColor="#111827" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>

        {/* Floor Gradient */}
        <linearGradient id="floor-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={config.floorColor} />
          <stop
            offset="100%"
            stopColor={
              lightingMode === "midnight"
                ? "#0F172A"
                : lightingMode === "sunset"
                ? "#B08968"
                : "#D5BDAF"
            }
          />
        </linearGradient>

        {/* Window Shadow Mask */}
        <linearGradient id="sun-ray-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={config.sunRay} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* Main Wall Surface (0 to y: 380) */}
      <rect
        x="0"
        y="0"
        width="1000"
        height="380"
        fill={`url(#wall-grad-${lightingMode})`}
        className="transition-colors duration-700"
      />

      {/* Acoustic Wood Slats Wall Accent on Right */}
      <g opacity={lightingMode === "midnight" ? 0.35 : 0.65}>
        {[860, 880, 900, 920, 940, 960, 980].map((x) => (
          <rect
            key={x}
            x={x}
            y="30"
            width="8"
            height="350"
            rx="2"
            fill={lightingMode === "midnight" ? "#334155" : "#D4A373"}
            opacity={0.7}
          />
        ))}
      </g>

      {/* Modern Balinese Studio Window (Left Side) */}
      <g id="window-frame">
        {/* Outer Frame */}
        <rect
          x="60"
          y="40"
          width="260"
          height="310"
          rx="6"
          fill={lightingMode === "midnight" ? "#1E293B" : "#FFFFFF"}
          stroke={lightingMode === "midnight" ? "#334155" : "#E2E8F0"}
          strokeWidth="3"
        />

        {/* Outside Sky / Tropical View */}
        <rect
          x="70"
          y="50"
          width="240"
          height="290"
          rx="4"
          fill={
            lightingMode === "daylight"
              ? "url(#sky-day)"
              : lightingMode === "sunset"
              ? "url(#sky-sunset)"
              : "url(#sky-night)"
          }
        />
        <defs>
          <linearGradient id="sky-day" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="60%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#FEF08A" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="sky-sunset" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C2410C" />
            <stop offset="45%" stopColor="#EA580C" />
            <stop offset="80%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
          <linearGradient id="sky-night" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#030712" />
            <stop offset="60%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </linearGradient>
        </defs>

        {/* Tropical Palm Fronds Silhouette Outside Window */}
        <g opacity={lightingMode === "midnight" ? 0.45 : 0.85}>
          {/* Palm Stem 1 */}
          <path
            d="M 60 280 Q 140 180 230 110"
            fill="none"
            stroke={config.palmColor}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Leaves on Stem 1 */}
          <path
            d="M 120 200 Q 110 160 140 170 M 150 170 Q 140 130 170 145 M 180 145 Q 170 105 200 120 M 210 120 Q 200 85 230 105"
            fill="none"
            stroke={config.palmColor}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Palm Frond 2 */}
          <path
            d="M 290 320 Q 220 220 160 160"
            fill="none"
            stroke={config.palmColor}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 240 240 Q 260 210 240 190 M 200 200 Q 220 170 200 150 M 170 170 Q 185 140 165 125"
            fill="none"
            stroke={config.palmColor}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Balinese Frangipani / Sun or Moon */}
          {lightingMode === "sunset" && (
            <circle cx="210" cy="180" r="28" fill="#FDE047" opacity="0.8" />
          )}
          {lightingMode === "midnight" && (
            <g>
              <circle cx="220" cy="110" r="16" fill="#F8FAFC" opacity="0.9" />
              <circle cx="226" cy="107" r="14" fill="#0F172A" />
              {/* Stars */}
              <circle cx="110" cy="80" r="1.5" fill="#FFFFFF" opacity="0.8" />
              <circle cx="150" cy="95" r="1" fill="#FFFFFF" opacity="0.7" />
              <circle cx="180" cy="70" r="1.5" fill="#FFFFFF" opacity="0.9" />
              <circle cx="270" cy="90" r="1" fill="#FFFFFF" opacity="0.6" />
            </g>
          )}
        </g>

        {/* Minimalist Window Mullions */}
        <line
          x1="190"
          y1="50"
          x2="190"
          y2="340"
          stroke={lightingMode === "midnight" ? "#334155" : "#FFFFFF"}
          strokeWidth="3"
        />
        <line
          x1="70"
          y1="195"
          x2="310"
          y2="195"
          stroke={lightingMode === "midnight" ? "#334155" : "#FFFFFF"}
          strokeWidth="3"
        />
      </g>

      {/* Sunlight Beam across floor from window */}
      <polygon
        points="70,340 310,340 580,600 120,600"
        fill="url(#sun-ray-grad)"
        className="transition-all duration-700 pointer-events-none"
      />

      {/* Floor Baseboard Trim */}
      <rect
        x="0"
        y="374"
        width="1000"
        height="6"
        fill={lightingMode === "midnight" ? "#334155" : "#D1D5DB"}
      />

      {/* Studio Floor (y: 380 to 600) */}
      <rect
        x="0"
        y="380"
        width="1000"
        height="220"
        fill="url(#floor-grad)"
        className="transition-colors duration-700"
      />

      {/* Floor Planks / Perspective Lines */}
      <g stroke={config.floorLines} strokeWidth="1.2" opacity="0.7">
        <line x1="80" y1="380" x2="0" y2="600" />
        <line x1="240" y1="380" x2="160" y2="600" />
        <line x1="400" y1="380" x2="340" y2="600" />
        <line x1="560" y1="380" x2="520" y2="600" />
        <line x1="720" y1="380" x2="700" y2="600" />
        <line x1="880" y1="380" x2="890" y2="600" />
      </g>

      {/* Soft Ambient Rug under Workspace */}
      <ellipse
        cx="500"
        cy="495"
        rx="380"
        ry="75"
        fill={
          lightingMode === "midnight"
            ? "#0F172A"
            : lightingMode === "sunset"
            ? "#C49A76"
            : "#E7D7C8"
        }
        opacity={lightingMode === "midnight" ? 0.5 : 0.65}
      />
      <ellipse
        cx="500"
        cy="495"
        rx="376"
        ry="72"
        fill="none"
        stroke={
          lightingMode === "midnight"
            ? "#1E293B"
            : lightingMode === "sunset"
            ? "#A98467"
            : "#D6C0B3"
        }
        strokeWidth="1.5"
        strokeDasharray="4 4"
        opacity="0.6"
      />
    </g>
  );
}
