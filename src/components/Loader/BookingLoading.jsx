const BookingLoading = () => {
    return (
      <div className="flex flex-col md:flex-row gap-4 p-4">
        {/* Left Panel Skeleton */}
        <div className="w-full md:w-1/4 space-y-4 p-4 bg-white rounded shadow">
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
  
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
  
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>

          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
  
        {/* Right Panel Skeleton */}
        <div className="w-full md:w-3/4 p-6 bg-blue-50 rounded border h-[600px] border-blue-200">
          <div className="h-6 w-48 bg-gray-300 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
  
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default BookingLoading;
  