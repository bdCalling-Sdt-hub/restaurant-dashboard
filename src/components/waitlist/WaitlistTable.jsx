import { Pagination , Table } from 'antd';
import convertUTCtimeString from '../../utils/convertUTCtimeString';
import getColorClassForDate from '../../utils/getColorClassForDate';
import UpdateBookingStatusModal from '../modal/booking/UpdateBookingStatusModal';
import { useNavigate } from 'react-router-dom';

const colorMap = {
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const WaitlistTable = ({bookings, meta, currentPage, setCurrentPage, pageSize, setPageSize}) => {
    const navigate = useNavigate();

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
        paymentStatus: booking?.paymentStatus,
        guest: booking?.guest,
        diningName: booking?.diningName
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
            const date = val?.split("T")[0];
            const { bg, text, border } = getColorClassForDate(date);
            return (
              <button
                className={`text-sm px-2 py-1 rounded ${bg} ${text} ${border} border cursor-default`}
              >
                {date}
              </button>
            );
          },
        },
        {
          title: "Check In",
          dataIndex: "startDateTime",
          key: "startDateTime",
          render: (val) => <>{convertUTCtimeString(val)}</>,
        },
        {
          title: "Check Out",
          dataIndex: "endDateTime",
          key: "endDateTime",
          render: (val) => <>{convertUTCtimeString(val)}</>,
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
        // {
        //       title: "Dining",
        //       dataIndex: "diningName",
        //       key: "diningName"
        //     },
        {
          title: "Guest",
          dataIndex: "guest",
          key: "guest",
          align: "center",
          width: 80,
        },
        {
          title: "Action2",
          key: "action",
          render: (_, record) => (
            <button onClick={()=>navigate(`/assign-table/${record?._id}`)} class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow">
            Assign to Table
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
        <Table size="small" columns={columns} dataSource={dataSource} scroll={{ x: true, y:"60vh" }} pagination={false} />
        <br />
        <Pagination onChange={handlePagination} align="end" current={currentPage} pageSize={pageSize} total={meta?.total} />
      </div>
    </>
  )
}

export default WaitlistTable;