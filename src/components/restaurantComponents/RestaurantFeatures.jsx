import React from 'react';
import { Card, Typography, Checkbox, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;

const RestaurantFeatures = () => {
  const features = [
    'HANDICAP ACCESSIBLE SEATING',
    'SHISHA',
    'BAR',
    'KID FRIENDLY',
    'FAMILY STYLE',
    'LIVE MUSIC',
    'PARKING',
    'OUTDOOR SEATING',
    'WI-FI',
  ];

  return (
    <div className='mx-auto w-[800px] p-4 shadow-md'
     
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Text strong style={{ fontSize: 20 }}>Restaurant Features</Text>
        <Button icon={<CloseOutlined />} shape="circle" size="small" />
      </div>

      {features.map((feature, index) => (
        <div key={index} style={{ marginBottom: 12 }}>
          <Checkbox>{feature}</Checkbox>
        </div>
      ))}
    </div>
  );
};

export default RestaurantFeatures;