export interface ScoringWeights {
  priceWeight: number;      // default 0.40
  ratingWeight: number;     // default 0.20
  reviewsWeight: number;    // default 0.15
  discountWeight: number;   // default 0.10
  deliveryWeight: number;   // default 0.10
  warrantyWeight: number;   // default 0.05
}

export const DEFAULT_WEIGHTS: ScoringWeights = {
  priceWeight: 0.40,
  ratingWeight: 0.20,
  reviewsWeight: 0.15,
  discountWeight: 0.10,
  deliveryWeight: 0.10,
  warrantyWeight: 0.05
};

export class DealScoringEngine {
  public static calculateDealScore(
    offer: { price: number; originalPrice?: number; rating?: number; reviewCount?: number; deliveryInfo?: string; warranty?: string },
    minPrice: number,
    maxPrice: number,
    weights: ScoringWeights = DEFAULT_WEIGHTS
  ): number {
    // 1. Price normalization (lower price gets higher score)
    let priceScore = 100;
    if (maxPrice > minPrice) {
      priceScore = 100 * (1 - (offer.price - minPrice) / (maxPrice - minPrice));
    }

    // 2. Rating score (out of 5 converted to 100)
    const ratingScore = ((offer.rating || 3.0) / 5.0) * 100;

    // 3. Review count score (logarithmic or capped scale)
    const reviewScore = Math.min(100, ((offer.reviewCount || 0) / 1000) * 100);

    // 4. Discount score
    const discountScore = Math.min(100, (offer.discount || 0) * 2);

    // 5. Delivery score (fast/free delivery boosts score)
    let deliveryScore = 50;
    if (offer.deliveryInfo && offer.deliveryInfo.toLowerCase().includes("free")) {
      deliveryScore = 100;
    }

    // 6. Warranty score
    const warrantyScore = offer.warranty ? 100 : 50;

    const finalScore =
      priceScore * weights.priceWeight +
      ratingScore * weights.ratingWeight +
      reviewScore * weights.reviewsWeight +
      discountScore * weights.discountWeight +
      deliveryScore * weights.deliveryWeight +
      warrantyScore * weights.warrantyWeight;

    return Math.round(finalScore * 100) / 100;
  }
}
