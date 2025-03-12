import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import SidebarMenu from "../components/shared/SidebarMenu";
import HeaderPart from "../components/shared/HeaderPart";

const RootLayOut = () => {
  const { Sider, Content } = Layout;

  return (
    <Layout className="flex justify-center  bg-gray-100">
      <div className="w-full mx-auto">
        <HeaderPart />
        <Layout className="flex">
          <Sider width={300} className="!bg-[#F6F6F6] ">
            <SidebarMenu />
          </Sider>
          <Content className="!bg-white p-5 flex-1">
            <Outlet />
          </Content>
        </Layout>
      </div>
    </Layout>
  );
};

export default RootLayOut;
