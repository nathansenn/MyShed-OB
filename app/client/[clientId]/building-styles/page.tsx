"use client";

import { use, useState, useEffect, Fragment } from "react";
import { useRowAutoSave } from "@/hooks/useRowAutoSave";
import { SaveStatusIndicator } from "@/components/InlineEditable/SaveStatusIndicator";
import { EditableTextField } from "@/components/InlineEditable/EditableTextField";
import { EditableImageSelectField } from "@/components/InlineEditable/EditableImageSelectField";
import { EditableNumberField } from "@/components/InlineEditable/EditableNumberField";
import { EditableSelectField } from "@/components/InlineEditable/EditableSelectField";
import { HoverEnlargeImage } from "@/components/InlineEditable/HoverEnlargeImage";

interface PricingMatrix {
  id: string;
  width: number;
  depth: number;
  material: string;
  basePrice: number;
  sku: string;
}

interface BuildingStyle {
  id: string;
  name: string;
  myshedCatalogCode: string;
  description: string;
  images: string;
  progress: number;
  status: string;
}

interface PageProps {
  params: Promise<{ clientId: string }>;
}

export default function BuildingStylesPage({ params }: PageProps) {
  const { clientId } = use(params);
  const [styles, setStyles] = useState<BuildingStyle[]>([]);
  const [catalogStyles, setCatalogStyles] = useState<any[]>([]);
  const [pricingData, setPricingData] = useState<Record<string, PricingMatrix[]>>({});
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [showCatalog, setShowCatalog] = useState(false);

  const { saveField, getSaveStatus } = useRowAutoSave<BuildingStyle>({
    onSave: async (styleId, field, value) => {
      await fetch(`/api/clients/${clientId}/building-styles/${styleId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      
      // Update local state optimistically
      setStyles((prev) =>
        prev.map((style) =>
          style.id === styleId ? { ...style, [field]: value } : style
        )
      );
    },
  });

  const { saveField: savePricingField, getSaveStatus: getPricingSaveStatus } = useRowAutoSave<PricingMatrix>({
    onSave: async (pricingId, field, value) => {
      // Find which style this pricing belongs to
      const styleId = Object.keys(pricingData).find(sid => 
        pricingData[sid].some(p => p.id === pricingId)
      );
      
      if (styleId) {
        await fetch(`/api/clients/${clientId}/building-styles/${styleId}/pricing/${pricingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [field]: value }),
        });
        
        // Update local state optimistically
        setPricingData((prev) => ({
          ...prev,
          [styleId]: prev[styleId].map((p) =>
            p.id === pricingId ? { ...p, [field]: value } : p
          ),
        }));
      }
    },
  });

  useEffect(() => {
    loadData();
  }, [clientId]);

  const loadData = async () => {
    try {
      const [stylesRes, catalogRes] = await Promise.all([
        fetch(`/api/clients/${clientId}/building-styles`),
        fetch(`/api/catalog/building-styles`),
      ]);
      const stylesData = await stylesRes.json();
      setStyles(stylesData);
      setCatalogStyles(await catalogRes.json());

      // Load pricing data for all styles
      const pricingPromises = stylesData.map((style: BuildingStyle) =>
        fetch(`/api/clients/${clientId}/building-styles/${style.id}/pricing`)
          .then(res => res.json())
          .then(data => ({ styleId: style.id, pricing: data }))
          .catch(() => ({ styleId: style.id, pricing: [] }))
      );
      
      const pricingResults = await Promise.all(pricingPromises);
      const pricingMap: Record<string, PricingMatrix[]> = {};
      pricingResults.forEach(({ styleId, pricing }) => {
        pricingMap[styleId] = pricing;
      });
      setPricingData(pricingMap);
    } catch (error) {
      console.error("Error loading building styles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addFromCatalog = async (catalogStyle: any) => {
    try {
      const response = await fetch(`/api/clients/${clientId}/building-styles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: catalogStyle.name,
          myshedCatalogCode: catalogStyle.code,
          description: `${catalogStyle.name} from MyShed catalog`,
          images: catalogStyle.imageUrl,
        }),
      });
      const newStyle = await response.json();
      setStyles((prev) => [...prev, newStyle]);
      setPricingData((prev) => ({ ...prev, [newStyle.id]: [] }));
      setShowCatalog(false);
    } catch (error) {
      console.error("Error adding building style:", error);
    }
  };

  const deleteStyle = async (styleId: string) => {
    if (!confirm("Are you sure you want to delete this building style?")) return;

    try {
      await fetch(`/api/clients/${clientId}/building-styles/${styleId}`, {
        method: "DELETE",
      });
      setStyles((prev) => prev.filter((style) => style.id !== styleId));
      setPricingData((prev) => {
        const newData = { ...prev };
        delete newData[styleId];
        return newData;
      });
    } catch (error) {
      console.error("Error deleting building style:", error);
    }
  };

  const toggleExpand = (styleId: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(styleId)) {
        newSet.delete(styleId);
      } else {
        newSet.add(styleId);
      }
      return newSet;
    });
  };

  const getTotalSizes = (styleId: string) => {
    return pricingData[styleId]?.length || 0;
  };

  const getSidingOptions = (styleId: string) => {
    const materials = new Set(pricingData[styleId]?.map((p) => p.material) || []);
    return Array.from(materials).join(", ") || "None";
  };

  const addPricing = async (styleId: string) => {
    try {
      const response = await fetch(`/api/clients/${clientId}/building-styles/${styleId}/pricing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          width: 8,
          depth: 8,
          material: "Wood",
          basePrice: 0,
          sku: "",
        }),
      });
      const newPricing = await response.json();
      setPricingData((prev) => ({
        ...prev,
        [styleId]: [...(prev[styleId] || []), newPricing],
      }));
    } catch (error) {
      console.error("Error adding pricing:", error);
    }
  };

  const deletePricing = async (styleId: string, pricingId: string) => {
    if (!confirm("Are you sure you want to delete this pricing entry?")) return;

    try {
      await fetch(`/api/clients/${clientId}/building-styles/${styleId}/pricing/${pricingId}`, {
        method: "DELETE",
      });
      setPricingData((prev) => ({
        ...prev,
        [styleId]: prev[styleId].filter((p) => p.id !== pricingId),
      }));
    } catch (error) {
      console.error("Error deleting pricing:", error);
    }
  };

  const catalogCodeOptions = [
    { value: "", label: "N/A - Not Assigned", imageUrl: "" },
    ...catalogStyles.map((style) => ({
      value: style.code,
      label: `${style.code} - ${style.name}`,
      imageUrl: style.imageUrl,
    }))
  ];

  // Get MyShed catalog image for a style based on its catalog code
  const getMyshedCatalogImage = (catalogCode: string) => {
    const catalogStyle = catalogStyles.find((s) => s.code === catalogCode);
    return catalogStyle?.imageUrl || "";
  };

  // Get Northwood/Client image - handle both JSON array and string formats
  const getClientImage = (images: string) => {
    if (!images) return "";
    
    try {
      // Try to parse as JSON array
      const parsed = JSON.parse(images);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Fix malformed URLs (missing second slash in https:/)
        const url = parsed[0];
        return url.replace(/^https:\/([^/])/, 'https://$1');
      }
      // Return as-is if not an array
      return images.replace(/^https:\/([^/])/, 'https://$1');
    } catch {
      // If parsing fails, it's already a plain string URL
      // Fix malformed URLs just in case
      return images.replace(/^https:\/([^/])/, 'https://$1');
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
          <p className="text-gray-600">Loading building styles...</p>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">C. Building Styles</h1>
            <p className="text-gray-600">Select and configure building styles. Target: 10 styles.</p>
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

      {/* Progress */}
      <div className="mb-8 bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">Building Styles Progress</h3>
          <span className="text-2xl font-bold text-myshed-primary">{styles.length}/10 styles</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-myshed-primary h-3 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (styles.length / 10) * 100)}%` }}
          />
        </div>
      </div>

      {/* Empty State */}
      {styles.length === 0 ? (
        <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No building styles yet</h3>
          <p className="text-gray-600 mb-6">Get started by selecting styles from the MyShed catalog.</p>
          <button
            onClick={() => setShowCatalog(true)}
            className="px-6 py-3 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors"
          >
            Browse Catalog
          </button>
        </div>
      ) : (
        /* Inline Editable Table with Expandable Pricing */
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-8">
                    
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Images
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Catalog Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Total Sizes
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Siding Options
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
                {styles.map((style) => (
                  <Fragment key={style.id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleExpand(style.id)}
                          className="p-1 text-gray-600 hover:text-myshed-primary transition-colors"
                          title={expandedRows.has(style.id) ? "Collapse pricing" : "Expand pricing"}
                        >
                          <svg
                            className={`w-5 h-5 transition-transform ${expandedRows.has(style.id) ? "rotate-90" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          {/* MyShed Catalog Image */}
                          <div className="flex flex-col items-center">
                            <HoverEnlargeImage
                              key={`myshed-${style.id}-${style.myshedCatalogCode}`}
                              src={getMyshedCatalogImage(style.myshedCatalogCode) || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect fill='%23f3f4f6' width='64' height='64'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='8' text-anchor='middle' x='32' y='32'%3EMyShed%3C/text%3E%3C/svg%3E"}
                              alt="MyShed Catalog"
                              thumbnailClassName="w-16 h-16"
                            />
                            <span className="text-xs text-gray-500 mt-1">MyShed</span>
                          </div>
                          {/* Northwood/Client Image */}
                          <div className="flex flex-col items-center">
                            <HoverEnlargeImage
                              src={getClientImage(style.images) || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect fill='%23f3f4f6' width='64' height='64'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='7' text-anchor='middle' x='32' y='32'%3EClient%3C/text%3E%3C/svg%3E"}
                              alt="Client Image"
                              thumbnailClassName="w-16 h-16"
                            />
                            <span className="text-xs text-gray-500 mt-1">Client</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <EditableTextField
                          value={style.name}
                          onChange={(value) => saveField(style.id, "name", value)}
                          placeholder="Style name"
                          className="w-full"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <EditableImageSelectField
                          value={style.myshedCatalogCode || ""}
                          options={catalogCodeOptions}
                          onChange={(value) => saveField(style.id, "myshedCatalogCode", value)}
                          className="w-full min-w-[250px]"
                        />
                      </td>
                      <td className="px-4 py-3 max-w-md">
                        <EditableTextField
                          value={style.description || ""}
                          onChange={(value) => saveField(style.id, "description", value)}
                          placeholder="Style description"
                          className="w-full"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-semibold text-myshed-primary">
                          {getTotalSizes(style.id)} SKUs
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600">
                          {getSidingOptions(style.id)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <SaveStatusIndicator status={getSaveStatus(style.id)} />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => deleteStyle(style.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete style"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                    {/* Expandable Pricing Matrix */}
                    {expandedRows.has(style.id) && (
                      <tr>
                        <td colSpan={9} className="px-4 py-6 bg-gray-50">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold text-gray-900">
                                📊 Pricing Matrix for {style.name}
                              </h3>
                              <button
                                onClick={() => addPricing(style.id)}
                                className="px-4 py-2 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors text-sm flex items-center space-x-2"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Add Size/Material</span>
                              </button>
                            </div>

                            {pricingData[style.id]?.length === 0 ? (
                              <div className="text-center py-8 text-gray-500">
                                No pricing configured. Click "Add Size/Material" to get started.
                              </div>
                            ) : (
                              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <table className="w-full">
                                  <thead className="bg-gray-100 border-b border-gray-200">
                                    <tr>
                                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                                        Width (ft)
                                      </th>
                                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                                        Depth (ft)
                                      </th>
                                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                                        Material
                                      </th>
                                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                                        Base Price
                                      </th>
                                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                                        SKU
                                      </th>
                                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                                        Status
                                      </th>
                                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                                        Actions
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200">
                                    {pricingData[style.id]?.map((pricing) => (
                                      <tr key={pricing.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2">
                                          <EditableNumberField
                                            value={pricing.width}
                                            onChange={(value) => savePricingField(pricing.id, "width", value)}
                                            min={1}
                                            step={1}
                                            className="w-20"
                                          />
                                        </td>
                                        <td className="px-4 py-2">
                                          <EditableNumberField
                                            value={pricing.depth}
                                            onChange={(value) => savePricingField(pricing.id, "depth", value)}
                                            min={1}
                                            step={1}
                                            className="w-20"
                                          />
                                        </td>
                                        <td className="px-4 py-2">
                                          <EditableSelectField
                                            value={pricing.material}
                                            options={materialOptions}
                                            onChange={(value) => savePricingField(pricing.id, "material", value)}
                                            className="w-32"
                                          />
                                        </td>
                                        <td className="px-4 py-2">
                                          <EditableNumberField
                                            value={pricing.basePrice}
                                            onChange={(value) => savePricingField(pricing.id, "basePrice", value)}
                                            min={0}
                                            prefix="$"
                                            className="w-32"
                                          />
                                        </td>
                                        <td className="px-4 py-2">
                                          <EditableTextField
                                            value={pricing.sku || ""}
                                            onChange={(value) => savePricingField(pricing.id, "sku", value)}
                                            placeholder="SKU"
                                            className="w-full"
                                          />
                                        </td>
                                        <td className="px-4 py-2">
                                          <SaveStatusIndicator status={getPricingSaveStatus(pricing.id)} />
                                        </td>
                                        <td className="px-4 py-2">
                                          <button
                                            onClick={() => deletePricing(style.id, pricing.id)}
                                            className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                            title="Delete pricing"
                                          >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
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
                <h2 className="text-2xl font-bold text-gray-900">MyShed Building Styles Catalog</h2>
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {catalogStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => addFromCatalog(style)}
                    disabled={styles.some((s) => s.myshedCatalogCode === style.code)}
                    className="text-left bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-myshed-primary hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <img
                      src={style.imageUrl}
                      alt={style.name}
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='150'%3E%3Crect fill='%23f3f4f6' width='200' height='150'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='14' text-anchor='middle' x='100' y='75'%3EStyle%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    <div className="p-3">
                      <p className="font-medium text-sm text-gray-900 truncate">{style.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{style.code}</p>
                      {styles.some((s) => s.myshedCatalogCode === style.code) && (
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
          href={`/client/${clientId}/users`}
          className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Previous</span>
        </a>
        <a
          href={`/client/${clientId}/roof-details`}
          className="px-6 py-3 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors flex items-center space-x-2"
        >
          <span>Next: Roof Details</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
