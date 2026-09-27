"use client";

import React from "react";
import { useWorkspaceStore } from "@/lib/store";
import { PRODUCTS, PRESET_TEMPLATES } from "@/data/products";
import { ProductCard } from "./product-card";
import { AccessoryCard } from "./accessory-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  LayoutGrid,
  Armchair,
  Monitor,
  Lightbulb,
  Cpu,
} from "lucide-react";

export function ProductSelector() {
  const {
    desk,
    chair,
    accessories,
    selectDesk,
    selectChair,
    toggleAccessory,
    addAccessory,
    removeAccessory,
    hasAccessory,
    getAccessoryCount,
    applyPreset,
  } = useWorkspaceStore();

  const desks = PRODUCTS.filter((p) => p.category === "desk");
  const chairs = PRODUCTS.filter((p) => p.category === "chair");
  const monitors = PRODUCTS.filter((p) => p.category === "monitor");
  const lightingAndAudio = PRODUCTS.filter(
    (p) => p.category === "lamp" || p.category === "speaker"
  );
  const accessoriesAndDecor = PRODUCTS.filter((p) =>
    ["plant", "keyboard", "laptop-stand", "desk-pad"].includes(p.category)
  );

  return (
    <div className="space-y-6">
      {/* 1. CURATED PRESET TEMPLATES BAR */}
      <div className="bg-card border border-border/80 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-semibold text-foreground">
              Curated Workspace Presets
            </span>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            1-Click Bali Setup
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PRESET_TEMPLATES.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset.id)}
              className="group text-left p-2.5 rounded-xl border border-border/70 hover:border-emerald-500/60 bg-muted/30 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-xs font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                  {preset.name}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground line-clamp-1">
                {preset.subtitle}
              </p>
              <div className="mt-1.5 flex items-center justify-between">
                <Badge
                  variant="outline"
                  className="text-[9px] px-1.5 py-0 font-normal border-border/60 text-muted-foreground"
                >
                  {preset.tag}
                </Badge>
                <span className="text-[10px] text-emerald-600 font-medium group-hover:underline">
                  Apply →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. CATEGORIZED CONFIGURATION TABS */}
      <Tabs defaultValue="desks" className="w-full">
        <div className="flex items-center justify-between gap-2 mb-4 overflow-x-auto pb-1 scrollbar-none">
          <TabsList className="bg-muted/60 p-1 rounded-xl h-11 border border-border/60 flex">
            {/* Desks Tab */}
            <TabsTrigger
              value="desks"
              className="text-xs font-medium rounded-lg px-3.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Desks</span>
              {desk && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-0.5" />
              )}
            </TabsTrigger>

            {/* Chairs Tab */}
            <TabsTrigger
              value="chairs"
              className="text-xs font-medium rounded-lg px-3.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Armchair className="w-3.5 h-3.5" />
              <span>Chairs</span>
              {chair && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-0.5" />
              )}
            </TabsTrigger>

            {/* Displays Tab */}
            <TabsTrigger
              value="monitors"
              className="text-xs font-medium rounded-lg px-3.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Displays</span>
              {accessories.some((a) => a.category === "monitor") && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 ml-0.5" />
              )}
            </TabsTrigger>

            {/* Lighting & Sound Tab */}
            <TabsTrigger
              value="lighting-sound"
              className="text-xs font-medium rounded-lg px-3.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Light &amp; Sound</span>
            </TabsTrigger>

            {/* Accessories & Decor Tab */}
            <TabsTrigger
              value="accessories"
              className="text-xs font-medium rounded-lg px-3.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Gear &amp; Decor</span>
              {accessories.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 text-[9px] px-1 py-0 h-3.5 bg-muted text-foreground"
                >
                  {accessories.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </div>

        {/* TAB CONTENT: DESKS */}
        <TabsContent value="desks" className="mt-0 focus-visible:outline-hidden">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-foreground">
              Select Your Desk Surface
            </h3>
            <p className="text-xs text-muted-foreground">
              High-end European oak, motorized walnut standing desks, and sustainable bamboo.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {desks.map((d) => (
              <ProductCard
                key={d.id}
                product={d}
                isSelected={desk?.id === d.id}
                onSelect={() => selectDesk(d)}
              />
            ))}
          </div>
        </TabsContent>

        {/* TAB CONTENT: CHAIRS */}
        <TabsContent value="chairs" className="mt-0 focus-visible:outline-hidden">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-foreground">
              Select Your Ergonomic Seating
            </h3>
            <p className="text-xs text-muted-foreground">
              Built for all-day focus in Bali with breathable mesh, cognac nappa leather, or active motion.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {chairs.map((c) => (
              <ProductCard
                key={c.id}
                product={c}
                isSelected={chair?.id === c.id}
                onSelect={() => selectChair(c)}
              />
            ))}
          </div>
        </TabsContent>

        {/* TAB CONTENT: MONITORS */}
        <TabsContent value="monitors" className="mt-0 focus-visible:outline-hidden">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-foreground">
              External Displays &amp; Workstations
            </h3>
            <p className="text-xs text-muted-foreground">
              Single-cable USB-C power delivery, curved panoramic view, or dual synchronized 4K monitors.
            </p>
          </div>
          <div className="space-y-3">
            {monitors.map((m) => (
              <AccessoryCard
                key={m.id}
                accessory={m}
                quantity={getAccessoryCount(m.id)}
                onToggle={() => toggleAccessory(m)}
                onAdd={() => addAccessory(m)}
                onRemove={() => removeAccessory(m.id)}
              />
            ))}
          </div>
        </TabsContent>

        {/* TAB CONTENT: LIGHTING & SOUND */}
        <TabsContent value="lighting-sound" className="mt-0 focus-visible:outline-hidden">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-foreground">
              Studio Lighting &amp; Reference Audio
            </h3>
            <p className="text-xs text-muted-foreground">
              Anti-glare screenbars, artisanal brass lamps, and acoustic isolation reference monitors.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lightingAndAudio.map((la) => (
              <AccessoryCard
                key={la.id}
                accessory={la}
                quantity={getAccessoryCount(la.id)}
                onToggle={() => toggleAccessory(la)}
                onAdd={() => addAccessory(la)}
                onRemove={() => removeAccessory(la.id)}
              />
            ))}
          </div>
        </TabsContent>

        {/* TAB CONTENT: ACCESSORIES & DECOR */}
        <TabsContent value="accessories" className="mt-0 focus-visible:outline-hidden">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-foreground">
              Ergonomic Peripherals &amp; Tropical Decor
            </h3>
            <p className="text-xs text-muted-foreground">
              Custom mechanical keyboards, living Bali flora, merino wool desk pads, and laptop risers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {accessoriesAndDecor.map((item) => (
              <AccessoryCard
                key={item.id}
                accessory={item}
                quantity={getAccessoryCount(item.id)}
                onToggle={() => toggleAccessory(item)}
                onAdd={() => addAccessory(item)}
                onRemove={() => removeAccessory(item.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
