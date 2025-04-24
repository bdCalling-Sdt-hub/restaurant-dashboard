const TableBooking = () => {
  return (
    <>
      <div className="flex h-[580px]">
        <div className="w-full p-6 bg-blue-50 border border-blue-200 rounded-2xl shadow-sm text-center">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            Please Complete Selection
          </h2>
          <p className="text-sm text-blue-700">
            To view available tables, please select a{" "}
            <span className="font-medium">date</span>,{" "}
            <span className="font-medium">schedule</span>, and{" "}
            <span className="font-medium">dining option</span> from the left
            panel.
          </p>
        </div>
      </div>
    </>
  );
};

export default TableBooking;
