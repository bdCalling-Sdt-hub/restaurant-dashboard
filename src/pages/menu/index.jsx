import MenuItem from "../../components/menuComponents/MenuItem";
import { useGetMenusQuery } from "../../redux/features/menu/menuApi";
import MenuLoading from "../../components/Loader/MenuLoading";
import CreateMenuModal from "../../components/modal/menu/CreateMenuModal";
import { Pagination } from "antd";
import { useState } from "react";


const Menu = () => {
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
   const {data, isLoading } = useGetMenusQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize }
   ]);
   const menus = data?.data;
   const meta = data?.meta;


   const handlePagination = (page, PageSize) => {
    setCurrentPage(page);
    setPageSize(PageSize)
  }

  return (
    <div className="p-4">
      <CreateMenuModal />

      {isLoading ? (
        <MenuLoading />
      ) : (
        <>
          {menus?.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-3">
                {menus.map((menu, index) => (
                  <MenuItem key={index} menu={menu} />
                ))}
                  
              
              </div>
              <br />
              <Pagination onChange={handlePagination} align="left" current={currentPage} pageSize={pageSize} total={meta?.total} />            </>
          ) : (
            <div className="w-full flex flex-col items-center justify-center py-20 text-center text-gray-500">
              <h2 className="text-lg font-semibold mb-2">No items found</h2>
              <p className="text-sm text-gray-400 max-w-xs">
                Looks like there's nothing here yet. Try adding a new item to
                get started.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Menu;
