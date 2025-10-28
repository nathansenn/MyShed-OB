'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PricingMatrix {
  id: string;
  width: number;
  depth: number;
  material: string;
  basePrice: number;
  sku: string;
}

interface BuildingStyle {
  id: string;
  name: string;
  myshedCatalogCode: string;
  description: string;
  images: string;
  pricingMatrix: PricingMatrix[];
}

export default function BuildingStyleDetailPage({
  params,
}: {
  params: Promise<{ clientId: string; styleId: string }>;
}) {
  const router = useRouter();
  const { clientId, styleId } = use(params);
  const [style, setStyle] = useState<BuildingStyle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBuildingStyle();
  }, [styleId]);

  const fetchBuildingStyle = async () => {
    try {
      const response = await fetch(
        `/api/clients/${clientId}/building-styles/${styleId}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch building style');
      }
      const data = await response.json();
      setStyle(data);
    } catch (error) {
      console.error('Error fetching building style:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  if (!style) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Building Style Not Found
          </h2>
          <p className="text-red-600 mb-4">
            The building style you're looking for doesn't exist.
          </p>
          <Link
            href={`/client/${clientId}/building-styles`}
            className="text-myshed-primary hover:underline"
          >
            ← Back to Building Styles
          </Link>
        </div>
      </div>
    );
  }

  const images = style.images ? JSON.parse(style.images) : [];

  // Group pricing by material
  const groupedPricing = style.pricingMatrix.reduce((acc, price) => {
    if (!acc[price.material]) {
      acc[price.material] = [];
    }
    acc[price.material].push(price);
    return acc;
  }, {} as Record<string, PricingMatrix[]>);

  // Get unique widths and depths for table headers
  const allWidths = [...new Set(style.pricingMatrix.map((p) => p.width))].sort(
    (a, b) => a - b
  );
  const allDepths = [...new Set(style.pricingMatrix.map((p) => p.depth))].sort(
    (a, b) => a - b
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          href={`/client/${clientId}/building-styles`}
          className="text-myshed-primary hover:underline mb-4 inline-block"
        >
          ← Back to Building Styles
        </Link>
        <h1 className="text-3xl font-bold text-myshed-secondary mb-2">
          {style.name}
        </h1>
        {style.myshedCatalogCode && (
          <p className="text-sm text-gray-500">
            Catalog Code: {style.myshedCatalogCode}
          </p>
        )}
      </div>

      {/* Images Gallery */}
      {images.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-myshed-secondary mb-4">
            Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((imageUrl: string, index: number) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg overflow-hidden aspect-square"
              >
                <img
                  src={imageUrl}
                  alt={`${style.name} - View ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBOb3QgQXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      {style.description && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-myshed-secondary mb-4">
            Description
          </h2>
          <p className="text-gray-700 leading-relaxed">{style.description}</p>
        </div>
      )}

      {/* Pricing Matrix */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-myshed-secondary mb-4">
          Pricing Matrix
        </h2>

        {Object.keys(groupedPricing).length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-yellow-800">
              No pricing information available for this building style yet.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedPricing).map(([material, prices]) => (
              <div key={material}>
                <h3 className="text-lg font-semibold text-myshed-secondary mb-3">
                  {material} Pricing
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-myshed-secondary text-white">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">
                          Size (W×D)
                        </th>
                        <th className="px-4 py-3 text-right font-semibold">
                          Base Price
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          SKU
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {prices
                        .sort((a, b) => {
                          if (a.width !== b.width) return a.width - b.width;
                          return a.depth - b.depth;
                        })
                        .map((price) => (
                          <tr
                            key={price.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-4 py-3 font-medium text-gray-900">
                              {price.width}' × {price.depth}'
                            </td>
                            <td className="px-4 py-3 text-right text-myshed-primary font-semibold">
                              ${price.basePrice.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {price.sku}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-myshed-primary/10 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Total Configurations</div>
          <div className="text-2xl font-bold text-myshed-secondary">
            {style.pricingMatrix.length}
          </div>
        </div>
        <div className="bg-myshed-primary/10 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Materials Available</div>
          <div className="text-2xl font-bold text-myshed-secondary">
            {Object.keys(groupedPricing).length}
          </div>
        </div>
        <div className="bg-myshed-primary/10 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Price Range</div>
          <div className="text-2xl font-bold text-myshed-secondary">
            {style.pricingMatrix.length > 0
              ? `$${Math.min(
                  ...style.pricingMatrix.map((p) => p.basePrice)
                ).toLocaleString()} - $${Math.max(
                  ...style.pricingMatrix.map((p) => p.basePrice)
                ).toLocaleString()}`
              : 'N/A'}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Link
          href={`/client/${clientId}/building-styles`}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back to All Styles
        </Link>
        <button
          onClick={() => window.print()}
          className="px-6 py-2 bg-myshed-primary text-white rounded-lg hover:bg-myshed-primary/90 transition-colors"
        >
          Print Pricing
        </button>
      </div>
    </div>
  );
}
