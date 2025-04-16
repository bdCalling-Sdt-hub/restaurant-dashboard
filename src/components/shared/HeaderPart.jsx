import {Typography } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles
import { Link, useNavigate } from 'react-router-dom';
import { useGetMeQuery } from '../../redux/features/user/userApi';
import placeholder_img from "../../assets/images/placeholder.jpeg";
import placeholder_profile from "../../assets/images/profile_placeholder.jpg";

const { Text } = Typography;

const HeaderPart = () => {
  const fallback = placeholder_img;
  const {data, isLoading } = useGetMeQuery(undefined);
  const myData = data?.data || {};
  const navigate = useNavigate()
  


  return (
    <div className="bg-[#F6F6F6] px-4 flex items-center justify-between ">
      {/* Logo Section */}
      <Link to={"/"}>
        <img src="elhagz.png" alt="Logo" className="h-20 w-20 mr-4" />
      </Link>
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
              src={myData?.profileImg || placeholder_profile}
              alt="User"
              onClick={()=> navigate('/profile')}
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop if fallback also fails
                e.target.src = fallback;
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