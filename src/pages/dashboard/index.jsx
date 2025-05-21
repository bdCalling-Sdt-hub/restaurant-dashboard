import ReservationChart from "../../components/dashboardComponents/ReservationChart";
import IncomeCard from "../../components/dashboardComponents/IncomeCard";
import BalanceCard from "../../components/dashboardComponents/BalanceCard";
import DailyOrder from "../../components/dashboardComponents/DailyOrder";

const Dashboard = () => {

  return (
    <>
      <div>
        <div className="flex gap-x-5">
          <div className="w-3/5">
            <IncomeCard />
          </div>
          <div className="w-2/5">
            <BalanceCard />
          </div>
        </div>
        <div className="flex my-5 gap-x-5">
          <div className="w-3/5">
            <ReservationChart />
          </div>
          <div className="w-2/5">
            <DailyOrder />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
