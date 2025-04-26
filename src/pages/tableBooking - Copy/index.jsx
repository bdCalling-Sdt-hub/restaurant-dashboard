/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Input,
  Button,
  DatePicker,
  TimePicker,
  Select,
  Collapse,
  Radio,
  Modal,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "dayjs";
import { MdAccessTime, MdDateRange, MdOutlineTableBar } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { DownOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Panel } = Collapse;
const { Option } = Select;
const { RangePicker } = TimePicker;

const TableBooking = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState('');
const [email, setEmail] = useState('');
  const [date, setDate] = useState(null);
  const [timeRange, setTimeRange] = useState(null);
  const [location, setLocation] = useState("indoor");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showPeopleSelector, setShowPeopleSelector] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState(1);

  const reservations = [
    {
      time: "10:00 AM - 11:00 AM",
      name: "James Wann",
      table: " 4",
      tableId: "T1",
    },
    {
      time: "10:00 AM - 11:00 AM",
      name: "James Wann",
      table: " 4T4a",
      tableId: "T2",
    },
    {
      time: "10:00 AM - 11:00 AM",
      name: "James Wann",
      table: " 4",
      tableId: "T3",
    },
    {
      time: "10:15 AM - 11:15 AM",
      name: "James Wann",
      table: " 4T4",
      tableId: "T4",
    },
    {
      time: "10:30 AM - 11:30 AM",
      name: "James Wann",
      table: " 4Ta",
      tableId: "T5",
    },
    {
      time: "10:45 AM - 11:45 AM",
      name: "James Wann",
      table: " 4a",
      tableId: "T6",
    },
    {
      time: "10:45 AM - 11:45 AM",
      name: "James Wann",
      table: " 4",
      tableId: "T7",
    },
    {
      time: "10:45 AM - 11:45 AM",
      name: "James Wann",
      table: " 4Ta",
      tableId: "T8",
    },
    {
      time: "10:00 AM - 11:00 AM",
      name: "James Wann",
      table: " 4",
      tableId: "T9",
    },
    // Add more reservations as needed
  ];

  const filteredReservations = reservations.filter((reservation) =>
    reservation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNameChange = (e) => setName(e.target.value);
   const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleTimeChange = (time) => {
    setTimeRange(time);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  const showModal = (tableId) => {
    setSelectedTableId(tableId);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTableId(null);
    setShowDatePicker(false);
    setShowTimePicker(false);
    setShowPeopleSelector(false);
  };

  return (
    <>
      <div className="flex  min-h-screen">
        {/* Left Side: Search and Filters */}
        <div className="w-1/4 p-4 border-r border-gray-200">
          <div className="mb-4">
            <Search
              placeholder="Search Name"
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              suffix={<SearchOutlined style={{ color: "red" }} />}
              className=" border-dashed border-2 border-gray-400 rounded-md p-2"
            />
          </div>

          <Collapse defaultActiveKey={["1"]}>
            {filteredReservations.map((reservation, index) => (
              <Collapse
                key={index}
                ghost
                expandIconPosition="end" // Set icon position to start (left)
                expandIcon={({ isActive }) => (
                  <DownOutlined rotate={isActive ? 180 : 0} /> 
                )}
              >
                <Panel header={reservation.time} key="reservation">
                  <div className="flex border-1 border-black px-4 justify-between items-center">
                    <div>
                      <p className="w-2">{reservation.time.slice(0, 8)}</p>
                    </div>
                    <div className="border-l-1 pl-4">
                      <p className="font-bold">{reservation.name}</p>
                      <div className="flex items-center gap-x-2">
                        <FaUserFriends className="mb-3" />
                        <p className="font-bold">{reservation.table}</p>
                      </div>
                    </div>
                    <Button className="!bg-gray-700 !text-white rounded-md !p-5 py-1 text-sm">
                      Table
                    </Button>
                  </div>
                </Panel>
              </Collapse>
            ))}
          </Collapse>
        </div>

        {/* Right Side: Table Layout */}
        <div className="w-3/4 p-4">
          <div className="items-center flex gap-x-5 ">
            <p className="font-semibold !mt-2">Apply Filters:</p>
            <div className="flex  gap-x-4">
              <DatePicker
                onChange={handleDateChange}
                placeholder="Date"
                className="w-1/2"
              />
              <RangePicker
                onChange={handleTimeChange}
                format="HH:mm A"
                className="w-1/2"
              />
            </div>
          </div>

          <div>
            <div className="grid !bg-[#ebebeb] rounded-2xl p-16  mt-5 grid-cols-3 gap-20">
              {["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9"].map(
                (tableId) => (
                  <div
                    className="relative w-32 h-32"
                    onClick={() => showModal(tableId)}
                  >
                    <div className="absolute top-0 rotate-45 left-0 w-full h-full rounded-4xl border-[15px] border-red-500"></div>
                    <div className="absolute !bg-white top-1/2  rotate-45 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl w-24 h-24 flex items-center justify-center">
                      <span className="text-4xl rotate-314  font-semibold">
                        {tableId}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="flex justify-end mt-4 space-x-4">
              <Radio.Group onChange={handleLocationChange} value={location}>
                <Radio value="indoor">Indoor</Radio>
                <Radio value="outdoor">Outdoor</Radio>
              </Radio.Group>
            </div>
          </div>
        </div>
      </div>

      {/* ================ Modal =============== */}
      <Modal
        title={null}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        closable={true}
        closeIcon={<span className="text-xl">X</span>}
        width={400}
        bodyStyle={{ padding: "10px" }}
      >
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full">
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input 
              value={name} 
              onChange={handleNameChange} 
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input 
              value={email} 
              onChange={handleEmailChange} 
              
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Table Setup
              </label>
              <div className="flex space-x-2">
                <Button className=" !text-white !bg-gray-800">Assign</Button>
                <Button className=" !text-white !bg-gray-800">Waitlist</Button>
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Table 1
              </label>
              <div className="flex justify-center ">
                <div className="relative w-24 h-24 mt-2">
                  <div className="absolute top-0 rotate-45 left-0 w-full h-full rounded-4xl border-[10px] border-red-500"></div>
                  <div className="absolute top-1/2 rotate-45 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl w-16 h-16 flex items-center justify-center">
                    <span className="text-2xl rotate-314 font-semibold">
                      {selectedTableId}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button onClick={() => setShowDatePicker(true)}>
                <span className="mr-1">
                  <MdDateRange className="!text-red-500" />
                </span>
                Date <IoIosArrowDown />
              </Button>
              <Button onClick={() => setShowTimePicker(true)}>
                <span className="mr-1">
                  <MdAccessTime className="!text-red-500" />
                </span>
                Time <IoIosArrowDown />
              </Button>
              <Button onClick={() => setShowPeopleSelector(true)}>
                <span className="mr-1">
                  <FaUserFriends className="!text-red-500" />
                </span>
                People <IoIosArrowDown />
              </Button>
            </div>
            {showDatePicker && (
              <DatePicker
                onChange={(date) => setDate(date)}
                className="w-full mt-4"
              />
            )}
            {showTimePicker && (
              <TimePicker
                onChange={(time) => setTimeRange(time)}
                format="HH:mm A"
                className="w-full mt-4"
              />
            )}
            {showPeopleSelector && (
              <Select
                value={selectedPeople}
                onChange={(value) => setSelectedPeople(value)}
                className="w-full mt-4"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((people) => (
                  <Option key={people} value={people}>
                    {people} People
                  </Option>
                ))}
              </Select>
            )}
            <Button className="w-full !mt-4 !text-white !bg-red-500">
              Booked
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TableBooking;
