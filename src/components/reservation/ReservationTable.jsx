import { Pagination , Table } from 'antd';
import getColorClassForDate from '../../utils/getColorClassForDate';
import { useNavigate } from 'react-router-dom';
import {getDiningColorClass} from "../../utils/getDiningColorClass";
import { IoEyeSharp } from 'react-icons/io5';


const ReservationTable = ({reservations, meta, currentPage, setCurrentPage, pageSize, setPageSize}) => {
  const navigate = useNavigate();

    const dataSource = reservations?.map((reservation, index)=> ({
        key: index,
        serial: Number(index+1) + ((currentPage-1)*pageSize),
        date: reservation?.date,
        seats: reservation?.seats,
        time: reservation?.time,
        diningName: reservation?.diningName
    }))

 
      const columns = [
        {
          title: "SN",
          dataIndex: "serial",
          key: "serial",
        },
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
          render: (val) => {
            const { bg, text, border } = getColorClassForDate(val);
            return (
              <button className={`text-sm px-2 py-1 rounded ${bg} ${text} ${border} border cursor-default`}>
                {val}
              </button>
            );
          }
        }, 
        {
          title: "Time",
          dataIndex: "time",
          key: "time",
          render: (val) => (
            <div className="text-sm text-gray-700">
              {val}
            </div>
          ),
        },
        {
          title: "Dining",
          dataIndex: "diningName",
          key: "diningName",
          render: (val) => {
            const colorClass = getDiningColorClass(val);
            return (
              <span className={`inline-block min-w-24 text-center px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
                {val}
              </span>
            );
          },
        },
        {
          title: "Total Seats",
          dataIndex: "seats",
          key: "seats",
          align: "center"
        },
        //  {
        //   title: "Total Schedules",
        //   dataIndex: "totalSchedules",
        //   key: "totalSchedules",
        //   align: "center"
        // },
        {
          title: "View",
          dataIndex: "view",
          key: "view",
          render: (_, {date}) => (
            <button onClick={()=> navigate(`/reservation-calendar/details/${date}`)} className="bg-black hover:bg-primary p-1.5 text-white rounded-md">
              <IoEyeSharp size={18} />
            </button>
          ),
        },
      ];


  const handlePagination = (page, PageSize) => {
    setCurrentPage(page);
    setPageSize(PageSize)
  }


  return (
    <>
      <div className="rounded-lg shadow p-4">
        <Table size="small" columns={columns} dataSource={dataSource} scroll={{ x: true, y:"55vh" }} pagination={false} />
        <br />
        <Pagination onChange={handlePagination} align="end" current={currentPage} pageSize={pageSize} total={meta?.total} />
      </div>
    </>
  )
}

export default ReservationTable;