import React from 'react';
import { Card, Typography, Checkbox, Input, Button } from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const ReservationsAgreement = () => {
  return (
    <div className='w-[800px] mx-auto shadow-md p-4'
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Text strong style={{ fontSize: 20 }}>Reservations Agreement</Text>
       
        <Link  to={'/restaurant-details'} >
        <Button icon={<CloseOutlined />} shape="circle" size="small" />
        </Link>
      </div>

      <Text style={{ marginBottom: 4, display: 'block' }}>INDOOR TABLES</Text>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Maximum 35"
          suffix={<Button icon={<EditOutlined />} type="text" />}
          style={{ borderRadius: 8, backgroundColor: '#f0f0f0', border: 'none' }}
        />
      </div>

      <Text style={{ marginBottom: 4, display: 'block' }}>OUTDOOR TABLES</Text>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Maximum 35"
          suffix={<Button icon={<EditOutlined />} type="text" />}
          style={{ borderRadius: 8, backgroundColor: '#f0f0f0', border: 'none' }}
        />
      </div>

      <Text style={{ marginBottom: 4, display: 'block' }}>INDOOR TABLES</Text>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Minimum 35"
          suffix={<Button icon={<EditOutlined />} type="text" />}
          style={{ borderRadius: 8, backgroundColor: '#f0f0f0', border: 'none' }}
        />
      </div>

      <Text style={{ marginBottom: 4, display: 'block' }}>OUTDOOR TABLES</Text>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Minimum 35"
          suffix={<Button icon={<EditOutlined />} type="text" />}
          style={{ borderRadius: 8, backgroundColor: '#f0f0f0', border: 'none' }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 4, display: 'block' }}>CANCELLATION FEE WILL BE CHARGED?</Text>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Checkbox style={{ marginBottom: 8 }}>YES</Checkbox>
          <Checkbox>NO</Checkbox>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 4, display: 'block' }}>
          IF A USER CANCEL THEIR RESERVATION AFTER RESERVING A TABLE, DO YOU CHARGE ANY CANCELLATION FEES, AND IF YOU DO, PLEASE FILL IN THE BLANK BOX TO GIVE YOUR OPINION.
        </Text>
        <Text style={{ marginBottom: 4, display: 'block' }}>CANCELLATION FEE</Text>
        <Input
          placeholder="$$"
          suffix={<Button icon={<EditOutlined />} type="text" />}
          style={{ borderRadius: 8, backgroundColor: '#f0f0f0', border: 'none' }}
        />
      </div>
    </div>
  );
};

export default ReservationsAgreement;