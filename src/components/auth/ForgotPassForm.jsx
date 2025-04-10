import { Button, Form, Input } from "antd";
import { MdEmail } from "react-icons/md";
import { useForgotPassSendOtpMutation } from "../../redux/features/auth/authApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassForm = () => {
  const [forgotPassSendOtp, {isLoading, isSuccess}] = useForgotPassSendOtpMutation();
  const navigate = useNavigate()

  useEffect(()=> {
    if(isSuccess){
      navigate("/verify-otp")
    }
  }, [navigate, isSuccess])

  const onFinish = (values) => {
    forgotPassSendOtp(values)
  };


  return (
    <>
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
                <span className="text-black font-semibold text-lg">Email</span>
              }
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email address!" },
              ]}
            >
              <Input
                placeholder="Enter Email Address"
                prefix={<MdEmail className="text-[#5C5C5C]" />}
                className="!border-black border-2 rounded-md p-2"
              />
            </Form.Item>
          </div>

          <div>
            <Form.Item>
              <Button
               disabled={isLoading}
                htmlType="submit"
                className="w-full !bg-red-500 hover:bg-red-600 border-0 rounded-md p-2 !text-white disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Proceed"}
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  );
};

export default ForgotPassForm;
