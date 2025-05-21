import { Pagination, Table } from "antd";
import getColorClassForDate from "../../utils/getColorClassForDate";
import { getDiningColorClass } from "../../utils/getDiningColorClass";
import EditReservationModal from "../modal/reservation/EditReservationModal";
import DeleteReservationModal from "../modal/reservation/DeleteReservationModal";

const ReservationTable = ({
  reservations,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
}) => {

  const dataSource = reservations?.map((reservation, index) => ({
    key: index,
    serial: Number(index + 1) + (currentPage - 1) * pageSize,
    _id: reservation?._id,
    date: reservation?.date,
    seats: reservation?.seats,
    time: reservation?.time,
    diningName: reservation?.diningName,
  }));

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
      render: (val) => <div className="text-sm text-gray-700">{val}</div>,
    },
    {
      title: "Dining",
      dataIndex: "diningName",
      key: "diningName",
      render: (val) => {
        const colorClass = getDiningColorClass(val);
        return (
          <span
            className={`inline-block min-w-24 text-center px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}
          >
            {val}
          </span>
        );
      },
    },
    {
      title: "Total Seats",
      dataIndex: "seats",
      key: "seats",
      align: "center",
      width: 150
    },
    {
      title: "Action",
      key: "action",
      //align: "center",
      render: (_, record) => (
        <div className="flex items-center gap-x-2">
          <EditReservationModal reservation={record} />
          <DeleteReservationModal reservationId={record._id} />
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
          scroll={{ x: true, y: "55vh" }}
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

export default ReservationTable;
