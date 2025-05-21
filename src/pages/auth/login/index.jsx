import { Typography } from 'antd';
import 'antd/dist/reset.css'; 
import logo from "../../../assets/images/elhagz.png";
import sign from "../../../assets/images/signin.png"
import LoginForm from '../../../components/auth/LoginForm';

const { Title } = Typography;

const LoginPage = () => {
 

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
         {/* LoginForm */}
         <LoginForm/>
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
