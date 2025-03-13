import React from 'react';
import { Button, Checkbox, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';


const { Text } = Typography;


const Cuisine= () => {
  const cuisineOptions = [
    'AMERICAN',
    'ITALIAN',
    'FRNACE', // Typo in the original image, should be 'FRANCE'
    'EUROPEAN',
    'MEXICAN',
    'CHINESE',
  ];

  return (
    <div className='w-[500px] mx-auto shadow-xl p-4'  >
      <div className="flex justify-between items-center mb-4">
       
        <Text strong style={{ fontSize: 20 }}>Cuisine</Text>
       
        <Link to={'/restaurant-details'}>  <Button icon={<CloseOutlined />} shape="circle" size="small" />   </Link>
      
      </div>
      {cuisineOptions.map((option) => (
        <div key={option} className="mb-2">
          <Checkbox className="text-gray-700">
            {option}
          </Checkbox>
        </div>
      ))}
    </div>
  );
};

export default Cuisine;