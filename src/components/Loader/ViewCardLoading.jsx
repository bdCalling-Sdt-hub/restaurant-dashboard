
const ViewCardLoading = () => {
  return (
    <div className="p-6 rounded-xl shadow-md bg-white w-full max-w-xl space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="h-6 w-20 bg-green-100 rounded" />
      </div>

      {/* Time */}
      <div className="h-4 w-40 bg-gray-200 rounded" />

      <hr />

      {/* Customer Details Title */}
      <div className="h-4 w-40 bg-gray-200 rounded" />

      {/* Customer Info */}
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 bg-gray-200 rounded-full" />
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-48 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
      </div>

      <hr />

      {/* Reserved Tables Title */}
      <div className="h-4 w-48 bg-gray-200 rounded" />

      {/* Table Blocks */}
      <div className="flex flex-wrap gap-4">
        {Array(4).fill(0).map((_, i) => (
          <div
            key={i}
            className="w-24 h-16 bg-blue-50 rounded-lg flex flex-col justify-center items-center space-y-2 p-2"
          >
            <div className="h-4 w-10 bg-gray-200 rounded" />
            <div className="h-4 w-12 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCardLoading;
