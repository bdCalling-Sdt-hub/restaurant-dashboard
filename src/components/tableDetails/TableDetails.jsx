import { RiDeleteBin6Line } from "react-icons/ri";
import EditTableModal from "../modal/table/EditTableModal";

const TableDetails = ({ tables }) => {
  return (
    <>
      <div className="mx-auto bg-white shadow-lg rounded-lg p-4 h-[600px] overflow-y-scroll">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tables.map((table, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-sm flex justify-between items-center bg-white"
            >
              <div>
                <h2 className="text-lg font-semibold">{table.name}</h2>
                <p className="text-sm text-gray-600">Seats: {table.seats}</p>
              </div>
              <div className="flex space-x-2">
                <EditTableModal table={table}/>
                <button
                  className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 hover:border-red-300 p-2 rounded-md transition-colors"
                  title="Delete"
                >
                  <RiDeleteBin6Line size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TableDetails;
