import { Pagination , Table } from 'antd';
import convertUTCtimeString from '../../utils/convertUTCtimeString';
import DeleteScheduleModal from '../modal/schedule/DeleteScheduleModal';
import getColorClassForDate from '../../utils/getColorClassForDate';


const ScheduleTable = ({schedules, meta, currentPage, setCurrentPage, pageSize, setPageSize}) => {

    const dataSource = schedules?.map((schedule, index)=> ({
        key: index,
        serial: Number(index+1) + ((currentPage-1)*pageSize),
        _id: schedule?._id,
        startDateTime:  schedule?.startDateTime,
        endDateTime: schedule?.endDateTime,
        availableSeats: schedule?.availableSeats
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
                {convertUTCtimeString(record.startDateTime)} - {convertUTCtimeString(record.endDateTime)}
              </div>
            )
         },
         {
          title: "Seats",
          dataIndex: "availableSeats",
          key: "availableSeats"
       },
        {
          title: "Action",
          key: "action",
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <DeleteScheduleModal scheduleId={record._id} />
            </div>
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

export default ScheduleTable;