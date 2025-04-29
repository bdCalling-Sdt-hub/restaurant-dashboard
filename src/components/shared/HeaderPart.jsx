import {Typography } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles
import { useNavigate } from 'react-router-dom';
import { useGetMeQuery } from '../../redux/features/user/userApi';
import profile_placeholder from "../../assets/images/profile_placeholder.png";
import Logo from "../../assets/images/elhagz.png";


const { Text } = Typography;

const HeaderPart = () => {
  const {data, isLoading } = useGetMeQuery(undefined);
  const myData = data?.data || {};
  const navigate = useNavigate()
  


  return (
    <div className="bg-[#F6F6F6] p-4 flex items-center justify-between ">
      {/* Logo Section */}
      <div to={"/"} className="w-[256px] flex justify-center items-center">
        <img src={Logo} alt="Logo" className="h-[60px] w-[60px] rounded-md mr-4" />
      </div>
      {/* User Section */}
      <div className="flex items-center gap-x-2">
        {isLoading ? (
          <>
            {/* <img src={placeholder_img} alt="User" className="mr-2 w-16 h-16" /> */}
            <div class="size-10 rounded-full bg-gray-200 animate-pulse shadow-md"></div>
            <div>
              <Text className="text-black">Welcome...</Text>
              <br />
              {/* <Text className="font-semibold" > Super Admin</Text> */}
            </div>
          </>
        ) : (
          <>
            <img
              src={myData?.profileImg || profile_placeholder}
              alt="User"
              onClick={()=> navigate('/profile')}
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop if fallback also fails
                e.target.src = profile_placeholder;
              }}
              className="mr-2 w-16 h-16 rounded-full shadow-md cursor-pointer"
            />
            <div>
              <Text className="text-black text-lg">{myData?.fullName}</Text>
              <br />
              {/* <Text className="font-semibold" > Super Admin</Text> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderPart;