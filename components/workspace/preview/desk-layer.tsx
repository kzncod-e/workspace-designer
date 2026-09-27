"use client";

import React from "react";
import { Product } from "@/types/product";
import { LightingMode } from "@/types/workspace";

interface DeskLayerProps {
  desk: Product | null;
  lightingMode: LightingMode;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function DeskLayer({ desk, lightingMode, isSelected, onSelect }: DeskLayerProps) {
  if (!desk) {
    // Empty state: Elegant blueprint ghost desk
    return (
      <g
        id="desk-ghost"
        className="cursor-pointer group"
        onClick={onSelect}
      >
        {/* Ghost Desk Shadow */}
        <ellipse cx="500" cy="485" rx="270" ry="24" fill="rgba(0,0,0,0.05)" />
        {/* Ghost Legs */}
        <line
          x1="265"
          y1="360"
          x2="255"
          y2="490"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <line
          x1="735"
          y1="360"
          x2="745"
          y2="490"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        {/* Ghost Desktop Surface */}
        <polygon
          points="240,345 760,345 790,375 210,375"
          fill="rgba(148, 163, 184, 0.08)"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <text
          x="500"
          y="364"
          textAnchor="middle"
          fill="#64748B"
          fontSize="13"
          fontWeight="500"
          className="group-hover:fill-primary transition-colors"
        >
          + Select a Desk to Begin Workspace
        </text>
      </g>
    );
  }

  const isStanding = desk.previewId === "desk-walnut";
  const isOak = desk.previewId === "desk-oak";
  const isBamboo = desk.previewId === "desk-bamboo";
  const isBirch = desk.previewId === "desk-birch";

  // Palette variations based on selected wood
  const woodColors = isWalnut()
    ? {
        top: "#4A2E18",
        topLight: "#5C3A21",
        front: "#38200F",
        grain: "#2C180A",
      }
    : isBamboo
    ? {
        top: "#DEB887",
        topLight: "#E8C89A",
        front: "#C99E6B",
        grain: "#BA8C57",
      }
    : isBirch
    ? {
        top: "#E6D5C3",
        topLight: "#EFE2D3",
        front: "#D4BFAB",
        grain: "#C5AF98",
      }
    : {
        // Oak (Default)
        top: "#D4A373",
        topLight: "#DFB284",
        front: "#BD8C5C",
        grain: "#A97A4C",
      };

  function isWalnut() {
    return isStanding;
  }

  return (
    <g
      id="desk-layer"
      className="cursor-pointer transition-transform duration-300"
      onClick={onSelect}
    >
      <defs>
        {/* Wood surface gradient */}
        <linearGradient id={`desk-top-${desk.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={woodColors.topLight} />
          <stop offset="100%" stopColor={woodColors.top} />
        </linearGradient>

        {/* Front edge gradient */}
        <linearGradient id={`desk-front-${desk.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={woodColors.front} />
          <stop
            offset="100%"
            stopColor={lightingMode === "midnight" ? "#1A1008" : woodColors.grain}
          />
        </linearGradient>

        {/* Steel leg gradient */}
        <linearGradient id="leg-steel-white" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id="leg-steel-black" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="50%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="leg-aluminum" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="50%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>

      {/* Desk Shadow on Floor */}
      <ellipse
        cx="500"
        cy="495"
        rx="290"
        ry="22"
        fill={lightingMode === "midnight" ? "rgba(0,0,0,0.5)" : "rgba(80,60,40,0.22)"}
        filter="blur(4px)"
      />

      {/* DESK LEGS */}
      {isStanding ? (
        // Motorized Sit-Stand Heavy-Duty Columns & T-Feet
        <g id="standing-desk-legs">
          {/* Left Column (Dual Stage Telescoping) */}
          <rect x="260" y="375" width="22" height="115" rx="3" fill="url(#leg-steel-black)" />
          <rect x="257" y="440" width="28" height="50" rx="3" fill="#0F172A" opacity="0.8" />
          {/* Left Foot on Floor */}
          <polygon
            points="225,496 295,496 300,503 220,503"
            fill="#0F172A"
          />
          {/* Right Column (Dual Stage Telescoping) */}
          <rect x="718" y="375" width="22" height="115" rx="3" fill="url(#leg-steel-black)" />
          <rect x="715" y="440" width="28" height="50" rx="3" fill="#0F172A" opacity="0.8" />
          {/* Right Foot on Floor */}
          <polygon
            points="685,496 755,496 760,503 680,503"
            fill="#0F172A"
          />
          {/* Crossbar & Cable Track underneath */}
          <rect x="282" y="380" width="436" height="8" fill="#1E293B" rx="2" />

          {/* Motorized Height Memory Controller on Right Edge */}
          <g id="digital-keypad">
            <rect x="715" y="378" width="46" height="14" rx="2" fill="#0F172A" />
            <rect x="718" y="381" width="24" height="8" rx="1" fill="#0284C7" opacity="0.75" />
            <text
              x="730"
              y="387.5"
              fill="#FFFFFF"
              fontSize="6"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="middle"
            >
              74.5
            </text>
            {/* Up/Down buttons */}
            <circle cx="747" cy="385" r="2" fill="#64748B" />
            <circle cx="754" cy="385" r="2" fill="#64748B" />
          </g>
        </g>
      ) : isOak ? (
        // Minimalist Trestle / Angle Legs (White Powder-Coated Steel)
        <g id="oak-desk-legs">
          {/* Left Trestle */}
          <line
            x1="260"
            y1="375"
            x2="235"
            y2="495"
            stroke="url(#leg-steel-white)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <line
            x1="290"
            y1="375"
            x2="315"
            y2="495"
            stroke="url(#leg-steel-white)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <line
            x1="230"
            y1="495"
            x2="320"
            y2="495"
            stroke="#CBD5E1"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Right Trestle */}
          <line
            x1="740"
            y1="375"
            x2="765"
            y2="495"
            stroke="url(#leg-steel-white)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <line
            x1="710"
            y1="375"
            x2="685"
            y2="495"
            stroke="url(#leg-steel-white)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <line
            x1="680"
            y1="495"
            x2="770"
            y2="495"
            stroke="#CBD5E1"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Cable tray trough under desk */}
          <rect x="360" y="375" width="280" height="12" rx="3" fill="#E2E8F0" opacity="0.9" />
        </g>
      ) : isBamboo ? (
        // Sleek Sandblasted Aluminum Legs
        <g id="bamboo-desk-legs">
          <line
            x1="260"
            y1="375"
            x2="245"
            y2="495"
            stroke="url(#leg-aluminum)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <line
            x1="285"
            y1="375"
            x2="270"
            y2="495"
            stroke="url(#leg-aluminum)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <line
            x1="740"
            y1="375"
            x2="755"
            y2="495"
            stroke="url(#leg-aluminum)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <line
            x1="715"
            y1="375"
            x2="730"
            y2="495"
            stroke="url(#leg-aluminum)"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </g>
      ) : (
        // Nordic Birch Solid Tapered Legs & Integrated Soft-Close Drawer
        <g id="birch-desk-legs">
          {/* Integrated felt drawer beneath desk */}
          <rect x="340" y="375" width="320" height="24" rx="2" fill="#D4BFAB" />
          <line x1="350" y1="387" x2="650" y2="387" stroke="#BAA591" strokeWidth="1" />
          <circle cx="500" cy="387" r="3" fill="#78350F" opacity="0.6" />
          {/* Scandinavian Tapered Solid Birch Legs */}
          <polygon points="255,375 267,375 250,495 240,495" fill="#D4BFAB" />
          <polygon points="745,375 733,375 750,495 760,495" fill="#D4BFAB" />
        </g>
      )}

      {/* DESK TOP SURFACE (Perspective Polygon) */}
      {/* Back Edge: y: 342, Front Edge: y: 372 */}
      {isBamboo ? (
        // Ergonomically curved front profile
        <path
          d="M 230 342 L 770 342 L 795 372 Q 500 382 205 372 Z"
          fill={`url(#desk-top-${desk.id})`}
          stroke={woodColors.grain}
          strokeWidth="0.8"
        />
      ) : (
        <polygon
          points="230,342 770,342 795,372 205,372"
          fill={`url(#desk-top-${desk.id})`}
          stroke={woodColors.grain}
          strokeWidth="0.8"
        />
      )}

      {/* Subtle Wood Grain Lines on Desktop */}
      <path
        d="M 250 354 Q 500 357 750 354 M 270 364 Q 500 366 730 364"
        fill="none"
        stroke={woodColors.grain}
        strokeWidth="0.6"
        opacity="0.35"
      />

      {/* Wireless Charging Emblem (if Bamboo) */}
      {isBamboo && (
        <g id="qi-charger" opacity="0.4">
          <circle cx="270" cy="358" r="8" fill="none" stroke="#78350F" strokeWidth="1" />
          <path
            d="M 269 353 L 267 358 L 271 358 L 269 363"
            stroke="#78350F"
            strokeWidth="1.2"
            fill="none"
          />
        </g>
      )}

      {/* Cable Pass-Through Grommet (Oak & Standing) */}
      {(isOak || isStanding) && (
        <ellipse
          cx="725"
          cy="348"
          rx="7"
          ry="3.5"
          fill={isStanding ? "#0F172A" : "#FFFFFF"}
          stroke="#94A3B8"
          strokeWidth="1"
          opacity="0.75"
        />
      )}

      {/* DESK FRONT BEVEL/EDGE (Thickness) */}
      {isBamboo ? (
        <path
          d="M 205 372 Q 500 382 795 372 L 795 380 Q 500 390 205 380 Z"
          fill={`url(#desk-front-${desk.id})`}
        />
      ) : (
        <polygon
          points="205,372 795,372 795,380 205,380"
          fill={`url(#desk-front-${desk.id})`}
        />
      )}

      {/* Subtle selection highlight glow ring */}
      {isSelected && (
        <polygon
          points="228,340 772,340 798,373 202,373"
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
