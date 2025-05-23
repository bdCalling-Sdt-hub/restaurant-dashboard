import { useGetTotalIncomeQuery } from "../../redux/features/dashboard/dashboardApi";

const DashboardPage = () => {
  const { data, isLoading } = useGetTotalIncomeQuery(undefined);
  console.log(data?.data?.total);

  return (
    <>
      <div className="flex items-center justify-center gap-x-5">
        <div className="w-2/5">
          <div className="bg-gray-100 rounded-lg p-6 shadow-md font-sans">
            <h2 className="text-xl font-semibold mb-4">Total Income</h2>
            <div className="text-4xl text-green-500 font-bold mb-6">
              {
                isLoading ? "$0" : (
                  <>
                    ${data?.data?.total}
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
