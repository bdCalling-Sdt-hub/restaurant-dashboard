import convertUTCtimeString from "./convertUTCtimeString";
import store from "./../redux/store/store";
import { SetScheduleOptions } from "../redux/features/schedule/scheduleSlice";

const makeScheduleOptions = (schedules) => {
  const Options = schedules?.map((schedule) => ({
    value: schedule?._id,
    label: (
      convertUTCtimeString(schedule?.startDateTime) +
      "-" +
      convertUTCtimeString(schedule.endDateTime)
    ).toString(),
  }));
  store.dispatch(SetScheduleOptions(Options));
};

export default makeScheduleOptions;
