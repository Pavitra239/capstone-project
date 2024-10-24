import React, { useState } from 'react';
import api from '../../utils/api';

export default function ApplyLeave() {
  const [leaveData, setLeaveData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/students/apply-leave', leaveData);
      setMessage('Leave application submitted successfully');
      setLeaveData({ startDate: '', endDate: '', reason: '' });
    } catch (error) {
      setMessage(
        'Error submitting leave application: ' + error.response.data.message
      );
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Apply for Leave</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="startDate" className="block mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={leaveData.startDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block mb-1">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={leaveData.endDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="reason" className="block mb-1">
            Reason
          </label>
          <textarea
            id="reason"
            name="reason"
            value={leaveData.reason}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit Leave Application
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
