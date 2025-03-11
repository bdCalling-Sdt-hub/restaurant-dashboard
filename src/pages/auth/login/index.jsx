import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons'; 
import 'antd/dist/reset.css'; 
import logo from '../../../../public/elhagz.png';
import sign from '../../../../public/signin.png';
import { Link } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

const { Title } = Typography;

const LoginPage = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className="bg-[#f6f6f6]">
      <div className="max-w-7xl block md:flex h-screen items-center mx-auto">
        {/* Left side: Login Form */}
        <div className=" w-full text-center md:text-left md:w-1/2 p-8">
          <div className="mb-8">
            <img src={logo} alt="Elhagz Logo" className="w-[106px] ml-36 " />
          </div>
          <div>
            <Title level={2} className="text-2xl font-semibold mb-4">Login</Title>
            <p className="text-gray-600 mb-6">Kickstart your night life journey with Tap In!</p>
          </div>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            className="w-full max-w-sm"
          >
            <Form.Item
              label={<span className='text-black font-semibold text-lg' >Email</span>}
              name="email"
              rules={[{ required: true, message: 'Please enter your email!' }]}
            >
              <Input 
                placeholder="Enter Email" 
                prefix={<MdEmail className='text-[#5C5C5C]'  />} 
                className="!border-black border-2 rounded-md p-2"
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
             <div className='flex justify-end'>
             <Link to={'/forgot-password'} className="!text-black font-semibold" >
                Forgot Password?
              </Link>
             </div>
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" className="w-full !bg-red-500 hover:bg-red-600 border-0 rounded-md p-2 !text-white">
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* Right side: Image */}
          <div className="w-full hidden md:block md:w-[616px]">
            <img src={sign} alt="Cafe" className="h-full w-full object-cover" />
          </div>
      
      </div>
    </div>
  );
};

export default LoginPage;
