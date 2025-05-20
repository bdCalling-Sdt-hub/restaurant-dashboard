import { Modal } from "antd";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { Trash2 } from "lucide-react";
import { useDeleteReservationMutation } from "../../../redux/features/reservation/reservationApi";

const DeleteReservationModal = ({ reservationId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteReservation, { isLoading, isSuccess, isError }] =
    useDeleteReservationMutation();

  useEffect(() => {
    if (isSuccess || isError) {
      setModalOpen(false);
    }
  }, [isSuccess, isError]);

  const handleDelete = () => {
    deleteReservation(reservationId);
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
        aria-label="Delete schedule"
      >
        <Trash2 className="h-4 w-4" />
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
};

export default DeleteReservationModal;
