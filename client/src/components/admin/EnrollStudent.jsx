import React, { useState } from 'react';
import api from '../../utils/api';

export default function EnrollStudent() {
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    registrationNumber: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/admin/enroll', studentData);
      setMessage('Student enrolled successfully');
      setStudentData({ name: '', email: '', registrationNumber: '' });
    } catch (error) {
      setMessage('Error enrolling student: ' + error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Enroll New Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={studentData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        {/* <div>
          <label htmlFor="registrationNumber" className="block mb-1">
            Registration Number
          </label>
          <input
            type="text"
            id="registrationNumber"
            name="registrationNumber"
            value={studentData.registrationNumber}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div> */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Enroll Student
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
