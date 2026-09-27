"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Download, MessageSquare, MapPin, Calendar, Sparkles } from "lucide-react";
import { ConfirmedOrder } from "@/types/workspace";
import { formatPrice } from "@/lib/workspace";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  order: ConfirmedOrder | null;
}

export function ConfirmationDialog({ isOpen, onClose, order }: ConfirmationDialogProps) {
  useEffect(() => {
    if (isOpen) {
      // Fire celebration confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#10B981", "#3B82F6", "#F59E0B", "#8B5CF6"],
        });
      } catch {
        // Fallback silently if canvas is unavailable
      }
    }
  }, [isOpen]);

  if (!order) return null;

  const handleDownloadReceipt = () => {
    const textContent = `
========================================
       MONIS.RENT — WORKSPACE SETUP
========================================
Order Reference: ${order.orderId}
Date: ${new Date(order.createdAt).toLocaleDateString()}
Duration: ${order.duration} Months Lease
Monthly Total: ${formatPrice(order.monthlyTotal)} / month

FURNITURE & ACCESSORIES:
----------------------------------------
- Desk: ${order.items.desk ? `${order.items.desk.name} (${formatPrice(order.items.desk.pricePerMonth)}/mo)` : "None"}
- Chair: ${order.items.chair ? `${order.items.chair.name} (${formatPrice(order.items.chair.pricePerMonth)}/mo)` : "None"}
${order.items.accessories.map((acc) => `- Accessory: ${acc.name} (${formatPrice(acc.pricePerMonth)}/mo)`).join("\n")}

DELIVERY DETAILS (BALI):
----------------------------------------
Recipient: ${order.deliveryDetails.fullName}
WhatsApp: ${order.deliveryDetails.whatsapp}
Email: ${order.deliveryDetails.email}
Area: ${order.deliveryDetails.area}
Address: ${order.deliveryDetails.address}
Requested Delivery Date: ${order.deliveryDetails.startDate}
${order.deliveryDetails.notes ? `Notes: ${order.deliveryDetails.notes}\n` : ""}
TERMS & SETUP:
----------------------------------------
- Free white-glove villa delivery & setup
- €0 deposit with verified nomad ID
- Free equipment maintenance & swaps

Thank you for choosing monis.rent!
Support: hello@monis.rent | WhatsApp: +62 812 3456 7890
========================================
    `.trim();

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `monis-rent-order-${order.orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center sm:text-center pt-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3 shadow-xs">
            <CheckCircle2 className="w-7 h-7 stroke-[2.2]" />
          </div>

          <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
            Your workspace is ready.
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto leading-relaxed">
            Someone from <strong className="text-foreground">monis.rent</strong> will contact you
            on WhatsApp to finalize delivery to your villa in Bali.
          </DialogDescription>
        </DialogHeader>

        {/* Order Reference Badge & Highlights */}
        <div className="my-2 p-3.5 bg-muted/40 rounded-xl border border-border/70 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Order Reference:</span>
            <Badge variant="outline" className="font-mono text-xs font-semibold bg-background">
              {order.orderId}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Monthly Total:</span>
            <span className="text-sm font-bold text-foreground">
              {formatPrice(order.monthlyTotal)} / mo
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Lease Commitment:</span>
            <span className="font-medium text-foreground">{order.duration} Months</span>
          </div>

          <Separator className="bg-border/60" />

          {/* Delivery Recap */}
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center gap-2 text-foreground font-medium">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                {order.deliveryDetails.area} • {order.deliveryDetails.address}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>Target Delivery: {order.deliveryDetails.startDate}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageSquare className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Contact via WhatsApp: {order.deliveryDetails.whatsapp}</span>
            </div>
          </div>
        </div>

        {/* Next Steps for Digital Nomad */}
        <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-500/20 text-[11px] text-emerald-900 dark:text-emerald-300 space-y-1">
          <div className="font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>What happens next?</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Our local Bali operations team coordinates fast villa delivery, complete assembly, and
            cable management. You test everything before accepting!
          </p>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 mt-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleDownloadReceipt}
            className="w-full sm:w-auto text-xs font-medium cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Download Summary
          </Button>

          <Button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
