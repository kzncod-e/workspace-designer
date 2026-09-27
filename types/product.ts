export type ProductCategory =
  | "desk"
  | "chair"
  | "monitor"
  | "lamp"
  | "plant"
  | "keyboard"
  | "speaker"
  | "laptop-stand"
  | "desk-pad";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subtitle: string;
  description: string;
  pricePerMonth: number;
  dimensions?: string;
  material?: string;
  colorName?: string;
  colorHex?: string;
  badge?: string;
  features: string[];
  image: string;
  previewId: string;
  popular?: boolean;
}

export interface PresetTemplate {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  tag: string;
  deskId: string;
  chairId: string;
  accessoryIds: string[];
  recommendedFor: string;
}
