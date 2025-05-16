import { Modal } from "antd";
import { Clock, HandPlatter, Users } from "lucide-react";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";

const ViewReservationModal = ({ schedule }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-full"
      >
        <IoEyeSharp size={18} />
      </button>

      <Modal
        title={
          <span className="font-bold text-xl">Schedule Details</span>
        }
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
        }}
        maskClosable={false}
        footer={false}
      >
        <div
          className={`rounded-lg shadow-sm border border-gray-200 overflow-hidden ${
            schedule?.seats === 0 ? "bg-red-100 border-red-300" : "bg-white"
          }`}
        >
          <div className="p-5">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center mb-3">
                  <Clock className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="text-gray-800 font-medium">
                    {schedule?.time}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <Users className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="text-gray-700">
                    Seats: {schedule?.seats}
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  <HandPlatter className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="text-gray-700">
                    Dining: {schedule?.dinings?.join(', ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewReservationModal;
