import React, { useState } from 'react';
import { Button,  Typography, Space, Modal, Input } from 'antd';
import MenuItem from '../../components/menuComponents/MenuItem';
import respic from  '../../../public/respic.png'
import btnbg from  '../../../public/buttonbg.png'
import btn1 from  '../../../public/ite.png'
import btn2 from  '../../../public/che.png'
import btn3 from  '../../../public/mex.png'



import { IoIosStar, IoMdStats } from 'react-icons/io';
import { Link } from "react-router";


const { Text } = Typography;



const AddCategory = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    const [editingItem, setEditingItem] = useState(null);
     const [items, setItems] = useState([
      {
        id: 1,
        name: 'Bison Burgers',
        price: 50.00,
        description: 'Beetroot, Potato, Bell Pepper, Sandwich Masala',
      },
      {
        id: 2,
        name: 'Bison Burgers',
        price: 50.00,
        description: 'Beetroot, Potato, Bell Pepper, Sandwich Masala',
      },
      {
        id: 3,
        name: 'Bison Burgers',
        price: 50.00,
        description: 'Beetroot, Potato, Bell Pepper, Sandwich Masala',
      },
      {
        id: 4,
        name: 'Bison Burgers',
        price: 50.00,
        description: 'Beetroot, Potato, Bell Pepper, Sandwich Masala',
      },
      {
        id: 5,
        name: 'Bison Burgers',
        price: 50.00,
        description: 'Beetroot, Potato, Bell Pepper, Sandwich Masala',
      },
      {
        id: 6,
        name: 'Bison Burgers',
        price: 50.00,
        description: 'Beetroot, Potato, Bell Pepper, Sandwich Masala',
      },
    ])
   


  

  const showEditModal = (item) => {
    setEditingItem(item);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (editingItem) {
      const updatedMenuItems = items.map((item) =>
        item.name === editingItem.name ? { ...editingItem } : item
      );
      setItems(updatedMenuItems);
    }
    setEditingItem(null);
    setIsSuccessModalVisible(true)
    setIsModalVisible(false)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingItem(null);
  };

  const handleInputChange = (e) => {
    setEditingItem({ ...editingItem, [e.target.name]: e.target.value });
  };

  const handleSuccessModal =()=>{
    setIsSuccessModalVisible(false)
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Category</h2>
        <Space >
          <Button className="bg-gray-200 rounded-full px-4 py-2 text-sm" style={{ backgroundImage: `url(${btn1})`, backgroundSize: 'cover', color: 'white' }}>Italian</Button>
          <Button className="bg-gray-200 rounded-full px-4 py-2 text-sm" style={{ backgroundImage: `url(${btn2})`, backgroundSize: 'cover', color: 'white' }}>Chinese</Button>
          <Button className="bg-gray-200 rounded-full px-4 py-2 text-sm" style={{ backgroundImage: `url(${btn3})`, backgroundSize: 'cover', color: 'white' }}>Mexican</Button>
          <Button className="bg-gray-200 rounded-full px-4 py-2 text-sm" style={{ backgroundImage: `url(${btnbg})`, backgroundSize: 'cover', color: 'white' }}>Russian</Button>
          <div>

          <p className=" rounded-full  text-sm font-bold ">All Cuisine</p>
          </div>
        </Space>
        <div>
        <Button  onClick={() => showEditModal({ name: "", description: "", price: 0 })} className="!bg-red-500 !text-white rounded-full px-4 py-2 text-sm">+ Add New</Button>
        </div>
      </div>

      <Text strong className="block mb-2">Italian</Text>
      <div className="flex flex-wrap gap-3">
        {items.slice(0, 4).map((item) => (
          <MenuItem key={item.id} item={item} onEdit={showEditModal} />
        ))}
      </div>

      <Text strong className="block mb-2">Mexican</Text>
      <div className="flex flex-wrap gap-3">
        {items.slice(0,4).map((item, index) => (
          <MenuItem key={index} item={item} onEdit={showEditModal} />
        ))}
      </div>




      <Modal
        title={editingItem ? "Edit Menu Item" : "Add New Menu Item"}
        visible={isModalVisible}
        onOk={handleOk}
        okText="Save"
        cancelButtonProps={{ style: { display: 'block' } }} 
        onCancel={handleCancel}
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

      {/* Success Popup model  */}

      <Modal
        
        visible={isSuccessModalVisible}
        onOk={() => setIsSuccessModalVisible(false)}
        onCancel={handleSuccessModal}
        footer={null}
      >
        <div  >
          <img src={respic} alt="Saved Item" className="w-40 mx-auto" />
          
          <div>
          <div className="flex gap-x-2">
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
          </div>
        </div>

        <div className='flex py-2 gap-x-2 items-center'>
      <div className='flex'> <IoIosStar color='#FF9500'/>  <IoIosStar color='#FF9500'/> <IoIosStar color='#FF9500'/> <IoIosStar color='#FF9500'/> <IoIosStar color='#FF9500'/> </div>
      <Link to={'/menu'} className='text-[#949494]'  >(63) See more  </Link>
      </div>

      </Modal>
    </div>
  );
};

export default AddCategory;