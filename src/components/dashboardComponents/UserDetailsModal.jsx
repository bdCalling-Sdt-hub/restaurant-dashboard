import React from 'react';
import { Modal, Avatar, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;

const UserDetailsModal = ({ visible, onClose, user }) => {
  if (!user) return null; 
  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      closable={false}
      width={400}
      bodyStyle={{ padding: '24px' }}
    >
      <div className="relative">
        <button
          className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <CloseOutlined />
        </button>
        <div className="flex justify-center mb-4">
          <Avatar src={user.avatar} size={100} />
        </div>
        <div className="mb-2 flex justify-between">
          <Text strong>ID No:</Text>
          <Text className="ml-2">{user.id}</Text>
        </div>
        <div className="mb-2 flex justify-between">
          <Text strong>Email:</Text>
          <Text className="ml-2">{user.email}</Text>
        </div>
        <div className="mb-2 flex justify-between">
          <Text strong>Username:</Text>
          <Text className="ml-2">{user.fullName}</Text>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetailsModal;