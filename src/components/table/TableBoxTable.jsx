import { Pagination , Table } from 'antd';
import convertUTCtimeString from '../../utils/convertUTCtimeString';
import getColorClassForDate from '../../utils/getColorClassForDate';
import { IoEyeSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { getDiningColorClass } from '../../utils/getDiningColorClass';


const TableBoxTable = ({tables, meta, currentPage, setCurrentPage, pageSize, setPageSize}) => {
   const navigate = useNavigate();

    const dataSource = tables?.map((table, index)=> ({
        key: index,
        serial: Number(index+1) + ((currentPage-1)*pageSize),
        _id: table?._id,
        startDateTime:  table?.startDateTime,
        endDateTime: table?.endDateTime,
        totalSeats: table?.totalSeats,
        totalTables: table?.totalTables,
        scheduleId: table?.scheduleId,
        diningId: table?.diningId,
        diningName: table?.diningName,
    }))

 
      const columns = [
        {
          title: "SN",
          dataIndex: "serial",
          key: "serial",
        },
        {
          title: "Date",
          dataIndex: "startDateTime",
          key: "date",
          render: (val) => {
            const date = val?.split("T")[0];
            const { bg, text, border } = getColorClassForDate(date);
            return (
              <button className={`text-sm px-2 py-1 rounded ${bg} ${text} ${border} border cursor-default`}>
                {date}
              </button>
            );
          }
        }, 
        {
          title: "Time",
          dataIndex: "startDateTime",
          key: "time",
          render: (_, record) => (
            <div className="text-sm text-gray-700">
              {convertUTCtimeString(record.startDateTime)} -{" "}
              {convertUTCtimeString(record.endDateTime)}
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
          title: "Total Tables",
          dataIndex: "totalTables",
          key: "totalTables",
          align: "center",
          width:150
        },
        {
          title: "Total Seats",
          dataIndex: "totalSeats",
          key: "totalSeats",
          align: "center",
          width: 120
        },
        {
          title: "View",
          dataIndex: "view",
          key: "view",
          render: (_, {scheduleId, diningId}) => (
            <button onClick={()=> navigate(`/tables/details/${scheduleId}/${diningId}`)} className="bg-black hover:bg-primary p-1.5 text-white rounded-md">
              <IoEyeSharp size={18} />
            </button>
          ),
        },
        // {
        //   title: "Action",
        //   key: "action",
        //   render: (_, record) => (
        //     <div className="flex items-center gap-x-2">
        //       <DeleteScheduleModal scheduleId={record._id} />
        //     </div>
        //   ),
        // },
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

export default TableBoxTable;