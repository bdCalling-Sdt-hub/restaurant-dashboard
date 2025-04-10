import { Typography } from "antd";
import "antd/dist/reset.css";
import logo from "/elhagz.png";
import ResetPass from "/ResetPassword.png";
import ResetPasswordForm from '../../../components/auth/ResetPasswordForm';
import { Link } from "react-router-dom";

const { Title } = Typography;

const ResetPassword = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="bg-[#f6f6f6]">
      <div className="max-w-7xl block md:flex h-screen items-center mx-auto">
        {/* Left side: Login Form */}
        <div className=" w-full text-center md:text-left md:w-1/2 p-8">
          <div className="mb-8">
            <Link to={"/login"}>
              <img src={logo} alt="Elhagz Logo" className="w-[106px] ml-36 " />
            </Link>
          </div>
          <div>
            <Title level={2} className="text-2xl font-semibold mb-4">
              Reset Your Password
            </Title>
            <p className="text-gray-600 mb-6">Please enter your new password</p>
          </div>
          <ResetPasswordForm/>
        </div>

        {/* Right side: Image */}
        <div className="w-full hidden md:block md:w-[616px]">
          <img
            src={ResetPass}
            alt="Cafe"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
