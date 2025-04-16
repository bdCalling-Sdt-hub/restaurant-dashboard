import { Form, Input } from "antd";
import { Link } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { CgSpinnerTwo } from "react-icons/cg";


const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation()

    const onFinish = (values) => {
        login(values);        
    };

  return (
    <>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        className="w-full max-w-sm"
      >
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
            placeholder="Enter Email"
            prefix={<MdEmail className="text-[#5C5C5C]" />}
            className="!border-black border-2 rounded-md p-2"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-black font-semibold text-lg">Password</span>
          }
          name="password"
          rules={[
            { required: true, message: "Please enter your password!" },
            { min: 6, message: "Password must be at least 6 characters long!" },
          ]}
        >
          <Input.Password
            placeholder="Enter Password"
            prefix={<RiLockPasswordFill className="text-[#5C5C5C]" />}
            className="!border-black border-2 rounded-md p-2 "
          />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end">
            <Link to={"/forgot-password"} className="!text-black font-semibold">
              Forgot Password?
            </Link>
          </div>
        </Form.Item>

        <Form.Item>
        <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-500 hover:bg-red-600 duration-200 p-2 border-0 rounded-md text-white flex justify-center items-center gap-x-2 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <CgSpinnerTwo className="animate-spin" fontSize={16} />
                Processing...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </Form.Item>
      </Form>
    </>
  );
}

export default LoginForm