import { Button } from "antd";
import ProfileLoading from "../Loader/ProfileLoading";
import profile_placeholder_img from "../../assets/images/profile_placeholder.png";


const Profile = ({ onEdit, isLoading, user }) => {
  if (isLoading) {
    return <ProfileLoading />;
  } else {
    return (
      <div className="p-3 bg-[#f6f6f6]  rounded-lg  text-center">
        <div className="max-w-[400px] mx-auto">
          <img
            src={user?.profileImg || profile_placeholder_img}
            className="rounded-full mx-auto w-24 h-24"
            alt="Profile"
            onError={(e) => {
              e.currentTarget.onerror = null; // Prevent infinite loop
              e.currentTarget.src = profile_placeholder_img;
            }}
          />
          <h2 className="text-xl font-bold mt-2">Profile</h2>
          <div className="text-left  mx-auto mt-2">
            <div className="border-b-1">
              <label className="font-semibold">Full Name</label>
              <p>{user?.fullName}</p>
            </div>
            <div className="border-b-1">
              <label className="font-semibold">Email</label>
              <p> {user?.email}</p>
            </div>
            <div className="border-b-1">
              <label className="font-semibold">Contact Number</label>
              <p> {user?.phone} </p>
            </div>
            <div className="border-b-1">
              <label className="font-semibold">Address</label>
              <p> {user?.address} </p>
            </div>
          </div>
          <Button
            type="primary"
            className="!mt-4 !bg-red-500"
            onClick={() => onEdit("editProfile")}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    );
  }
};

export default Profile;
