import React from "react";
import { WalletOutlined, BarsOutlined } from "@ant-design/icons"; 
const BalanceCard = () => {
  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-md font-sans">
      <h2 className="text-xl font-semibold mb-4">Total Balance</h2>
      <div className="text-4xl text-green-500 font-bold mb-6">$1,20,000</div>

      <div className="flex items-center mb-4">
        <div className="bg-black rounded-full p-3 mr-4">
          <BarsOutlined className="!text-white text-xl" />
        </div>
        <div>
          <div className="flex gap-x-70  items-center">
            <div className="text-lg font-medium">Total Income</div>
            <div className="text-sm text-gray-500">(+60% Increase)</div>
          </div>
          <div className="text-lg font-medium">$45,500</div>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="bg-red-500 rounded-full p-3 mr-4">
          <WalletOutlined className="!text-white text-xl" />
        </div>
        <div>
          <div className="flex gap-x-70 items-center">
            <div className="text-lg font-medium">Total Expense</div>
            <div className="text-sm text-gray-500">(+70% Increase)</div>
          </div>
          <div className="text-lg font-medium">$65,500</div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
