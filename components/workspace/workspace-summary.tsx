"use client";

import React from "react";
import { useWorkspaceStore } from "@/lib/store";
import {
  calculateBaseMonthlyTotal,
  calculateDiscountedMonthlyTotal,
  DURATION_DISCOUNTS,
  formatPrice,
} from "@/lib/workspace";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { RentalDuration } from "@/types/workspace";

interface WorkspaceSummaryProps {
  onOpenCheckout: () => void;
}

export function WorkspaceSummary({ onOpenCheckout }: WorkspaceSummaryProps) {
  const {
    desk,
    chair,
    accessories,
    rentalDuration,
    setRentalDuration,
    clearWorkspace,
  } = useWorkspaceStore();

  const basePrice = calculateBaseMonthlyTotal(desk, chair, accessories);
  const finalPrice = calculateDiscountedMonthlyTotal(basePrice, rentalDuration);
  const discountInfo = DURATION_DISCOUNTS[rentalDuration];
  const monthlySavings = basePrice - finalPrice;

  const durations: RentalDuration[] = [1, 3, 6, 12];

  const isSetupComplete = Boolean(desk && chair);

  return (
    <Card className="border border-border/80 shadow-md bg-card/95 backdrop-blur-xs rounded-2xl overflow-hidden">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-foreground tracking-tight flex items-center gap-2">
            <span>Workspace Summary</span>
            {monthlySavings > 0 && (
              <Badge className="bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-medium px-2 py-0">
                Save {formatPrice(monthlySavings)}/mo
              </Badge>
            )}
          </CardTitle>

          {/* Reset Workspace Dialog Trigger */}
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Reset
                </Button>
              }
            />
            <AlertDialogContent className="max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle>Reset Workspace Configuration?</AlertDialogTitle>
                <AlertDialogDescription className="text-xs leading-relaxed">
                  This will remove your current desk, chair, and accessories. You can always
                  re-apply a preset setup anytime.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-xs">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={clearWorkspace}
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs"
                >
                  Yes, Clear Setup
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-0 space-y-4 text-xs">
        {/* Lease Duration Selector */}
        <div>
          <label className="text-[11px] font-medium text-muted-foreground block mb-2">
            Rental Lease Commitment:
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {durations.map((dur) => {
              const info = DURATION_DISCOUNTS[dur];
              const isSelected = rentalDuration === dur;
              return (
                <button
                  key={dur}
                  onClick={() => setRentalDuration(dur)}
                  className={`p-2 rounded-xl text-center border transition-all duration-180 flex flex-col items-center justify-center cursor-pointer ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-50/20 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300 font-semibold shadow-xs"
                      : "border-border/70 bg-muted/30 hover:border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="text-xs font-semibold">{dur} mo</span>
                  {info.discountPercent > 0 ? (
                    <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-medium">
                      -{info.discountPercent}%
                    </span>
                  ) : (
                    <span className="text-[9px] text-muted-foreground">flex</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <Separator className="bg-border/60" />

        {/* Selected Items Breakdown List */}
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {/* Desk Line */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 truncate max-w-[210px]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              <span className="text-foreground truncate">
                {desk ? desk.name : <em className="text-muted-foreground">No desk selected</em>}
              </span>
            </div>
            <span className="font-medium text-foreground shrink-0">
              {desk ? formatPrice(desk.pricePerMonth) : "€0"}
            </span>
          </div>

          {/* Chair Line */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 truncate max-w-[210px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-foreground truncate">
                {chair ? chair.name : <em className="text-muted-foreground">No chair selected</em>}
              </span>
            </div>
            <span className="font-medium text-foreground shrink-0">
              {chair ? formatPrice(chair.pricePerMonth) : "€0"}
            </span>
          </div>

          {/* Accessories Lines */}
          {Array.from(new Set(accessories.map(a => a.id))).map((id) => {
            const acc = accessories.find(a => a.id === id)!;
            const count = accessories.filter(a => a.id === id).length;
            
            return (
              <div key={id} className="flex items-center justify-between text-muted-foreground">
                <div className="flex items-center gap-1.5 truncate max-w-[210px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  <span className="truncate">{count > 1 ? `${count}x ` : ""}{acc.name}</span>
                </div>
                <span className="font-medium text-foreground shrink-0">
                  +{formatPrice(acc.pricePerMonth * count)}
                </span>
              </div>
            );
          })}

          {accessories.length === 0 && (
            <p className="text-[11px] text-muted-foreground italic py-1">
              No accessories added yet.
            </p>
          )}
        </div>

        <Separator className="bg-border/60" />

        {/* Subtotal & Discount Breakdown */}
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between text-muted-foreground">
            <span>Base Monthly Rental:</span>
            <span>{formatPrice(basePrice)}/mo</span>
          </div>

          {discountInfo.discountPercent > 0 && (
            <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-medium">
              <span>{discountInfo.label} Discount:</span>
              <span>-{formatPrice(monthlySavings)}/mo</span>
            </div>
          )}

          <div className="flex justify-between items-baseline pt-2 border-t border-border/40">
            <div>
              <span className="text-sm font-bold text-foreground">Monthly Total:</span>
              <span className="text-[10px] text-muted-foreground block">
                Billed monthly in Bali • Zero deposit
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-foreground tracking-tight">
                {formatPrice(finalPrice)}
              </span>
              <span className="text-xs text-muted-foreground font-medium"> / month</span>
            </div>
          </div>
        </div>

        {/* Bali Benefits Assurance */}
        <div className="p-3 bg-muted/40 rounded-xl space-y-1.5 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Free delivery &amp; white-glove setup in Bali</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Complimentary swaps &amp; technical maintenance</span>
          </div>
        </div>

        {/* Primary Checkout CTA */}
        <Button
          onClick={onOpenCheckout}
          disabled={!desk && !chair}
          className="w-full h-11 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all group cursor-pointer"
        >
          <span>Review Workspace Setup</span>
          <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
        </Button>

        {!isSetupComplete && (
          <p className="text-[10px] text-amber-600 dark:text-amber-400 text-center">
            * Please select both a desk and a chair for delivery eligibility.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
