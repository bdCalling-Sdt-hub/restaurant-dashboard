import React from 'react';
import { Card, Typography, Checkbox, Input, Button } from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const Party = () => {
  return (
    <div
     className='w-[800px] shadow-md mx-auto p-4'
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Text strong style={{ fontSize: 20 }}>Party</Text>
        
        <Link to={'/restaurant-details'}> 
        <Button icon={<CloseOutlined />} shape="circle" size="small" />
        </Link>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 4, display: 'block' }}>HOURLY SERVICE</Text>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Checkbox style={{ marginBottom: 8 }}>YES</Checkbox>
          <Checkbox>NO</Checkbox>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 4, display: 'block' }}>ADVANCE RESERVATION PERIOD</Text>
        <Input
          placeholder="Maximum days in advance"
          suffix={<Button icon={<EditOutlined />} type="text" />}
          style={{ borderRadius: 8, backgroundColor: '#f0f0f0', border: 'none' }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 4, display: 'block' }}>ADVANCE RESERVATION PERIOD</Text>
        <Input
          placeholder="Minimum hours before"
          suffix={<Button icon={<EditOutlined />} type="text" />}
          style={{ borderRadius: 8, backgroundColor: '#f0f0f0', border: 'none' }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 4, display: 'block' }}>MAXIMUM PARTY SIZE</Text>
        <Input
          placeholder="45"
          suffix={<Button icon={<EditOutlined />} type="text" />}
          style={{ borderRadius: 8, backgroundColor: '#f0f0f0', border: 'none' }}
        />
      </div>
    </div>
  );
};

export default Party;