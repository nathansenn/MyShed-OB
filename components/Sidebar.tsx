"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Section {
  id: string;
  label: string;
  progress: number;
  subsections?: {
    label: string;
    completed: boolean;
  }[];
}

interface SidebarProps {
  clientSlug: string;
  companyName: string;
  overallProgress: number;
  completedFields: number;
  totalFields: number;
  sections: Section[];
}

export default function Sidebar({
  clientSlug,
  companyName,
  overallProgress,
  completedFields,
  totalFields,
  sections,
}: SidebarProps) {
  const pathname = usePathname();

  const getStatusIcon = (progress: number) => {
    if (progress === 100) return "✓";
    if (progress > 0) return "⚠️";
    return "✗";
  };

  const getStatusColor = (progress: number) => {
    if (progress === 100) return "text-green-600";
    if (progress > 0) return "text-yellow-600";
    return "text-gray-400";
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/" className="flex items-center space-x-2 mb-4 text-gray-600 hover:text-gray-900">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">Back to Clients</span>
        </Link>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">🏗️ Onboarding Portal</h2>
        <p className="text-sm text-gray-600">{companyName}</p>
      </div>

      {/* Progress */}
      <div className="p-6 border-b border-gray-200">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Overall Progress</h3>
          <div className="mb-2">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600">{completedFields} of {totalFields} fields completed</span>
              <span className="font-semibold text-myshed-primary">{overallProgress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-myshed-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
          <button className="w-full mt-3 px-3 py-2 bg-myshed-primary text-white text-sm rounded-lg hover:bg-myshed-secondary transition-colors">
            → Go to Next Missing Section
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">📋 Sections</h3>
        </div>

        <nav className="py-2">
          {sections.map((section) => {
            const isActive = pathname === `/client/${clientSlug}/${section.id}` || pathname === `/client/${clientSlug}` && section.id === 'company-info';

            return (
              <div key={section.id} className="mb-1">
                <Link
                  href={`/client/${clientSlug}/${section.id}`}
                  className={`block px-6 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-myshed-primary/10 text-myshed-primary border-l-4 border-myshed-primary"
                      : "hover:bg-gray-50 text-gray-700 border-l-4 border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${getStatusColor(section.progress)}`}>
                        {getStatusIcon(section.progress)}
                      </span>
                      <span className="font-medium">{section.label}</span>
                    </div>
                    <span className="text-xs text-gray-500">{section.progress}%</span>
                  </div>
                </Link>

                {section.subsections && section.subsections.length > 0 && (
                  <div className="ml-12 mt-1 space-y-1">
                    {section.subsections.map((sub, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-gray-600 py-1">
                        <span className={sub.completed ? "text-green-600" : "text-gray-400"}>
                          {sub.completed ? "✓" : "○"}
                        </span>
                        <span>{sub.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
