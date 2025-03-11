import { Button } from "antd";
import profile from '../../../public/profile.png'


const ProfilePage = ({ onEdit }) => (
    <div className="p-3 bg-[#f6f6f6]  rounded-lg  text-center">
       <div className="max-w-[400px] mx-auto">
       <img src={profile} className="rounded-full mx-auto" alt="Profile" />
      <h2 className="text-xl font-bold mt-2">Andric</h2>
      <p>Profile</p>
      <div className="text-left  mx-auto mt-2">
        <div className="border-b-1">
        <label className="font-semibold" >Username</label>
        <p> Amith</p>
        </div>
        <div className="border-b-1">
        <label className="font-semibold">Email</label>
        <p> amith@gmail.com</p>
        </div>
        <div className="border-b-1">
        <label className="font-semibold">Phone</label>
        <p> +909820070</p>
        </div>
        <div className="border-b-1">
        <label className="font-semibold">Address</label>
        <p> G st, 23 Miami City</p>
        </div>
    
      </div>
      <Button type="primary" className="!mt-4 !bg-red-500" onClick={() => onEdit('editProfile')}>Edit Profile</Button>
       </div>
    </div>
  );

  export default ProfilePage