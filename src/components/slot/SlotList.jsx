
import { useEffect, useState } from "react";
import ListLoading from "../Loader/ListLoading";
import SlotTable from "./SlotTable";
import { useGetSlotsQuery } from "../../redux/features/slot/slotApi";
import CreateSlotModal from "../modal/slot/CreateSlotModal";


const SlotList = () => {
  const [searchQuery, setSearchQuery ] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(2);

  //debounced handle
  useEffect(() => {
    let timeoutId;
    clearTimeout(timeoutId); //clear timeout after onChange
    timeoutId = setTimeout(() => {
      setSearchTerm(searchQuery);
    }, 600);
  }, [searchQuery]);

  const { data, isLoading } = useGetSlotsQuery([
    { name: "searchTerm", value: searchTerm },
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