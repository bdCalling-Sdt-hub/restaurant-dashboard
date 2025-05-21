
const RestaurantLoading = () => {
  return (
    <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg bg-white animate-pulse">
      <div className="h-64 bg-gray-300"></div>

      <div className="flex flex-col md:flex-row justify-between p-6 gap-8">
        {/* Left Column */}
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <div className="w-32 h-4 bg-gray-300 rounded"></div>
            <div className="w-48 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="w-24 h-4 bg-gray-300 rounded"></div>
            <div className="w-36 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="w-20 h-4 bg-gray-300 rounded"></div>
            <div className="w-40 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="w-28 h-4 bg-gray-300 rounded"></div>
            <div className="w-48 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <div className="w-24 h-4 bg-gray-300 rounded"></div>
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="w-36 h-4 bg-gray-300 rounded"></div>
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="w-20 h-4 bg-gray-300 rounded"></div>
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantLoading;
