export default function MenuLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-secondary rounded w-48 mb-8"></div>
        
        <div className="mb-8">
          <div className="h-6 bg-secondary rounded w-32 mb-4"></div>
          <div className="flex gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-secondary rounded w-24"></div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <div className="h-48 bg-secondary"></div>
              <div className="p-4">
                <div className="h-6 bg-secondary rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-secondary rounded w-full mb-3"></div>
                <div className="flex items-center justify-between">
                  <div className="h-6 bg-secondary rounded w-16"></div>
                  <div className="h-8 bg-secondary rounded w-24"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 