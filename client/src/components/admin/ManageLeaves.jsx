import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function ManageLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await api.get('/admin/leaves');
      setLeaves(response.data);
    } catch (error) {
      setMessage('Error fetching leaves: ' + error.response.data.message);
    }
  };

  const handleLeaveAction = async (id, status) => {
    try {
      await api.post(`/admin/approve-leave/${id}`, { status });
      setLeaves(
        leaves.map((leave) => (leave._id === id ? { ...leave, status } : leave))
      );
      setMessage(`Leave ${status} successfully`);
    } catch (error) {
      setMessage('Error updating leave status: ' + error.response.data.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Leave Applications</h2>
      {message && <p className="mb-4 text-center">{message}</p>}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Student Name</th>
            <th className="border p-2">Start Date</th>
            <th className="border p-2">End Date</th>
            <th className="border p-2">Reason</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id}>
              <td className="border p-2">{leave.student.name}</td>
              <td className="border p-2">
                {new Date(leave.startDate).toLocaleDateString()}
              </td>
              <td className="border p-2">
                {new Date(leave.endDate).toLocaleDateString()}
              </td>
              <td className="border p-2">{leave.reason}</td>
              <td className="border p-2">{leave.status}</td>
              <td className="border p-2">
                {leave.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleLeaveAction(leave._id, 'approved')}
                      className="px-2 py-1 rounded bg-green-500 text-white mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleLeaveAction(leave._id, 'rejected')}
                      className="px-2 py-1 rounded bg-red-500 text-white"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
