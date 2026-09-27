"use client";

import React from "react";
import { Product } from "@/types/product";
import { LightingMode } from "@/types/workspace";

interface AccessoriesLayerProps {
  accessories: Product[];
  lightingMode: LightingMode;
  selectedPreviewItem: string | null;
  onSelectAccessory: (productId: string) => void;
  hasMonitor: boolean;
}

export function AccessoriesLayer({
  accessories,
  lightingMode,
  selectedPreviewItem,
  onSelectAccessory,
  hasMonitor,
}: AccessoriesLayerProps) {
  const hasDeskPad = accessories.some((a) => a.id === "acc-desk-pad");
  const keyboard = accessories.find((a) => a.category === "keyboard");
  const lamp = accessories.find((a) => a.category === "lamp");
  const plantMonstera = accessories.find((a) => a.id === "acc-plant-monstera");
  const plantFiddle = accessories.find((a) => a.id === "acc-plant-fiddle");
  const speakerStudio = accessories.find((a) => a.id === "acc-speaker-studio");
  const speakerSoundbar = accessories.find((a) => a.id === "acc-speaker-soundbar");
  const laptopStand = accessories.find((a) => a.id === "acc-laptop-stand");

  const isNight = lightingMode === "midnight";

  return (
    <g id="accessories-layer">
      <defs>
        {/* Lamp Light Cone Gradient */}
        <radialGradient id="lamp-cone-grad" cx="50%" cy="0%" r="90%">
          <stop
            offset="0%"
            stopColor={isNight ? "#FEF08A" : "#FFFBEB"}
            stopOpacity={isNight ? 0.7 : 0.35}
          />
          <stop
            offset="60%"
            stopColor={isNight ? "#FDE047" : "#FEF3C7"}
            stopOpacity={isNight ? 0.25 : 0.1}
          />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>

        {/* Brass Lamp Warm Amber Glow */}
        <radialGradient id="brass-glow" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity={isNight ? 0.8 : 0.4} />
          <stop offset="60%" stopColor="#D97706" stopOpacity={isNight ? 0.3 : 0.12} />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>

        {/* Keyboard Backlight Glow */}
        <filter id="kb-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* ================= 1. FLOOR PLANT: FIDDLE LEAF FIG TREE ================= */}
      {plantFiddle && (
        <g
          id="plant-fiddle-group"
          className="cursor-pointer group"
          onClick={() => onSelectAccessory(plantFiddle.id)}
        >
          {/* Shadow on floor */}
          <ellipse cx="160" cy="510" rx="30" ry="10" fill="rgba(0,0,0,0.2)" />
          {/* Terracotta Planter Pot */}
          <polygon points="140,460 180,460 174,510 146,510" fill="#B45309" stroke="#92400E" strokeWidth="1" />
          {/* Pot Rim */}
          <ellipse cx="160" cy="460" rx="22" ry="5" fill="#D97706" stroke="#92400E" strokeWidth="1" />
          <ellipse cx="160" cy="460" rx="20" ry="4" fill="#78350F" />
          {/* Stem / Trunk */}
          <path d="M 160 460 Q 158 390 162 310" stroke="#78350F" strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* Big Fiddle Leaves */}
          <path d="M 160 410 Q 130 400 120 380 Q 140 370 160 395" fill="#047857" stroke="#065F46" strokeWidth="1" />
          <path d="M 162 390 Q 190 380 205 365 Q 185 350 162 375" fill="#059669" stroke="#047857" strokeWidth="1" />
          <path d="M 160 350 Q 125 340 115 320 Q 135 310 160 335" fill="#10B981" stroke="#059669" strokeWidth="1" />
          <path d="M 162 330 Q 195 320 200 300 Q 175 295 162 318" fill="#047857" stroke="#065F46" strokeWidth="1" />
          <path d="M 162 310 Q 150 280 162 260 Q 175 280 162 310" fill="#10B981" stroke="#059669" strokeWidth="1" />

          {selectedPreviewItem === plantFiddle.id && (
            <ellipse cx="160" cy="385" rx="55" ry="125" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" />
          )}
        </g>
      )}

      {/* ================= 2. DESK PAD / MAT ================= */}
      {hasDeskPad && (
        <g
          id="desk-pad-group"
          className="cursor-pointer"
          onClick={() => onSelectAccessory("acc-desk-pad")}
        >
          {/* Felt Mat Surface */}
          <polygon
            points="340,350 660,350 675,368 325,368"
            fill="#27272A"
            stroke="#3F3F46"
            strokeWidth="0.8"
          />
          {/* Italian Leather Accent Strip on Top */}
          <polygon
            points="340,350 660,350 661,353 339,353"
            fill="#9A3412"
          />
          {/* Subtle felt texture line */}
          <line x1="330" y1="367" x2="670" y2="367" stroke="#18181B" strokeWidth="0.8" />

          {selectedPreviewItem === "acc-desk-pad" && (
            <polygon
              points="338,348 662,348 678,370 322,370"
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
          )}
        </g>
      )}

      {/* ================= 3. LAPTOP STAND + MACBOOK ================= */}
      {laptopStand && (
        <g
          id="laptop-stand-group"
          className="cursor-pointer group"
          onClick={() => onSelectAccessory(laptopStand.id)}
        >
          {/* Aluminum Base Stand on Desk */}
          <polygon points="285,348 355,348 360,356 280,356" fill="#64748B" stroke="#475569" strokeWidth="0.8" />
          {/* Angled Riser Arm */}
          <polygon points="295,348 345,348 350,305 290,305" fill="#94A3B8" />

          {/* Elevated Open MacBook Laptop */}
          {/* Base / Keyboard Tray */}
          <polygon points="280,305 360,305 365,322 275,322" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
          <rect x="290" y="308" width="60" height="10" rx="1" fill="#1E293B" />
          {/* Trackpad */}
          <rect x="312" y="318" width="16" height="3" rx="0.5" fill="#CBD5E1" />

          {/* Angled Laptop Display */}
          <polygon points="280,305 360,305 358,245 282,245" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
          {/* Glowing Laptop Screen */}
          <polygon points="283,303 357,303 355,248 285,248" fill="#1E1B4B" opacity={isNight ? 0.95 : 0.85} />
          {/* Code on Laptop Screen */}
          <rect x="288" y="255" width="30" height="4" rx="1" fill="#38BDF8" opacity="0.8" />
          <rect x="288" y="263" width="55" height="3" rx="0.5" fill="#94A3B8" opacity="0.6" />
          <rect x="288" y="269" width="45" height="3" rx="0.5" fill="#34D399" opacity="0.7" />
          <rect x="288" y="275" width="50" height="3" rx="0.5" fill="#F472B6" opacity="0.6" />
          <rect x="288" y="283" width="60" height="15" rx="2" fill="#030712" opacity="0.7" />
          <text x="292" y="293" fill="#10B981" fontSize="4.5" fontFamily="monospace">
            monis.rent: OK
          </text>

          {selectedPreviewItem === laptopStand.id && (
            <rect x="270" y="240" width="100" height="120" rx="4" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" />
          )}
        </g>
      )}

      {/* ================= 4. MECHANICAL KEYBOARD ================= */}
      {keyboard && (
        <g
          id="keyboard-group"
          className="cursor-pointer group"
          onClick={() => onSelectAccessory(keyboard.id)}
        >
          {keyboard.previewId === "keyboard-ergo" ? (
            // Ergonomic Split Alice Keyboard with Walnut Wrist Rest
            <g id="alice-keyboard">
              {/* Walnut Wrist Rests */}
              <polygon points="415,363 485,363 483,369 410,369" fill="#78350F" />
              <polygon points="515,363 585,363 590,369 517,369" fill="#78350F" />
              {/* Left Wing Case */}
              <polygon points="420,354 485,357 483,363 415,363" fill="#334155" stroke="#1E293B" strokeWidth="1" />
              {/* Right Wing Case */}
              <polygon points="515,357 580,354 585,363 517,363" fill="#334155" stroke="#1E293B" strokeWidth="1" />
              {/* Keycaps Split */}
              <line x1="425" y1="358" x2="480" y2="360" stroke="#F8FAFC" strokeWidth="3" strokeDasharray="3 2" />
              <line x1="520" y1="360" x2="575" y2="358" stroke="#F8FAFC" strokeWidth="3" strokeDasharray="3 2" />
            </g>
          ) : (
            // 75% Mechanical Keyboard with Gasket Mount & RGB
            <g id="75-keyboard">
              {/* Frosted Polycarbonate Chassis */}
              <polygon
                points="435,354 565,354 570,364 430,364"
                fill="#1E293B"
                stroke="#475569"
                strokeWidth="1"
              />
              {/* Keycaps Grid Rows */}
              <g stroke="#CBD5E1" strokeWidth="2.2" strokeLinecap="round">
                {/* Row 1: Function keys */}
                <line x1="438" y1="356" x2="562" y2="356" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 1.5" />
                {/* Row 2: Numbers */}
                <line x1="437" y1="358" x2="563" y2="358" stroke="#F1F5F9" strokeWidth="1.8" strokeDasharray="4 2" />
                {/* Row 3: Alpha keys */}
                <line x1="436" y1="360" x2="564" y2="360" stroke="#F8FAFC" strokeWidth="1.8" strokeDasharray="4 2" />
                {/* Spacebar Row */}
                <line x1="470" y1="362.5" x2="530" y2="362.5" stroke="#F59E0B" strokeWidth="2" />
              </g>
              {/* Backlight Glow (if night) */}
              {isNight && (
                <ellipse cx="500" cy="358" rx="60" ry="6" fill="#60A5FA" opacity="0.3" filter="url(#kb-glow)" />
              )}
            </g>
          )}

          {/* Mouse / Trackball on right of keyboard */}
          <ellipse cx="610" cy="360" rx="7" ry="5" fill="#334155" stroke="#1E293B" strokeWidth="0.8" />
          <line x1="610" y1="356" x2="610" y2="360" stroke="#94A3B8" strokeWidth="0.8" />

          {selectedPreviewItem === keyboard.id && (
            <polygon
              points="425,351 575,351 580,367 420,367"
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
          )}
        </g>
      )}

      {/* ================= 5. DESK PLANT: MONSTERA IN CERAMIC POT ================= */}
      {plantMonstera && (
        <g
          id="plant-monstera-group"
          className="cursor-pointer group"
          onClick={() => onSelectAccessory(plantMonstera.id)}
        >
          {/* Pot Shadow on Desk */}
          <ellipse cx="250" cy="355" rx="14" ry="4" fill="rgba(0,0,0,0.2)" />
          {/* Matte White Ceramic Pot */}
          <polygon points="240,332 260,332 258,354 242,354" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <ellipse cx="250" cy="332" rx="11" ry="3" fill="#78350F" />
          {/* Tropical Split Monstera Stems & Leaves */}
          <path d="M 250 332 Q 242 305 230 288" fill="none" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 250 332 Q 256 300 268 285" fill="none" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 250 332 Q 248 290 248 270" fill="none" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" />

          {/* Leaf 1 (Left Heart Split) */}
          <path
            d="M 230 288 Q 215 275 224 265 Q 235 272 230 288"
            fill="#10B981"
            stroke="#059669"
            strokeWidth="0.8"
          />
          {/* Leaf 2 (Right Heart Split) */}
          <path
            d="M 268 285 Q 285 272 276 260 Q 262 270 268 285"
            fill="#059669"
            stroke="#047857"
            strokeWidth="0.8"
          />
          {/* Leaf 3 (Top Upright) */}
          <path
            d="M 248 270 Q 236 248 248 238 Q 260 248 248 270"
            fill="#34D399"
            stroke="#10B981"
            strokeWidth="0.8"
          />

          {selectedPreviewItem === plantMonstera.id && (
            <ellipse cx="250" cy="300" rx="36" ry="60" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" />
          )}
        </g>
      )}

      {/* ================= 6. SPEAKERS ================= */}
      {speakerStudio && (
        <g
          id="speaker-studio-group"
          className="cursor-pointer group"
          onClick={() => onSelectAccessory(speakerStudio.id)}
        >
          {/* LEFT STUDIO MONITOR */}
          <g transform="translate(330, 280)">
            {/* Isolation Foam Wedge */}
            <polygon points="0,62 34,62 38,68 -4,68" fill="#18181B" />
            {/* Speaker Cabinet */}
            <rect x="0" y="0" width="34" height="62" rx="3" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
            {/* Tweeter */}
            <circle cx="17" cy="16" r="6" fill="#1E293B" stroke="#475569" strokeWidth="1" />
            <circle cx="17" cy="16" r="2.5" fill="#CBD5E1" />
            {/* Kevlar Woofer */}
            <circle cx="17" cy="42" r="11" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
            <circle cx="17" cy="42" r="4" fill="#0F172A" />
          </g>

          {/* RIGHT STUDIO MONITOR */}
          <g transform="translate(636, 280)">
            {/* Isolation Foam Wedge */}
            <polygon points="0,62 34,62 38,68 -4,68" fill="#18181B" />
            {/* Speaker Cabinet */}
            <rect x="0" y="0" width="34" height="62" rx="3" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
            {/* Tweeter */}
            <circle cx="17" cy="16" r="6" fill="#1E293B" stroke="#475569" strokeWidth="1" />
            <circle cx="17" cy="16" r="2.5" fill="#CBD5E1" />
            {/* Kevlar Woofer */}
            <circle cx="17" cy="42" r="11" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
            <circle cx="17" cy="42" r="4" fill="#0F172A" />
          </g>

          {selectedPreviewItem === speakerStudio.id && (
            <g>
              <rect x="325" y="275" width="44" height="74" rx="4" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" />
              <rect x="631" y="275" width="44" height="74" rx="4" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" />
            </g>
          )}
        </g>
      )}

      {speakerSoundbar && (
        <g
          id="speaker-soundbar-group"
          className="cursor-pointer group"
          onClick={() => onSelectAccessory(speakerSoundbar.id)}
        >
          {/* Slim Under-Monitor Soundbar Cylinder */}
          <rect x="420" y="338" width="160" height="9" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="1" />
          {/* Acoustic Grille Texture */}
          <line x1="430" y1="342.5" x2="570" y2="342.5" stroke="#64748B" strokeWidth="1.5" strokeDasharray="2 1.5" />
          {/* LED Center Status Light */}
          <circle cx="500" cy="342.5" r="1" fill="#38BDF8" />

          {selectedPreviewItem === speakerSoundbar.id && (
            <rect x="415" y="335" width="170" height="15" rx="4" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" />
          )}
        </g>
      )}

      {/* ================= 7. LAMPS & ILLUMINATION ================= */}
      {lamp && (
        <g
          id="lamp-group"
          className="cursor-pointer group"
          onClick={() => onSelectAccessory(lamp.id)}
        >
          {lamp.previewId === "lamp-bar" ? (
            // Minimalist LED ScreenBar mounted on top of Monitor
            <g id="screenbar-lamp">
              {/* Light Cone Cast downward onto desk */}
              <polygon
                points="420,165 580,165 720,370 280,370"
                fill="url(#lamp-cone-grad)"
                className="pointer-events-none"
              />

              {/* Physical ScreenBar Bar */}
              <rect
                x="410"
                y={hasMonitor ? "158" : "210"}
                width="180"
                height="8"
                rx="3"
                fill="#1E293B"
                stroke="#475569"
                strokeWidth="1"
              />
              {/* Counterweight Clamp */}
              <rect
                x="492"
                y={hasMonitor ? "164" : "216"}
                width="16"
                height="12"
                rx="2"
                fill="#0F172A"
              />
              {/* Glowing Warm LED emitter slit */}
              <line
                x1="416"
                y1={hasMonitor ? "164" : "216"}
                x2="584"
                y2={hasMonitor ? "164" : "216"}
                stroke="#FEF08A"
                strokeWidth="2.5"
              />

              {/* Wireless Desktop Control Dial puck on desk */}
              <ellipse cx="640" cy="358" rx="8" ry="4" fill="#334155" stroke="#1E293B" strokeWidth="1" />
              <circle cx="640" cy="357" r="2.5" fill="#FEF08A" opacity="0.8" />
            </g>
          ) : (
            // Warm Brass Artisan Desk Lamp
            <g id="brass-lamp">
              {/* Amber Light Cast */}
              <polygon
                points="685,250 745,250 820,380 610,380"
                fill="url(#brass-glow)"
                className="pointer-events-none"
              />

              {/* Marble Base on Right Desk Surface */}
              <polygon points="705,346 735,346 738,354 702,354" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
              {/* Articulating Brushed Brass Arm */}
              <path
                d="M 720 346 L 732 290 L 712 250"
                fill="none"
                stroke="#D97706"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Brass Joints */}
              <circle cx="732" cy="290" r="3.5" fill="#B45309" />
              <circle cx="712" cy="250" r="3.5" fill="#B45309" />

              {/* Brass Dome Shade */}
              <path
                d="M 695 252 Q 712 238 729 252 Z"
                fill="#D97706"
                stroke="#B45309"
                strokeWidth="1.2"
              />
              {/* Glowing Amber Bulb inside Shade */}
              <ellipse cx="712" cy="252" rx="6" ry="3" fill="#FEF08A" />
            </g>
          )}

          {selectedPreviewItem === lamp.id && (
            <ellipse
              cx={lamp.previewId === "lamp-bar" ? 500 : 715}
              cy={lamp.previewId === "lamp-bar" ? 165 : 280}
              rx={lamp.previewId === "lamp-bar" ? 105 : 35}
              ry={lamp.previewId === "lamp-bar" ? 20 : 65}
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
          )}
        </g>
      )}
    </g>
  );
}
