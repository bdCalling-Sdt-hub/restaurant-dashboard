import { useState } from "react";
import ReservationChart from "../../components/dashboardComponents/ReservationChart";
import IncomeCard from "../../components/dashboardComponents/IncomeCard";
import BalanceCard from "../../components/dashboardComponents/BalanceCard";
import DailyOrder from "../../components/dashboardComponents/DailyOrder";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Today");

  const tabs = ["Today", "This Week", "This Month", "This Year"];
  return (
    <div>
     
      <div className="flex justify-end mb-5">
      <div className="flex !space-x-4 bg-gray-100 p-2 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 rounded-lg font-medium transition-all 
            ${
              activeTab === tab
                ? "bg-red-600 !text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
          
      </div>

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
  );
};

export default Dashboard;
