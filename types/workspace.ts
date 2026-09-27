import { Product, ProductCategory } from "./product";

export type LightingMode = "daylight" | "sunset" | "midnight";

export type RentalDuration = 1 | 3 | 6 | 12;

export interface WorkspaceState {
  desk: Product | null;
  chair: Product | null;
  accessories: Product[];
  rentalDuration: RentalDuration;
  lightingMode: LightingMode;
  activeCategory: ProductCategory;
  selectedPreviewItem: string | null;
}

export interface DeliveryDetails {
  fullName: string;
  email: string;
  whatsapp: string;
  area: "Canggu" | "Seminyak" | "Pererenan" | "Ubud" | "Sanur" | "Uluwatu" | "Other";
  address: string;
  startDate: string;
  notes?: string;
}

export interface ConfirmedOrder {
  orderId: string;
  createdAt: string;
  items: {
    desk: Product | null;
    chair: Product | null;
    accessories: Product[];
  };
  duration: RentalDuration;
  monthlyTotal: number;
  deliveryDetails: DeliveryDetails;
}
