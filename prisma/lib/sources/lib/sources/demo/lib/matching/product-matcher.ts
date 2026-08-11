import { NormalizedProduct } from "../sources/adapter.interface";

export class ProductMatcher {
  /**
   * Calculates similarity score (0 to 100) between two normalized products.
   */
  public static calculateSimilarity(prodA: NormalizedProduct, prodB: NormalizedProduct): number {
    let score = 0;

    // Brand check (strict/loose normalization)
    if (prodA.brand.trim().toLowerCase() === prodB.brand.trim().toLowerCase()) {
      score += 30;
    }

    // GTIN/UPC/EAN match is definitive
    if (prodA.gtin && prodB.gtin && prodA.gtin === prodB.gtin) {
      return 100;
    }

    // Model Number match
    if (prodA.modelNumber && prodB.modelNumber && prodA.modelNumber.toLowerCase() === prodB.modelNumber.toLowerCase()) {
      score += 40;
    } else if (prodA.model && prodB.model && prodA.model.toLowerCase() === prodB.model.toLowerCase()) {
      score += 25;
    }

    // Storage / RAM Attribute Match
    const specsA = prodA.specifications || {};
    const specsB = prodB.specifications || {};

    if (specsA["Storage"] && specsB["Storage"] && specsA["Storage"] === specsB["Storage"]) {
      score += 15;
    }

    if (specsA["RAM"] && specsB["RAM"] && specsA["RAM"] === specsB["RAM"]) {
      score += 15;
    }

    return Math.min(score, 100);
  }
}
