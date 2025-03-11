import { Button, Input } from "antd";
import profile from '../../../public/profile.png'; // Add this import to use the profile image

const ChangePassword = ({ onBack }) => (
  <div className="p-6 bg-gray-100 rounded-lg text-center">
    <div className="max-w-[400px] mx-auto">
      {/* Placeholder Image */}
      <img src={profile} className="rounded-full mx-auto w-24 h-24" alt="Profile" />
      
      <h2 className="text-xl font-bold mt-2">Change Password</h2>
      
      <div className="text-left mt-4">
        <label className="font-semibold">Current Password</label>
        <Input.Password className="mt-1" placeholder="Current Password" />
      </div>
      <div className="text-left mt-4">
        <label className="font-semibold">New Password</label>
        <Input.Password className="mt-1" placeholder="New Password" />
      </div>
      <div className="text-left mt-4">
        <label className="font-semibold">Confirm New Password</label>
        <Input.Password className="mt-1" placeholder="Confirm New Password" />
      </div>
      <Button type="primary" className="!mt-6 !bg-red-500 " onClick={onBack}>
        Save Changes
      </Button>
    </div>
  </div>
);

export default ChangePassword;
