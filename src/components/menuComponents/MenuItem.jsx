import { Button, Card, Input, Modal, Typography } from 'antd';
import respic from  '../../../public/respic.png'
import { FaBellConcierge } from 'react-icons/fa6';
import { IoIosStar } from 'react-icons/io';

const { Text } = Typography;


const MenuItem = ({ item, onEdit }) => {
  return (
    <di className="shadow-md">
      <div >
        <img
          src={respic}
          alt={item.name}
          className=" w-full object-cover rounded-md mb-2"
        />
      </div>

   <div className='p-4'  >

   <div className='flex justify-between  ' >
    <Text strong >{item.name}</Text>
    <Text className='!text-red-500 !font-semibold'  >${item.price.toFixed(2)}</Text>
    </div>
      <Text className="block  text-sm">{item.description}</Text>

      <div className='flex items-center gap-x-3'>
      <FaBellConcierge color='red' />
       <span>Italian</span>
      </div>
        
      <div className='flex gap-x-2 items-center'>
      <div className='flex'> <IoIosStar color='#FF9500'/>  <IoIosStar color='#FF9500'/> <IoIosStar color='#FF9500'/> <IoIosStar color='#FF9500'/> <IoIosStar color='#FF9500'/> </div>
      <span className='text-[#949494]'  >(314)</span>
      </div>



      <div className="flex justify-start mt-4">
        <Button  className='!bg-red-500 !text-white ' onClick={() => onEdit(item)}>
          Edit Product
        </Button>
      </div>


   </div>
    </di>
  );
};

export default MenuItem