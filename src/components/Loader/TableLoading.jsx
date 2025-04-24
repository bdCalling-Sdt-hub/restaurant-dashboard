const TableLoading = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4 h-[600px] overflow-y-scroll">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-sm flex justify-between items-center bg-white animate-pulse"
            >
              <div>
                <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-8 w-16 bg-gray-300 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TableLoading;
