import { useState } from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";

import { IoRestaurantSharp } from "react-icons/io5";
import { logout } from "../../helper/SessionHelper";
import { menuItems } from "../../data/data";

const SidebarMenu = () => {
  const [activeKey, setActiveKey] = useState("1");
  const location = useLocation();
  const path = location.pathname;


  return (
    <div className="py-0">
      <Menu
        style={{ background: "#F6F6F6" }}
        mode="inline"
        selectedKeys={[path]}
      >
        <div className="flex flex-col">
          <div className="px-4">
            {menuItems?.map((item) => (
              <Menu.Item
                key={item.path}
                icon={<item.icon size={25} />}
                className={item.path === path ? "!bg-red-500 !text-white !p-4" : "!p-4"}
              >
                <Link
                  to={item.path}
                  className={`${
                    item.path === path ? "text-white" : "text-black"
                  } text-[18px]`}
                >
                  {item.title}
                </Link>
              </Menu.Item>
            ))}

            {/* Restaurant Details Submenu Items  */}
            <Menu.SubMenu
              icon={<IoRestaurantSharp size={25} />}
              title={
                <span className="text-[18px] text-black">
                  Restaurant Details
                </span>
              }
              popupClassName="bg-white !p-4"
            >
              <Menu.Item
                key="business-hours"
                className={
                  activeKey === "business-hours"
                    ? "!bg-red-500 !text-white"
                    : ""
                }
              >
                <Link to="/restaurant/business-hours" className="text-[18px]">
                  Business Hours
                </Link>
              </Menu.Item>
              <Menu.Item
                key="reviews"
                className={
                  activeKey === "reviews" ? "!bg-red-500 !text-white" : ""
                }
              >
                <Link to="/restaurant/reviews" className="text-[18px]">
                  Reviews
                </Link>
              </Menu.Item>
              <Menu.Item
                key="cuisine"
                className={
                  activeKey === "cuisine" ? "!bg-red-500 !text-white" : ""
                }
              >
                <Link to="/restaurant/cuisine" className="text-[18px]">
                  Cuisine
                </Link>
              </Menu.Item>
              <Menu.Item
                key="party"
                className={
                  activeKey === "party" ? "!bg-red-500 !text-white" : ""
                }
              >
                <Link to="/restaurant/party" className="text-[18px]">
                  Party
                </Link>
              </Menu.Item>
              <Menu.Item
                key="social-media"
                className={
                  activeKey === "social-media" ? "!bg-red-500 !text-white" : ""
                }
              >
                <Link to="/restaurant/social-media" className="text-[18px]">
                  Social Media
                </Link>
              </Menu.Item>
              <Menu.Item
                key="restaurant-features"
                className={
                  activeKey === "restaurant-features"
                    ? "!bg-red-500 !text-white"
                    : ""
                }
              >
                <Link
                  to="/restaurant/restaurant-features"
                  className="text-[18px]"
                >
                  Restaurant Features
                </Link>
              </Menu.Item>
              <Menu.Item
                key="restaurant-agreement"
                className={
                  activeKey === "restaurant-agreement"
                    ? "!bg-red-500 !text-white"
                    : ""
                }
              >
                <Link
                  to="/restaurant/restaurant-agreement"
                  className="text-[18px]"
                >
                  Restaurant Agreement
                </Link>
              </Menu.Item>
              <Menu.Item
                key="menu-items"
                className={
                  activeKey === "menu-items" ? "!bg-red-500 !text-white" : ""
                }
              >
                <Link to="/restaurant/menu-items" className="text-[18px]">
                  Menu Items
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
          </div>

          <div className="p-4  ">
            <Menu.Item
              key="signout"
              icon={<RiLogoutBoxRLine size={25} />}
              className={
                activeKey === "signout" ? "bg-red-500 !p-4 text-white" : "!p-4"
              } // Tailwind active style
            >
              <button onClick={() => logout()} className="text-[18px]">
                Sign Out
              </button>
            </Menu.Item>
          </div>
        </div>
      </Menu>
    </div>
  );
};

export default SidebarMenu;
