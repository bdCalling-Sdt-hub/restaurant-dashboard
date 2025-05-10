import { Pagination , Table } from 'antd';
import convertUTCtimeString from '../../utils/convertUTCtimeString';
import getColorClassForDate from '../../utils/getColorClassForDate';


const ReservationTable = ({reservations, meta, currentPage, setCurrentPage, pageSize, setPageSize}) => {

    const dataSource = reservations?.map((reservation, index)=> ({
        key: index,
        serial: Number(index+1) + ((currentPage-1)*pageSize),
        _id: reservation?._id,
        startDateTime:  reservation?.startDateTime,
        endDateTime: reservation?.endDateTime,
        scheduleId: reservation?.scheduleId,
        seats: reservation?.seats
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
          title: "Total Seats",
          dataIndex: "seats",
          key: "seats",
          align: "center"
        },
        // {
        //   title: "View",
        //   dataIndex: "view",
        //   key: "view",
        //   render: (_, {scheduleId, diningId}) => (
        //     <button onClick={()=> navigate(`/tables/details/${scheduleId}/${diningId}`)} className="bg-black hover:bg-primary p-1.5 text-white rounded-md">
        //       <IoEyeSharp size={18} />
        //     </button>
        //   ),
        // },
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

export default ReservationTable;