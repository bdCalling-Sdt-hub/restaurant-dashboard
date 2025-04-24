import EditTableModal from "../modal/table/EditTableModal";
import DeleteTableModal from "../modal/table/DeleteTableModal";
import convertUTCtimeString from "../../utils/convertUTCtimeString";
import AddTableModal from "../modal/table/AddTableModal";


const TableDetails = ({ tables, data }) => {
  const diningName = data?.diningName;
  const startDateTime = data?.startDateTime;
  const endDateTime = data?.endDateTime;

  return (
    <>
      <div className="bg-white shadow-md rounded-xl p-4 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-2 sm:mb-0 flex">
          <div className="text-lg flex flex-col gap-y-2">
            <span className="font-semibold">Schedule:</span>
            <span className="font-semibold">Dining:</span>
          </div>
          <div className="text-lg flex flex-col gap-y-2">
            <button className="cursor-default bg-purple-100 px-2 ml-1 text-purple-600 border border-purple-300 rounded-md">
              {convertUTCtimeString(startDateTime)} -{" "}
              {convertUTCtimeString(endDateTime)}
            </button>
            <button className="cursor-default bg-yellow-100 px-2 ml-1 text-yellow-600 border border-yellow-300 rounded-md">
              {diningName}
            </button>
          </div>
        </div>

        <AddTableModal/>
      </div>

      <div className="mx-auto bg-white shadow-lg rounded-md p-4 h-[600px] overflow-y-scroll">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tables?.map((table, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-sm flex justify-between items-center bg-white"
            >
              <div>
                <h2 className="text-lg font-semibold">{table.name}</h2>
                <p className="text-sm text-gray-600">Seats: {table.seats}</p>
              </div>
              <div className="flex space-x-2">
                <EditTableModal table={table} />
                <DeleteTableModal tableId={table?._id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TableDetails;
