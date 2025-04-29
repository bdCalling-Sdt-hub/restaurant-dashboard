import React, { useState } from 'react';
import { Input, Modal, Form, Button, Select, Checkbox, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const AdministratorModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [permissions, setPermissions] = useState([]);

  const permissionOptions = [
    'Dashboard',
    'User Management',
    'Restaurant Management',
    'Settings',
  ];

  const showModal = () => {
    setIsModalVisible(true);
    form.resetFields();
    setPermissions([]);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log('Form Values:', { ...values, permissions });
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handlePermissionChange = (checkedValues) => {
    setPermissions(checkedValues);
  };

  return (
    <div className="p-4 bg-gray-100">
      <Button onClick={showModal} className="bg-red-500 text-white" >
        Open Modal
      </Button>

      <Modal
      
        title="Edit"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="flex flex-col items-center mb-4">
          <Upload showUploadList={false}>
            <div className="relative w-20 h-20 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
              <UploadOutlined className="text-xl text-white" />
            </div>
          </Upload>
        </div>

        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="contact" label="Contact Number" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}> 
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="restaurant_owner">Restaurant Owner</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Give Access To">
            <Checkbox.Group options={permissionOptions} value={permissions} onChange={handlePermissionChange} />
          </Form.Item>
        </Form>

        <Button className="w-full bg-red-500 text-white mt-4" onClick={handleOk}>Update</Button>
      </Modal>
    </div>
  );
};

export default AdministratorModal;
