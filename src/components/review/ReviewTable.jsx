import { Pagination , Table } from 'antd';
import DeleteReviewModal from '../modal/review/DeleteReviewModal';
import { FaStar } from 'react-icons/fa6';


const ReviewTable = ({reviews, meta, currentPage, setCurrentPage, pageSize, setPageSize}) => {

    const dataSource = reviews?.map((review, index)=> ({
        key: index,
        serial: Number(index+1) + ((currentPage-1)*pageSize),
        reviewId: review?.reviewId,
        userId:  review?.userId,
        fullName:review?.fullName,
        email: review?.email,
        phone: review?.phone,
        star: review?.star,
        comment: review?.comment,
        profileImg: review?.profileImg,
      }))

 
      const columns = [
        {
          title: "SN",
          dataIndex: "serial",
          key: "serial",
        },
        {
          title: "Name",
          dataIndex: "fullName",
          key: "fullName",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
        // {
        //   title: "Date",
        //   dataIndex: "date",
        //   key: "date",
        //   render: (val) => {
        //     const { bg, text, border } = getColorClassForDate(val);
        //     return (
        //       <button className={`text-sm px-2 py-1 rounded ${bg} ${text} ${border} border cursor-default`}>
        //         {val}
        //       </button>
        //     );
        //   }
        // },        
        // {
        // {
          {
          title: "Rating",
          dataIndex: "star",
          key: "star",
          width: 150,
          align: "center",
          render: (value) => (
            <>
              <div className="flex items-center gap-1 justify-center">
                <FaStar className="text-yellow-500" size={18}/>
                <span>{value}</span>
              </div>
            </>
          )
        },
         {
          title: "Comment",
          dataIndex: "comment",
          key: "comment",
          width: 500,
          align: "center",
          render: (val)=>(
            <span className="text-sm">
              {val}
            </span>
          )
        },
        {
          title: "Action",
          key: "action",
          render: (_, record) => (
            <DeleteReviewModal reviewId={record?.reviewId}/>
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

export default ReviewTable;