import { Pagination, Table } from "antd";
import DeleteDiningModal from "../modal/dining/DeleteDiningModal";
import EditDiningModal from "../modal/dining/EditDiningModal";
import { getDiningColorClass } from "../../utils/getDiningColorClass";

const DiningTable = ({
  diningList,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
}) => {
  const dataSource = diningList?.map((dining, index) => ({
    key: index,
    serial: Number(index + 1) + (currentPage - 1) * pageSize,
    _id: dining?._id,
    name: dining?.name,
  }));

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-x-2">
          <EditDiningModal dining={record} />
          <DeleteDiningModal diningId={record._id} />
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

export default DiningTable;
