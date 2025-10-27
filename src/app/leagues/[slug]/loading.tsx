export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="bg-white shadow-soft rounded-lg p-8 mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
              <div>
                <div className="h-8 w-48 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="h-10 w-24 bg-gray-300 rounded"></div>
              <div className="h-10 w-24 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Teams skeleton */}
          <div className="bg-white shadow-soft rounded-lg p-6 mb-8">
            <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2"></div>
                  <div className="h-4 w-16 bg-gray-300 rounded mx-auto"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Fixtures skeleton */}
          <div className="bg-white shadow-soft rounded-lg p-6">
            <div className="h-6 w-48 bg-gray-300 rounded mb-4"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      <div>
                        <div className="h-4 w-20 bg-gray-300 rounded mb-1"></div>
                        <div className="h-3 w-16 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="h-4 w-12 bg-gray-300 rounded"></div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="h-4 w-20 bg-gray-300 rounded mb-1"></div>
                        <div className="h-3 w-16 bg-gray-300 rounded"></div>
                      </div>
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
