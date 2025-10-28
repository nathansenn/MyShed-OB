"use client";

import { use, useState, useEffect } from "react";

interface PaymentInfo {
  id?: string;
  acceptedMethods: string;
  depositPercentage: number;
  depositRefundable: boolean;
  cancellationPolicy: string;
}

interface PageProps {
  params: Promise<{ clientId: string }>;
}

export default function PaymentInfoPage({ params }: PageProps) {
  const { clientId } = use(params);
  const [info, setInfo] = useState<PaymentInfo>({
    acceptedMethods: "",
    depositPercentage: 50,
    depositRefundable: true,
    cancellationPolicy: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, [clientId]);

  const loadData = async () => {
    try {
      const res = await fetch(`/api/clients/${clientId}/payment-info`);
      const data = await res.json();
      if (data && data.id) setInfo(data);
    } catch (error) {
      console.error("Error loading payment info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof PaymentInfo, value: any) => {
    const updated = { ...info, [field]: value };
    setInfo(updated);
    autoSave(updated);
  };

  const autoSave = async (data: PaymentInfo) => {
    setIsSaving(true);
    try {
      await fetch(`/api/clients/${clientId}/payment-info`, {
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
          <p className="text-gray-600">Loading payment info...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">P. Payment Information</h1>
            <p className="text-gray-600">
              Configure accepted payment methods, deposits, refunds, and cancellation policies.
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Methods & Deposits</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Accepted Payment Methods (comma-separated)
              </label>
              <input
                type="text"
                value={info.acceptedMethods}
                onChange={(e) => handleChange("acceptedMethods", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent"
                placeholder="Cash, Check, Credit Card, Visa, Mastercard, Discover"
              />
              <p className="mt-1 text-xs text-gray-500">List all accepted payment methods</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Deposit Percentage (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={info.depositPercentage}
                onChange={(e) => handleChange("depositPercentage", parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent"
                placeholder="50"
              />
              <p className="mt-1 text-xs text-gray-500">Percentage required as deposit when order is placed</p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="depositRefundable"
                checked={info.depositRefundable}
                onChange={(e) => handleChange("depositRefundable", e.target.checked)}
                className="w-4 h-4 text-myshed-primary border-gray-300 rounded focus:ring-myshed-primary"
              />
              <label htmlFor="depositRefundable" className="ml-2 text-sm font-medium text-gray-700">
                Deposit is Refundable
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Cancellation Policy</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cancellation & Refund Policy
            </label>
            <textarea
              value={info.cancellationPolicy}
              onChange={(e) => handleChange("cancellationPolicy", e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent"
              placeholder="Describe your cancellation policy, refund terms, and any conditions..."
            />
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-green-900">Final Section Complete!</h3>
          </div>
          <p className="text-sm text-green-700">
            You've reached the end of the onboarding process. Review all sections to ensure accuracy before going live.
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <a href={`/client/${clientId}/financing-options`} className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Previous</span>
        </a>
        <a href={`/client/${clientId}/company-info`} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Review & Complete</span>
        </a>
      </div>
    </div>
  );
}
