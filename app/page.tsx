import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const clients = await prisma.client.findMany({
    select: {
      id: true,
      slug: true,
      companyName: true,
      ownerName: true,
      overallProgress: true,
      completedFields: true,
      totalFields: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-myshed-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MyShed Onboarding Portal</h1>
                <p className="text-sm text-gray-500">Customer Data Collection</p>
              </div>
            </div>
            <Link
              href="/client/new"
              className="px-4 py-2 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors"
            >
              + New Client
            </Link>
          </div>
        </div>
      </header>

      {/* Client List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Active Clients</h2>
            <p className="text-sm text-gray-500 mt-1">
              {clients.length} {clients.length === 1 ? "client" : "clients"} in the system
            </p>
          </div>

          {clients.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No clients yet</h3>
              <p className="text-gray-500 mb-6">Get started by creating your first client onboarding.</p>
              <Link
                href="/client/new"
                className="inline-flex items-center px-4 py-2 bg-myshed-primary text-white rounded-lg hover:bg-myshed-secondary transition-colors"
              >
                + Create First Client
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {clients.map((client) => (
                <Link
                  key={client.id}
                  href={`/client/${client.slug}`}
                  className="block px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{client.companyName}</h3>
                      <p className="text-sm text-gray-500 mt-1">{client.ownerName}</p>
                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                        <span>
                          Created {new Date(client.createdAt).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span>
                          {client.completedFields} of {client.totalFields} fields completed
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-myshed-primary">
                          {client.overallProgress.toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-500">Complete</div>
                      </div>
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-3 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-myshed-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${client.overallProgress}%` }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
