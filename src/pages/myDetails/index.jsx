import React, { useState } from "react";
import { Tabs } from "antd";
import ProfilePage from "../../components/settingsComponents/ProfilePage";
import EditProfile from "../../components/settingsComponents/EditProfile";
import ChangePassword from "../../components/settingsComponents/ChangePassword";
import { Link } from "react-router-dom";
const MyDetails = () => {
    const [currentTab, setCurrentTab] = useState('profile');

  return (
    <div className="p-6">
        <div className="flex gap-x-2">
            <Link className="py-2 px-4 !text-white rounded-full !bg-gray-700" to={'/my-details'}>My Details</Link>
            <Link className="py-2 px-4 !text-white rounded-full !bg-gray-700" to={'/restaurant-details'}>Restaurant Details</Link>
        </div>
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
