"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SectionProgress {
  id: string;
  name: string;
  path: string;
  progress: number;
  total: number;
  completed: number;
  status: "complete" | "partial" | "empty";
  subsections?: Array<{
    name: string;
    status: "complete" | "partial" | "empty";
  }>;
}

interface OnboardingSidebarProps {
  clientId: string;
}

export default function OnboardingSidebar({ clientId }: OnboardingSidebarProps) {
  const pathname = usePathname();
  const [sections, setSections] = useState<SectionProgress[]>([]);
  const [overallProgress, setOverallProgress] = useState({ completed: 0, total: 84, percentage: 0 });
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    loadProgress();
  }, [clientId]);

  const loadProgress = async () => {
    try {
      // Load progress data from API
      const response = await fetch(`/api/clients/${clientId}/progress`);
      const data = await response.json();
      
      // Set sections with progress data
      const sectionData: SectionProgress[] = [
        {
          id: "company-info",
          name: "Company Information",
          path: `/client/${clientId}/company-info`,
          progress: data.companyInfo?.percentage || 0,
          total: 5,
          completed: data.companyInfo?.completed || 0,
          status: getStatus(data.companyInfo?.percentage || 0),
        },
        {
          id: "color-scheme",
          name: "Company Color Scheme",
          path: `/client/${clientId}/color-scheme`,
          progress: data.colorScheme?.percentage || 0,
          total: 2,
          completed: data.colorScheme?.completed || 0,
          status: getStatus(data.colorScheme?.percentage || 0),
        },
        {
          id: "stores",
          name: "A. Store Information",
          path: `/client/${clientId}/stores`,
          progress: data.stores?.percentage || 0,
          total: data.stores?.total || 7,
          completed: data.stores?.completed || 0,
          status: getStatus(data.stores?.percentage || 0),
          subsections: data.stores?.items || [],
        },
        {
          id: "users",
          name: "B. System Users",
          path: `/client/${clientId}/users`,
          progress: data.users?.percentage || 0,
          total: 5,
          completed: data.users?.completed || 0,
          status: getStatus(data.users?.percentage || 0),
        },
        {
          id: "building-styles",
          name: "C. Building Styles",
          path: `/client/${clientId}/building-styles`,
          progress: data.buildingStyles?.percentage || 0,
          total: 10,
          completed: data.buildingStyles?.completed || 0,
          status: getStatus(data.buildingStyles?.percentage || 0),
          subsections: data.buildingStyles?.items || [],
        },
        {
          id: "roof-details",
          name: "D. Roof Details",
          path: `/client/${clientId}/roof-details`,
          progress: data.roofDetails?.percentage || 0,
          total: 7,
          completed: data.roofDetails?.completed || 0,
          status: getStatus(data.roofDetails?.percentage || 0),
        },
        {
          id: "siding-details",
          name: "E. Siding Details",
          path: `/client/${clientId}/siding-details`,
          progress: data.sidingDetails?.percentage || 0,
          total: 23,
          completed: data.sidingDetails?.completed || 0,
          status: getStatus(data.sidingDetails?.percentage || 0),
        },
        {
          id: "trim-details",
          name: "F. Trim Details",
          path: `/client/${clientId}/trim-details`,
          progress: data.trimDetails?.percentage || 0,
          total: 1,
          completed: data.trimDetails?.completed || 0,
          status: getStatus(data.trimDetails?.percentage || 0),
        },
        {
          id: "door-details",
          name: "G. Door Details",
          path: `/client/${clientId}/door-details`,
          progress: data.doors?.percentage || 0,
          total: 19,
          completed: data.doors?.completed || 0,
          status: getStatus(data.doors?.percentage || 0),
        },
        {
          id: "window-details",
          name: "H. Window Details",
          path: `/client/${clientId}/window-details`,
          progress: data.windows?.percentage || 0,
          total: 13,
          completed: data.windows?.completed || 0,
          status: getStatus(data.windows?.percentage || 0),
        },
        {
          id: "interior-options",
          name: "I. Interior Options",
          path: `/client/${clientId}/interior-options`,
          progress: data.interiorOptions?.percentage || 0,
          total: 3,
          completed: data.interiorOptions?.completed || 0,
          status: getStatus(data.interiorOptions?.percentage || 0),
        },
        {
          id: "porch-options",
          name: "J. Porch Options",
          path: `/client/${clientId}/porch-options`,
          progress: data.porchOptions?.percentage || 0,
          total: 1,
          completed: data.porchOptions?.completed || 0,
          status: getStatus(data.porchOptions?.percentage || 0),
        },
        {
          id: "non-3d-options",
          name: "K. Non-3D Options",
          path: `/client/${clientId}/non-3d-options`,
          progress: data.non3dOptions?.percentage || 0,
          total: 4,
          completed: data.non3dOptions?.completed || 0,
          status: getStatus(data.non3dOptions?.percentage || 0),
        },
        {
          id: "company-details",
          name: "L. Company Details",
          path: `/client/${clientId}/company-details`,
          progress: data.companyDetails?.percentage || 0,
          total: 8,
          completed: data.companyDetails?.completed || 0,
          status: getStatus(data.companyDetails?.percentage || 0),
        },
        {
          id: "tax-info",
          name: "M. Sales Tax Information",
          path: `/client/${clientId}/tax-info`,
          progress: data.taxInfo?.percentage || 0,
          total: 2,
          completed: data.taxInfo?.completed || 0,
          status: getStatus(data.taxInfo?.percentage || 0),
        },
        {
          id: "delivery-options",
          name: "N. Delivery Options",
          path: `/client/${clientId}/delivery-options`,
          progress: data.deliveryOptions?.percentage || 0,
          total: 1,
          completed: data.deliveryOptions?.completed || 0,
          status: getStatus(data.deliveryOptions?.percentage || 0),
        },
        {
          id: "financing-options",
          name: "O. Financing Options",
          path: `/client/${clientId}/financing-options`,
          progress: data.financingOptions?.percentage || 0,
          total: 1,
          completed: data.financingOptions?.completed || 0,
          status: getStatus(data.financingOptions?.percentage || 0),
        },
        {
          id: "payment-info",
          name: "P. Payment Information",
          path: `/client/${clientId}/payment-info`,
          progress: data.paymentInfo?.percentage || 0,
          total: 3,
          completed: data.paymentInfo?.completed || 0,
          status: getStatus(data.paymentInfo?.percentage || 0),
        },
      ];

      setSections(sectionData);
      setOverallProgress({
        completed: data.overall?.completed || 0,
        total: data.overall?.total || 84,
        percentage: data.overall?.percentage || 0,
      });
    } catch (error) {
      console.error("Error loading progress:", error);
      // Set default sections if API fails
      setSections(getDefaultSections(clientId));
    }
  };

  const getStatus = (percentage: number): "complete" | "partial" | "empty" => {
    if (percentage === 100) return "complete";
    if (percentage > 0) return "partial";
    return "empty";
  };

  const getDefaultSections = (clientId: string): SectionProgress[] => {
    return [
      { id: "company-info", name: "Company Information", path: `/client/${clientId}/company-info`, progress: 0, total: 5, completed: 0, status: "empty" },
      { id: "color-scheme", name: "Company Color Scheme", path: `/client/${clientId}/color-scheme`, progress: 0, total: 2, completed: 0, status: "empty" },
      { id: "stores", name: "A. Store Information", path: `/client/${clientId}/stores`, progress: 0, total: 7, completed: 0, status: "empty" },
      { id: "users", name: "B. System Users", path: `/client/${clientId}/users`, progress: 0, total: 5, completed: 0, status: "empty" },
      { id: "building-styles", name: "C. Building Styles", path: `/client/${clientId}/building-styles`, progress: 0, total: 10, completed: 0, status: "empty" },
      { id: "roof-details", name: "D. Roof Details", path: `/client/${clientId}/roof-details`, progress: 0, total: 7, completed: 0, status: "empty" },
      { id: "siding-details", name: "E. Siding Details", path: `/client/${clientId}/siding-details`, progress: 0, total: 23, completed: 0, status: "empty" },
      { id: "trim-details", name: "F. Trim Details", path: `/client/${clientId}/trim-details`, progress: 0, total: 1, completed: 0, status: "empty" },
      { id: "door-details", name: "G. Door Details", path: `/client/${clientId}/door-details`, progress: 0, total: 19, completed: 0, status: "empty" },
      { id: "window-details", name: "H. Window Details", path: `/client/${clientId}/window-details`, progress: 0, total: 13, completed: 0, status: "empty" },
      { id: "interior-options", name: "I. Interior Options", path: `/client/${clientId}/interior-options`, progress: 0, total: 3, completed: 0, status: "empty" },
      { id: "porch-options", name: "J. Porch Options", path: `/client/${clientId}/porch-options`, progress: 0, total: 1, completed: 0, status: "empty" },
      { id: "non-3d-options", name: "K. Non-3D Options", path: `/client/${clientId}/non-3d-options`, progress: 0, total: 4, completed: 0, status: "empty" },
      { id: "company-details", name: "L. Company Details", path: `/client/${clientId}/company-details`, progress: 0, total: 8, completed: 0, status: "empty" },
      { id: "tax-info", name: "M. Sales Tax Information", path: `/client/${clientId}/tax-info`, progress: 0, total: 2, completed: 0, status: "empty" },
      { id: "delivery-options", name: "N. Delivery Options", path: `/client/${clientId}/delivery-options`, progress: 0, total: 1, completed: 0, status: "empty" },
      { id: "financing-options", name: "O. Financing Options", path: `/client/${clientId}/financing-options`, progress: 0, total: 1, completed: 0, status: "empty" },
      { id: "payment-info", name: "P. Payment Information", path: `/client/${clientId}/payment-info`, progress: 0, total: 3, completed: 0, status: "empty" },
    ];
  };

  const getStatusIcon = (status: "complete" | "partial" | "empty") => {
    switch (status) {
      case "complete":
        return "✓";
      case "partial":
        return "⚠️";
      case "empty":
        return "✗";
    }
  };

  const goToNextMissing = () => {
    const nextIncomplete = sections.find(s => s.status !== "complete");
    if (nextIncomplete) {
      window.location.href = nextIncomplete.path;
    }
  };

  if (isCollapsed) {
    return (
      <div className="fixed left-0 top-0 h-full bg-white border-r border-gray-200 w-16 flex flex-col items-center py-6 z-40">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 text-gray-600 hover:text-myshed-primary hover:bg-gray-100 rounded-lg transition-colors"
          title="Expand sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
        <div className="mt-4 text-center">
          <div className="text-xs font-bold text-myshed-primary">{overallProgress.percentage}%</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-0 h-full bg-white border-r border-gray-200 w-80 flex flex-col z-40 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🏗️</span>
            <h2 className="text-lg font-bold text-gray-900">Onboarding Portal</h2>
          </div>
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
            title="Collapse sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-600 mb-4">MyShed Client Onboarding Form<br/>Northwood Outdoor</p>

        {/* Overall Progress */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-xs font-semibold text-gray-700 mb-2">Overall Progress</h3>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-myshed-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${overallProgress.percentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-600">
            {overallProgress.completed} of {overallProgress.total} fields completed
          </p>
        </div>

        {/* Quick Action */}
        <button
          onClick={goToNextMissing}
          className="mt-3 w-full px-4 py-2 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors text-sm font-medium flex items-center justify-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <span>Go to Next Missing Section</span>
        </button>
      </div>

      {/* Sections List */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <h3 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">📋 Sections</h3>
        <div className="space-y-1">
          {sections.map((section) => {
            const isActive = pathname === section.path;
            return (
              <div key={section.id}>
                <Link
                  href={section.path}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-myshed-primary text-white font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <span className="flex-shrink-0">{getStatusIcon(section.status)}</span>
                      <span className="truncate">{section.name}</span>
                    </div>
                    <span className={`text-xs ml-2 flex-shrink-0 ${isActive ? "text-white" : "text-gray-500"}`}>
                      {section.progress}%
                    </span>
                  </div>
                </Link>
                {section.subsections && section.subsections.length > 0 && (
                  <div className="ml-6 mt-1 space-y-1">
                    {section.subsections.map((sub, idx) => (
                      <div key={idx} className="flex items-center space-x-2 px-3 py-1 text-xs text-gray-600">
                        <span>{getStatusIcon(sub.status)}</span>
                        <span className="truncate">{sub.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex-shrink-0">
        <Link
          href={`/client/${clientId}`}
          className="block text-center px-4 py-2 text-sm text-myshed-primary hover:bg-myshed-primary hover:text-white rounded-lg transition-colors font-medium"
        >
          📊 View Dashboard
        </Link>
      </div>
    </div>
  );
}
