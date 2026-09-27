"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product, ProductCategory } from "@/types/product";
import { LightingMode, RentalDuration } from "@/types/workspace";
import { PRODUCTS, PRESET_TEMPLATES } from "@/data/products";
import { STORAGE_KEY } from "./workspace";

interface WorkspaceStore {
  desk: Product | null;
  chair: Product | null;
  accessories: Product[];
  rentalDuration: RentalDuration;
  lightingMode: LightingMode;
  activeCategory: ProductCategory;
  selectedPreviewItem: string | null;
  isHydrated: boolean;

  // Actions
  selectDesk: (product: Product) => void;
  selectChair: (product: Product) => void;
  toggleAccessory: (product: Product) => void;
  addAccessory: (product: Product) => void;
  removeAccessory: (productId: string) => void;
  hasAccessory: (productId: string) => boolean;
  applyPreset: (presetId: string) => void;
  clearWorkspace: () => void;
  setLightingMode: (mode: LightingMode) => void;
  setRentalDuration: (duration: RentalDuration) => void;
  setActiveCategory: (category: ProductCategory) => void;
  setSelectedPreviewItem: (id: string | null) => void;
  setHydrated: () => void;
}

// Default initial state: load "The Nomad Essential" as default so user immediately sees a rich workspace preview!
const defaultDesk = PRODUCTS.find((p) => p.id === "desk-minimal-oak") || null;
const defaultChair = PRODUCTS.find((p) => p.id === "chair-ergo-mesh") || null;
const defaultAccessories = PRODUCTS.filter((p) =>
  ["acc-monitor-27", "acc-lamp-screenbar", "acc-plant-monstera", "acc-desk-pad"].includes(p.id)
);

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set, get) => ({
      desk: defaultDesk,
      chair: defaultChair,
      accessories: defaultAccessories,
      rentalDuration: 3,
      lightingMode: "daylight",
      activeCategory: "desk",
      selectedPreviewItem: null,
      isHydrated: false,

      selectDesk: (product) => {
        set({ desk: product, selectedPreviewItem: product.id });
      },

      selectChair: (product) => {
        set({ chair: product, selectedPreviewItem: product.id });
      },

      toggleAccessory: (product) => {
        const { accessories } = get();
        const exists = accessories.some((item) => item.id === product.id);
        if (exists) {
          set({
            accessories: accessories.filter((item) => item.id !== product.id),
            selectedPreviewItem: null,
          });
        } else {
          // If accessory is a monitor and another monitor is selected, or if allowed multiple
          // For monitors, let's replace or add depending on choice
          if (product.category === "monitor") {
            const nonMonitors = accessories.filter((item) => item.category !== "monitor");
            set({
              accessories: [...nonMonitors, product],
              selectedPreviewItem: product.id,
            });
          } else if (product.category === "lamp") {
            const nonLamps = accessories.filter((item) => item.category !== "lamp");
            set({
              accessories: [...nonLamps, product],
              selectedPreviewItem: product.id,
            });
          } else {
            set({
              accessories: [...accessories, product],
              selectedPreviewItem: product.id,
            });
          }
        }
      },

      addAccessory: (product) => {
        const { accessories } = get();
        if (!accessories.some((item) => item.id === product.id)) {
          set({ accessories: [...accessories, product], selectedPreviewItem: product.id });
        }
      },

      removeAccessory: (productId) => {
        const { accessories } = get();
        set({
          accessories: accessories.filter((item) => item.id !== productId),
          selectedPreviewItem: null,
        });
      },

      hasAccessory: (productId) => {
        return get().accessories.some((item) => item.id === productId);
      },

      applyPreset: (presetId) => {
        const preset = PRESET_TEMPLATES.find((p) => p.id === presetId);
        if (!preset) return;

        const newDesk = PRODUCTS.find((p) => p.id === preset.deskId) || null;
        const newChair = PRODUCTS.find((p) => p.id === preset.chairId) || null;
        const newAccessories = PRODUCTS.filter((p) => preset.accessoryIds.includes(p.id));

        set({
          desk: newDesk,
          chair: newChair,
          accessories: newAccessories,
          selectedPreviewItem: null,
        });
      },

      clearWorkspace: () => {
        set({
          desk: null,
          chair: null,
          accessories: [],
          selectedPreviewItem: null,
        });
      },

      setLightingMode: (mode) => set({ lightingMode: mode }),
      setRentalDuration: (duration) => set({ rentalDuration: duration }),
      setActiveCategory: (category) => set({ activeCategory: category }),
      setSelectedPreviewItem: (id) => set({ selectedPreviewItem: id }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return window.localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      partialize: (state) => ({
        desk: state.desk,
        chair: state.chair,
        accessories: state.accessories,
        rentalDuration: state.rentalDuration,
        lightingMode: state.lightingMode,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated();
        }
      },
    }
  )
);
