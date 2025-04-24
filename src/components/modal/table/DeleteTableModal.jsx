import { Modal } from "antd";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { useDeleteTableMutation } from "../../../redux/features/table/tableApi";
import { RiDeleteBin6Line } from "react-icons/ri";





const DeleteTableModal = ({ tableId }) => {
    const [ modalOpen, setModalOpen ] = useState(false);
   const [ deleteTable, { isLoading, isSuccess, isError }] = useDeleteTableMutation();

    useEffect(()=> {
        if(isSuccess || isError){
          setModalOpen(false)
        }
    },[isSuccess, isError])
   
    const handleDelete = () => {
      deleteTable(tableId);
    }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 hover:border-red-300 p-2 rounded-md transition-colors"
        title="Delete"
      >
        <RiDeleteBin6Line size={20} />
      </button>
      <Modal
        title="Are you sure, you want to delete?"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
      >
        <div className="flex justify-end px-4 gap-x-3">
          <button
            onClick={() => setModalOpen(false)}
            className="bg-black text-white px-4 py-1 rounded-md"
          >
            No
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 duration-500 text-white px-4 py-1 rounded-md disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <CgSpinnerTwo className="animate-spin" fontSize={16} />
              </>
            ) : (
              "Yes"
            )}
          </button>
        </div>
      </Modal>
    </>
  );
}

export default DeleteTableModal