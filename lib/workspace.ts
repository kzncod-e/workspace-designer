import { Product, ProductCategory } from "@/types/product";
import { RentalDuration } from "@/types/workspace";
import { PRODUCTS, PRESET_TEMPLATES } from "@/data/products";

export const STORAGE_KEY = "monis_workspace_setup_v1";

export const DURATION_DISCOUNTS: Record<RentalDuration, { discountPercent: number; label: string; tag?: string }> = {
  1: { discountPercent: 0, label: "1 Month (Flex)" },
  3: { discountPercent: 5, label: "3 Months (Standard)", tag: "5% OFF" },
  6: { discountPercent: 10, label: "6 Months (Popular)", tag: "10% OFF" },
  12: { discountPercent: 15, label: "12 Months (Best Value)", tag: "15% OFF" },
};

export function calculateBaseMonthlyTotal(
  desk: Product | null,
  chair: Product | null,
  accessories: Product[]
): number {
  let total = 0;
  if (desk) total += desk.pricePerMonth;
  if (chair) total += chair.pricePerMonth;
  accessories.forEach((item) => {
    total += item.pricePerMonth;
  });
  return total;
}

export function calculateDiscountedMonthlyTotal(
  baseTotal: number,
  duration: RentalDuration
): number {
  const discount = DURATION_DISCOUNTS[duration]?.discountPercent || 0;
  if (discount <= 0) return baseTotal;
  const discounted = baseTotal * (1 - discount / 100);
  return Math.round(discounted);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getPresetById(id: string) {
  return PRESET_TEMPLATES.find((p) => p.id === id);
}

export function generateOrderReference(): string {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `MN-BALI-${randomSuffix}`;
}

export function formatPrice(priceInEuros: number): string {
  return `€${priceInEuros}`;
}
