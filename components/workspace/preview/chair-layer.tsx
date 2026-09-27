"use client";

import React from "react";
import { Product } from "@/types/product";
import { LightingMode } from "@/types/workspace";

interface ChairLayerProps {
  chair: Product | null;
  lightingMode: LightingMode;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function ChairLayer({ chair, lightingMode, isSelected, onSelect }: ChairLayerProps) {
  if (!chair) {
    // Empty State: Subtle blueprint chair ghost
    return (
      <g
        id="chair-ghost"
        className="cursor-pointer group"
        onClick={onSelect}
      >
        <ellipse cx="500" cy="535" rx="55" ry="12" fill="rgba(0,0,0,0.06)" />
        {/* Ghost Seat & Back */}
        <rect
          x="465"
          y="410"
          width="70"
          height="12"
          rx="4"
          fill="rgba(148, 163, 184, 0.08)"
          stroke="#94A3B8"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 470 410 Q 470 320 500 320 Q 530 320 530 410"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <text
          x="500"
          y="370"
          textAnchor="middle"
          fill="#64748B"
          fontSize="11"
          fontWeight="500"
          className="group-hover:fill-primary transition-colors"
        >
          + Choose Chair
        </text>
      </g>
    );
  }

  const isErgo = chair.previewId === "chair-ergo";
  const isLeather = chair.previewId === "chair-leather";
  const isLounge = chair.previewId === "chair-lounge";
  const isStool = chair.previewId === "chair-stool";

  return (
    <g
      id="chair-layer"
      className="cursor-pointer transition-transform duration-300"
      onClick={onSelect}
    >
      <defs>
        {/* Mesh back pattern */}
        <pattern id="mesh-pattern" width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" fill="#4B5563" />
        </pattern>

        {/* Cognac Leather Gradients */}
        <linearGradient id="cognac-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C2410C" />
          <stop offset="50%" stopColor="#9A3412" />
          <stop offset="100%" stopColor="#7C2D12" />
        </linearGradient>

        <linearGradient id="wool-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9CA3AF" />
          <stop offset="100%" stopColor="#6B7280" />
        </linearGradient>

        {/* Chrome Hydraulic Cylinder */}
        <linearGradient id="chrome-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="40%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
      </defs>

      {/* Chair Shadow on Floor */}
      <ellipse
        cx="500"
        cy="535"
        rx="65"
        ry="15"
        fill={lightingMode === "midnight" ? "rgba(0,0,0,0.6)" : "rgba(60,45,30,0.25)"}
        filter="blur(3px)"
      />

      {/* CHAIR BASE & WHEELS */}
      {!isStool ? (
        <g id="chair-base">
          {/* Hydraulic Cylinder */}
          <rect x="495" y="445" width="10" height="60" rx="2" fill="url(#chrome-grad)" />
          {/* Mechanism Cover Box */}
          <rect x="488" y="438" width="24" height="12" rx="3" fill="#1F2937" />

          {/* 5-Star Spider Caster Base */}
          {/* Center Hub */}
          <circle cx="500" cy="505" r="9" fill={isLounge ? "#D4A373" : "#334155"} />
          {/* Base Legs */}
          {isLounge ? (
            // Solid Oak 4-Star Base for Lounge
            <g stroke="#D4A373" strokeWidth="6" strokeLinecap="round">
              <line x1="500" y1="505" x2="450" y2="525" />
              <line x1="500" y1="505" x2="550" y2="525" />
              <line x1="500" y1="505" x2="470" y2="495" />
              <line x1="500" y1="505" x2="530" y2="495" />
            </g>
          ) : (
            // Aluminum / Steel 5-Star Caster Base
            <g
              stroke={isErgo ? "url(#chrome-grad)" : "#1E293B"}
              strokeWidth="5"
              strokeLinecap="round"
            >
              <line x1="500" y1="505" x2="445" y2="525" />
              <line x1="500" y1="505" x2="555" y2="525" />
              <line x1="500" y1="505" x2="465" y2="495" />
              <line x1="500" y1="505" x2="535" y2="495" />
              <line x1="500" y1="505" x2="500" y2="532" />
            </g>
          )}

          {/* Caster Wheels */}
          <ellipse cx="445" cy="526" rx="4" ry="5" fill="#0F172A" />
          <ellipse cx="555" cy="526" rx="4" ry="5" fill="#0F172A" />
          <ellipse cx="465" cy="495" rx="3.5" ry="4.5" fill="#0F172A" />
          <ellipse cx="535" cy="495" rx="3.5" ry="4.5" fill="#0F172A" />
          <ellipse cx="500" cy="533" rx="4" ry="5" fill="#0F172A" />
        </g>
      ) : (
        // Active Stool Convex Wobble Base
        <g id="stool-base">
          {/* Rounded Convex Base Bowl */}
          <path
            d="M 460 525 Q 500 540 540 525 Q 500 520 460 525 Z"
            fill="#1E293B"
            stroke="#0F172A"
            strokeWidth="1.5"
          />
          {/* Telescopic Pneumatic Stem with Height Button */}
          <rect x="495" y="440" width="10" height="85" rx="2" fill="url(#chrome-grad)" />
          <circle cx="500" cy="455" r="4" fill="#F87171" />
        </g>
      )}

      {/* CHAIR SEAT CUSHION (Center ~x: 500, y: 415 to 442) */}
      {isErgo ? (
        // Ergonomic Waterfall Mesh Cushion
        <g id="ergo-seat">
          {/* Seat frame */}
          <path
            d="M 450 422 Q 500 415 550 422 L 555 438 Q 500 445 445 438 Z"
            fill="#111827"
          />
          {/* Waterfall mesh top */}
          <path
            d="M 452 422 Q 500 417 548 422 Q 500 440 452 422 Z"
            fill="url(#mesh-pattern)"
            opacity="0.9"
          />
        </g>
      ) : isLeather ? (
        // Luxurious Plush Cognac Cushion with Tufting
        <g id="leather-seat">
          <path
            d="M 445 420 Q 500 412 555 420 L 558 440 Q 500 448 442 440 Z"
            fill="url(#cognac-grad)"
            stroke="#7C2D12"
            strokeWidth="1"
          />
          {/* Tufted seams */}
          <line x1="475" y1="422" x2="472" y2="438" stroke="#7C2D12" strokeWidth="1.2" opacity="0.6" />
          <line x1="525" y1="422" x2="528" y2="438" stroke="#7C2D12" strokeWidth="1.2" opacity="0.6" />
        </g>
      ) : isLounge ? (
        // Hygge Wool Rounded Shell Seat
        <g id="lounge-seat">
          <path
            d="M 445 422 Q 500 414 555 422 L 552 442 Q 500 446 448 442 Z"
            fill="url(#wool-grad)"
          />
        </g>
      ) : (
        // Stool Saddle Cushion
        <g id="stool-seat">
          <ellipse cx="500" cy="436" rx="42" ry="12" fill="#374151" />
          <ellipse cx="500" cy="434" rx="40" ry="10" fill="#4B5563" />
          <ellipse cx="500" cy="434" rx="38" ry="8" fill="none" stroke="#F87171" strokeWidth="1" opacity="0.8" />
        </g>
      )}

      {/* CHAIR BACKREST (Not on stool) */}
      {isErgo ? (
        // High-tensile Mesh Back with Dynamic Lumbar
        <g id="ergo-back">
          {/* Outer Ergonomic Spine Frame */}
          <path
            d="M 462 422 L 460 340 Q 460 305 500 305 Q 540 305 540 340 L 538 422"
            fill="none"
            stroke="#1F2937"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Inner Mesh Fill */}
          <path
            d="M 464 420 L 462 342 Q 462 310 500 310 Q 538 310 538 342 L 536 420 Z"
            fill="#1E293B"
            opacity="0.85"
          />
          <path
            d="M 464 420 L 462 342 Q 462 310 500 310 Q 538 310 538 342 L 536 420 Z"
            fill="url(#mesh-pattern)"
            opacity="0.7"
          />
          {/* Dynamic Lumbar Support Bar */}
          <rect x="472" y="375" width="56" height="14" rx="5" fill="#0F172A" />
          <line x1="476" y1="382" x2="524" y2="382" stroke="#4B5563" strokeWidth="1.5" />

          {/* 4D Adjustable Armrests */}
          {/* Left Armrest */}
          <path d="M 448 426 L 436 415 L 436 385" fill="none" stroke="#1F2937" strokeWidth="5" strokeLinecap="round" />
          <rect x="428" y="380" width="18" height="6" rx="2" fill="#0F172A" />
          {/* Right Armrest */}
          <path d="M 552 426 L 564 415 L 564 385" fill="none" stroke="#1F2937" strokeWidth="5" strokeLinecap="round" />
          <rect x="554" y="380" width="18" height="6" rx="2" fill="#0F172A" />
        </g>
      ) : isLeather ? (
        // High-Back Cognac Leather Recliner with Headrest Pillow
        <g id="leather-back">
          {/* Main Back Contour */}
          <path
            d="M 455 422 L 452 325 Q 452 295 500 295 Q 548 295 548 325 L 545 422 Z"
            fill="url(#cognac-grad)"
            stroke="#7C2D12"
            strokeWidth="1.5"
          />
          {/* Horizontal Ergonomic Stitching Flutes */}
          <line x1="460" y1="380" x2="540" y2="380" stroke="#7C2D12" strokeWidth="1.2" opacity="0.6" />
          <line x1="462" y1="350" x2="538" y2="350" stroke="#7C2D12" strokeWidth="1.2" opacity="0.6" />

          {/* Integrated Plush Headrest Pillow */}
          <rect x="470" y="300" width="60" height="26" rx="6" fill="#7C2D12" opacity="0.9" />
          <rect x="473" y="303" width="54" height="20" rx="4" fill="#9A3412" />

          {/* Polished Armrests with Leather Pads */}
          {/* Left */}
          <path d="M 445 426 L 432 410 L 432 375 L 448 375" fill="none" stroke="#334155" strokeWidth="4" />
          <rect x="428" y="371" width="22" height="7" rx="3" fill="#9A3412" />
          {/* Right */}
          <path d="M 555 426 L 568 410 L 568 375 L 552 375" fill="none" stroke="#334155" strokeWidth="4" />
          <rect x="550" y="371" width="22" height="7" rx="3" fill="#9A3412" />
        </g>
      ) : isLounge ? (
        // Hygge Wool Curved Cocoon Shell
        <g id="lounge-back">
          <path
            d="M 452 422 Q 440 370 445 320 Q 450 300 500 300 Q 550 300 555 320 Q 560 370 548 422 Z"
            fill="url(#wool-grad)"
            stroke="#4B5563"
            strokeWidth="1"
          />
          {/* Soft inner lumbar pillow */}
          <ellipse cx="500" cy="385" rx="36" ry="16" fill="#9CA3AF" opacity="0.5" />
        </g>
      ) : null}

      {/* Selected highlight glow */}
      {isSelected && (
        <ellipse
          cx="500"
          cy="420"
          rx="75"
          ry="110"
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
