"use client";

import { use, useState, useEffect } from "react";
import { useRowAutoSave } from "@/hooks/useRowAutoSave";
import { SaveStatusIndicator } from "@/components/InlineEditable/SaveStatusIndicator";
import { EditableTextField } from "@/components/InlineEditable/EditableTextField";
import { EditableSelectField } from "@/components/InlineEditable/EditableSelectField";

interface SystemUser {
  id: string;
  role: string;
  fullName: string;
  emailAddress: string;
  phoneNumbers: string;
  salesCommission: string;
  assignedStore: string;
}

interface PageProps {
  params: Promise<{ clientId: string }>;
}

export default function UsersPage({ params }: PageProps) {
  const { clientId } = use(params);
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { saveField, getSaveStatus } = useRowAutoSave<SystemUser>({
    onSave: async (userId, field, value) => {
      await fetch(`/api/clients/${clientId}/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      
      // Update local state optimistically
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, [field]: value } : user
        )
      );
    },
  });

  useEffect(() => {
    loadData();
  }, [clientId]);

  const loadData = async () => {
    try {
      const [usersRes, storesRes] = await Promise.all([
        fetch(`/api/clients/${clientId}/users`),
        fetch(`/api/clients/${clientId}/stores`),
      ]);
      setUsers(await usersRes.json());
      setStores(await storesRes.json());
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addUser = async () => {
    try {
      const response = await fetch(`/api/clients/${clientId}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "Salesperson",
          fullName: "New User",
          emailAddress: "",
          phoneNumbers: "",
          salesCommission: "",
          assignedStore: "",
        }),
      });
      const newUser = await response.json();
      setUsers((prev) => [...prev, newUser]);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await fetch(`/api/clients/${clientId}/users/${userId}`, {
        method: "DELETE",
      });
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const roleOptions = [
    { value: "Administrator", label: "Administrator" },
    { value: "Salesperson", label: "Salesperson" },
    { value: "Sales Manager", label: "Sales Manager" },
    { value: "Driver", label: "Driver" },
    { value: "Manufacturing", label: "Manufacturing" },
  ];

  const storeOptions = [
    { value: "", label: "No store assigned" },
    ...stores.map((store) => ({ value: store.id, label: store.name })),
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-myshed-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">B. System Users</h1>
            <p className="text-gray-600">Add and configure system users. Target: 5 users.</p>
          </div>
          <button
            onClick={addUser}
            className="px-6 py-3 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors shadow-sm flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">Users Progress</h3>
          <span className="text-2xl font-bold text-myshed-primary">{users.length}/5 users</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-myshed-primary h-3 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (users.length / 5) * 100)}%` }}
          />
        </div>
      </div>

      {/* Empty State */}
      {users.length === 0 ? (
        <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <span className="text-4xl">👥</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No users yet</h3>
          <p className="text-gray-600 mb-6">Add your first system user to get started.</p>
          <button
            onClick={addUser}
            className="px-6 py-3 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors"
          >
            Add User
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
                    Full Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email Address
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Phone Numbers
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Assigned Store
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
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <EditableTextField
                        value={user.fullName}
                        onChange={(value) => saveField(user.id, "fullName", value)}
                        placeholder="Full name"
                        className="w-full"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <EditableTextField
                        value={user.emailAddress || ""}
                        onChange={(value) => saveField(user.id, "emailAddress", value)}
                        placeholder="email@example.com"
                        className="w-full"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <EditableSelectField
                        value={user.role}
                        options={roleOptions}
                        onChange={(value) => saveField(user.id, "role", value)}
                        className="w-full"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <EditableTextField
                        value={user.phoneNumbers || ""}
                        onChange={(value) => saveField(user.id, "phoneNumbers", value)}
                        placeholder="(555) 123-4567"
                        className="w-40"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <EditableSelectField
                        value={user.assignedStore || ""}
                        options={storeOptions}
                        onChange={(value) => saveField(user.id, "assignedStore", value)}
                        className="w-full"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <SaveStatusIndicator status={getSaveStatus(user.id)} />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete user"
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
          href={`/client/${clientId}/stores`}
          className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Previous</span>
        </a>
        <a
          href={`/client/${clientId}/building-styles`}
          className="px-6 py-3 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors flex items-center space-x-2"
        >
          <span>Next: Building Styles</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
