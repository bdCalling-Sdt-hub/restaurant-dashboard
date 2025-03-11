import React, { useState } from 'react';
import { Input, Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { RiDeleteBin6Line } from 'react-icons/ri';

const FaqPage = () => {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: 'How do I register for the app?',
      answer:
        'Users can register using their email, phone number, or social media accounts. Profile verification ensures authenticity and can be done via email, or phone.',
    },
    {
      id: 2,
      question: 'Is the app free to use?',
      answer:
        'Yes, the app is free to download and includes a free tier. Premium features and membership levels are available for added benefits. Need to purchase the premium packages.',
    },
    {
      id: 3,
      question: 'Is the app free to use?',
      answer:
        'Yes, the app is free to download and includes a free tier. Premium features and membership levels are available for added benefits. Need to purchase the premium packages.',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '' });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setFaqs([...faqs, { ...newFAQ, id: Date.now() }]);
    setNewFAQ({ question: '', answer: '' });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
  };

  const handleInputChange = (e) => {
    setNewFAQ({ ...newFAQ, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 bg-[#f6f6f6]">
      <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
  

     <div>
      {faqs.map((faq) => (
        <div className='flex justify-between gap-x-2'>

         <div
          key={faq.id}
          className="w-1/2" 
        >
          <div>
            <div className="font-semibold py-3">Question no: {faq.id}</div>
            <div className="!bg-white p-3">{faq.question} <div className="flex justify-end ">
              <Button
                type="text"
                icon={<RiDeleteBin6Line className='!text-red-500'/>}
                onClick={() => handleDelete(faq.id)}
              />
            </div>
            </div>
            <div className="font-semibold py-3">Answer</div>
            <div className="mt-2  p-3 !bg-white">{faq.answer}</div>
          </div>
        </div>

        <div
          key={faq.id}
          className="w-1/2" 
        >
          <div>
            <div className="font-semibold py-3">Question no: {faq.id}</div>
            <div className="!bg-white p-3">{faq.question} <div className="flex justify-end ">
              <Button
                type="text"
                icon={<RiDeleteBin6Line className='!text-red-500'/>}
                onClick={() => handleDelete(faq.id)}
              />
            </div>
            </div>
            <div className="font-semibold py-3">Answer</div>
            <div className="mt-2  p-3 !bg-white">{faq.answer}</div>
          </div>
        </div>

    
        
        
        </div>
      ))}
      </div>

   








 <div className='flex justify-center my-5'>
 <Button
        className="w-96 mt-4 !bg-red-600 !text-white hover:bg-red-700 border-red-600" 
        onClick={showModal}
      >
        + Add FAQ
      </Button>
 </div>


      <Modal
        title="Add New FAQ"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Question"
          name="question"
          value={newFAQ.question}
          onChange={handleInputChange}
          className="mb-2"
        />
        <Input.TextArea
          placeholder="Answer"
          name="answer"
          value={newFAQ.answer}
          onChange={handleInputChange}
        />
      </Modal>
    </div>
  );
};

export default FaqPage;