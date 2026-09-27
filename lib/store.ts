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
  getAccessoryCount: (productId: string) => number;
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
        const count = accessories.filter((item) => item.id === product.id).length;
        
        // Allowed limits
        const limit = (product.category === "monitor" || product.category === "plant") ? 3 : 1;

        if (count > 0) {
          // If it's single item or we click toggle on something that exists, we probably want to remove ONE instance.
          // Or we can just let AccessoryCard use addAccessory / removeAccessory directly for items that support multiple.
          // For backward compatibility of toggleAccessory: if it's a single item, toggle it.
          if (limit === 1) {
            set({
              accessories: accessories.filter((item) => item.id !== product.id),
              selectedPreviewItem: null,
            });
          } else {
             // For multiple items, toggleAccessory doesn't make as much sense, 
             // but we'll remove one instance if called.
             const index = accessories.findLastIndex(a => a.id === product.id);
             if (index !== -1) {
               const newAcc = [...accessories];
               newAcc.splice(index, 1);
               set({ accessories: newAcc, selectedPreviewItem: null });
             }
          }
        } else {
          // Add it
          if (product.category === "monitor") {
            // Keep existing logic to allow multiple monitors without wiping others?
            // User wants up to 3 monitors. Let's just add it.
            const monitorCount = accessories.filter((item) => item.category === "monitor").length;
            if (monitorCount < 3) {
              set({
                accessories: [...accessories, product],
                selectedPreviewItem: product.id,
              });
            }
          } else if (product.category === "lamp") {
            // Lamps still max 1
            const nonLamps = accessories.filter((item) => item.category !== "lamp");
            set({
              accessories: [...nonLamps, product],
              selectedPreviewItem: product.id,
            });
          } else {
            // Plants or others
            const catCount = accessories.filter((item) => item.category === product.category).length;
            if (product.category === "plant" && catCount >= 3) return; // limit to 3
            
            set({
              accessories: [...accessories, product],
              selectedPreviewItem: product.id,
            });
          }
        }
      },

      addAccessory: (product) => {
        const { accessories } = get();
        const catCount = accessories.filter((item) => item.category === product.category).length;
        const limit = (product.category === "monitor" || product.category === "plant") ? 3 : 1;
        
        if (catCount < limit) {
          set({ accessories: [...accessories, product], selectedPreviewItem: product.id });
        }
      },

      removeAccessory: (productId) => {
        const { accessories } = get();
        const index = accessories.findLastIndex((item) => item.id === productId);
        if (index !== -1) {
          const newAcc = [...accessories];
          newAcc.splice(index, 1);
          set({
            accessories: newAcc,
            selectedPreviewItem: null,
          });
        }
      },

      hasAccessory: (productId) => {
        return get().accessories.some((item) => item.id === productId);
      },

      getAccessoryCount: (productId: string) => {
        return get().accessories.filter((item) => item.id === productId).length;
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
