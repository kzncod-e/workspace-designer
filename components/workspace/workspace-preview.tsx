"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useWorkspaceStore } from "@/lib/store";
import { RoomBackground } from "./preview/room-background";
import { DeskLayer } from "./preview/desk-layer";
import { ChairLayer } from "./preview/chair-layer";
import { MonitorLayer } from "./preview/monitor-layer";
import { AccessoriesLayer } from "./preview/accessories-layer";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sun, Sunset, Moon, Tag, Sparkles } from "lucide-react";
import { LightingMode } from "@/types/workspace";
import { calculateBaseMonthlyTotal, formatPrice } from "@/lib/workspace";

export function WorkspacePreview() {
  const {
    desk,
    chair,
    accessories,
    lightingMode,
    setLightingMode,
    selectedPreviewItem,
    setSelectedPreviewItem,
    setActiveCategory,
  } = useWorkspaceStore();

  const [showTags, setShowTags] = useState(true);

  const basePrice = calculateBaseMonthlyTotal(desk, chair, accessories);
  const monitor = accessories.find((a) => a.category === "monitor") || null;
  const hasScreenBar = accessories.some((a) => a.id === "acc-lamp-screenbar");

  const lightingModes: { id: LightingMode; label: string; icon: typeof Sun }[] = [
    { id: "daylight", label: "Daylight", icon: Sun },
    { id: "sunset", label: "Sunset", icon: Sunset },
    { id: "midnight", label: "Midnight", icon: Moon },
  ];

  // Helper to click an element and focus its category
  const handleItemClick = (category: "desk" | "chair" | "monitor" | "accessory", id: string) => {
    setSelectedPreviewItem(id);
    if (category === "desk") setActiveCategory("desk");
    else if (category === "chair") setActiveCategory("chair");
    else if (category === "monitor") setActiveCategory("monitor");
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-border/80 bg-card shadow-xl transition-all duration-300">
      {/* Top Preview Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between gap-2 pointer-events-none">
        {/* Left: Product & Setup Status Badge */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <Badge
            variant="secondary"
            className="backdrop-blur-md bg-background/80 border border-border/60 text-foreground font-medium px-3 py-1 text-xs shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Bali Villa Setup</span>
          </Badge>

          {desk && (
            <Badge
              variant="outline"
              className="hidden sm:inline-flex backdrop-blur-md bg-background/70 border-border/50 text-muted-foreground text-xs"
            >
              {desk.name}
            </Badge>
          )}
        </div>

        {/* Right: Lighting Atmosphere Switcher & Tag Toggle */}
        <div className="flex items-center gap-1.5 pointer-events-auto backdrop-blur-md bg-background/80 border border-border/60 p-1 rounded-full shadow-sm">
          {/* Lighting Mode Buttons */}
          {lightingModes.map((mode) => {
            const Icon = mode.icon;
            const isActive = lightingMode === mode.id;
            return (
              <TooltipProvider key={mode.id}>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <button
                        onClick={() => setLightingMode(mode.id)}
                        className={`p-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                        }`}
                        aria-label={`Switch to ${mode.label} lighting`}
                      />
                    }
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-xs">
                    {mode.label} Atmosphere
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}

          <div className="w-px h-3.5 bg-border/80 mx-0.5" />

          {/* Toggle Visual Floating Tags */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    onClick={() => setShowTags(!showTags)}
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                      showTags
                        ? "text-emerald-700 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/60"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-label="Toggle interactive tags"
                  />
                }
              >
                <Tag className="w-3.5 h-3.5" />
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {showTags ? "Hide Labels" : "Show Labels"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Main Interactive SVG Workspace Scene */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] select-none">
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Layer 1: Room Background (Sky, Window, Palm Fronds, Wall, Floor, Rug) */}
          <RoomBackground lightingMode={lightingMode} />

          {/* Layer 2: Desk Layer */}
          <DeskLayer
            desk={desk}
            lightingMode={lightingMode}
            isSelected={selectedPreviewItem === desk?.id}
            onSelect={() => {
              if (desk) handleItemClick("desk", desk.id);
              else setActiveCategory("desk");
            }}
          />

          {/* Layer 3: Accessories Layer (Desk Pad, Keyboard, Plants, Speakers, Laptop Stand, Lamp) */}
          <AccessoriesLayer
            accessories={accessories}
            lightingMode={lightingMode}
            selectedPreviewItem={selectedPreviewItem}
            onSelectAccessory={(id) => {
              setSelectedPreviewItem(id);
              const found = accessories.find((a) => a.id === id);
              if (found) setActiveCategory(found.category);
            }}
            hasMonitor={Boolean(monitor)}
          />

          {/* Layer 4: Monitor Layer */}
          <MonitorLayer
            monitor={monitor}
            lightingMode={lightingMode}
            isSelected={selectedPreviewItem === monitor?.id}
            onSelect={() => {
              if (monitor) handleItemClick("monitor", monitor.id);
              else setActiveCategory("monitor");
            }}
            hasScreenBar={hasScreenBar}
          />

          {/* Layer 5: Chair Layer (Positioned with 3D Depth) */}
          <ChairLayer
            chair={chair}
            lightingMode={lightingMode}
            isSelected={selectedPreviewItem === chair?.id}
            onSelect={() => {
              if (chair) handleItemClick("chair", chair.id);
              else setActiveCategory("chair");
            }}
          />
        </svg>

        {/* Floating Interactive Spatial Hotspots (when showTags is enabled) */}
        <AnimatePresence>
          {showTags && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Desk Tag */}
              {desk && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-[24%] top-[56%] pointer-events-auto cursor-pointer"
                  onClick={() => handleItemClick("desk", desk.id)}
                >
                  <div className="backdrop-blur-md bg-background/90 hover:bg-background border border-border/80 px-2 py-1 rounded-md text-[11px] font-medium shadow-sm transition-transform hover:scale-105 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>{desk.name}</span>
                    <span className="text-muted-foreground font-normal">
                      {formatPrice(desk.pricePerMonth)}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Monitor Tag */}
              {monitor && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-[45%] top-[25%] pointer-events-auto cursor-pointer"
                  onClick={() => handleItemClick("monitor", monitor.id)}
                >
                  <div className="backdrop-blur-md bg-background/90 hover:bg-background border border-border/80 px-2 py-1 rounded-md text-[11px] font-medium shadow-sm transition-transform hover:scale-105 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="truncate max-w-[110px]">{monitor.name}</span>
                    <span className="text-muted-foreground font-normal">
                      {formatPrice(monitor.pricePerMonth)}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Chair Tag */}
              {chair && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-[44%] bottom-[12%] pointer-events-auto cursor-pointer"
                  onClick={() => handleItemClick("chair", chair.id)}
                >
                  <div className="backdrop-blur-md bg-background/90 hover:bg-background border border-border/80 px-2 py-1 rounded-md text-[11px] font-medium shadow-sm transition-transform hover:scale-105 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{chair.name}</span>
                    <span className="text-muted-foreground font-normal">
                      {formatPrice(chair.pricePerMonth)}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Live Price & Item Quick Summary Bar */}
      <div className="px-4 py-3 bg-card/95 border-t border-border/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Active Configuration:</span>
          <span className="font-semibold text-foreground">
            {desk ? "1 Desk" : "No Desk"} • {chair ? "1 Chair" : "No Chair"} •{" "}
            {accessories.length} {accessories.length === 1 ? "Accessory" : "Accessories"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Setup Total:</span>
          <span className="text-sm font-bold text-foreground">
            {formatPrice(basePrice)}
            <span className="text-xs font-normal text-muted-foreground">/mo</span>
          </span>
        </div>
      </div>
    </div>
  );
}
