"use client";

import { use, useState, useEffect } from "react";

interface CompanyDetails {
  id?: string;
  mainAddress: string;
  phoneNumber: string;
  emailAddress: string;
  timezone: string;
  businessHours: string;
  companyBackground: string;
  logoUrl: string;
  disclaimers: string;
  buildingSerialFormat: string;
  stripePublishableKey: string;
  stripeSecretKey: string;
}

interface PageProps {
  params: Promise<{ clientId: string }>;
}

export default function CompanyDetailsPage({ params }: PageProps) {
  const { clientId } = use(params);
  const [details, setDetails] = useState<CompanyDetails>({
    mainAddress: "",
    phoneNumber: "",
    emailAddress: "",
    timezone: "",
    businessHours: "",
    companyBackground: "",
    logoUrl: "",
    disclaimers: "",
    buildingSerialFormat: "",
    stripePublishableKey: "",
    stripeSecretKey: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, [clientId]);

  const loadData = async () => {
    try {
      const res = await fetch(`/api/clients/${clientId}/company-details`);
      const data = await res.json();
      if (data && data.id) {
        setDetails(data);
      }
    } catch (error) {
      console.error("Error loading company details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof CompanyDetails, value: string) => {
    setDetails({ ...details, [field]: value });
    autoSave({ ...details, [field]: value });
  };

  const autoSave = async (data: CompanyDetails) => {
    setIsSaving(true);
    try {
      await fetch(`/api/clients/${clientId}/company-details`, {
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
          <p className="text-gray-600">Loading company details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">L. Company Details</h1>
            <p className="text-gray-600">
              Extended company information including contact details, branding, and Stripe configuration.
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
        {/* Basic Contact Info */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Contact Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Address
              </label>
              <input
                type="text"
                value={details.mainAddress}
                onChange={(e) => handleChange("mainAddress", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent"
                placeholder="123 Main St, City, State ZIP"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={details.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={details.emailAddress}
                  onChange={(e) => handleChange("emailAddress", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent"
                  placeholder="contact@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <input
                  type="text"
                  value={details.timezone}
                  onChange={(e) => handleChange("timezone", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent"
                  placeholder="Central Standard Time (CST)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Building Serial Format
                </label>
                <input
                  type="text"
                  value={details.buildingSerialFormat}
                  onChange={(e) => handleChange("buildingSerialFormat", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent"
                  placeholder="ABC-####"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Hours
              </label>
              <textarea
                value={details.businessHours}
                onChange={(e) => handleChange("businessHours", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent"
                placeholder="Monday - Friday: 9:00 AM - 5:00 PM"
              />
            </div>
          </div>
        </div>

        {/* Company Background & Branding */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Branding & Background</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Background
              </label>
              <textarea
                value={details.companyBackground}
                onChange={(e) => handleChange("companyBackground", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent"
                placeholder="Tell us about your company's history and what makes you unique..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo URL
              </label>
              <input
                type="url"
                value={details.logoUrl}
                onChange={(e) => handleChange("logoUrl", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent"
                placeholder="https://example.com/logo.png"
              />
              {details.logoUrl && (
                <img src={details.logoUrl} alt="Logo" className="mt-3 h-16 object-contain" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Disclaimers
              </label>
              <textarea
                value={details.disclaimers}
                onChange={(e) => handleChange("disclaimers", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent"
                placeholder="Enter any legal disclaimers or terms..."
              />
            </div>
          </div>
        </div>

        {/* Stripe Configuration */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Integration (Stripe)</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stripe Publishable Key
              </label>
              <input
                type="text"
                value={details.stripePublishableKey}
                onChange={(e) => handleChange("stripePublishableKey", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent font-mono text-sm"
                placeholder="pk_test_..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stripe Secret Key
              </label>
              <input
                type="password"
                value={details.stripeSecretKey}
                onChange={(e) => handleChange("stripeSecretKey", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent font-mono text-sm"
                placeholder="sk_test_..."
              />
              <p className="mt-2 text-xs text-gray-500">
                Your secret key is encrypted and stored securely.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <a href={`/client/${clientId}/non-3d-options`} className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Previous</span>
        </a>
        <a href={`/client/${clientId}/tax-info`} className="px-6 py-3 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors flex items-center space-x-2">
          <span>Next: Tax Information</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
