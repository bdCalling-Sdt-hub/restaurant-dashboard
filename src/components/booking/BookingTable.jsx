import { Pagination , Table } from 'antd';
import placeholder_img from "../../assets/images/placeholder.jpeg";

const BookingTable = ({users, meta, currentPage, setCurrentPage, pageSize, setPageSize}) => {

    const dataSource = users?.map((user, index)=> ({
        key: index,
        serial: Number(index+1) + ((currentPage-1)*pageSize),
        _id: user?._id,
        userId:  user?.userId,
        role:  user?.role,
        name: user?.fullName,
        email: user?.email,
        phone: user?.phone,
        profileImg: user?.profileImg,
        status: user?.status
    }))

 
      const columns = [
        {
          title: "SN",
          dataIndex: "serial",
          key: "serial",
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Image",
          dataIndex: "profileImg",
          key: "profileImg",
          render: (val) => (
            <img
              src={val || placeholder_img}
              alt="administrator_img"
              onError={(e) => {
                e.currentTarget.onerror = null; // Prevent infinite loop
                e.currentTarget.src = placeholder_img;
              }}
              className="h-[45px] w-[45px] rounded-md mr-2"
            />
          ),
        },
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
            const statusStyles = {
              blocked: "bg-red-100 text-red-700 border border-red-300",
              unblocked: "bg-green-100 text-green-700 border border-green-300",
            };
            const bgColor =
              val === "blocked" ? statusStyles.blocked : statusStyles.unblocked;
        
            return (
              <div className="flex items-center gap-2">
                <span
                  className={`${bgColor} px-3 py-0.5 text-sm font-medium rounded-full`}
                >
                  {val}
                </span>
                {/* <ChangeStatusModal userId={record._id} status={val}/> */}
              </div>
            );
          }
        },
        {
          title: "Role",
          dataIndex: "role",
          key: "role",
          render: (val) => {
            const roleStyles = {
              user: "bg-blue-100 text-blue-700 border border-blue-300",
              owner: "bg-purple-100 text-purple-700 border border-purple-300",
            };
            const bgColor =
              val === "user" ? roleStyles.user : roleStyles.owner;
        
            return (
                <span
                  className={`${bgColor} px-3 py-0.5 text-sm font-medium rounded-full`}
                >
                  {val}
                </span>  
            );
          }
        },
        {
          title: "Action",
          key: "action",
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              {/* <DeleteAdministratorModal administratorId={record._id} /> */}
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

export default BookingTable;