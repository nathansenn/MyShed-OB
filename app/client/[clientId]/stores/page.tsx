"use client";

import { use, useState, useEffect } from "react";
import { useRowAutoSave } from "@/hooks/useRowAutoSave";
import { SaveStatusIndicator } from "@/components/InlineEditable/SaveStatusIndicator";
import { EditableTextField } from "@/components/InlineEditable/EditableTextField";
import { EditableSelectField } from "@/components/InlineEditable/EditableSelectField";

interface Store {
  id: string;
  name: string;
  address: string;
  zipCode: string;
  phoneNumber: string;
  status: string;
}

interface PageProps {
  params: Promise<{ clientId: string }>;
}

export default function StoresPage({ params }: PageProps) {
  const { clientId } = use(params);
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { saveField, getSaveStatus } = useRowAutoSave<Store>({
    onSave: async (storeId, field, value) => {
      await fetch(`/api/clients/${clientId}/stores/${storeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      
      // Update local state optimistically
      setStores((prev) =>
        prev.map((store) =>
          store.id === storeId ? { ...store, [field]: value } : store
        )
      );
    },
  });

  useEffect(() => {
    loadData();
  }, [clientId]);

  const loadData = async () => {
    try {
      const response = await fetch(`/api/clients/${clientId}/stores`);
      setStores(await response.json());
    } catch (error) {
      console.error("Error loading stores:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending Setup" },
    { value: "closed", label: "Closed" },
  ];

  const addStore = async () => {
    try {
      const response = await fetch(`/api/clients/${clientId}/stores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "New Store",
          address: "",
          zipCode: "",
          phoneNumber: "",
          status: "pending",
        }),
      });
      const newStore = await response.json();
      setStores((prev) => [...prev, newStore]);
    } catch (error) {
      console.error("Error adding store:", error);
    }
  };

  const deleteStore = async (storeId: string) => {
    if (!confirm("Are you sure you want to delete this store?")) return;
    
    try {
      await fetch(`/api/clients/${clientId}/stores/${storeId}`, {
        method: "DELETE",
      });
      setStores((prev) => prev.filter((store) => store.id !== storeId));
    } catch (error) {
      console.error("Error deleting store:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-myshed-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading stores...</p>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">A. Store Information</h1>
            <p className="text-gray-600">Add and configure your store locations. Target: 7 stores.</p>
          </div>
          <button
            onClick={addStore}
            className="px-6 py-3 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors shadow-sm flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Store</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">Stores Progress</h3>
          <span className="text-2xl font-bold text-myshed-primary">{stores.length}/7 stores</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-myshed-primary h-3 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (stores.length / 7) * 100)}%` }}
          />
        </div>
      </div>

      {/* Empty State */}
      {stores.length === 0 ? (
        <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <span className="text-4xl">🏪</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No stores yet</h3>
          <p className="text-gray-600 mb-6">Add your first store location to get started.</p>
          <button
            onClick={addStore}
            className="px-6 py-3 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors"
          >
            Add Store
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
                    Store Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    ZIP Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Save Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stores.map((store) => (
                  <tr key={store.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <EditableTextField
                        value={store.name}
                        onChange={(value) => saveField(store.id, "name", value)}
                        placeholder="Store name"
                        className="w-full"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <EditableTextField
                        value={store.address || ""}
                        onChange={(value) => saveField(store.id, "address", value)}
                        placeholder="Full address"
                        className="w-full min-w-[200px]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <EditableTextField
                        value={store.zipCode || ""}
                        onChange={(value) => saveField(store.id, "zipCode", value)}
                        placeholder="ZIP"
                        className="w-24"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <EditableTextField
                        value={store.phoneNumber || ""}
                        onChange={(value) => saveField(store.id, "phoneNumber", value)}
                        placeholder="(555) 123-4567"
                        className="w-40"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <EditableSelectField
                        value={store.status || "pending"}
                        options={statusOptions}
                        onChange={(value) => saveField(store.id, "status", value)}
                        className="w-40"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <SaveStatusIndicator status={getSaveStatus(store.id)} />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteStore(store.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete store"
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
          href={`/client/${clientId}/color-scheme`}
          className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Previous</span>
        </a>
        <a
          href={`/client/${clientId}/users`}
          className="px-6 py-3 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors flex items-center space-x-2"
        >
          <span>Next: System Users</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
