import { Typography } from "antd";
import { FaBellConcierge } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import placeholder_img from "../../assets/images/placeholder.jpeg";
import DeleteMenuModal from "../modal/menu/DeleteMenuModal";
import EditMenuModal from "../modal/menu/EditMenuModal";


const { Text } = Typography;

const MenuItem = ({ menu }) => {
  const {_id:menuId, name, cuisineName, image, price, ratings, totalReview, ingredient} = menu || {}
  return (
    // <div className="shadow-md">
    //   <div>
    //     <img
    //       src={respic}
    //       alt={item.name}
    //       className=" w-full object-cover rounded-md mb-2"
    //     />
    //   </div>

    //   <div className="p-4">
    //     <div className="flex justify-between  ">
    //       <Text strong>{item.name}</Text>
    //       <Text className="!text-red-500 !font-semibold">
    //         ${item.price.toFixed(2)}
    //       </Text>
    //     </div>
    //     <Text className="block  text-sm">{item.description}</Text>

    //     <div className="flex items-center gap-x-3">
    //       {/* <FaBellConcierge color="red" /> */}
    //       <span>{item.category}</span>
    //     </div>

    //     <div className="flex gap-x-2 items-center">
    //       <div className="flex">
    //         {" "}
    //         <IoIosStar color="#FF9500" /> <IoIosStar color="#FF9500" />{" "}
    //         <IoIosStar color="#FF9500" /> <IoIosStar color="#FF9500" />{" "}
    //         <IoIosStar color="#FF9500" />{" "}
    //       </div>
    //       <span className="text-[#949494]">(314)</span>
    //     </div>

    //     <div className="flex justify-start mt-4">
    //       <Button
    //         className="!bg-red-500 !text-white "
    //         onClick={() => onEdit(item)}
    //       >
    //         Edit Product
    //       </Button>
    //     </div>
    //   </div>
    // </div>

    <div className="shadow-md w-[250px] bg-white rounded-md overflow-hidden relative">
      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt="menu_img"
          className="w-full h-[160px] object-cover"
          onError={(e) => {
            e.target.onerror = null; // prevent infinite loop
            e.target.src = placeholder_img; // set your fallback image path here
          }}
        />

        {/* Action buttons - Top right */}
        <div className="absolute top-2 right-2 flex gap-2">
          <EditMenuModal menu={menu}/>
          <DeleteMenuModal menuId={menuId}/>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Title & Price */}
        <div className="flex justify-between items-center">
          <Text strong className="text-base truncate">
            {name}
          </Text>
          <Text className="!text-red-500 !font-semibold text-sm">
            ${price.toFixed(2)} 
          </Text>
        </div>

        {/* Cuisine & Ratings */}
        <div className="flex justify-between items-center">
          <div className="inline-block bg-green-100 text-green-700 text-sm font-medium px-2 py-0.5 rounded">
            {cuisineName}
          </div>
          <div className="flex items-center gap-1 text-base text-yellow-500">
            <IoIosStar />
            <span className="text-black font-medium">{ratings}</span>
            <span className="text-[#949494] text-sm">({totalReview})</span>
          </div>
        </div>

        {/* Ingredient */}
        {/* <Text className="block text-sm text-gray-600 line-clamp-2">
        Ingredients: {ingredient}
      </Text> */}
        <div className="text-sm text-gray-700 flex flex-col gap-1 flex-wrap">
          <span className="font-semibold">Ingredients:</span>
          <span className="line-clamp-2">{ingredient}</span>
        </div>
      </div>
    </div>
  );

};

export default MenuItem;
