"use client";

import { use, useState, useEffect } from "react";
import { useRowAutoSave } from "@/hooks/useRowAutoSave";
import { SaveStatusIndicator } from "@/components/InlineEditable/SaveStatusIndicator";
import { EditableTextField } from "@/components/InlineEditable/EditableTextField";
import { EditableColorField } from "@/components/InlineEditable/EditableColorField";
import { EditableNumberField } from "@/components/InlineEditable/EditableNumberField";
import { EditableSelectField } from "@/components/InlineEditable/EditableSelectField";

interface SidingColor {
  id: string;
  name: string;
  colorCode: string;
  imageUrl: string;
  additionalPrice: number;
  material: string;
  allowedStyles: string;
}

interface PageProps {
  params: Promise<{ clientId: string }>;
}

export default function SidingDetailsPage({ params }: PageProps) {
  const { clientId } = use(params);
  const [sidingColors, setSidingColors] = useState<SidingColor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { saveField, getSaveStatus } = useRowAutoSave<SidingColor>({
    onSave: async (colorId, field, value) => {
      await fetch(`/api/clients/${clientId}/siding-colors/${colorId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      
      // Update local state optimistically
      setSidingColors((prev) =>
        prev.map((color) =>
          color.id === colorId ? { ...color, [field]: value } : color
        )
      );
    },
  });

  useEffect(() => {
    loadData();
  }, [clientId]);

  const loadData = async () => {
    try {
      const response = await fetch(`/api/clients/${clientId}/siding-colors`);
      setSidingColors(await response.json());
    } catch (error) {
      console.error("Error loading siding colors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sidingTypeOptions = [
    { value: "Wood Paint", label: "Wood Paint" },
    { value: "Vinyl", label: "Vinyl" },
    { value: "Metal", label: "Metal" },
  ];

  const addColor = async () => {
    try {
      const response = await fetch(`/api/clients/${clientId}/siding-colors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "New Siding Color",
          colorCode: "#000000",
          imageUrl: "",
          additionalPrice: 0,
          material: "Wood",
          allowedStyles: "",
        }),
      });
      const newColor = await response.json();
      setSidingColors((prev) => [...prev, newColor]);
    } catch (error) {
      console.error("Error adding siding color:", error);
    }
  };

  const deleteColor = async (colorId: string) => {
    if (!confirm("Are you sure you want to delete this siding color?")) return;
    
    try {
      await fetch(`/api/clients/${clientId}/siding-colors/${colorId}`, {
        method: "DELETE",
      });
      setSidingColors((prev) => prev.filter((color) => color.id !== colorId));
    } catch (error) {
      console.error("Error deleting siding color:", error);
    }
  };

  const materialOptions = [
    { value: "Wood", label: "Wood" },
    { value: "Vinyl", label: "Vinyl" },
    { value: "Metal", label: "Metal" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-myshed-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading siding colors...</p>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">E. Siding Details</h1>
            <p className="text-gray-600">Configure siding color options. Target: 23 colors (13 wood + 10 vinyl).</p>
          </div>
          <button
            onClick={addColor}
            className="px-6 py-3 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors shadow-sm flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Color</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">Siding Colors Progress</h3>
          <span className="text-2xl font-bold text-myshed-primary">{sidingColors.length}/23 colors</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-myshed-primary h-3 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (sidingColors.length / 23) * 100)}%` }}
          />
        </div>
      </div>

      {/* Empty State */}
      {sidingColors.length === 0 ? (
        <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <span className="text-4xl">🎨</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No siding colors yet</h3>
          <p className="text-gray-600 mb-6">Add your first siding color option.</p>
          <button
            onClick={addColor}
            className="px-6 py-3 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors"
          >
            Add Color
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
                    Color Preview
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Color Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Siding Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Material
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Hex Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Image URL
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Additional Price
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
                {sidingColors.map((color) => (
                  <tr key={color.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div
                        className="w-12 h-12 rounded border-2 border-gray-300 shadow-sm"
                        style={{ backgroundColor: color.colorCode || "#000000" }}
                        title={color.colorCode}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <EditableTextField
                        value={color.name}
                        onChange={(value) => saveField(color.id, "name", value)}
                        placeholder="Color name"
                        className="w-full"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <EditableSelectField
                        value={color.material === "Wood" ? "Wood Paint" : color.material === "Vinyl" ? "Vinyl" : "Metal"}
                        options={sidingTypeOptions}
                        onChange={(value: string) => {
                          const materialValue = value === "Wood Paint" ? "Wood" : value;
                          saveField(color.id, "material", materialValue);
                        }}
                        className="w-32"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <EditableSelectField
                        value={color.material}
                        options={materialOptions}
                        onChange={(value: string) => saveField(color.id, "material", value)}
                        className="w-32"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <EditableColorField
                        value={color.colorCode || "#000000"}
                        onChange={(value) => saveField(color.id, "colorCode", value)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <EditableTextField
                        value={color.imageUrl || ""}
                        onChange={(value) => saveField(color.id, "imageUrl", value)}
                        placeholder="https://..."
                        className="w-full min-w-[200px]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <EditableNumberField
                        value={color.additionalPrice || 0}
                        onChange={(value) => saveField(color.id, "additionalPrice", value)}
                        min={0}
                        prefix="$"
                        className="w-32"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <SaveStatusIndicator status={getSaveStatus(color.id)} />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteColor(color.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete color"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <a
          href={`/client/${clientId}/roof-details`}
          className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Previous</span>
        </a>
        <a
          href={`/client/${clientId}/trim-details`}
          className="px-6 py-3 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors flex items-center space-x-2"
        >
          <span>Next: Trim Details</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
