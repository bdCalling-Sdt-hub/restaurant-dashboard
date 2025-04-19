
import { useState } from "react";
import ListLoading from "../Loader/ListLoading";
import SlotTable from "./SlotTable";
import { useGetSlotsQuery } from "../../redux/features/slot/slotApi";
import CreateSlotModal from "../modal/slot/CreateSlotModal";


const SlotList = () => {
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);

  const { data, isLoading } = useGetSlotsQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize }
  ]);
  const slots = data?.data || []
  const meta = data?.meta;

 
    

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <CreateSlotModal/>
      </div>
      {
        isLoading ? (
          <ListLoading/>
        ): (
          <SlotTable slots={slots} meta={meta} currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} setPageSize={setPageSize}/>
        )
      }
    </>
  );
}

export default SlotList;