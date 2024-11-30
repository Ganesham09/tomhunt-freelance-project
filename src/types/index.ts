export interface Product {
  id: string;
  imei: string;
  model: string;
  brand: string;
  purchaseDate: string;
  price: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  insuranceType: "body" | "screen" | "back" | "full";
  productImages: string[];
  additionalDetails?: string;
}

export interface Claim {
  id: string;
  productId: string;
  dateSubmitted: string;
  status: "pending" | "approved" | "rejected" | "completed";
  description: string;
  repairDetails?: string;
}

export interface User {
  id: string;
  email: string;
  storeName: string;
  storeAddress: string;
}
