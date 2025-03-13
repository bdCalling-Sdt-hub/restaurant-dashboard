import React from 'react';
import { Card, Typography, Rate, Button } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const MenuItems = () => {
  const menuItems = [
    {
      id: 1,
      category: 'ITALIAN',
      name: 'Chese burger',
      description: '100 gr meat + onion + tomato + Lettuce cheese',
      price: 20.00,
      rating: 4.5,
      image: '../../../public/respic.png',
    },
    {
      id: 2,
      category: 'ITALIAN',
      name: 'Chese burger',
      description: '100 gr meat + onion + tomato + Lettuce cheese',
      price: 15.00,
      rating: 4.5,
      image: '../../../public/respic.png',
    },
    {
      id: 3,
      category: 'MEXICAN',
      name: 'Chese burger',
      description: '100 gr meat + onion + tomato + Lettuce cheese',
      price: 20.00,
      rating: 4.5,
      image: '../../../public/respic.png',
    },
    {
      id: 4,
      category: 'MEXICAN',
      name: 'Chese burger',
      description: '100 gr meat + onion + tomato + Lettuce cheese',
      price: 15.00,
      rating: 4.5,
      image: '../../../public/respic.png',
    },
  ];

  return (
    <div  className='w-[800px] mx-auto shadow-xl p-4'
      
    >
      <div className='flex justify-between ' >
        <Text strong style={{ fontSize: 20 }}>Menu</Text>
        <Link to={'/restaurant-details'}> <Button icon={<CloseOutlined />} shape="circle" size="small" /> </Link>
      </div>

      {['ITALIAN', 'MEXICAN'].map((category) => (
        <div key={category}>
          <Text strong style={{ display: 'block', marginBottom: 16 }}>{category}</Text>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            {menuItems
              .filter((item) => item.category === category)
              .map((item) => (
                <div
                  key={item.id}
                  className='w-80 '
                >
                  <div >
                    <Rate disabled defaultValue={item.rating} count={1} style={{ fontSize: 14 }} />
                    <Text style={{ marginLeft: 4, fontSize: 14 }}>{item.rating}</Text>
                  </div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-full h-64'
                  />
                  <Text strong style={{ display: 'block', marginBottom: 4 }}>{item.name}</Text>
                  <Text style={{ fontSize: 12, marginBottom: 8 }}>{item.description}</Text>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text strong style={{ color: 'red' }}>${item.price.toFixed(2)}</Text>
                    <Button icon={<EditOutlined style={{color:"red"}} />} type="text" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItems;