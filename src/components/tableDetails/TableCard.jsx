import DeleteTableModal from "../modal/table/DeleteTableModal"
import EditTableModal from "../modal/table/EditTableModal"

const TableCard = ({table}) => {
  return (
    <>
       <div
              className={`border p-4 rounded-lg shadow-sm flex justify-between items-center ${
                table?.seats === 0 ? "bg-red-100 border-red-300" : "bg-white"
              }`}
            >
              <div>
                <h2 className="text-lg font-semibold">{table.name}</h2>
                <p className="text-sm text-gray-600">Seats: {table.seats}</p>
              </div>
              {table?.seats === 0 ? (
                    <h1 className="text-red-600">No Seats Available</h1>
              ) : (
                <div className="flex space-x-2">
                  <EditTableModal table={table} />
                  <DeleteTableModal tableId={table?._id} />
                </div>
              )}
            </div>
    </>
  )
}

export default TableCard