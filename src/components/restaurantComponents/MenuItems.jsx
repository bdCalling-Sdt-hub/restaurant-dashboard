import React from 'react';
import { Card, Typography, Rate, Button } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';

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
      image: 'https://via.placeholder.com/150', // Replace with your image URL
    },
    {
      id: 2,
      category: 'ITALIAN',
      name: 'Chese burger',
      description: '100 gr meat + onion + tomato + Lettuce cheese',
      price: 15.00,
      rating: 4.5,
      image: 'https://via.placeholder.com/150', // Replace with your image URL
    },
    {
      id: 3,
      category: 'MEXICAN',
      name: 'Chese burger',
      description: '100 gr meat + onion + tomato + Lettuce cheese',
      price: 20.00,
      rating: 4.5,
      image: 'https://via.placeholder.com/150', // Replace with your image URL
    },
    {
      id: 4,
      category: 'MEXICAN',
      name: 'Chese burger',
      description: '100 gr meat + onion + tomato + Lettuce cheese',
      price: 15.00,
      rating: 4.5,
      image: 'https://via.placeholder.com/150', // Replace with your image URL
    },
  ];

  return (
    <Card
      style={{
        width: 400, // Adjust width as needed
        borderRadius: 10,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
      bodyStyle={{ padding: 24 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Text strong style={{ fontSize: 20 }}>Menu</Text>
        <Button icon={<CloseOutlined />} shape="circle" size="small" />
      </div>

      {['ITALIAN', 'MEXICAN'].map((category) => (
        <div key={category}>
          <Text strong style={{ display: 'block', marginBottom: 16 }}>{category}</Text>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            {menuItems
              .filter((item) => item.category === category)
              .map((item) => (
                <Card
                  key={item.id}
                  style={{ borderRadius: 8, border: '1px solid #f0f0f0' }}
                  bodyStyle={{ padding: 16 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <Rate disabled defaultValue={item.rating} count={1} style={{ fontSize: 14 }} />
                    <Text style={{ marginLeft: 4, fontSize: 14 }}>{item.rating}</Text>
                  </div>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 4, marginBottom: 8 }}
                  />
                  <Text strong style={{ display: 'block', marginBottom: 4 }}>{item.name}</Text>
                  <Text style={{ fontSize: 12, marginBottom: 8 }}>{item.description}</Text>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text strong style={{ color: 'red' }}>${item.price.toFixed(2)}</Text>
                    <Button icon={<EditOutlined />} type="text" />
                  </div>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </Card>
  );
};

export default MenuItems;