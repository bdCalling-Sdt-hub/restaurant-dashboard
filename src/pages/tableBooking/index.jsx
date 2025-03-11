/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Input, Button, DatePicker, TimePicker, Select, Collapse, Radio } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'dayjs';

const { Search } = Input;
const { Panel } = Collapse;
const { Option } = Select;
const { RangePicker } = TimePicker;

const TableBooking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState(null);
  const [timeRange, setTimeRange] = useState(null);
  const [location, setLocation] = useState('indoor');

  const reservations = [
    { time: '10:00 AM - 11:00 AM', name: 'James Wann', table: 'Table 4', tableId: 'T1' },
    { time: '10:00 AM - 11:00 AM', name: 'James Wann', table: 'Table 4T4a', tableId: 'T2' },
    { time: '10:00 AM - 11:00 AM', name: 'James Wann', table: 'Table 4', tableId: 'T3' },
    { time: '10:15 AM - 11:15 AM', name: 'James Wann', table: 'Table 4T4', tableId: 'T4' },
    { time: '10:30 AM - 11:30 AM', name: 'James Wann', table: 'Table 4T4a', tableId: 'T5' },
    { time: '10:45 AM - 11:45 AM', name: 'James Wann', table: 'Table 44a', tableId: 'T6' },
    { time: '10:45 AM - 11:45 AM', name: 'James Wann', table: 'Table 4', tableId: 'T7' },
    { time: '10:45 AM - 11:45 AM', name: 'James Wann', table: 'Table 4T4a', tableId: 'T8' },
    { time: '10:00 AM - 11:00 AM', name: 'James Wann', table: 'Table 4', tableId: 'T9' },
    // Add more reservations as needed
  ];

  const filteredReservations = reservations.filter((reservation) =>
    reservation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Left Side: Search and Filters */}
      <div className="w-1/4 p-4 border-r border-gray-200">
        <div className="mb-4">
          <Search
            placeholder="Search Name"
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            suffix={<SearchOutlined />}
          />
        </div>
        <div className="mb-4">
          <p className="font-semibold mb-2">Apply Filters:</p>
          <div className="flex space-x-2">
            <DatePicker onChange={handleDateChange} placeholder="Date" className="w-1/2" />
            <RangePicker onChange={handleTimeChange} format="HH:mm A" className="w-1/2" />
          </div>
        </div>
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Reservations" key="1">
            {filteredReservations.map((reservation, index) => (
              <Collapse key={index} ghost>
                <Panel header={reservation.time} key="reservation">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{reservation.name}</p>
                      <p>{reservation.table}</p>
                    </div>
                    <Button className="bg-gray-200 rounded-md px-3 py-1 text-sm">Table</Button>
                  </div>
                </Panel>
              </Collapse>
            ))}
          </Panel>
        </Collapse>
      </div>

      {/* Right Side: Table Layout */}
      <div className="w-3/4 p-4">
        <div className="grid grid-cols-3 gap-4">
          {['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9'].map((tableId) => (
            <div key={tableId} className="relative border-4 border-red-500 flex items-center justify-center h-32 w-32 mx-auto">
              <span className="text-xl font-semibold">{tableId}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4 space-x-4">
          <Radio.Group onChange={handleLocationChange} value={location}>
            <Radio value="indoor">Indoor</Radio>
            <Radio value="outdoor">Outdoor</Radio>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
};

export default TableBooking;