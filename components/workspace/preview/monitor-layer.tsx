"use client";

import React from "react";
import { Product } from "@/types/product";
import { LightingMode } from "@/types/workspace";

interface MonitorLayerProps {
  monitor: Product | null;
  lightingMode: LightingMode;
  isSelected?: boolean;
  onSelect?: () => void;
  hasScreenBar?: boolean;
}

export function MonitorLayer({
  monitor,
  lightingMode,
  isSelected,
  onSelect,
  hasScreenBar,
}: MonitorLayerProps) {
  if (!monitor) return null;

  const is27 = monitor.previewId === "monitor-27";
  const is34 = monitor.previewId === "monitor-34";
  const isDual = monitor.previewId === "monitor-dual";

  const screenBrightness =
    lightingMode === "midnight" ? 0.95 : lightingMode === "sunset" ? 0.85 : 0.8;

  return (
    <g
      id="monitor-layer"
      className="cursor-pointer transition-transform duration-300"
      onClick={onSelect}
    >
      <defs>
        {/* Screen Ambient Glow */}
        <filter id="monitor-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* IDE Screen Gradient */}
        <linearGradient id="code-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B132B" />
          <stop offset="100%" stopColor="#1C2541" />
        </linearGradient>

        <linearGradient id="metal-stand" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#64748B" />
          <stop offset="50%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>

      {/* 1. SINGLE 27" 4K MONITOR */}
      {is27 && (
        <g id="monitor-27-group">
          {/* Stand Stem & Base */}
          <rect x="494" y="275" width="12" height="70" fill="url(#metal-stand)" rx="2" />
          {/* Flat Base Plate resting on Desk */}
          <polygon
            points="465,346 535,346 545,352 455,352"
            fill="#334155"
            stroke="#1E293B"
            strokeWidth="1"
          />

          {/* Screen Outer Frame */}
          <rect
            x="385"
            y="170"
            width="230"
            height="136"
            rx="5"
            fill="#0F172A"
            stroke="#334155"
            strokeWidth="3"
            filter={lightingMode === "midnight" ? "url(#monitor-glow)" : undefined}
          />

          {/* Glowing Screen Content (IDE code editor) */}
          <rect
            x="388"
            y="173"
            width="224"
            height="130"
            rx="3"
            fill="url(#code-bg)"
            opacity={screenBrightness}
          />

          {/* Editor Header Bar */}
          <rect x="388" y="173" width="224" height="13" fill="#090E1A" />
          <circle cx="396" cy="179.5" r="2.5" fill="#EF4444" />
          <circle cx="403" cy="179.5" r="2.5" fill="#F59E0B" />
          <circle cx="410" cy="179.5" r="2.5" fill="#10B981" />
          <text x="430" y="182" fill="#94A3B8" fontSize="6" fontFamily="monospace">
            monis-workspace.tsx
          </text>

          {/* Code Lines on 27" Screen */}
          <g fontFamily="monospace" fontSize="5.5" opacity="0.9">
            <text x="398" y="198" fill="#60A5FA">import</text>
            <text x="424" y="198" fill="#F472B6">{`{ Workspace }`}</text>
            <text x="472" y="198" fill="#60A5FA">from</text>
            <text x="492" y="198" fill="#34D399">&apos;@/bali&apos;;</text>

            <text x="398" y="210" fill="#818CF8">const</text>
            <text x="420" y="210" fill="#FBBF24">dreamOffice</text>
            <text x="470" y="210" fill="#E2E8F0">=</text>
            <text x="480" y="210" fill="#38BDF8">new</text>
            <text x="496" y="210" fill="#F472B6">Setup</text>
            <text x="515" y="210" fill="#E2E8F0">();</text>

            <text x="398" y="222" fill="#94A3B8">{`// Bali digital nomad mode`}</text>
            <text x="398" y="234" fill="#FBBF24">dreamOffice</text>
            <text x="444" y="234" fill="#E2E8F0">.rent({`{ wifi:`}</text>
            <text x="486" y="234" fill="#34D399">&apos;300Mbps&apos;</text>
            <text x="526" y="234" fill="#E2E8F0">{`});`}</text>

            {/* Glowing Accent Progress Bar / Terminal */}
            <rect x="398" y="250" width="204" height="42" rx="3" fill="#030712" opacity="0.8" />
            <text x="404" y="262" fill="#34D399" fontSize="5.5">✓ Bali Workspace Ready — €108/mo</text>
            <text x="404" y="274" fill="#60A5FA" fontSize="5">⚡ Next.js 15 App Router | Turbopack</text>
            <text x="404" y="284" fill="#94A3B8" fontSize="4.8">Free Canggu &amp; Ubud delivery &amp; setup</text>
          </g>

          {/* ScreenBar mount clip indicator */}
          {hasScreenBar && (
            <rect x="493" y="167" width="14" height="5" rx="1" fill="#0F172A" />
          )}
        </g>
      )}

      {/* 2. 34" CURVED ULTRAWIDE DISPLAY */}
      {is34 && (
        <g id="monitor-34-group">
          {/* Heavy Duty V-Stand */}
          <rect x="493" y="265" width="14" height="80" fill="url(#metal-stand)" rx="2" />
          <polygon
            points="445,347 555,347 570,354 430,354"
            fill="#1E293B"
            stroke="#0F172A"
            strokeWidth="1"
          />

          {/* Gentle Curve Outer Bezel (360px wide) */}
          <path
            d="M 320 162 Q 500 157 680 162 L 680 298 Q 500 293 320 298 Z"
            fill="#0F172A"
            stroke="#334155"
            strokeWidth="3"
            filter={lightingMode === "midnight" ? "url(#monitor-glow)" : undefined}
          />

          {/* Inner Glowing Ultrawide Screen */}
          <path
            d="M 323 165 Q 500 160 677 165 L 677 295 Q 500 290 323 295 Z"
            fill="url(#code-bg)"
            opacity={screenBrightness}
          />

          {/* Top Title Bar */}
          <rect x="325" y="165" width="350" height="12" fill="#090E1A" opacity="0.9" />
          <circle cx="334" cy="171" r="2.5" fill="#EF4444" />
          <circle cx="341" cy="171" r="2.5" fill="#F59E0B" />
          <circle cx="348" cy="171" r="2.5" fill="#10B981" />
          <text x="365" y="173.5" fill="#94A3B8" fontSize="6" fontFamily="monospace">
            monis.rent — 34&quot; 144Hz Ultrawide Dual Canvas
          </text>

          {/* Split Screen Separator */}
          <line x1="500" y1="177" x2="500" y2="292" stroke="#334155" strokeWidth="1" />

          {/* Left Canvas: Code Editor */}
          <g fontFamily="monospace" fontSize="5.5" opacity="0.95">
            <text x="335" y="192" fill="#818CF8">export function</text>
            <text x="395" y="192" fill="#FBBF24">BaliWorkspace</text>
            <text x="455" y="192" fill="#E2E8F0">() {`{`}</text>

            <text x="345" y="204" fill="#F472B6">return</text>
            <text x="375" y="204" fill="#38BDF8">&lt;WorkspaceDesigner</text>

            <text x="355" y="216" fill="#34D399">desk=&quot;Walnut Standing&quot;</text>
            <text x="355" y="228" fill="#34D399">chair=&quot;Ergo Mesh&quot;</text>
            <text x="355" y="240" fill="#34D399">screen=&quot;34 Curved&quot;</text>
            <text x="345" y="252" fill="#38BDF8">/&gt;</text>
            <text x="335" y="264" fill="#E2E8F0">{`}`}</text>
          </g>

          {/* Right Canvas: Live Web Application Preview */}
          <g transform="translate(510, 185)">
            <rect x="0" y="0" width="155" height="98" rx="3" fill="#0F172A" opacity="0.9" />
            <rect x="0" y="0" width="155" height="12" rx="2" fill="#1E293B" />
            <text x="6" y="8" fill="#38BDF8" fontSize="5" fontFamily="sans-serif" fontWeight="bold">
              monis.rent/preview
            </text>
            {/* Visual Mock Cards */}
            <rect x="8" y="18" width="65" height="32" rx="2" fill="#1E293B" />
            <rect x="80" y="18" width="65" height="32" rx="2" fill="#1E293B" />
            <text x="12" y="28" fill="#F8FAFC" fontSize="5" fontWeight="bold">
              Desk Setup
            </text>
            <text x="12" y="36" fill="#10B981" fontSize="4.5">
              Dual Motors Active
            </text>
            <text x="84" y="28" fill="#F8FAFC" fontSize="5" fontWeight="bold">
              Lease Rate
            </text>
            <text x="84" y="36" fill="#FBBF24" fontSize="4.5">
              €138 / mo
            </text>

            {/* Bottom mini chart */}
            <rect x="8" y="56" width="137" height="32" rx="2" fill="#111827" />
            <polyline
              points="14,80 34,70 64,74 94,62 124,65 140,59"
              fill="none"
              stroke="#10B981"
              strokeWidth="1.5"
            />
          </g>

          {/* ScreenBar mount clip indicator */}
          {hasScreenBar && (
            <rect x="493" y="159" width="14" height="5" rx="1" fill="#0F172A" />
          )}
        </g>
      )}

      {/* 3. DUAL 27" 4K WORKSTATION DUO */}
      {isDual && (
        <g id="monitor-dual-group">
          {/* Heavy-Duty Dual Articulated Arm Clamped to Desk */}
          <rect x="495" y="275" width="10" height="70" fill="#1E293B" rx="2" />
          {/* Clamp Base on Desk Edge */}
          <rect x="488" y="343" width="24" height="9" fill="#0F172A" rx="2" />
          {/* Angled Left & Right Arms */}
          <line x1="500" y1="285" x2="415" y2="250" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
          <line x1="500" y1="285" x2="585" y2="250" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />

          {/* LEFT 27" MONITOR */}
          <g transform="translate(290, 175) rotate(-3, 200, 100)">
            <rect
              x="0"
              y="0"
              width="190"
              height="125"
              rx="4"
              fill="#0F172A"
              stroke="#334155"
              strokeWidth="2.5"
            />
            <rect x="3" y="3" width="184" height="119" rx="2" fill="url(#code-bg)" opacity={screenBrightness} />
            <rect x="3" y="3" width="184" height="10" fill="#090E1A" />
            <circle cx="10" cy="8" r="2" fill="#EF4444" />
            <circle cx="16" cy="8" r="2" fill="#F59E0B" />
            <circle cx="22" cy="8" r="2" fill="#10B981" />
            <text x="32" y="10" fill="#94A3B8" fontSize="5" fontFamily="monospace">
              Left: Architecture.ts
            </text>
            {/* Left screen code */}
            <text x="12" y="28" fill="#60A5FA" fontSize="5" fontFamily="monospace">
              class StudioWorkspace {`{`}
            </text>
            <text x="20" y="40" fill="#FBBF24" fontSize="4.8" fontFamily="monospace">
              capacity = &apos;Dual 4K&apos;;
            </text>
            <text x="20" y="52" fill="#34D399" fontSize="4.8" fontFamily="monospace">
              baliDelivery = true;
            </text>
            <text x="12" y="64" fill="#60A5FA" fontSize="5" fontFamily="monospace">
              {`}`}
            </text>
          </g>

          {/* RIGHT 27" MONITOR */}
          <g transform="translate(520, 175) rotate(3, 0, 100)">
            <rect
              x="0"
              y="0"
              width="190"
              height="125"
              rx="4"
              fill="#0F172A"
              stroke="#334155"
              strokeWidth="2.5"
            />
            <rect x="3" y="3" width="184" height="119" rx="2" fill="url(#code-bg)" opacity={screenBrightness} />
            <rect x="3" y="3" width="184" height="10" fill="#090E1A" />
            <circle cx="10" cy="8" r="2" fill="#EF4444" />
            <circle cx="16" cy="8" r="2" fill="#F59E0B" />
            <circle cx="22" cy="8" r="2" fill="#10B981" />
            <text x="32" y="10" fill="#94A3B8" fontSize="5" fontFamily="monospace">
              Right: Figma Design Canvas
            </text>
            {/* Visual Design Elements */}
            <rect x="15" y="24" width="70" height="42" rx="3" fill="#1E293B" />
            <rect x="95" y="24" width="75" height="42" rx="3" fill="#1E293B" />
            <text x="20" y="36" fill="#F8FAFC" fontSize="4.5" fontWeight="bold">
              UI System
            </text>
            <text x="100" y="36" fill="#F8FAFC" fontSize="4.5" fontWeight="bold">
              Components
            </text>
            <rect x="15" y="74" width="155" height="38" rx="3" fill="#0A0F1D" />
            <text x="22" y="90" fill="#10B981" fontSize="5">
              monis.rent 3840 x 2160 IPS Duo
            </text>
          </g>
        </g>
      )}

      {/* Selected highlight glow */}
      {isSelected && (
        <rect
          x={is34 ? 315 : isDual ? 285 : 380}
          y={is34 ? 155 : 165}
          width={is34 ? 370 : isDual ? 430 : 240}
          height={is34 ? 150 : 146}
          rx="6"
          fill="none"
          stroke="#10B981"
          strokeWidth="2.5"
          strokeDasharray="4 2"
          className="animate-pulse"
        />
      )}
    </g>
  );
}
