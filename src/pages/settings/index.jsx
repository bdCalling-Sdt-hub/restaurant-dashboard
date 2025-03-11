import React, { useState } from "react";
import { Tabs } from "antd";
import ProfilePage from "../../components/settingsComponents/ProfilePage";
import EditProfile from "../../components/settingsComponents/EditProfile";
import ChangePassword from "../../components/settingsComponents/ChangePassword";





const SettingPage = () => {
    const [currentTab, setCurrentTab] = useState('profile');

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

export default SettingPage
