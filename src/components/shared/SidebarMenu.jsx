import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  RiPieChart2Fill,
  RiRestaurant2Fill,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";

const SidebarMenu = () => {
  const [activeKey, setActiveKey] = useState("1");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setActiveKey("1");
    } else if (path === "/booking-management") {
      setActiveKey("2");
    } else if (path === "/menu") {
      setActiveKey("3");
    } else if (path === "/add-category") {
      setActiveKey("4");
    } else if (path === "/table-booking") {
      setActiveKey("5");
    } else if (path === "/user-management") {
      setActiveKey("6");
    } else if (path === "/signout") {
      setActiveKey("signout");
    }
  }, [location]);

  return (
    <div className="py-0">
      <Menu
        style={{ background: "#F6F6F6" }}
        mode="inline"
        selectedKeys={[activeKey]}
        onSelect={({ key }) => setActiveKey(key)}
      >
       <div>
       <div>
          <Menu.Item
            key="1"
            icon={<RiPieChart2Fill />}
            className={activeKey === "1" ? "!bg-red-500 !text-white" : ""}
          >
            <Link to="/" className="text-[18px]">
              Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<FaRegCircleUser />}
            className={activeKey === "2" ? "!bg-red-500 !text-white" : ""} // Tailwind active style
          >
            <Link to="/booking-management" className="text-[18px]">
              Booking Management
            </Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<RiRestaurant2Fill />}
            className={activeKey === "3" ? "!bg-red-500 !text-white" : ""} // Tailwind active style
          >
            <Link to="/menu" className="text-[18px]">
              Menu
            </Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<RiRestaurant2Fill />}
            className={activeKey === "4" ? "!bg-red-500 !text-white" : ""} // Tailwind active style
          >
            <Link to="/add-category" className="text-[18px]">
              Add Category
            </Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<RiRestaurant2Fill />}
            className={activeKey === "5" ? "!bg-red-500 !text-white" : ""} // Tailwind active style
          >
            <Link to="/table-booking" className="text-[18px]">
              Table Booking Schedule
            </Link>
          </Menu.Item>

          <Menu.Item
            key="3"
            icon={<RiRestaurant2Fill />}
            className={activeKey === "6" ? "!bg-red-500 !text-white" : ""} // Tailwind active style
          >
            <Link to="/user-management" className="text-[18px]">
              User Management
            </Link>
          </Menu.Item>
        </div>

        <div>
          <Menu.Item
            key="signout"
            icon={<RiLogoutBoxRLine />}
            className={activeKey === "signout" ? "bg-red-500 text-white" : ""} // Tailwind active style
          >
            <Link to="/login" className="text-[18px]">
              Sign Out
            </Link>
          </Menu.Item>
        </div>
       </div>


      </Menu>
    </div>
  );
};

export default SidebarMenu;
