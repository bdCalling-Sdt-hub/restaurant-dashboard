import { Button, Input } from "antd";
import profile from '../../../public/profile.png';

const EditProfile = ({ onBack }) => (
  <div className="p-6 bg-gray-100 rounded-lg text-center">
    <div className="max-w-[400px] mx-auto">
      <img src={profile} className="rounded-full mx-auto w-24 h-24" alt="Profile" />
      <h2 className="text-xl font-bold mt-2">Edit Profile</h2>
      <div className="text-left mt-4">
        <label className="font-semibold">Username</label>
        <Input className="mt-1" placeholder="Username" defaultValue="Amith" />
      </div>
      <div className="text-left mt-4">
        <label className="font-semibold">Email</label>
        <Input className="mt-1" placeholder="Email" defaultValue="amith@gmail.com" />
      </div>
      <div className="text-left mt-4">
        <label className="font-semibold">Phone Number</label>
        <Input className="mt-1" placeholder="Phone Number" defaultValue="+909820070" />
      </div>
      <div className="text-left mt-4">
        <label className="font-semibold">Address</label>
        <Input className="mt-1" placeholder="Address" defaultValue="G st, 23 Miami City" />
      </div>
      <Button type="primary" className="!mt-6 !bg-red-500 " onClick={onBack}>
        Save Changes
      </Button>

    </div>
  </div>
);

export default EditProfile;
