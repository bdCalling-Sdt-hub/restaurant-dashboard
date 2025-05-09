import AssignTableSchedule from "./AssignTableSchedule";
import AssignTableForm from "./AssignTableForm";

const AssignTable = () => {
  return (
    <>
      <section className="h-full bg-gray-50">
        <div className="h-full flex gap-x-4 p-4 gap-4">
          {/* Left */}
          <AssignTableForm/>
          {/* Right */}
          <div className="flex-1 h-full">
            <AssignTableSchedule />
          </div>
        </div>
      </section>
    </>
  );
};

export default AssignTable;
