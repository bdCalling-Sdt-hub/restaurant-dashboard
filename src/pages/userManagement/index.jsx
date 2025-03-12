import React, { useState } from "react";
import { Input, Modal, Pagination } from "antd";
import { FaEye } from "react-icons/fa";
import UserDetailsModal from "../../components/dashboardComponents/UserDetailsModal";
import { MdBlock } from "react-icons/md";

const { Search } = Input;

const users = [
  {
    id: "#1233",
    fullName: "Kathryn Murp",
    email: "bockely@att.com",
    phoneNumber: "(201) 555-0124",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: "#1233",
    fullName: "Devon Lane",
    email: "csilvers@rizon.com",
    phoneNumber: "(219) 555-0114",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: "#1233",
    fullName: "Foysal Rahman",
    email: "qamaho@mail.com",
    phoneNumber: "(316) 555-0116",
    avatar: "https://randomuser.me/api/portraits/men/82.jpg",
  },
  {
    id: "#1233",
    fullName: "Hari Danang",
    email: "xtewrris@gmail.com",
    phoneNumber: "(907) 555-0101",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: "#1233",
    fullName: "Floyd Miles",
    email: "xrurris@gmail.com",
    phoneNumber: "(505) 555-0125",
    avatar: "https://randomuser.me/api/portraits/men/61.jpg",
  },
  {
    id: "#1233",
    fullName: "Eleanor Pena",
    email: "xterris@gmail.com",
    phoneNumber: "(704) 555-0127",
    avatar: "https://randomuser.me/api/portraits/women/49.jpg",
  },
  {
    id: "#1233",
    fullName: "Devon Lane",
    email: "xteiris@gmail.com",
    phoneNumber: "(219) 555-0114",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: "#1233",
    fullName: "Hari Danang",
    email: "xtqrris@gmail.com",
    phoneNumber: "(270) 555-0117",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: "#1233",
    fullName: "Devon Lane",
    email: "xtevris@gmail.com",
    phoneNumber: "(207) 555-0119",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: "#1233",
    fullName: "Hari Danang",
    email: "xterriq@gmail.com",
    phoneNumber: "(225) 555-0118",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: "#1233",
    fullName: "Hari Danang",
    email: "xtqrris@gmail.com",
    phoneNumber: "(270) 555-0117",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: "#1233",
    fullName: "Devon Lane",
    email: "xteiris@gmail.com",
    phoneNumber: "(219) 555-0114",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: "#1233",
    fullName: "Hari Danang",
    email: "xtqrris@gmail.com",
    phoneNumber: "(270) 555-0117",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: "#1233",
    fullName: "Devon Lane",
    email: "xtevris@gmail.com",
    phoneNumber: "(207) 555-0119",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: "#1233",
    fullName: "Hari Danang",
    email: "xterriq@gmail.com",
    phoneNumber: "(225) 555-0118",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: "#1233",
    fullName: "Hari Danang",
    email: "xtqrris@gmail.com",
    phoneNumber: "(270) 555-0117",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: "#1233",
    fullName: "Devon Lane",
    email: "xteiris@gmail.com",
    phoneNumber: "(219) 555-0114",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: "#1233",
    fullName: "Hari Danang",
    email: "xtqrris@gmail.com",
    phoneNumber: "(270) 555-0117",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: "#1233",
    fullName: "Devon Lane",
    email: "xtevris@gmail.com",
    phoneNumber: "(207) 555-0119",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: "#1233",
    fullName: "Hari Danang",
    email: "xterriq@gmail.com",
    phoneNumber: "(225) 555-0118",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: "#1233",
    fullName: "Hari Danang",
    email: "xtqrris@gmail.com",
    phoneNumber: "(270) 555-0117",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
];

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Set page size to 10
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // Track the selected user
  const [isModalVisible, setIsModalVisible] = useState(false); // Track modal visibility
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false); // New state for block modal
  const [userToBlock, setUserToBlock] = useState(null);

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleViewClick = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const showBlockModal = (user) => {
    setUserToBlock(user);
    setIsBlockModalVisible(true);
  };

  const handleBlock = () => {
    // Implement your block logic here
    console.log("Blocking user:", userToBlock);
    setIsBlockModalVisible(false);
    setUserToBlock(null);
  };

  const handleUnblock = () => {
    // Implement your unblock logic here
    console.log("Unblocking user:", userToBlock);
    setIsBlockModalVisible(false);
    setUserToBlock(null);
  };

  const handleBlockModalCancel = () => {
    setIsBlockModalVisible(false);
    setUserToBlock(null);
  };

  return (
    <div className="p-4 bg-[#f6f6f6]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <div className="w-[348px]">
          <Search
            placeholder="Search here..."
            onSearch={handleSearch}
            className="p-2 rounded"
          />
        </div>
      </div>
      <div className="bg-[#f6f6f6] rounded-lg shadow p-3">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase">
            <tr>
              <th className="py-3 px-4">ID no.</th>
              <th className="py-3 px-4">Full Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone Number</th>
              <th className="py-3 px-4">View</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((user) => (
                <tr key={user.id}>
                  <td className="py-4 px-4">{user.id}</td>
                  <td className="py-4 px-4 flex items-center">
                    <img
                      src={user.avatar}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-md mr-2"
                    />
                    {user.fullName}
                  </td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.phoneNumber}</td>
                  <td className="py-2 px-4">
                    <button  className="bg-red-500 hover:bg-red-700 !text-white font-bold py-2 px-4 rounded" 
                     onClick={() => handleViewClick(user)}
                    >
                      <FaEye />
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <button className="bg-red-500 hover:bg-red-700 !text-white font-bold py-2 px-4 rounded" 
                     onClick={() => showBlockModal(user)}
                     >
                      Action
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <p>
            Showing {pageSize * (currentPage - 1) + 1} -{" "}
            {Math.min(pageSize * currentPage, filteredUsers.length)} out of{" "}
            {filteredUsers.length}
          </p>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredUsers.length}
            onChange={handlePageChange}
            showSizeChanger={false}
            showQuickJumper
          />
        </div>
      </div>
      <UserDetailsModal
        visible={isModalVisible}
        onClose={handleModalClose}
        user={selectedUser}
      />


<Modal
        title="Are you sure you want to block?"
        visible={isBlockModalVisible}
        onCancel={handleBlockModalCancel}
        footer={null} // Remove default footer
        closable={true}
        closeIcon={<span className="text-xl">X</span>} // Customize close icon
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
        style={{
          textAlign: "center",
        }}
      >
        <button
          className="bg-red-500 flex items-center  hover:bg-red-700 !text-white font-bold py-2 px-4 rounded !mb-4"
          onClick={handleBlock}
        >
          <MdBlock/>
          <p className="mr-2">  </p> Block
        </button>
        <button
          className="bg-gray-800 hover:bg-gray-700 flex items-center !text-white font-bold py-2 px-4 rounded"
          onClick={handleUnblock}
        >
          <MdBlock/> 
          <p className="mr-2">
            </p> Unblock
        </button>
      </Modal>











    </div>
  );
};

export default UserManagement;
