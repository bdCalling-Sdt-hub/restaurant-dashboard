import React from 'react';
import { Input, Typography, Button, Card } from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const SocialMedia = () => {
  return (
    <div
     className='w-[800px] mx-auto shadow-xl p-4'  
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Text strong style={{ fontSize: 20 }}>Social Media</Text>
     
        <Link to={'/restaurant-details'} >     <Button icon={<CloseOutlined />} shape="circle" size="small" /> </Link>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 4, display: 'block' }}>WEBSITE URL</Text>
        <Input
          placeholder="http://www.oustoni.com"
          suffix={<Button icon={<EditOutlined />} type="text" />}
          style={{ borderRadius: 8, backgroundColor: '#f0f0f0', border: 'none' }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 4, display: 'block' }}>SOCIAL MEDIA LINK</Text>
        <Input
          placeholder="http://www.instagram/oustoni.com"
          suffix={<Button icon={<EditOutlined />} type="text" />}
          style={{ borderRadius: 8, backgroundColor: '#f0f0f0', border: 'none' }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 4, display: 'block' }}>SOCIAL MEDIA LINK</Text>
        <Input
          placeholder="http://www.facebook/oustoni.com"
          suffix={<Button icon={<EditOutlined />} type="text" />}
          style={{ borderRadius: 8, backgroundColor: '#f0f0f0', border: 'none' }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 4, display: 'block' }}>SOCIAL MEDIA LINK</Text>
        <Input
          placeholder="http://www.twitter/oustoni.com"
          suffix={<Button icon={<EditOutlined />} type="text" />}
          style={{ borderRadius: 8, backgroundColor: '#f0f0f0', border: 'none' }}
        />
      </div>
    </div>
  );
};

export default SocialMedia;