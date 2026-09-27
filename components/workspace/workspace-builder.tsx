"use client";

import React, { useState } from "react";
import { useWorkspaceStore } from "@/lib/store";
import { WorkspacePreview } from "./workspace-preview";
import { ProductSelector } from "@/components/products/product-selector";
import { WorkspaceSummary } from "./workspace-summary";
import { CheckoutSummary } from "@/components/checkout/checkout-summary";
import { ConfirmationDialog } from "@/components/checkout/confirmation-dialog";
import { ConfirmedOrder } from "@/types/workspace";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  calculateBaseMonthlyTotal,
  calculateDiscountedMonthlyTotal,
  formatPrice,
} from "@/lib/workspace";
import {
  ArrowRight,
  Shield,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export function WorkspaceBuilder() {
  const { desk, chair, accessories, rentalDuration } = useWorkspaceStore();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const basePrice = calculateBaseMonthlyTotal(desk, chair, accessories);
  const finalPrice = calculateDiscountedMonthlyTotal(basePrice, rentalDuration);

  const handleOrderConfirmed = (order: ConfirmedOrder) => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(order);
    setIsConfirmationOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      {/* 1. TOP NAVIGATION / PRODUCT HEADER */}
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/85 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-sm shadow-emerald-500/20">
              m
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-foreground">
                  monis<span className="text-emerald-600 font-extrabold">.rent</span>
                </span>
                <Badge
                  variant="outline"
                  className="hidden sm:inline-flex text-[10px] font-medium border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/40 px-2 py-0"
                >
                  Workspace Designer
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground hidden sm:block">
                Curated office equipment rentals for nomads &amp; startups in Bali
              </p>
            </div>
          </div>

          {/* Header Right: Bali Location Guarantee & Quick Review CTA */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border border-border/60">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Bali: Canggu, Ubud, Seminyak</span>
            </div>

            <Button
              onClick={() => setIsCheckoutOpen(true)}
              disabled={!desk && !chair}
              className="h-9 px-4 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer"
            >
              <span>Review Setup</span>
              <span className="hidden sm:inline ml-1">({formatPrice(finalPrice)}/mo)</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </header>

      {/* 2. MAIN APPLICATION WORKSPACE CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Intro Subtitle Bar */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
                Interactive Configurator
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">Zero Deposit • Flexible Terms</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Build Your Workspace
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
              Choose your desk, chair, monitors, and accessories. Watch your setup update instantly
              with real-time Bali delivery pricing.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground bg-card p-2 rounded-xl border border-border/80 shadow-xs shrink-0">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Free Delivery</span>
            </div>
            <div className="w-px h-3 bg-border" />
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Full Assembly</span>
            </div>
          </div>
        </div>

        {/* 3. DUAL-COLUMN LAYOUT: CONFIGURATOR (LEFT) & STICKY LIVE PREVIEW (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Product Catalog, Categorized Tabs & Controls (7 Cols on desktop) */}
          <div className="lg:col-span-7 order-2 lg:order-1 space-y-6">
            <ProductSelector />
          </div>

          {/* RIGHT COLUMN: Sticky Live Preview & Pricing Summary (5 Cols on desktop) */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-5 lg:sticky lg:top-24">
            {/* Visual Centerpiece: Interactive Layered Preview */}
            <WorkspacePreview />

            {/* Pricing Summary Card */}
            <WorkspaceSummary onOpenCheckout={() => setIsCheckoutOpen(true)} />
          </div>
        </div>
      </main>

      {/* 4. MOBILE FLOATING ACTION BAR (STICKY BOTTOM) */}
      <div className="lg:hidden sticky bottom-0 z-30 p-3 bg-background/95 backdrop-blur-md border-t border-border/80 shadow-lg">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div>
            <span className="text-[10px] text-muted-foreground block">Workspace Total</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-foreground">
                {formatPrice(finalPrice)}
              </span>
              <span className="text-xs text-muted-foreground">/ month</span>
            </div>
          </div>

          <Button
            onClick={() => setIsCheckoutOpen(true)}
            disabled={!desk && !chair}
            className="h-10 px-5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer"
          >
            <span>Review &amp; Rent</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </div>

      {/* 5. FOOTER */}
      <footer className="mt-16 border-t border-border/60 bg-muted/20 py-8 text-xs text-muted-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">monis.rent</span>
            <span>—</span>
            <span>Office equipment rentals for digital nomads &amp; startups in Bali</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Canggu</span>
            <span>•</span>
            <span>Seminyak</span>
            <span>•</span>
            <span>Pererenan</span>
            <span>•</span>
            <span>Ubud</span>
            <span>•</span>
            <span>Sanur</span>
          </div>
        </div>
      </footer>

      {/* 6. MODALS & SHEETS */}
      <CheckoutSummary
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderConfirmed={handleOrderConfirmed}
      />

      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        order={confirmedOrder}
      />
    </div>
  );
}
