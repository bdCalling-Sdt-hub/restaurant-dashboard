import { Pagination, Table } from "antd";
import getColorClassForDate from "../../utils/getColorClassForDate";
import ViewBookingCardModal from "../modal/tableBooking/ViewBookingCardModal";

const TableBookingTable = ({
  bookings,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
}) => {

  
  const dataSource = bookings?.map((booking, index) => ({
    key: index,
    serial: Number(index + 1) + (currentPage - 1) * pageSize,
    _id: booking?._id,
    userId: booking?.userId,
    bookingId: booking?.bookingId,
    token: booking?.token,
    name: booking?.name,
    date: booking?.date,
    time: booking?.time,
    availability: booking?.availability,
    fullName: booking?.fullName,
    email: booking?.email,
    phone: booking?.phone,
    bookedSeats: booking?.bookedSeats,
    diningName: booking?.diningName,
  }));

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
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (val) => {
        const { bg, text, border } = getColorClassForDate(val);
        return (
          <button
            className={`text-sm px-2 py-1 rounded ${bg} ${text} ${border} border cursor-default`}
          >
            {val}
          </button>
        );
      },
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
          {
          title: "Dining",
          dataIndex: "diningName",
          key: "diningName",
        },
    {
      title: "Booked Seats",
      dataIndex: "bookedSeats",
      key: "bookedSeats",
      align: "center",
      width: 150,
    },
    {
      title: "View",
      key: "view",
      render: (_, {bookingId}) => (
       <ViewBookingCardModal bookingId={bookingId}/>
      ),
    },
  ];

  const handlePagination = (page, PageSize) => {
    setCurrentPage(page);
    setPageSize(PageSize);
  };

  return (
    <>
      <div className="rounded-lg shadow p-4">
        <Table
          size="small"
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: true, y: "60vh" }}
          pagination={false}
        />
        <br />
        <Pagination
          onChange={handlePagination}
          align="end"
          current={currentPage}
          pageSize={pageSize}
          total={meta?.total}
        />
      </div>
    </>
  );
};

export default TableBookingTable;
