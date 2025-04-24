import { useEffect, useState } from "react";
import { useGetScheduleDropDownQuery } from "../../redux/features/schedule/scheduleApi";
import convertUTCtimeString from "../../utils/convertUTCtimeString";
import { useGetMyDiningsQuery } from "../../redux/features/dining/diningApi";
import { useGetTablesByScheduleAndDiningQuery } from "../../redux/features/table/tableApi";
import TableBookingSchedule from "../../components/tableBookingSchedule/TableBookingSchedule";
import { DatePicker } from "antd";

const TableBookingSchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [diningId, setDiningId] = useState("");
  const [scheduleId, setScheduleId] = useState("");
  const { data } = useGetScheduleDropDownQuery(
    [{ name: "date", value: selectedDate }],
    {
      skip: !selectedDate,
    }
  );

  const [scheduleOptions, setScheduleOptions] = useState([]);
  useEffect(() => {
    if (selectedDate) {
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
      setDiningId("");
      setScheduleId("")

    } else {
      setScheduleOptions([]);
    }
  }, [data, selectedDate]);

  const { data: diningData } = useGetMyDiningsQuery();
  const dinings = diningData?.data || [];
  const diningOptions = dinings?.map((dining) => ({
    value: dining?._id,
    label: dining?.name,
  }));

  

  return (
    <>
      <section className=" h-full bg-gray-50">
        <div className="flex gap-x-4 p-4 gap-4">
          {/* Left */}
          <div className=" bg-white w-[260px] p-4 rounded shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                * Select Date
              </label>
              <DatePicker
                disabledDate={(current) =>
                  current && current < new Date().setHours(0, 0, 0, 0)
                }
                onChange={(_, dateString) => {
                  setSelectedDate(dateString);
                }}
                style={{ width: "100%" }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                * Schedule
              </label>
              <select
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                value={scheduleId}
                onChange={(e) => setScheduleId(e.target.value)}
                disabled={scheduleOptions.length === 0}
              >
                <option value="" disabled>
                  Select a Schedule
                </option>
                {scheduleOptions?.map((schedule, index) => (
                  <option key={index} value={schedule.value}>
                    {schedule.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                * Dining
              </label>
              <select
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                value={diningId}
                onChange={(e) => setDiningId(e.target.value)}
                disabled={diningOptions.length === 0 || !scheduleId}
              >
                <option value="" disabled>Select a dining</option>
                {diningOptions?.map((dining, index) => (
                  <option key={index} value={dining.value}>
                    {dining.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Right */}
          <div className="flex-1">
            <TableBookingSchedule
              selectedDate={selectedDate}
              scheduleId={scheduleId}
              diningId={diningId}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default TableBookingSchedulePage;
