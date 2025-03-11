import React from 'react';
import {Typography } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles
import { Link } from 'react-router-dom';

const { Text } = Typography;

const HeaderPart = () => {
  return (
    <div className="bg-[#F6F6F6] p-4 flex items-center justify-between ">
      {/* Logo Section */}
      <Link to={'/'}>
        <img src="elhagz.png" alt="Logo" className="h-20 w-20 mr-4" /> 
      </Link>
      {/* User Section */}
      <div className="flex items-center">
        <img src="admin.png" alt="User" className="mr-2 w-16 h-16" /> 
        <div>
          <Text  className='text-black' >Eyasin</Text>
          <br/>
          <Text className="font-semibold" >Admin</Text>
        </div>
      </div>
    </div>
  );
};

export default HeaderPart;