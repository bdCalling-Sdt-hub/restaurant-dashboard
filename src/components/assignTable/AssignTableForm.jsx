/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { Check } from "lucide-react";
import TableBookingModal from "../modal/tableBooking/TableBookingModal";
import { Form, Input } from "antd";
import { SetShowSummary, SetTableBookingSeats } from "../../redux/features/table/tableSlice";
import { ErrorToast } from "../../helper/ValidationHelper";
import { useEffect } from "react";

const AssignTableForm = () => {
  const dispatch = useDispatch();
  const {
    selectedDate,
    scheduleId,
    diningId,
    diningName,
    selectedTable,
    selecetedTableSeats,
    selectedTableName,
    tableBookingSeats,
    time,
    showSummary
  } = useSelector((state) => state.table);
  const { booking } = useSelector((state) => state.booking);
  const [form] = Form.useForm();


  const onFinish = (values) => {
     if(Number(values.seats) > booking?.remainingBookedGuests){
      ErrorToast(`You can book only ${booking?.remainingBookedGuests} seat(s) more`);
      return
    }
    if(Number(values.seats) > selecetedTableSeats){
      ErrorToast(`This table has only ${selecetedTableSeats} seat(s)`);
      return
    }
    else{
      dispatch(SetShowSummary(true))
      dispatch(SetTableBookingSeats(Number(values.seats)))
    }
  }

  return (
    <>
      <div className=" bg-white w-[260px] p-4 rounded shadow-sm space-y-4 h-full">
        <div className="border-t pt-4">
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="w-20 font-medium">Date:</span>
              <span className="bg-blue-100 text-blue-800 border border-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                {selectedDate}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="w-20 font-medium">Time:</span>
              <span className="bg-purple-100 text-purple-800 border border-purple-300 px-3 py-1 rounded-full text-xs font-semibold">
                {/* In door */} {time}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-20 font-medium">Total Guest:</span>
              <span className="bg-pink-100 text-pink-800 border border-pink-300 px-3 py-1 rounded-full text-xs font-semibold">
                {/* In door */} {booking?.remainingBookedGuests}
              </span>
            </div>
          </div>
        </div>

        {
          selectedTable && (
            <>
               <Form
                  form={form}
                  name="edit"
                  layout="vertical"
                  onFinish={onFinish}
                >
                   
                  <Form.Item
                    name="seats"
                    label={
                      <span className="font-semibold">
                        <span className="text-red-500 mr-1">*</span>
                        Seats
                      </span>
                    }
                    rules={[
                      { required: true, message: "Please enter the seat(s)" },
                      {
                        pattern: /^\d+$/,
                        message: "Only numeric values are allowed",
                      },
                      {
                        min: 1,
                        message: "enter minimum one seat"
                      },
                      {
                        validator: (_, value) => {
                          if (value && Number(value) <= 0) {
                            return Promise.reject("Price must be greater than 0");
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      placeholder="Type here"
                      onKeyUp={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e)=>{
                        dispatch(SetShowSummary(false))
                      }}
                    />
                  </Form.Item>
                  <button
                    type="submit"
                    className="w-full mt-1 bg-rose-500 hover:bg-rose-600 duration-200 p-2 border-0 rounded-md text-white flex justify-center items-center gap-x-2 disabled:cursor-not-allowed"
                  >
                    Set
                  </button>
                </Form>
            </>
          )
        }

       

        {/* Reservation Summary */}
        {selectedTable && scheduleId && diningId && tableBookingSeats !== 0 && showSummary &&(
          <>
            <div className="mt-6 p-4 bg-rose-50 rounded-lg border border-rose-100">
              <h3 className="font-medium text-rose-800 flex items-center gap-1">
                <Check className="h-4 w-4" /> Reservation Summary
              </h3>
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  <span className="bg-blue-100 text-blue-800 border border-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                    {selectedDate}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Time:</span> {time}
                </p>
                <p>
                  <span className="font-medium">Seat(s):</span> {tableBookingSeats}
                </p>
                <p>
                  <span className="font-medium">Dining:</span> {diningName}
                </p>
                <p>
                  <span className="font-medium">Table:</span>{" "}
                  {selectedTableName}
                </p>
              </div>
            </div>
           <TableBookingModal/>
          </>
        )}
      </div>
    </>
  );
};

export default AssignTableForm;
