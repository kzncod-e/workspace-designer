"use client";

import React from "react";
import { motion } from "motion/react";
import { Product } from "@/types/product";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Minus } from "lucide-react";
import { formatPrice } from "@/lib/workspace";

interface AccessoryCardProps {
  accessory: Product;
  quantity: number;
  onToggle: () => void;
  onAdd?: () => void;
  onRemove?: () => void;
}

export function AccessoryCard({ accessory, quantity, onToggle, onAdd, onRemove }: AccessoryCardProps) {
  const isSelected = quantity > 0;
  
  // Decide if we should show a quantity stepper or just a toggle based on category
  const allowMultiple = accessory.category === "monitor" || accessory.category === "plant";
  const limit = allowMultiple ? 3 : 1;
  const isAtLimit = quantity >= limit;

  return (
    <motion.div
      whileHover={{ y: -1.5 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.16 }}
    >
      <Card
        onClick={() => !allowMultiple && onToggle()}
        className={`cursor-pointer transition-all duration-200 border p-3.5 relative overflow-hidden ${
          isSelected
            ? "border-emerald-600 dark:border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs bg-emerald-50/15 dark:bg-emerald-950/20"
            : "border-border/80 hover:border-border hover:shadow-xs bg-card"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          {/* Checkbox and Info */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="pt-0.5" onClick={(e) => {
              if (allowMultiple) e.stopPropagation(); // prevent card click from toggling if multiple
            }}>
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => !allowMultiple ? onToggle() : (isSelected ? onRemove?.() : onAdd?.())}
                className={`transition-colors ${
                  isSelected
                    ? "data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                    : ""
                }`}
                aria-label={`Toggle ${accessory.name}`}
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm font-semibold text-foreground tracking-tight truncate">
                  {accessory.name}
                </span>
                {accessory.badge && (
                  <Badge
                    variant={isSelected ? "default" : "secondary"}
                    className={`text-[9px] px-1.5 py-0 h-4 font-normal ${
                      isSelected
                        ? "bg-emerald-600 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {accessory.badge}
                  </Badge>
                )}
                {quantity > 1 && (
                  <Badge
                    className="bg-emerald-600 text-white text-[9px] px-1.5 py-0 h-4"
                  >
                    x{quantity}
                  </Badge>
                )}
              </div>

              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                {accessory.subtitle}
              </p>

              <p className="text-[11px] text-muted-foreground/80 mt-1 line-clamp-2 leading-relaxed">
                {accessory.description}
              </p>
            </div>
          </div>

          {/* Price and Action Button */}
          <div className="flex flex-col items-end shrink-0 pl-2">
            <div className="text-right mb-2">
              <span className="text-base font-bold text-foreground">
                +{formatPrice(accessory.pricePerMonth)}
              </span>
              <span className="text-[10px] text-muted-foreground block -mt-0.5">/ mo</span>
            </div>

            {allowMultiple ? (
              <div className="flex items-center gap-1.5 bg-secondary/50 rounded-lg p-0.5" onClick={e => e.stopPropagation()}>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 rounded-md disabled:opacity-50"
                  disabled={quantity === 0}
                  onClick={onRemove}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="text-xs font-semibold w-3 text-center">{quantity}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 rounded-md disabled:opacity-50"
                  disabled={isAtLimit}
                  onClick={onAdd}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                size="sm"
                variant={isSelected ? "outline" : "secondary"}
                className={`h-7 px-2.5 text-[11px] font-medium transition-colors ${
                  isSelected
                    ? "border-emerald-600 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100/50"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                onClick={e => { e.stopPropagation(); onToggle(); }}
              >
                <span className="flex items-center gap-1">
                  {isSelected ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  <span>{isSelected ? "Remove" : "Add"}</span>
                </span>
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
