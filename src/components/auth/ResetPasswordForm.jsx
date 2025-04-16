import { Form, Input } from "antd";
import { RiLockPasswordFill } from "react-icons/ri";
import { useForgotPassCreateNewPassMutation } from "../../redux/features/auth/authApi";
import { getEmail, getOtp } from "../../helper/SessionHelper";
import { CgSpinnerTwo } from "react-icons/cg";


const ResetPasswordForm = () => {
    const [forgotPassCreateNewPass, { isLoading }] = useForgotPassCreateNewPassMutation();

      const onFinish = (values) => {
        forgotPassCreateNewPass({
            email: getEmail(),
            otp: getOtp(),
            password: values.password
        });
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
            <span className="text-black font-semibold text-lg">New Password</span>
          }
          name="password"
          rules={[
            { required: true, message: "Please enter new password!" },
            { min: 6, message: "New Password must be at least 6 characters long!" },
          ]}
        >
          <Input.Password
            placeholder="Enter Password"
            prefix={<RiLockPasswordFill className="text-[#5C5C5C]" />}
            className="!border-black border-2 rounded-md p-2 "
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-black font-semibold text-lg">Confirm Password</span>
          }
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: "Please enter confirm Password" },
            ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
            }),
          ]}
        >
          <Input.Password
            placeholder="Enter Password"
            prefix={<RiLockPasswordFill className="text-[#5C5C5C]" />}
            className="!border-black border-2 rounded-md p-2 "
          />
        </Form.Item>

        <Form.Item>
          <div p>
            <p className="!text-black font-semibold">
              *NOTE: Choose a password that is distinctive & you can easily
              remember.
            </p>
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
              "Set Password"
            )}
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ResetPasswordForm;
