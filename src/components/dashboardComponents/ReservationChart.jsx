import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Day 1', reservations: 200 },
  { name: 'Day 2', reservations: 180 },
  { name: 'Day 3', reservations: 160 },
  { name: 'Day 4', reservations: 155 },
  { name: 'Day 5', reservations: 150 },
  { name: 'Day 6', reservations: 145 },
  { name: 'Day 7', reservations: 140 },
  { name: 'Day 8', reservations: 135 },
  { name: 'Day 9', reservations: 130 },
  { name: 'Day 10', reservations: 125 },
  { name: 'Day 11', reservations: 120 },
  { name: 'Day 12', reservations: 130 },
  { name: 'Day 13', reservations: 140 },
  { name: 'Day 14', reservations: 150 },
  { name: 'Day 15', reservations: 155 },
  { name: 'Day 16', reservations: 150 },
  { name: 'Day 17', reservations: 140 },
  { name: 'Day 18', reservations: 130 },
  { name: 'Day 19', reservations: 120 },
  { name: 'Day 20', reservations: 100 },
];

const ReservationChart = () => {
  return (
    <div className="bg-gray-100 rounded-lg p-6  shadow-md font-sans">
      <h2 className="text-xl font-semibold mb-4">Daily Reservation</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[50, 200]} />
            <Tooltip />
            <Line type="monotone" dataKey="reservations" stroke="red" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReservationChart;