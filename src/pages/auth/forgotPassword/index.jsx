import React from "react";
import { Form, Input, Button, Typography } from "antd";
import "antd/dist/reset.css";
import logo from "../../../../public/elhagz.png";
import forgot from "../../../../public/forgot.png";
import { Link } from "react-router-dom";
import { MdEmail, MdKeyboardArrowLeft } from "react-icons/md";

const { Title } = Typography;

const ForgotPassword = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="bg-[#f6f6f6]">
      <div className="max-w-7xl block md:flex h-screen items-center mx-auto">
        {/* Left side: Login Form */}
        <div className=" w-full text-center md:text-left md:w-1/2 p-8">
          <div className="mb-8">
            <img src={logo} alt="Elhagz Logo" className="w-[106px] ml-36 " />
          </div>
          <div className="flex gap-x-2 mb-4 items-center">
            <MdKeyboardArrowLeft size={20} />

            <Link to={"/login"} className="!text-black ">
              Back to login
            </Link>
          </div>
          <div>
            <Title level={2} className="text-2xl font-semibold mb-4">
              Forgot Your Password?
            </Title>
            <p className="text-gray-600 mb-6 leading-5 w-[450px]">
              {" "}
              Please enter your registered email and we will send a verification
              code to reset your password!
            </p>
          </div>
          <Form
            name="forgot password"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            className="w-full max-w-sm"
          >
            <div className="flex flex-col space-y-36">
              <div>
                <Form.Item
                  label={
                    <span className="text-black font-semibold text-lg">
                      Email
                    </span>
                  }
                  name="email"
                  rules={[{ required: true, message: "Enter Email Address" }]}
                >
                  <Input
                    placeholder="Enter Email Address"
                    prefix={<MdEmail className="text-[#5C5C5C]" />}
                    className="!border-black border-2 rounded-md !p-2"
                  />
                </Form.Item>
              </div>

              <div>
                <Form.Item>
                  <Link to={'/verification'}>
                  <Button
                    htmlType="submit"
                    className="w-full !bg-red-500 hover:bg-red-600 border-0 rounded-md !p-5 !text-white"
                  >
                    Proceed
                  </Button></Link>
                 
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>

        {/* Right side: Image */}
        <div className="w-full hidden md:block md:w-[616px]">
          <img src={forgot} alt="Cafe" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
