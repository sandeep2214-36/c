import { ProductSourceAdapter, NormalizedProduct } from "../adapter.interface";

export class DemoSourceAdapter implements ProductSourceAdapter {
  name = "Demo Retailer Store";
  slug = "demo-store";

  private mockDatabase: NormalizedProduct[] = [
    {
      title: "Apple iPhone 16 (128 GB) - Black",
      brand: "Apple",
      model: "iPhone 16",
      modelNumber: "MYE33HN/A",
      sku: "IPHONE16-128-BLK",
      gtin: "195949123456",
      category: "Mobiles",
      description: "Latest Apple iPhone 16 with A18 chip and Camera Control.",
      images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569"],
      specifications: {
        Display: "6.1-inch Super Retina XDR",
        Processor: "Apple A18",
        RAM: "8 GB",
        Storage: "128 GB",
        Camera: "48MP Fusion + 12MP Ultra Wide",
        Battery: "3561 mAh",
        OS: "iOS 18",
        Warranty: "1 Year Manufacturer Warranty"
      },
      offer: {
        sourceSlug: "demo-store",
        sellerlp: "AppStore Official",
        sellerName: "AppStore Direct",
        price: 69999,
        originalPrice: 79999,
        discount: 12,
        currency: "INR",
        availability: true,
        deliveryInfo: "Free Delivery by Tomorrow",
        rating: 4.7,
        reviewCount: 1420,
        productUrl: "https://example.com/product/iphone-16",
        affiliateUrl: "https://example.com/aff/iphone-16?tag=deal-21"
      }
    },
    {
      title: "Samsung Galaxy S25 5G (256 GB, 12 GB RAM) - Icy Blue",
      brand: "Samsung",
      model: "Galaxy S25",
      modelNumber: "SM-S931B",
      sku: "SGS25-256-BLU",
      gtin: "880609123456",
      category: "Mobiles",
      description: "Galaxy AI powered flagship smartphone by Samsung.",
      images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf"],
      specifications: {
        Display: "6.2-inch Dynamic AMOLED 2X, 120Hz",
        Processor: "Snapdragon 8 Elite",
        RAM: "12 GB",
        Storage: "256 GB",
        Camera: "50MP + 10MP + 12MP",
        Battery: "4000 mAh",
        OS: "Android 15",
        Warranty: "1 Year Local Warranty"
      },
      offer: {
        sourceSlug: "demo-store",
        sellerName: "Samsung Plaza",
        price: 74999,
        originalPrice: 85999,
        discount: 13,
        currency: "INR",
        availability: true,
        deliveryInfo: "Free 2-day Delivery",
        rating: 4.6,
        reviewCount: 890,
        productUrl: "https://example.com/product/galaxy-s25",
        affiliateUrl: "https://example.com/aff/galaxy-s25?tag=deal-21"
      }
    }
  ];

  async searchProducts(query: string): Promise<NormalizedProduct[]> {
    const q = query.toLowerCase();
    return this.mockDatabase.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  async getProductDetails(identifier: string): Promise<NormalizedProduct | null> {
    return this.mockDatabase.find((p) => p.sku === identifier || p.modelNumber === identifier) || null;
  }

  async getAvailability(identifier: string): Promise<boolean> {
    const p = await this.getProductDetails(identifier);
    return p ? p.offer.availability : false;
  }

  async getPrice(identifier: string): Promise<number | null> {
    const p = await this.getProductDetails(identifier);
    return p ? p.offer.price : null;
  }

  async getRating(identifier: string): Promise<{ rating?: number; reviewCount?: number }> {
    const p = await this.getProductDetails(identifier);
    return p ? { rating: p.offer.rating, reviewCount: p.offer.reviewCount } : {};
  }
}
