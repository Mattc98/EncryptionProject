"use client";

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

const Home = () => {
  const [roomType, setRoomType] = useState('');
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Conference Room A', capacity: 20 },
    { id: 2, name: 'Meeting Room B', capacity: 10 },
    { id: 3, name: 'Event Hall C', capacity: 100 }
  ]);
  const [bookings, setBookings] = useState({
    'Conference Room A': {
      '2024-07-25': ['10:00', '14:00'],
      '2024-07-26': ['09:00', '11:00', '15:00'],
    },
    'Meeting Room B': {
      '2024-07-25': ['11:00', '13:00'],
    },
  });

  const handleRoomChange = (e) => {
    setRoomType(e.target.value);
    setShowCalendar(e.target.value !== '');
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(`Room: ${roomType}, Date: ${formatDate(date)}`);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 ' : 'bg-gray-100 text-gray-900'} flex flex-col items-center p-6`}>
      <header className={`w-full ${isDarkMode ? 'bg-gray-800' : 'bg-blue-600'} text-white py-4 px-6 flex justify-between items-center`}>
        <h1 className='text-3xl font-bold'>Room Booking System</h1>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className='p-2 rounded hover:bg-gray-700 focus:outline-none'
        >
          {isDarkMode ? (
            <SunIcon className='w-6 h-6 text-yellow-400' />
          ) : (
            <MoonIcon className='w-6 h-6 text-blue-500' />
          )}
        </button>
      </header>

      <main className='w-full max-w-4xl mt-8 '>
        <section className={`bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8`}>
          <h2 className='text-2xl font-semibold mb-4'>Book a Room</h2>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label htmlFor='roomType' className='block text-gray-700 dark:text-gray-300'>Select Room</label>
              <select
                id='roomType'
                value={roomType}
                onChange={handleRoomChange}
                className='mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
              >
                <option value=''>-- Select a Room --</option>
                {rooms.map(room => (
                  <option key={room.id} value={room.name}>{room.name} - {room.capacity} seats</option>
                ))}
              </select>
            </div>
            {showCalendar && (
              <div>
                <label htmlFor='date' className='block text-gray-700 dark:text-gray-300'>Select Date</label>
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  tileClassName={({ date, view }) => {
                    if (view === 'month') {
                      const formattedDate = formatDate(date);
                      const roomBookings = bookings[roomType] || {};
                      const bookedTimes = roomBookings[formattedDate] || [];
                      if (bookedTimes.length > 0) {
                        return 'bg-red-500 text-white';
                      }
                    }
                    return null;
                  }}
                  className={`bg-white dark:bg-gray-900 border dark:border-gray-700`}
                />
                <p className='mt-2 text-gray-600 dark:text-gray-400'>
                  {roomType && bookings[roomType] && bookings[roomType][formatDate(date)]
                    ? `Booked times: ${bookings[roomType][formatDate(date)].join(', ')}`
                    : 'No bookings for this date.'
                  }
                </p>
              </div>
            )}
            <div>
              <label htmlFor='time' className='block text-gray-700 dark:text-gray-300'>Time</label>
              <input
                id='time'
                type='time'
                disabled={!roomType}
                className='mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
              />
            </div>
            <button
              type='submit'
              disabled={!roomType || !date}
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
            >
              Book Now
            </button>
          </form>
        </section>

        <section className={`bg-white dark:bg-gray-800 shadow-md rounded-lg p-6`}>
          <h2 className='text-2xl font-semibold mb-4'>Available Rooms</h2>
          <ul className='space-y-4'>
            {rooms.map(room => (
              <li key={room.id} className='border dark:border-gray-600 rounded-lg p-4'>
                <h3 className='text-xl font-semibold'>{room.name}</h3>
                <p className='text-gray-600 dark:text-gray-400'>Capacity: {room.capacity} seats</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Home;
