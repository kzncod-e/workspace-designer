"use client";

import React from "react";
import { motion } from "motion/react";
import { Product } from "@/types/product";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";
import { formatPrice } from "@/lib/workspace";

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: () => void;
}

export function ProductCard({ product, isSelected, onSelect }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="h-full"
    >
      <Card
        onClick={onSelect}
        className={`h-full flex flex-col justify-between cursor-pointer transition-all duration-200 relative overflow-hidden border ${
          isSelected
            ? "border-emerald-600 dark:border-emerald-500 ring-2 ring-emerald-500/20 shadow-md bg-emerald-50/15 dark:bg-emerald-950/15"
            : "border-border/80 hover:border-border hover:shadow-xs bg-card"
        }`}
      >
        {/* Selected Accent Ribbon or Badge */}
        {isSelected && (
          <div className="absolute top-0 right-0">
            <div className="bg-emerald-600 text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-bl-lg shadow-xs flex items-center gap-1">
              <Check className="w-3 h-3 stroke-[3]" />
              <span>Selected</span>
            </div>
          </div>
        )}

        <CardHeader className="p-4 pb-2">
          <div className="flex items-start justify-between gap-2 pr-16">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                {product.badge && (
                  <Badge
                    variant={isSelected ? "default" : "secondary"}
                    className={`text-[10px] font-medium px-2 py-0 h-5 ${
                      isSelected
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {product.badge}
                  </Badge>
                )}
                {product.popular && !product.badge && (
                  <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-300">
                    Popular
                  </Badge>
                )}
              </div>
              <CardTitle className="text-base font-semibold text-foreground tracking-tight">
                {product.name}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                {product.subtitle}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-1 pb-3 text-xs flex-1">
          {/* Price display */}
          <div className="my-2.5 flex items-baseline gap-1">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              {formatPrice(product.pricePerMonth)}
            </span>
            <span className="text-xs text-muted-foreground font-medium">/ month</span>
          </div>

          <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-3">
            {product.description}
          </p>

          {/* Key Specs / Highlights */}
          <div className="space-y-1 pt-2 border-t border-border/50 text-[11px] text-muted-foreground">
            {product.dimensions && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground/80">Dimensions:</span>
                <span className="font-medium text-foreground">{product.dimensions}</span>
              </div>
            )}
            {product.material && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground/80">Material:</span>
                <span className="font-medium text-foreground truncate max-w-[170px]">
                  {product.material}
                </span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            type="button"
            variant={isSelected ? "default" : "outline"}
            className={`w-full text-xs font-medium h-9 transition-colors cursor-pointer ${
              isSelected
                ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                : "border-border/80 hover:bg-muted text-foreground"
            }`}
          >
            {isSelected ? (
              <span className="flex items-center gap-1.5 font-semibold">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                Selected in Setup
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" />
                Select {product.category === "desk" ? "Desk" : "Chair"}
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
