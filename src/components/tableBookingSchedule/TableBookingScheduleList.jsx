import { useGetTablesByScheduleAndDiningQuery } from "../../redux/features/table/tableApi";
import TableLoading from "../Loader/TableLoading";
import TableBookingModal from "../modal/tableBooking/TableBookingModal";

const TableBookingScheduleList = ({scheduleId, diningId}) => {
    const { data, isLoading } = useGetTablesByScheduleAndDiningQuery(
        {
          scheduleId,
          diningId,
        },
        {
          skip: !scheduleId || !diningId,
        }
      );

      const tables = data?.data?.tables;

    return (
      <>
        {isLoading ? (
          <TableLoading />
        ) : (
          <>
            {tables?.length > 0 ? (
              <div className="mx-auto bg-white shadow-md rounded-lg p-4 h-[600px] overflow-y-scroll">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tables.map((table, index) => (
                    <div
                      key={index}
                      className={`border p-4 rounded-lg shadow-sm flex justify-between items-center ${table?.seats === 0 ? "bg-red-100 border-red-300" : "bg-white"}`}
                    >
                      <div>
                        <h2 className="text-lg font-semibold">{table.name}</h2>
                        <p className="text-sm text-gray-600">
                          Seats: {table.seats}
                        </p>
                      </div>
                      {/* TableBooking Model */}
                      {
                        table?.seats === 0 ?(
                          <h1 className="text-red-600">No Seats Available</h1>
                        ): (
                          <TableBookingModal table={table} disabled={table?.seats === 0}/>
                        )
                      }
                     
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex full h-[580px]">
                <div className="w-full p-6 bg-red-50 border border-red-200 rounded-2xl shadow-sm text-center">
                  <h2 className="text-xl font-semibold text-red-800 mb-2">
                    No Tables Available
                  </h2>
                  <p className="text-sm text-red-700">
                    Sorry, we couldn't find any available tables for the
                    selected <span className="font-medium">date</span>,{" "}
                    <span className="font-medium">schedule</span>, and{" "}
                    <span className="font-medium">dining option</span>.
                  </p>
                  <p className="text-sm text-red-700 mt-2">
                    Please try selecting a different combination or check back
                    later.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </>
    );
};

export default TableBookingScheduleList;