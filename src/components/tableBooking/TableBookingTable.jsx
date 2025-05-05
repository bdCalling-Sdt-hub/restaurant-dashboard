import { Pagination, Table } from "antd";
import convertUTCtimeString from "../../utils/convertUTCtimeString";
import getColorClassForDate from "../../utils/getColorClassForDate";
import ChangeAvailabilityModal from "../modal/tableBooking/ChangeAvailabilityModal";
import DeleteTableBookingModal from "../modal/tableBooking/DeleteTableBookingModal";

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
    token: booking?.token,
    name: booking?.name,
    startDateTime: booking?.startDateTime,
    endDateTime: booking?.endDateTime,
    availability: booking?.availability,
    fullName: booking?.fullName,
    email: booking?.email,
    phone: booking?.phone,
    guest: booking?.guest,
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
      dataIndex: "startDateTime",
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
    },
    {
      title: "Guest",
      dataIndex: "guest",
      key: "guest",
      align: "center",
      width: 80,
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
