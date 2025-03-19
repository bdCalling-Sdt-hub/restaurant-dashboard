import React from 'react';
import { Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import logo from '../../../public/elhagz.png';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const VerificationForm = () => {
  return (
    <div className="max-w-xl w-full p-8 bg-white ">
      {/* Logo */}
        <div className="mb-8">
                 <img src={logo} alt="Elhagz Logo" className="w-[106px] ml-36 " />
               </div>

      {/* Verification Title */}
      <Link to={'/forgot-password'}>
      <FaRegArrowAltCircleLeft/></Link>
      <div className='my-4'>
        <h1 className="text-3xl font-bold">Verification</h1>
      </div>

      {/* Instructions */}
      <p className="text-gray-600 mb-6">
        Please enter the 6 digit verification code we sent to Andric@gmail.com
      </p>

      {/* Input Fields */}
      <div className="grid grid-cols-6 gap-2 mb-6">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <Input
            key={num}
            className="text-center custom-input" 
            placeholder={num}
            maxLength={1}
          />
        ))}
      </div>




      {/* Success Message (Conditional - Example) */}
      <p className="text-red-500 mb-6">
        The code you entered is correct. Please proceed to recover your
        account.
      </p>

      {/* Verify Button */}
      <Link to={'/login'}>
      <Button className="w-full !bg-red-500 hover:bg-red-600 border-0 rounded-md p-2 !text-white" danger size="large" block>
        Verify
      </Button>
      </Link>
    </div>
  );
};

export default VerificationForm;