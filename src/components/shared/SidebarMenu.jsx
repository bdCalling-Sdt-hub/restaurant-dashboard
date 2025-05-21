import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { logout } from "../../helper/SessionHelper";
import { menuItems } from "../../data/data";

const SidebarMenu = () => {
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
                className={
                  item.path === path ? "!bg-red-500 !text-white !p-4" : "!p-4"
                }
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
          </div>

          <div className="px-4 pt-6">
            <Menu.Item
              onClick={() => logout()}
              key="signout"
              icon={<RiLogoutBoxRLine size={25} />}
              className="!p-4"
            >
              <button className="text-[18px]">Sign Out</button>
            </Menu.Item>
          </div>
        </div>
      </Menu>
    </div>
  );
};

export default SidebarMenu;
