import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import 'antd/dist/reset.css'; 
import logo from '../../../../public/elhagz.png';
import ResetPass from '../../../../public/ResetPassword.png';

import { RiLockPasswordFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const { Title } = Typography; 

const ResetPassword = () => {

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };
  

  return (
    <div className="bg-[#f6f6f6]">
    <div className="max-w-7xl block md:flex h-screen items-center mx-auto">
      {/* Left side: Login Form */}
      <div className=" w-full text-center md:text-left md:w-1/2 p-8">
        <div className="mb-8">
            <Link to={'/login'}>
            <img src={logo} alt="Elhagz Logo" className="w-[106px] ml-36 " />
            </Link>
        </div>
        <div>
          <Title level={2} className="text-2xl font-semibold mb-4">Reset Your Password</Title>
          <p className="text-gray-600 mb-6">Please enter your new password</p>
        </div>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          className="w-full max-w-sm"
        >

<Form.Item
            label={<span className='text-black font-semibold text-lg'>Password</span>}
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password 
              placeholder="Enter Password" 
              prefix={<RiLockPasswordFill className='text-[#5C5C5C]' />} 
              className="!border-black border-2 rounded-md p-2 "
             
            />
          </Form.Item>
        

          <Form.Item
            label={<span className='text-black font-semibold text-lg'>Password</span>}
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password 
              placeholder="Enter Password" 
              prefix={<RiLockPasswordFill className='text-[#5C5C5C]' />} 
              className="!border-black border-2 rounded-md p-2 "
             
            />
          </Form.Item>

          <Form.Item>
           <div p>
           <p className="!text-black font-semibold" >
           *NOTE: Choose a password that is distinctive & you can easily  remember.
            </p>
           </div>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" className="w-full !bg-red-500 hover:bg-red-600 border-0 rounded-md p-2 !text-white">
            Set Password
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Right side: Image */}
        <div className="w-full hidden md:block md:w-[616px]">
          <img src={ResetPass} alt="Cafe" className="h-full w-full object-cover" />
        </div>
    
    </div>
  </div>
  )
}

export default ResetPassword
      