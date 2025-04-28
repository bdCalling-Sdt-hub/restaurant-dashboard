import { Pagination , Table } from 'antd';
import convertUTCtimeString from '../../utils/convertUTCtimeString';
import getColorClassForDate from '../../utils/getColorClassForDate';
import ChangeAvailabilityModal from '../modal/tableBooking/ChangeAvailabilityModal';
import DeleteTableBookingModal from '../modal/tableBooking/DeleteTableBookingModal';


const TableBookingTable = ({bookings, meta, currentPage, setCurrentPage, pageSize, setPageSize}) => {

    const dataSource = bookings?.map((booking, index)=> ({
        key: index,
        serial: Number(index+1) + ((currentPage-1)*pageSize),
        _id: booking?._id,
        userId:  booking?.userId,
        token: booking?.token,
        name: booking?.name,
        startDateTime: booking?.startDateTime, 
        endDateTime: booking?.endDateTime, 
        availability: booking?.availability,
      }))

 
      const columns = [
        {
          title: "SN",
          dataIndex: "serial",
          key: "serial",
        },
        {
          title: "Token",
          dataIndex: "token",
          key: "token",
          render: (val)=> (
            <span className="font-bold">{val}</span>
          )
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
            title: "Date",
            dataIndex: "startDateTime",
            key: "date",
            render: (val) => {
              const date = val?.split("T")[0];
              const { bg, text } = getColorClassForDate(date);
              return (
                <button className={`text-sm px-2 py-1 rounded ${bg} ${text} cursor-default`}>
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
            title: "Availability",
            dataIndex: "availability",
            key: "availability",
            render: (val, record) => {
            const statusStyles = {
              Waitlist: "bg-red-100 text-red-700 border border-red-300",
              Seating: "bg-green-100 text-green-700 border border-green-300",
            };
            const bgColor =
            val === "Seating" ? statusStyles.Seating : statusStyles.Waitlist;
        
            return (
              <div className="flex items-center gap-2">
                <span
                  className={`${bgColor} w-18 text-center capitalize px-3 py-0.5 text-sm font-medium rounded-full`}
                >
                  {val}
                </span>
                <ChangeAvailabilityModal tableBookingId={record?._id} availability={record?.availability}/>
              </div>
            );
          }
        },
        {
          title: "Action",
          key: "action",
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <DeleteTableBookingModal tableBookingId={record._id} />
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
        <Table size="small" columns={columns} dataSource={dataSource} scroll={{ x: true, y:"60vh" }} pagination={false} />
        <br />
        <Pagination onChange={handlePagination} align="end" current={currentPage} pageSize={pageSize} total={meta?.total} />
      </div>
    </>
  )
}

export default TableBookingTable;