"use client";

import { use, useState, useEffect } from "react";

interface DeliveryOptions {
  id?: string;
  offersDelivery: boolean;
  freeDeliveryRadius: number;
  pricePerMile: number;
  deliveryMethod: string;
  buildTimeline: string;
  siteRequirements: string;
  serviceArea: string;
}

interface PageProps {
  params: Promise<{ clientId: string }>;
}

export default function DeliveryOptionsPage({ params }: PageProps) {
  const { clientId } = use(params);
  const [options, setOptions] = useState<DeliveryOptions>({
    offersDelivery: true,
    freeDeliveryRadius: 50,
    pricePerMile: 4,
    deliveryMethod: "",
    buildTimeline: "",
    siteRequirements: "",
    serviceArea: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, [clientId]);

  const loadData = async () => {
    try {
      const res = await fetch(`/api/clients/${clientId}/delivery-options`);
      const data = await res.json();
      if (data && data.id) setOptions(data);
    } catch (error) {
      console.error("Error loading delivery options:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof DeliveryOptions, value: any) => {
    const updated = { ...options, [field]: value };
    setOptions(updated);
    autoSave(updated);
  };

  const autoSave = async (data: DeliveryOptions) => {
    setIsSaving(true);
    try {
      await fetch(`/api/clients/${clientId}/delivery-options`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      setTimeout(() => setIsSaving(false), 500);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-myshed-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading delivery options...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">N. Delivery Options</h1>
            <p className="text-gray-600">
              Configure delivery radius, pricing, build timeline, and site requirements.
            </p>
          </div>
          {isSaving && (
            <span className="text-sm text-green-600 flex items-center">
              <svg className="w-4 h-4 mr-1 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Saving...
            </span>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Configuration</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="offersDelivery"
                checked={options.offersDelivery}
                onChange={(e) => handleChange("offersDelivery", e.target.checked)}
                className="w-4 h-4 text-myshed-primary border-gray-300 rounded focus:ring-myshed-primary"
              />
              <label htmlFor="offersDelivery" className="ml-2 text-sm font-medium text-gray-700">
                Offers Delivery Service
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Free Delivery Radius (miles)
                </label>
                <input
                  type="number"
                  value={options.freeDeliveryRadius}
                  onChange={(e) => handleChange("freeDeliveryRadius", parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent"
                  placeholder="50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Per Mile (beyond free radius)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={options.pricePerMile}
                  onChange={(e) => handleChange("pricePerMile", parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent"
                  placeholder="4.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Method
              </label>
              <input
                type="text"
                value={options.deliveryMethod}
                onChange={(e) => handleChange("deliveryMethod", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent"
                placeholder="e.g., Crane, Flatbed Truck"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Build Timeline
              </label>
              <textarea
                value={options.buildTimeline}
                onChange={(e) => handleChange("buildTimeline", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent"
                placeholder="Typical lead time: 4-6 weeks from order"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Requirements
              </label>
              <textarea
                value={options.siteRequirements}
                onChange={(e) => handleChange("siteRequirements", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent"
                placeholder="Level ground required. Minimum clearance of 12 feet..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Area (comma-separated zip codes or cities)
              </label>
              <textarea
                value={options.serviceArea}
                onChange={(e) => handleChange("serviceArea", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent"
                placeholder="54843, 54001, Superior WI, Duluth MN..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <a href={`/client/${clientId}/tax-info`} className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Previous</span>
        </a>
        <a href={`/client/${clientId}/financing-options`} className="px-6 py-3 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors flex items-center space-x-2">
          <span>Next: Financing Options</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
