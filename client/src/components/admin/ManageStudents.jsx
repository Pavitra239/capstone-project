import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get('/admin/students');
      setStudents(response.data);
    } catch (error) {
      setMessage('Error fetching students: ' + error.response.data.message);
    }
  };

  const handleBlockToggle = async (id, currentStatus) => {
    try {
      await api.post(`/admin/block-student/${id}`);
      setStudents(
        students.map((student) =>
          student._id === id
            ? { ...student, isBlocked: !currentStatus }
            : student
        )
      );
      setMessage(
        `Student ${currentStatus ? 'unblocked' : 'blocked'} successfully`
      );
    } catch (error) {
      setMessage(
        'Error updating student status: ' + error.response.data.message
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Students</h2>
      {message && <p className="mb-4 text-center">{message}</p>}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Registration Number</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.email}</td>
              <td className="border p-2">{student.registrationNumber}</td>
              <td className="border p-2">
                {student.isBlocked ? 'Blocked' : 'Active'}
              </td>
              <td className="border p-2">
                <button
                  onClick={() =>
                    handleBlockToggle(student._id, student.isBlocked)
                  }
                  className={`px-2 py-1 rounded ${
                    student.isBlocked ? 'bg-green-500' : 'bg-red-500'
                  } text-white`}
                >
                  {student.isBlocked ? 'Unblock' : 'Block'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
