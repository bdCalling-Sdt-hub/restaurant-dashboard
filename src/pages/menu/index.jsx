import React, { useState } from "react";
import { Button, Card, Input, Modal, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import MenuItem from "../../components/menuComponents/MenuItem";
import respic from  '../../../public/respic.png'


const { Text } = Typography;

const Menu = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [menuItems, setMenuItems] = useState([
    {
      name: "Bison Burgers",
      description: "Beetroot, Potato, Bell Pepper, Sandwich Masala",
      price: 50.0,
    },
    {
      name: "Bison Burgers",
      description: "Beetroot, Potato, Bell Pepper, Sandwich Masala",
      price: 50.0,
    },
    {
      name: "Bison Burgers",
      description: "Beetroot, Potato, Bell Pepper, Sandwich Masala",
      price: 50.0,
    },
    {
      name: "Bison Burgers",
      description: "Beetroot, Potato, Bell Pepper, Sandwich Masala",
      price: 50.0,
    },
    {
      name: "Bison Burgers",
      description: "Beetroot, Potato, Bell Pepper, Sandwich Masala",
      price: 50.0,
    },
    {
      name: "Bison Burgers",
      description: "Beetroot, Potato, Bell Pepper, Sandwich Masala",
      price: 50.0,
    },
    {
      name: "Bison Burgers",
      description: "Beetroot, Potato, Bell Pepper, Sandwich Masala",
      price: 50.0,
    },
    {
      name: "Bison Burgers",
      description: "Beetroot, Potato, Bell Pepper, Sandwich Masala",
      price: 50.0,
    },
    {
      name: "Bison Burgers",
      description: "Beetroot, Potato, Bell Pepper, Sandwich Masala",
      price: 50.0,
    },
    {
      name: "Bison Burgers",
      description: "Beetroot, Potato, Bell Pepper, Sandwich Masala",
      price: 50.0,
    },
    {
      name: "Bison Burgers",
      description: "Beetroot, Potato, Bell Pepper, Sandwich Masala",
      price: 50.0,
    },
  ]);

  const showEditModal = (item) => {
    setEditingItem(item);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (editingItem) {
      const updatedMenuItems = menuItems.map((item) =>
        item.name === editingItem.name ? { ...editingItem } : item
      );
      setMenuItems(updatedMenuItems);
    }
    setEditingItem(null);
    setIsModalVisible(false);
  };

  // eslint-disable-next-line no-unused-vars
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingItem(null);
  };

  const handleInputChange = (e) => {
    setEditingItem({ ...editingItem, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Text strong className="text-xl">
          Menu
        </Text>
        <Button
          className="!bg-red-500 !text-white "
          icon={<PlusOutlined />}
          onClick={() => showEditModal({ name: "", description: "", price: 0 })}
        >
          Add New
        </Button>
      </div>
      <div className="flex flex-wrap gap-3">
        {menuItems.map((item, index) => (
          <MenuItem key={index} item={item} onEdit={showEditModal} />
        ))}
      </div>

      <Modal
        title={editingItem ? "Edit Menu Item" : "Add New Menu Item"}
        visible={isModalVisible}
        onOk={handleOk}
        okText="Save"
        cancelButtonProps={{ style: { display: 'none' } }} 
        width={500} 
        footer={[ 
          <div key="save-button" className="flex justify-center w-full">
            <Button
              key="submit"
              type="primary"
              onClick={handleOk}
              style={{
                backgroundColor: 'red',
                color: 'white',
                borderColor: 'red',
                width:"100%"
              }}
            >
              Save
            </Button>
          </div>,
        ]}
      >

        <div className="flex items-center justify-center" >
            <img src={respic} alt="img" className="w-64" />
        </div>



        <div className="flex">
          <div>
            <label htmlFor="">Food Name</label>
            <Input
              placeholder="Name"
              name="name"
              value={editingItem ? editingItem.name : ""}
              onChange={handleInputChange}
              className="mb-2"
            />
          </div>

          <div>
            <label htmlFor="">Food Price</label>
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={editingItem ? editingItem.price : ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="">Food Ingredient</label>
          <Input.TextArea
            placeholder="Description"
            name="description"
            value={editingItem ? editingItem.description : ""}
            onChange={handleInputChange}
            className="mb-2"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Menu;
