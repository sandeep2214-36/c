import React from "react";

interface OfferRow {
  storeName: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  deliveryInfo?: string;
  availability: boolean;
  productUrl: string;
}

export function PriceComparisonTable({ offers }: { offers: OfferRow[] }) {
  const lowestPrice = Math.min(...offers.map((o) => o.price));

  return (
    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
      <table className="w-full text-left border-collapse bg-white text-sm">
        <thead className="bg-gray-50 text-gray-700 uppercase font-semibold text-xs border-b">
          <tr>
            <th className="px-6 py-4">Store</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Rating</th>
            <th className="px-6 py-4">Delivery</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {offers.map((offer, index) => {
            const isLowest = offer.price === lowestPrice;
            return (
              <tr key={index} className={isLowest ? "bg-emerald-50/50" : "hover:bg-gray-50"}>
                <td className="px-6 py-4 font-medium text-gray-900">{offer.storeName}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className={`font-bold text-base ${isLowest ? "text-emerald-600" : "text-gray-900"}`}>
                      ₹{offer.price.toLocaleString("en-IN")}
                    </span>
                    {isLowest && (
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-0.5 rounded">
                        Best Price
                      </span>
                    )}
                  </div>
                  {offer.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹{offer.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-600">★ {offer.rating || "N/A"}</td>
                <td className="px-6 py-4 text-gray-600">{offer.deliveryInfo || "Standard"}</td>
                <td className="px-6 py-4">
                  {offer.availability ? (
                    <span className="text-green-600 font-medium">In Stock</span>
                  ) : (
                    <span className="text-red-500 font-medium">Out of Stock</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    href={offer.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md font-medium text-xs hover:bg-indigo-700 transition"
                  >
                    View Deal
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
