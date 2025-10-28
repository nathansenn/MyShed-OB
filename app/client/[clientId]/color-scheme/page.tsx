"use client";

import { use, useState, useEffect } from "react";
import { useAutoSave } from "@/hooks/useAutoSave";

interface PageProps {
  params: Promise<{
    clientId: string;
  }>;
}

export default function ColorSchemePage({ params }: PageProps) {
  const { clientId } = use(params);
  const [formData, setFormData] = useState({
    primaryColor: "",
    secondaryColor: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`/api/clients/${clientId}`);
        const client = await res.json();
        setFormData({
          primaryColor: client.primaryColor || "",
          secondaryColor: client.secondaryColor || "",
        });
      } catch (error) {
        console.error("Error loading client:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [clientId]);

  const { saving, lastSaved } = useAutoSave(
    formData,
    async (data) => {
      await fetch(`/api/clients/${clientId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-myshed-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Company Color Scheme</h1>
            <p className="text-gray-600">
              Provide the primary colors you'd like to use for your website styling.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            {saving && (
              <span className="flex items-center text-gray-500">
                <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            )}
            {lastSaved && !saving && (
              <span className="text-green-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Saved
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color *
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="color"
                value={formData.primaryColor || "#FFFFFF"}
                onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                className="w-20 h-12 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={formData.primaryColor}
                onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent"
                placeholder="#FFFFFF"
              />
            </div>
            {formData.primaryColor && (
              <div
                className="mt-4 p-4 rounded-lg"
                style={{ backgroundColor: formData.primaryColor }}
              >
                <p className="text-center font-medium" style={{ color: formData.primaryColor === '#FFFFFF' ? '#000' : '#fff' }}>
                  Primary Color Preview
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Color *
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="color"
                value={formData.secondaryColor || "#fe8f01"}
                onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                className="w-20 h-12 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={formData.secondaryColor}
                onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent"
                placeholder="#fe8f01"
              />
            </div>
            {formData.secondaryColor && (
              <div
                className="mt-4 p-4 rounded-lg"
                style={{ backgroundColor: formData.secondaryColor }}
              >
                <p className="text-center font-medium text-white">
                  Secondary Color Preview
                </p>
              </div>
            )}
          </div>

          {formData.primaryColor && formData.secondaryColor && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center text-green-800">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium">Color scheme complete!</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <a
          href={`/client/${clientId}/company-info`}
          className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Previous
        </a>
        <a
          href={`/client/${clientId}/stores`}
          className="px-6 py-2 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors"
        >
          Next: Store Information →
        </a>
      </div>
    </div>
  );
}
