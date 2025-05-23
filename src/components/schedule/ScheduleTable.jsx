import { Pagination, Table } from "antd";
import getColorClassForDate from "../../utils/getColorClassForDate";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ScheduleTable = ({
  schedules,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
}) => {
  const navigate = useNavigate();
  const dataSource = schedules?.map((schedule, index) => ({
    key: index,
    serial: Number(index + 1) + (currentPage - 1) * pageSize,
    date: schedule?.date,
    count: schedule?.count,
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
      title: "Total Schedule",
      dataIndex: "count",
      key: "count",
      align: "center"
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
      render: (_, {date}) => (
        <button onClick={()=> navigate(`/schedule-details/${date}`)} className="bg-black hover:bg-primary p-1.5 text-white rounded-md">
          <IoEyeSharp size={18} />
        </button>
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

export default ScheduleTable;
