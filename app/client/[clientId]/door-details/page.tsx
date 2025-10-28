"use client";

import { use, useState, useEffect } from "react";
import { useRowAutoSave } from "@/hooks/useRowAutoSave";
import { SaveStatusIndicator } from "@/components/InlineEditable/SaveStatusIndicator";
import { EditableNumberField } from "@/components/InlineEditable/EditableNumberField";
import { EditableSelectField } from "@/components/InlineEditable/EditableSelectField";
import { EditableCheckbox } from "@/components/InlineEditable/EditableCheckbox";
import { HoverEnlargeImage } from "@/components/InlineEditable/HoverEnlargeImage";

interface Door {
  id: string;
  name: string;
  myshedCatalogCode: string;
  myshedCatalogImage: string;
  basePrice: number;
  pricingType: string;
  isStandard: boolean;
}

interface PageProps {
  params: Promise<{ clientId: string }>;
}

export default function DoorDetailsPage({ params }: PageProps) {
  const { clientId } = use(params);
  const [doors, setDoors] = useState<Door[]>([]);
  const [catalogDoors, setCatalogDoors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCatalog, setShowCatalog] = useState(false);

  const { saveField, getSaveStatus } = useRowAutoSave<Door>({
    onSave: async (doorId, field, value) => {
      await fetch(`/api/clients/${clientId}/doors/${doorId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      
      // Update local state optimistically
      setDoors((prev) =>
        prev.map((door) =>
          door.id === doorId ? { ...door, [field]: value } : door
        )
      );
    },
  });

  useEffect(() => {
    loadData();
  }, [clientId]);

  const loadData = async () => {
    try {
      const [doorsRes, catalogRes] = await Promise.all([
        fetch(`/api/clients/${clientId}/doors`),
        fetch(`/api/catalog/doors`),
      ]);
      setDoors(await doorsRes.json());
      setCatalogDoors(await catalogRes.json());
    } catch (error) {
      console.error("Error loading doors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addFromCatalog = async (catalogDoor: any) => {
    try {
      const response = await fetch(`/api/clients/${clientId}/doors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: catalogDoor.name,
          myshedCatalogCode: catalogDoor.code,
          myshedCatalogImage: catalogDoor.imageUrl,
          basePrice: 0,
          pricingType: "fixed",
          isStandard: false,
        }),
      });
      const newDoor = await response.json();
      setDoors((prev) => [...prev, newDoor]);
      setShowCatalog(false);
    } catch (error) {
      console.error("Error adding door:", error);
    }
  };

  const deleteDoor = async (doorId: string) => {
    if (!confirm("Are you sure you want to delete this door?")) return;
    
    try {
      await fetch(`/api/clients/${clientId}/doors/${doorId}`, {
        method: "DELETE",
      });
      setDoors((prev) => prev.filter((door) => door.id !== doorId));
    } catch (error) {
      console.error("Error deleting door:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-myshed-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading doors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">G. Door Details</h1>
            <p className="text-gray-600">Configure door options from MyShed catalog. Target: 19 doors.</p>
          </div>
          <button
            onClick={() => setShowCatalog(true)}
            className="px-6 py-3 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors shadow-sm flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add from Catalog</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">Doors Progress</h3>
          <span className="text-2xl font-bold text-myshed-primary">{doors.length}/19 doors</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-myshed-primary h-3 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (doors.length / 19) * 100)}%` }}
          />
        </div>
      </div>

      {/* Empty State */}
      {doors.length === 0 ? (
        <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <span className="text-4xl">🚪</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No doors configured yet</h3>
          <p className="text-gray-600 mb-6">Browse the MyShed door catalog to get started.</p>
          <button
            onClick={() => setShowCatalog(true)}
            className="px-6 py-3 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors"
          >
            Browse Door Catalog
          </button>
        </div>
      ) : (
        /* Inline Editable Table */
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Catalog Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Base Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Pricing Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Standard
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {doors.map((door) => (
                  <tr key={door.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <HoverEnlargeImage
                        src={door.myshedCatalogImage}
                        alt={door.name}
                        thumbnailClassName="w-16 h-16"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900">{door.name}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">{door.myshedCatalogCode}</span>
                    </td>
                    <td className="px-4 py-3">
                      <EditableNumberField
                        value={door.basePrice}
                        onChange={(value) => saveField(door.id, "basePrice", value)}
                        min={0}
                        prefix="$"
                        className="w-32"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <EditableSelectField
                        value={door.pricingType}
                        options={[
                          { value: "fixed", label: "Fixed Price" },
                          { value: "perSquareFoot", label: "Per Sq Ft" },
                        ]}
                        onChange={(value) => saveField(door.id, "pricingType", value)}
                        className="w-40"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <EditableCheckbox
                        value={door.isStandard}
                        onChange={(value) => saveField(door.id, "isStandard", value)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <SaveStatusIndicator status={getSaveStatus(door.id)} />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteDoor(door.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete door"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Catalog Modal */}
      {showCatalog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">MyShed Door Catalog</h2>
                <button
                  onClick={() => setShowCatalog(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {catalogDoors.map((door) => (
                  <button
                    key={door.id}
                    onClick={() => addFromCatalog(door)}
                    disabled={doors.some((d) => d.myshedCatalogCode === door.code)}
                    className="text-left bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-myshed-primary hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <img
                      src={door.imageUrl}
                      alt={door.name}
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='150'%3E%3Crect fill='%23f3f4f6' width='200' height='150'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='14' text-anchor='middle' x='100' y='75'%3EDoor%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    <div className="p-3">
                      <p className="font-medium text-xs text-gray-900 truncate">{door.name}</p>
                      {doors.some((d) => d.myshedCatalogCode === door.code) && (
                        <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                          Added
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <a
          href={`/client/${clientId}/trim-details`}
          className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Previous</span>
        </a>
        <a
          href={`/client/${clientId}/window-details`}
          className="px-6 py-3 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors flex items-center space-x-2"
        >
          <span>Next: Window Details</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
