export interface NormalizedOffer {
  sourceSlug: string;
  sellerName: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  currency: string;
  availability: boolean;
  deliveryInfo?: string;
  rating?: number;
  reviewCount?: number;
  productUrl: string;
  affiliateUrl?: string;
}

export interface NormalizedProduct {
  title: string;
  brand: string;
  model?: string;
  modelNumber?: string;
  sku?: string;
  gtin?: string;
  category: string;
  description?: string;
  images: string[];
  specifications: Record<string, string>;
  variants?: {
    name: string;
    storage?: string;
    ram?: string;
    color?: string;
  }[];
  offer: NormalizedOffer;
}

export interface ProductSourceAdapter {
  name: string;
  slug: string;
  searchProducts(query: string): Promise<NormalizedProduct[]>;
  getProductDetails(identifier: string): Promise<NormalizedProduct | null>;
  getAvailability(identifier: string): Promise<boolean>;
  getPrice(identifier: string): Promise<number | null>;
  getRating(identifier: string): Promise<{ rating?: number; reviewCount?: number }>;
}
