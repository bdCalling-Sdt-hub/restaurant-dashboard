
const ViewCard = ({data}) => {
    //  const data = {
    //    token: "995154",
    //    customerName: "Marjan Hossain",
    //    customerEmail: "marjan@gmail.com",
    //    customerPhone: "0199888777",
    //    customerImg: "",
    //    diningName: "Out Door",
    //    date: "2025-05-15",
    //    time: "10:00 AM - 11:00 AM",
    //    tableData: [
    //      {
    //        _id: "681f6c362f06161427d682ae",
    //        bookedSeats: 2,
    //        tableName: "T-3",
    //      },
    //      {
    //        _id: "681f6c362f06161427d682b4",
    //        bookedSeats: 3,
    //        tableName: "T-9",
    //      },
    //      {
    //        _id: "681f6c362f06161427d682ac",
    //        bookedSeats: 6,
    //        tableName: "T-1",
    //      },
    //      {
    //        _id: "681f6c362f06161427d682ad",
    //        bookedSeats: 9,
    //        tableName: "T-2",
    //      },
    //      // {
    //      //   _id: "681f6c362f06161427d682ad",
    //      //   bookedSeats: 5,
    //      //   tableName: "T-4",
    //      // },
    //    ],
    //  };

    return (
        <>
           <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden md:max-w-2xl my-8">
          <div className="p-6">
            {/* Token and Dining Info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {data?.diningName}
                </h2>
                <p className="text-gray-600 text-sm">
                  {data?.date} • <span className="bg-purple-100 text-purple-800 border border-purple-300 rounded-md px-2 p-1">{data.time}</span>
                </p>
              </div>
              <div className="mt-2 md:mt-0 px-3 py-2 rounded-full">
                <p className="text-green-800 bg-green-100 font-semibold px-3 py-1 rounded-md">
                  Token: {data?.token}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* Customer Info */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Customer Details
              </h3>
              <div className="flex items-start">
                {data?.customerImg ? (
                  <img
                    src={data.customerImg || "/placeholder.svg"}
                    alt={data.customerName}
                    className="h-12 w-12 rounded-full mr-4 object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <span className="text-gray-500 font-medium text-lg">
                      {data?.customerName.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-800">
                    {data?.customerName}
                  </p>
                  <p className="text-gray-600 text-sm">{data?.customerEmail}</p>
                  <p className="text-gray-600 text-sm">{data?.customerPhone}</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-4"></div>
            <h1>Total Reserved Seats: <span className="font-bold">{data?.totalBookedSeats}</span></h1>

            {/* Table Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Reserved Tables
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {data.tableData.map((table) => (
                  <div
                    key={table._id}
                    className="bg-blue-50 rounded-lg p-3 text-center border border-blue-300"
                  >
                    <p className="font-bold text-blue-800">{table?.tableName}</p>
                    <p className="text-sm text-blue-600">
                      {table.bookedSeats}{" "}
                      {table.bookedSeats === 1 ? "seat" : "seats"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div> 
        </>
    );
};

export default ViewCard;