import { useState } from "react";
import { Tabs } from "antd";
import Profile from "../../components/profile/Profile";
import EditProfile from "../../components/profile/EditProfile";
import ChangePassword from "../../components/profile/ChangePassword";
import { useGetMeQuery } from "../../redux/features/user/userApi";


const SettingPage = () => {
    const [currentTab, setCurrentTab] = useState('profile');
    const {data, isLoading } = useGetMeQuery(undefined);
    const myData = data?.data || {};


  return (
    <>
    <div className="p-6">
      <Tabs activeKey={currentTab} onChange={setCurrentTab}>
        <Tabs.TabPane tab="Profile" key="profile">
          <Profile onEdit={setCurrentTab} isLoading={isLoading} user={myData}/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Edit Profile" key="editProfile">
          <EditProfile isLoading={isLoading} user={myData}/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Change Password" key="changePassword">
          <ChangePassword />
        </Tabs.TabPane>
      </Tabs>
    </div>
    </>
    
  )
}

export default SettingPage
