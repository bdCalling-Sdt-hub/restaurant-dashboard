import { useParams } from "react-router-dom";
import { useGetTablesByScheduleAndDiningQuery } from "../../redux/features/table/tableApi";
import TableDetailsLoading from "../../components/Loader/TableDetailsLoading";
import TableDetails from "../../components/tableDetails/TableDetails";

const TableDetailsPage = () => {
  const { scheduleId, diningId } = useParams();
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
        <TableDetailsLoading />
      ) : (
        <>
          {tables?.length > 0 ? (
            <TableDetails tables={tables} data={data?.data}/>
          ) : (
            <div className="h-[580px]">
              <div className="w-full p-6 bg-red-50 border border-red-200 rounded-2xl shadow-sm text-center">
                <h2 className="text-xl font-semibold text-red-800 mb-2">
                  No Tables Available
                </h2>
                <p className="text-sm text-red-700">
                  Sorry, we couldn't find any available tables for the selected{" "}
                  <span className="font-medium">date</span>,{" "}
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

export default TableDetailsPage;
