import convertUTCtimeString from "../../utils/convertUTCtimeString";
import AddTableModal from "../modal/table/AddTableModal";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TableCard from "./TableCard";

const TableDetails = ({ tables, data }) => {
  const diningName = data?.diningName;
  const startDateTime = data?.startDateTime;
  const endDateTime = data?.endDateTime;
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-xl p-4 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-2 sm:mb-0 flex">
          <div className="flex items-center gap-12">
            <button
              onClick={handleGoBack}
              className="self-start flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition"
            >
              <FaArrowLeft className="text-lg" />
              <span>Go Back</span>
            </button>
            <div className="text-lg flex flex-col gap-y-2">
              <span className="font-semibold">Schedule:</span>
              <span className="font-semibold">Dining:</span>
            </div>
          </div>

          <div className="text-lg flex flex-col gap-y-2">
            <button className="cursor-default bg-purple-100 px-2 ml-1 text-purple-600 border border-purple-300 rounded-md">
              {convertUTCtimeString(startDateTime)} -{" "}
              {convertUTCtimeString(endDateTime)}
            </button>
            <button className="cursor-default bg-yellow-100 px-2 ml-1 text-yellow-600 border border-yellow-300 rounded-md">
              {diningName}
            </button>
          </div>
        </div>

        <AddTableModal />
      </div>

      <div className="mx-auto bg-gray-50 shadow-lg rounded-md p-4 h-[600px] overflow-y-scroll">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tables?.map((table, index) => (
           <TableCard table={table} key={index}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default TableDetails;
