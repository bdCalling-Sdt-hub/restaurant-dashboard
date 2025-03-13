import React from 'react';
import { Input, Typography, Button, Card } from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const BusinessHours = () => {
  return (
    <div
     className='w-[800px] mx-auto shadow-xl p-4'  
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Text strong style={{ fontSize: 20 }}>Business Hours</Text>
       
        <Link to={'/restaurant-details'}>  <Button icon={<CloseOutlined />} shape="circle" size="small" />   </Link>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 4, display: 'block' }}>Regular hours</Text>
        <Input
          placeholder="9:00 AM - 20:00 PM"
          suffix={<Button icon={<EditOutlined />} type="text" />}
          style={{ borderRadius: 8, backgroundColor: '#f0f0f0', border: 'none' }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 4, display: 'block' }}>holiday hours</Text>
        <Input
          placeholder="8:00 AM - 21:00 PM "
          suffix={<Button icon={<EditOutlined />} type="text" />}
          style={{ borderRadius: 8, backgroundColor: '#f0f0f0', border: 'none' }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 4, display: 'block' }}>Average price range</Text>
        <Input
          placeholder="$$"
          suffix={<Button icon={<EditOutlined />} type="text" />}
          style={{ borderRadius: 8, backgroundColor: '#f0f0f0', border: 'none' }}
        />
      </div>
    </div>
  );
};

export default BusinessHours;