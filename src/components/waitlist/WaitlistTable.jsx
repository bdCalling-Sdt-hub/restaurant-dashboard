import { Pagination , Table } from 'antd';
import getColorClassForDate from '../../utils/getColorClassForDate';
import { useNavigate } from 'react-router-dom';


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
        profileImg: booking?.customerImg,
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
        //   title: "Email",
        //   dataIndex: "email",
        //   key: "email",
        // },
        {
          title: "Contact Number",
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
          title: "Action",
          key: "action",
          render: (_, record) => (
            <button onClick={()=>navigate(`/assign-table/${record?._id}`)} class="bg-rose-600 hover:bg-rose-700 text-white font-medium py-1 px-2 rounded shadow">
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