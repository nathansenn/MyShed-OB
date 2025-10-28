"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";

interface SectionData {
  completed: number;
  total: number;
  percentage: number;
  items?: Array<{
    name: string;
    status: string;
  }>;
}

interface ProgressData {
  overall: {
    completed: number;
    total: number;
    percentage: number;
  };
  companyInfo: SectionData;
  colorScheme: SectionData;
  stores: SectionData;
  users: SectionData;
  buildingStyles: SectionData;
  roofDetails: SectionData;
  sidingDetails: SectionData;
  trimDetails: SectionData;
  doors: SectionData;
  windows: SectionData;
  interiorOptions: SectionData;
  porchOptions: SectionData;
  non3dOptions: SectionData;
  companyDetails: SectionData;
  taxInfo: SectionData;
  deliveryOptions: SectionData;
  financingOptions: SectionData;
  paymentInfo: SectionData;
}

interface PageProps {
  params: Promise<{ clientId: string }>;
}

export default function ClientDashboard({ params }: PageProps) {
  const { clientId } = use(params);
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, [clientId]);

  const loadProgress = async () => {
    try {
      const response = await fetch(`/api/clients/${clientId}/progress`);
      if (!response.ok) {
        console.error("API response not OK:", response.status, response.statusText);
        const errorText = await response.text();
        console.error("Error response body:", errorText);
        throw new Error(`Failed to fetch progress: ${response.status}`);
      }
      const data = await response.json();
      console.log("Progress data loaded:", data);
      setProgress(data);
    } catch (error) {
      console.error("Error loading progress:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-myshed-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!progress || !progress.overall) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Unable to load progress data</p>
          <p className="text-sm text-gray-500">Check the browser console for more details</p>
          <button 
            onClick={() => loadProgress()}
            className="mt-4 px-4 py-2 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const estimatedTimeMinutes = Math.ceil((progress.overall.total - progress.overall.completed) * 2);
  const estimatedTime = estimatedTimeMinutes < 60 
    ? `${estimatedTimeMinutes} minutes` 
    : `${Math.ceil(estimatedTimeMinutes / 60)} hours`;

  // Create sections object from progress data
  const sections = {
    companyInfo: progress.companyInfo,
    colorScheme: progress.colorScheme,
    stores: progress.stores,
    users: progress.users,
    buildingStyles: progress.buildingStyles,
    roofDetails: progress.roofDetails,
    sidingDetails: progress.sidingDetails,
    trimDetails: progress.trimDetails,
    doors: progress.doors,
    windows: progress.windows,
    interiorOptions: progress.interiorOptions,
    porchOptions: progress.porchOptions,
    non3dOptions: progress.non3dOptions,
    companyDetails: progress.companyDetails,
    taxInfo: progress.taxInfo,
    deliveryOptions: progress.deliveryOptions,
    financingOptions: progress.financingOptions,
    paymentInfo: progress.paymentInfo,
  };

  // Identify critical missing items
  const criticalItems = [
    { 
      name: "Door pricing configuration",
      count: 19 - (progress.doors?.completed || 0),
      path: `/client/${clientId}/door-details`,
      show: (progress.doors?.completed || 0) < 19
    },
    { 
      name: "Window pricing configuration",
      count: 13 - (progress.windows?.completed || 0),
      path: `/client/${clientId}/window-details`,
      show: (progress.windows?.completed || 0) < 13
    },
    { 
      name: "Building styles setup",
      count: 10 - (progress.buildingStyles?.completed || 0),
      path: `/client/${clientId}/building-styles`,
      show: (progress.buildingStyles?.completed || 0) < 10
    },
  ].filter(item => item.show);

  // Group sections by status
  const completedSections = Object.entries(sections).filter(([_, data]: any) => data?.percentage === 100);
  const inProgressSections = Object.entries(sections).filter(([_, data]: any) => data?.percentage > 0 && data?.percentage < 100);
  const notStartedSections = Object.entries(sections).filter(([_, data]: any) => data?.percentage === 0);

  const sectionNames: { [key: string]: string } = {
    companyInfo: "Company Information",
    colorScheme: "Company Color Scheme",
    stores: "A. Store Information",
    users: "B. System Users",
    buildingStyles: "C. Building Styles",
    roofDetails: "D. Roof Details",
    sidingDetails: "E. Siding Details",
    trimDetails: "F. Trim Details",
    doors: "G. Door Details",
    windows: "H. Window Details",
    interiorOptions: "I. Interior Options",
    porchOptions: "J. Porch Options",
    non3dOptions: "K. Non-3D Options",
    companyDetails: "L. Company Details",
    taxInfo: "M. Sales Tax Information",
    deliveryOptions: "N. Delivery Options",
    financingOptions: "O. Financing Options",
    paymentInfo: "P. Payment Information",
  };

  const sectionPaths: { [key: string]: string } = {
    companyInfo: "company-info",
    colorScheme: "color-scheme",
    stores: "stores",
    users: "users",
    buildingStyles: "building-styles",
    roofDetails: "roof-details",
    sidingDetails: "siding-details",
    trimDetails: "trim-details",
    doors: "door-details",
    windows: "window-details",
    interiorOptions: "interior-options",
    porchOptions: "porch-options",
    non3dOptions: "non-3d-options",
    companyDetails: "company-details",
    taxInfo: "tax-info",
    deliveryOptions: "delivery-options",
    financingOptions: "financing-options",
    paymentInfo: "payment-info",
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🎯 Onboarding Dashboard</h1>
        <p className="text-gray-600">Northwood Outdoor - MyShed Client Onboarding</p>
      </div>

      {/* Overall Progress Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">📊 Overall Progress</h2>
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-myshed-primary h-4 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
              style={{ width: `${progress.overall.percentage}%` }}
            >
              {progress.overall.percentage > 10 && (
                <span className="text-xs font-bold text-white">{progress.overall.percentage}%</span>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-myshed-primary">{progress.overall.completed}</div>
            <div className="text-sm text-gray-600">Fields Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-400">{progress.overall.total - progress.overall.completed}</div>
            <div className="text-sm text-gray-600">Remaining</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">~{estimatedTime}</div>
            <div className="text-sm text-gray-600">Estimated Time</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">⚡ Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href={notStartedSections.length > 0 
              ? `/client/${clientId}/${sectionPaths[notStartedSections[0][0]]}` 
              : inProgressSections.length > 0 
              ? `/client/${clientId}/${sectionPaths[inProgressSections[0][0]]}`
              : `/client/${clientId}/company-info`}
            className="flex items-center justify-center px-4 py-3 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            Continue Setup
          </Link>
          <button className="flex items-center justify-center px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-myshed-primary hover:text-myshed-primary transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Import Data
          </button>
          <button className="flex items-center justify-center px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-myshed-primary hover:text-myshed-primary transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview Builder
          </button>
          <button className="flex items-center justify-center px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-myshed-primary hover:text-myshed-primary transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email Progress
          </button>
        </div>
      </div>

      {/* Critical Missing Items */}
      {criticalItems.length > 0 && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-red-900 mb-4">🚨 Critical Missing Items ({criticalItems.length})</h2>
          <div className="space-y-3">
            {criticalItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold">{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.count} items need configuration</p>
                  </div>
                </div>
                <Link
                  href={item.path}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Configure →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Sections */}
      {completedSections.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">✅ Completed Sections ({completedSections.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {completedSections.map(([key, data]: any) => (
              <Link
                key={key}
                href={`/client/${clientId}/${sectionPaths[key]}`}
                className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <h3 className="font-medium text-gray-900">{sectionNames[key]}</h3>
                    <p className="text-sm text-gray-600">{data.completed}/{data.total} fields</p>
                  </div>
                </div>
                <span className="text-green-600 font-bold">{data.percentage}%</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* In Progress Sections */}
      {inProgressSections.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">⚠️ In Progress Sections ({inProgressSections.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {inProgressSections.map(([key, data]: any) => (
              <Link
                key={key}
                href={`/client/${clientId}/${sectionPaths[key]}`}
                className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⚠️</span>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{sectionNames[key]}</h3>
                    <p className="text-sm text-gray-600">{data.completed}/{data.total} fields</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full transition-all"
                        style={{ width: `${data.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <span className="text-yellow-600 font-bold">{data.percentage}%</span>
                  <div className="text-xs text-gray-500 text-right mt-1">Continue →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Not Started Sections */}
      {notStartedSections.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">⚪ Not Started Sections ({notStartedSections.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {notStartedSections.map(([key, data]: any) => (
              <Link
                key={key}
                href={`/client/${clientId}/${sectionPaths[key]}`}
                className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-myshed-primary hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">○</span>
                  <div>
                    <h3 className="font-medium text-gray-900">{sectionNames[key]}</h3>
                    <p className="text-sm text-gray-500">0/{data.total} fields</p>
                  </div>
                </div>
                <span className="text-gray-400">Start →</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
