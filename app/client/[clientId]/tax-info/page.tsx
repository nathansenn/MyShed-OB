"use client";

import { use } from "react";

interface PageProps {
  params: Promise<{ clientId: string }>;
}

export default function TaxInfoPage({ params }: PageProps) {
  const { clientId } = use(params);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">M. Sales Tax Information</h1>
        <p className="text-gray-600">
          Configure sales tax percentage and TaxJar integration for automated tax calculation.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-myshed-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
            <span className="text-4xl">💰</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Tax Configuration</h3>
          <p className="text-gray-600 mb-6">
            Set sales tax percentage or integrate with TaxJar for automated tax calculation based on location.
          </p>
          <div className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
            Section ready for configuration
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <a href={`/client/${clientId}/company-details`} className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Previous</span>
        </a>
        <a href={`/client/${clientId}/delivery-options`} className="px-6 py-3 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors flex items-center space-x-2">
          <span>Next: Delivery Options</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
