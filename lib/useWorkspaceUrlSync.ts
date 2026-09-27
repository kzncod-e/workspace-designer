"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useWorkspaceStore } from "./store";
import { PRODUCTS } from "@/data/products";

export function useWorkspaceUrlSync() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isInitialized, setIsInitialized] = useState(false);
  
  const { desk, chair, accessories, isHydrated, selectDesk, selectChair, addAccessory, clearWorkspace } = useWorkspaceStore();

  // Load from URL on mount
  useEffect(() => {
    if (!isHydrated || isInitialized) return;

    const d = searchParams.get("d");
    const c = searchParams.get("c");
    const a = searchParams.get("a");

    if (d || c || a) {
      clearWorkspace();
      
      if (d) {
        const deskProduct = PRODUCTS.find((p) => p.id === d);
        if (deskProduct) selectDesk(deskProduct);
      }
      
      if (c) {
        const chairProduct = PRODUCTS.find((p) => p.id === c);
        if (chairProduct) selectChair(chairProduct);
      }
      
      if (a) {
        const accessoryIds = a.split(",");
        accessoryIds.forEach((id) => {
          const acc = PRODUCTS.find((p) => p.id === id);
          if (acc) addAccessory(acc);
        });
      }
    }
    
    setIsInitialized(true);
  }, [searchParams, isHydrated, isInitialized, selectDesk, selectChair, addAccessory, clearWorkspace]);

  // Sync to URL when state changes
  useEffect(() => {
    if (!isInitialized) return;

    const params = new URLSearchParams(searchParams.toString());
    
    let changed = false;
    
    if (desk) {
      if (params.get("d") !== desk.id) { params.set("d", desk.id); changed = true; }
    } else {
      if (params.has("d")) { params.delete("d"); changed = true; }
    }
    
    if (chair) {
      if (params.get("c") !== chair.id) { params.set("c", chair.id); changed = true; }
    } else {
      if (params.has("c")) { params.delete("c"); changed = true; }
    }
    
    if (accessories.length > 0) {
      const aVal = accessories.map(a => a.id).join(",");
      if (params.get("a") !== aVal) { params.set("a", aVal); changed = true; }
    } else {
      if (params.has("a")) { params.delete("a"); changed = true; }
    }

    if (changed) {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [desk, chair, accessories, isInitialized, pathname, router, searchParams]);
}
