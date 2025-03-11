import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['red', 'black', 'lightgray'];

const data = [
  { name: 'Table Reserved', value: 30 },
  { name: 'Food', value: 30 },
  { name: 'Others', value: 40 },
];

const IncomeCard = () => {
  return (
    <div className="bg-gray-100 rounded-lg p-6  shadow-md font-sans">
      <h2 className="text-xl font-semibold mb-4 text-center">Total Income</h2>
      <div className="relative w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg">
          $80,000
        </div>
      </div>
      <div className="flex justify-around mt-5">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            {entry.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeCard;