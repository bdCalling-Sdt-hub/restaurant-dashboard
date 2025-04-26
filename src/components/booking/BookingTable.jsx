import { Pagination , Table } from 'antd';
import convertUTCtimeString from '../../utils/convertUTCtimeString';
import getColorClassForDate from '../../utils/getColorClassForDate';

const colorMap = {
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

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
        profileImg: booking?.profileImg,
        date: booking?.date,
        startDateTime: booking?.startDateTime, //checkIn
        endDateTime: booking?.endDateTime, //checkOut
        status: booking?.status,
        paymentStatus: booking?.paymentStatus
      }))

    console.log(dataSource);
 
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
          title: "Customer Name",
          dataIndex: "customerName",
          key: "customerName",
        },
        {
          title: "Date",
          dataIndex: "date",
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
          title: "Check In",
          dataIndex: "startDateTime",
          key: "startDateTime",
          render: (val) => (
            <>
             {convertUTCtimeString(val)}
            </>
          )
        },
        {
          title: "Check Out",
          dataIndex: "endDateTime",
          key: "endDateTime",
          render: (val) => (
            <>
             {convertUTCtimeString(val)}
            </>
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
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "Contact Number",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          render: (val, record) => {
            const bgColor = colorMap[val]; 
        
            return (
              <div className="flex items-center gap-2">
                <button
                  className={`${bgColor} w-20 px-2 py-0.5 rounded-md shadow cursor-default capitalize`}
                >
                  {val}
                </button>
                {/* <EditApprovalStatusModal approved={val==="pending" ? "" : val} restaurantId={record._id}/> */}
              </div>
            );
          },
        },
        {
          title: "Payment Status",
          dataIndex: "paymentStatus",
          key: "paymentStatus",
          render: (val) => {
            const statusStyles = {
              unpaid: "bg-red-100 text-red-700 border border-red-300",
              paid: "bg-green-100 text-green-700 border border-green-300",
            };
            const bgColor =
            val === "paid" ? statusStyles.paid : statusStyles.unpaid;
        
            return (
              <div className="flex items-center gap-2">
                <span
                  className={`${bgColor} capitalize px-3 py-0.5 text-sm font-medium rounded-full`}
                >
                  {val}
                </span>
                {/* <ChangeStatusModal userId={record._id} status={val}/> */}
              </div>
            );
          }
        },
        // {
        //   title: "Action",
        //   key: "action",
        //   render: (_, record) => (
        //     <div className="flex items-center gap-x-2">
        //       {/* <DeleteAdministratorModal administratorId={record._id} /> */}
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
        <Table size="small" columns={columns} dataSource={dataSource} scroll={{ x: true, y:"60vh" }} pagination={false} />
        <br />
        <Pagination onChange={handlePagination} align="end" current={currentPage} pageSize={pageSize} total={meta?.total} />
      </div>
    </>
  )
}

export default BookingTable;