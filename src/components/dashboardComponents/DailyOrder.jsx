import React from 'react';
import { List, Avatar } from 'antd';
import img1 from "../../assets/images/img.png";
import img2 from "../../assets/images/img2.png";

const orderData = [
  {
    title: 'Grill Sandwich',
    price: '$30.00',
    orders: '500',
    image: img1,
  },
  {
    title: 'Chicken Popeyes',
    price: '$20.00',
    orders: '800',
    image: img2,
  },
  {
    title: 'Bison Burgers',
    price: '$50.00',
    orders: '950',
    image: img1,
  },
  {
    title: 'Grill Sandwich',
    price: '$30.00',
    orders: '700',
    image: img2,
  },
];

const DailyOrder = () => {
  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-md font-sans">
      <h2 className="text-xl font-semibold mb-4">Daily Order</h2>
      <div className="flex justify-between mb-4">
        <span className="text-gray-500">Dishes</span>
        <span className="text-gray-500">Orders</span>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={orderData}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.image} className='!rounded-md' />}
              title={<div className="font-semibold">{item.title}</div>}
              description={<div className="text-sm text-red-600 ">{item.price}</div>}
            />
            <div className="font-bold">{item.orders}</div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default DailyOrder;