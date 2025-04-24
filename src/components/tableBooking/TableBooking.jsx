import React from 'react';

const TableBooking = () => {
    const tables = Array.from({ length: 10 }, (_, i) => ({
        name: `Table ${i + 1}`,
        seats: 2 + (i % 6), // Example logic for seat count
      }));
    return (
      <>
        {/* <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4 h-[600px] overflow-y-scroll">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tables.map((table, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow-sm flex justify-between items-center bg-white"
          >
            <div>
              <h2 className="text-lg font-semibold">{table.name}</h2>
              <p className="text-sm text-gray-600">Seats: {table.seats}</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
              Book
            </button>
          </div>
        ))}
      </div>
    </div> */}
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