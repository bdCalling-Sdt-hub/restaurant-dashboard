import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import ProfilePage from "../../components/settingsComponents/ProfilePage";
import EditProfile from "../../components/settingsComponents/EditProfile";
import ChangePassword from "../../components/settingsComponents/ChangePassword";
import { Link, useLocation } from "react-router-dom";
const MyDetails = () => {
    const [currentTab, setCurrentTab] = useState('profile');

    const location = useLocation();

    useEffect(() => {
      if (location.pathname === '/restaurant-details') {
        setCurrentTab('restaurant');
      } else if (location.pathname === '/my-details') {
        setCurrentTab('profile');
      }
    }, [location]);

  return (
    <div className="p-6">
      
        <Tabs activeKey={currentTab} onChange={setCurrentTab}>
        <Tabs.TabPane tab="Profile" key="profile">
          <ProfilePage onEdit={setCurrentTab} />
            </Tabs.TabPane>
        <Tabs.TabPane tab="Edit Profile" key="editProfile">
          <EditProfile onBack={() => setCurrentTab('profile')} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Change Password" key="changePassword">
          <ChangePassword onBack={() => setCurrentTab('profile')} />
        </Tabs.TabPane>
        </Tabs>
     
    </div>
  )
}

export default MyDetails
