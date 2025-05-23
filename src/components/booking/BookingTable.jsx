import { Pagination , Table } from 'antd';
import getColorClassForDate from '../../utils/getColorClassForDate';
import UpdateBookingStatusModal from '../modal/booking/UpdateBookingStatusModal';


const BookingTable = ({bookings, meta, currentPage, setCurrentPage, pageSize, setPageSize}) => {

    const dataSource = bookings?.map((booking, index)=> ({
        key: index,
        serial: Number(index+1) + ((currentPage-1)*pageSize),
        _id: booking?._id,
        userId:  booking?.userId,
        token: booking?.token,
        customerName: booking?.customerName,
        email: booking?.customerEmail,
        phone: booking?.customerPhone,
        profileImg: booking?.customerImg,
        diningName: booking?.diningName,
        status: booking?.status,
        paymentStatus: booking?.paymentStatus,
        guest: booking?.guest,
        date: booking?.date,
        time: booking?.time
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
          render: (val) => <span className="font-bold">{val}</span>,
        },
        {
          title: "Customer Name",
          dataIndex: "customerName",
          key: "customerName",
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
            )
         },
        // {
        //   title: "Image",
        //   dataIndex: "profileImg",
        //   key: "profileImg",
        //   render: (val) => (
        //     <img
        //       src={val || placeholder_img}
        //       alt="administrator_img"
        //       onError={(e) => {
        //         e.currentTarget.onerror = null; // Prevent infinite loop
        //         e.currentTarget.src = placeholder_img;
        //       }}
        //       className="h-[45px] w-[45px] rounded-md mr-2"
        //     />
        //   ),
        // },
        // {
        {
          title: "Dining",
          dataIndex: "diningName",
          key: "diningName",
        },
        {
          title: "Contact",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Guest",
          dataIndex: "guest",
          key: "guest",
          align: "center",
          width: 80,
        },
        {
          title: "Status",
          dataIndex: "paymentStatus",
          key: "paymentStatus",
          align: "center",
          render: (val) => {
            const statusStyles = {
              unpaid: "bg-red-100 text-red-700 border border-red-300",
              paid: "bg-green-100 text-green-700 border border-green-300",
            };
            const bgColor =
              val === "paid" ? statusStyles.paid : statusStyles.unpaid;

            return (
              <div className="flex items-center justify-center gap-2">
                <span
                  className={`${bgColor} capitalize px-3 py-0.5 text-sm font-medium rounded-full`}
                >
                  {val}
                </span>
                {/* <ChangeStatusModal userId={record._id} status={val}/> */}
              </div>
            );
          },
        },
        {
          title: "Action",
          key: "action",
          render: (_, record) => (
            <UpdateBookingStatusModal bookingId={record?._id}/>
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

export default BookingTable;