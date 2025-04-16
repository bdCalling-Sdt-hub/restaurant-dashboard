import { Form, Input } from "antd";
import { RiLockPasswordFill } from "react-icons/ri";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { CgSpinnerTwo } from "react-icons/cg";

const ChangePassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onFinish = (values) => {
    changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
    });
  };

  return (
    <>
      <div className="p-6 bg-gray-100 rounded-lg text-center">
        <h2 className="text-xl font-bold mt-2">Change Password</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          className="max-w-[400px] mx-auto text-left"
        >
          <Form.Item
            label={
              <span className="text-black font-semibold text-lg">
                Current Password
              </span>
            }
            name="currentPassword"
            rules={[
              { required: true, message: "Please enter current password!" },
              {
                min: 6,
                message: "Current Password must be at least 6 characters long!",
              },
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
              <span className="text-black font-semibold text-lg">
                New Password
              </span>
            }
            name="newPassword"
            rules={[
              { required: true, message: "Please enter new password!" },
              {
                min: 6,
                message: "New Password must be at least 6 characters long!",
              },
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
              <span className="text-black font-semibold text-lg">
                Confirm New Password
              </span>
            }
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please enter confirm Password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
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
      </div>
    </>
  );
};

export default ChangePassword;
