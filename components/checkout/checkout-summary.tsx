"use client";

import React, { useState } from "react";
import { useWorkspaceStore } from "@/lib/store";
import {
  calculateBaseMonthlyTotal,
  calculateDiscountedMonthlyTotal,
  DURATION_DISCOUNTS,
  formatPrice,
  generateOrderReference,
} from "@/lib/workspace";
import { ConfirmedOrder, DeliveryDetails } from "@/types/workspace";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, MapPin, AlertCircle } from "lucide-react";

interface CheckoutSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderConfirmed: (order: ConfirmedOrder) => void;
}

export function CheckoutSummary({
  isOpen,
  onClose,
  onOrderConfirmed,
}: CheckoutSummaryProps) {
  const {
    desk,
    chair,
    accessories,
    rentalDuration,
    removeAccessory,
  } = useWorkspaceStore();

  const basePrice = calculateBaseMonthlyTotal(desk, chair, accessories);
  const finalPrice = calculateDiscountedMonthlyTotal(basePrice, rentalDuration);
  const discountInfo = DURATION_DISCOUNTS[rentalDuration];
  const monthlySavings = basePrice - finalPrice;

  // Tomorrow's date formatted as default delivery
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 2);
  const defaultDateStr = defaultDate.toISOString().split("T")[0];

  const [form, setForm] = useState<DeliveryDetails>({
    fullName: "Alex Rivera",
    email: "alex@startup.io",
    whatsapp: "+62 812 3456 7890",
    area: "Canggu",
    address: "Villa Frangipani, Jalan Batu Bolong No. 42",
    startDate: defaultDateStr,
    notes: "Ring bell at front gate; ground floor studio office.",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desk && !chair) {
      setErrorMessage("Please select at least a desk or chair before renting.");
      return;
    }
    if (!form.fullName.trim() || !form.whatsapp.trim() || !form.address.trim()) {
      setErrorMessage("Please fill in your name, WhatsApp number, and Bali villa address.");
      return;
    }

    const order: ConfirmedOrder = {
      orderId: generateOrderReference(),
      createdAt: new Date().toISOString(),
      items: {
        desk,
        chair,
        accessories,
      },
      duration: rentalDuration,
      monthlyTotal: finalPrice,
      deliveryDetails: form,
    };

    onOrderConfirmed(order);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl overflow-y-auto flex flex-col justify-between p-6"
      >
        <div>
          <SheetHeader className="text-left pb-4 border-b border-border/60">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-bold text-foreground">
                Your Workspace Setup
              </SheetTitle>
              <Badge className="bg-emerald-600 text-white text-xs font-medium">
                {rentalDuration} Mo Lease
              </Badge>
            </div>
            <SheetDescription className="text-xs text-muted-foreground">
              Review your customized furniture and accessories before delivery in Bali.
            </SheetDescription>
          </SheetHeader>

          {/* ITEM REVIEW SECTION */}
          <div className="py-4 space-y-4">
            <h4 className="text-xs font-semibold text-foreground tracking-wider uppercase">
              Selected Equipment ({[desk, chair, ...accessories].filter(Boolean).length} items)
            </h4>

            <div className="space-y-2.5">
              {/* Desk */}
              {desk && (
                <div className="p-3 rounded-xl border border-border/70 bg-card flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="font-semibold text-foreground">{desk.name}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {desk.dimensions || desk.subtitle}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-foreground">
                      {formatPrice(desk.pricePerMonth)}
                    </span>
                    <span className="text-[10px] text-muted-foreground block">/ month</span>
                  </div>
                </div>
              )}

              {/* Chair */}
              {chair && (
                <div className="p-3 rounded-xl border border-border/70 bg-card flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-semibold text-foreground">{chair.name}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {chair.material || chair.subtitle}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-foreground">
                      {formatPrice(chair.pricePerMonth)}
                    </span>
                    <span className="text-[10px] text-muted-foreground block">/ month</span>
                  </div>
                </div>
              )}

              {/* Accessories */}
              {Array.from(new Set(accessories.map(a => a.id))).map((id) => {
                const item = accessories.find(a => a.id === id)!;
                const count = accessories.filter(a => a.id === id).length;
                
                return (
                  <div
                    key={id}
                    className="p-3 rounded-xl border border-border/70 bg-card flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => removeAccessory(id)}
                        className="text-muted-foreground hover:text-destructive p-1 rounded-md transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div>
                        <span className="font-medium text-foreground">{count > 1 ? `${count}x ` : ""}{item.name}</span>
                        <p className="text-[10px] text-muted-foreground">{item.subtitle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-foreground">
                        +{formatPrice(item.pricePerMonth * count)}
                      </span>
                      <span className="text-[10px] text-muted-foreground block">/ month</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <Separator className="my-4 bg-border/60" />

            {/* PRICING BREAKDOWN */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Standard Monthly Total:</span>
                <span>{formatPrice(basePrice)}/mo</span>
              </div>
              {discountInfo.discountPercent > 0 && (
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-medium">
                  <span>Commitment Savings ({discountInfo.tag}):</span>
                  <span>-{formatPrice(monthlySavings)}/mo</span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-2 border-t border-border/60">
                <span className="text-sm font-bold text-foreground">Total Monthly Rental:</span>
                <div className="text-right">
                  <span className="text-2xl font-black text-foreground">
                    {formatPrice(finalPrice)}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium"> / mo</span>
                </div>
              </div>
            </div>

            <Separator className="my-4 bg-border/60" />

            {/* DELIVERY INFORMATION FORM (BALI) */}
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-3.5 pt-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-foreground tracking-wider uppercase flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Bali Delivery Details</span>
                </h4>
                <span className="text-[10px] text-muted-foreground">Free Island Delivery</span>
              </div>

              {errorMessage && (
                <div className="p-2.5 rounded-lg bg-destructive/10 text-destructive text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <Label htmlFor="fullName" className="text-[11px]">Full Name</Label>
                  <Input
                    id="fullName"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="e.g. Alex Rivera"
                    required
                    className="h-9 text-xs mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="whatsapp" className="text-[11px]">WhatsApp Number</Label>
                  <Input
                    id="whatsapp"
                    value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    placeholder="+62 812 3456 7890"
                    required
                    className="h-9 text-xs mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <Label htmlFor="email" className="text-[11px]">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="alex@startup.io"
                    required
                    className="h-9 text-xs mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="area" className="text-[11px]">Bali Area</Label>
                  <select
                    id="area"
                    value={form.area}
                    onChange={(e) =>
                      setForm({ ...form, area: e.target.value as DeliveryDetails["area"] })
                    }
                    className="w-full h-9 mt-1 rounded-md border border-input bg-transparent px-3 text-xs shadow-xs focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="Canggu">Canggu</option>
                    <option value="Pererenan">Pererenan</option>
                    <option value="Seminyak">Seminyak</option>
                    <option value="Ubud">Ubud</option>
                    <option value="Sanur">Sanur</option>
                    <option value="Uluwatu">Uluwatu</option>
                    <option value="Other">Other Bali Location</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="text-[11px]">Villa / Co-Working Address</Label>
                <Input
                  id="address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Villa name, street, house number"
                  required
                  className="h-9 text-xs mt-1"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <Label htmlFor="startDate" className="text-[11px]">Preferred Delivery Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    required
                    className="h-9 text-xs mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="notes" className="text-[11px]">Gate / Access Notes</Label>
                  <Input
                    id="notes"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="e.g. Ground floor villa"
                    className="h-9 text-xs mt-1"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* BOTTOM ACTION */}
        <SheetFooter className="pt-4 border-t border-border/60">
          <Button
            type="submit"
            form="checkout-form"
            className="w-full h-11 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all cursor-pointer"
          >
            <span>Rent This Workspace — {formatPrice(finalPrice)}/mo</span>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
