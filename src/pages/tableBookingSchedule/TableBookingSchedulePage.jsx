import { useEffect, useState } from "react";
import { useGetScheduleDropDownQuery } from "../../redux/features/schedule/scheduleApi";
import convertUTCtimeString from "../../utils/convertUTCtimeString";
import { DatePicker, Form, Input, Select } from "antd";
import { useGetMyDiningsQuery } from "../../redux/features/dining/diningApi";
import { useGetTablesByScheduleAndDiningQuery } from "../../redux/features/table/tableApi";
import TableBooking from "../../components/tableBooking/TableBooking";

const TableBookingSchedulePage = () => {
  const [date, setDate] = useState("");
  const [diningId, setDiningId] = useState("");
  const [scheduleId, setScheduleId] = useState("");
  const { data } = useGetScheduleDropDownQuery(
    [{ name: "date", value: date }],
    {
      skip: !date,
    }
  );

  const [scheduleOptions, setScheduleOptions] = useState([]);
  useEffect(() => {
    if (date) {
      const schedules = data?.data || [];
      const Options = schedules?.map((schedule) => ({
        value: schedule?._id,
        label: (
          convertUTCtimeString(schedule?.startDateTime) +
          "-" +
          convertUTCtimeString(schedule.endDateTime)
        ).toString(),
      }));
      setScheduleOptions(Options);
    } else {
      setScheduleOptions([]);
    }
  }, [data, date]);

  const [form] = Form.useForm();
  const { data: diningData } = useGetMyDiningsQuery();
  const dinings = diningData?.data || [];
  const diningOptions = dinings?.map((dining) => ({
    value: dining?._id,
    label: dining?.name,
  }));

  const { data: tableData } = useGetTablesByScheduleAndDiningQuery(
    {
      scheduleId,
      diningId,
    },
    {
      skip: !scheduleId || !diningId,
    }
  );

  console.log(tableData);
 

  return (
    <>
      <section>
        <div className="flex gap-x-4">
          {/* Left */}
          <div className="border border-red-400 w-[250px]">
            <Form form={form} name="add" layout="vertical">
              <Form.Item
                name="date"
                label={
                  <span className="font-semibold">
                    <span className="text-red-500 mr-1">*</span>
                    Select Date
                  </span>
                }
              >
                <DatePicker
                  disabledDate={(current) =>
                    current && current < new Date().setHours(0, 0, 0, 0)
                  }
                  onChange={(_, dateString) => {
                    setDate(dateString);
                  }}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                name="scheduleId"
                dependencies={["date"]}
                label={
                  <span className="font-semibold">
                    <span className="text-red-500 mr-1">*</span>
                    Schedule
                  </span>
                }
              >
                <Select
                  placeholder="Select a schedule"
                  disabled={scheduleOptions.length === 0}
                  style={{ width: "100%" }}
                  onChange={(value) => setScheduleId(value)}
                  options={scheduleOptions}
                />
              </Form.Item>
              <Form.Item
                name="diningId"
                label={
                  <span className="font-semibold">
                    <span className="text-red-500 mr-1">*</span>
                    Dining
                  </span>
                }
              >
                <Select
                  placeholder="Select a dining"
                  disabled={diningOptions.length === 0 || !scheduleId}
                  style={{ width: "100%" }}
                  onChange={(value) => setDiningId(value)}
                  options={diningOptions}
                />
              </Form.Item>
            </Form>
          </div>
          {/* Right */}
          <div className="flex-1">
            <TableBooking/>
          </div>
        </div>
      </section>
    </>
  );
};

export default TableBookingSchedulePage;
