import { Pagination , Table } from 'antd';
import convertUTCtimeString from '../../utils/convertUTCtimeString';
import DeleteSlotModal from '../modal/slot/DeleteSlotModal';

const SlotTable = ({slots, meta, currentPage, setCurrentPage, pageSize, setPageSize}) => {

    const dataSource = slots?.map((slot, index)=> ({
        key: index,
        serial: Number(index+1) + ((currentPage-1)*pageSize),
        _id: slot?._id,
        startDateTime:  slot?.startDateTime,
        endDateTime: slot?.endDateTime
    }))

 
      const columns = [
        {
          title: "SN",
          dataIndex: "serial",
          key: "serial",
        },
        // {
        //   title: "Start Time",
        //   dataIndex: "startDateTime",
        //   key: "startDateTime",
        //   render: (val) => (
        //     <>
        //      {convertUTCtimeString(val)}
        //     </>
        //   )
        // },
        // {
        //   title: "End Time",
        //   dataIndex: "endDateTime",
        //   key: "endDateTime",
        //   render: (val) => (
        //     <>
        //      {convertUTCtimeString(val)}
        //     </>
        //   )
        // },
        {
            title: "Time",
            dataIndex: "startDateTime",
            key: "time",
            render: (_, record) => (
              <div className="text-sm text-gray-700">
                {convertUTCtimeString(record.startDateTime)} - {convertUTCtimeString(record.endDateTime)}
              </div>
            )
         },
        {
          title: "Action",
          key: "action",
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <DeleteSlotModal slotId={record._id} />
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
        <Table size="small" columns={columns} dataSource={dataSource} scroll={{ x: true, y:"55vh" }} pagination={false} />
        <br />
        <Pagination onChange={handlePagination} align="end" current={currentPage} pageSize={pageSize} total={meta?.total} />
      </div>
    </>
  )
}

export default SlotTable;