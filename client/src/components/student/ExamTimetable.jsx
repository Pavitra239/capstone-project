import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function ExamTimetable() {
  const [timetable, setTimetable] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchExamTimetable();
  }, []);

  const fetchExamTimetable = async () => {
    try {
      const response = await api.get('/students/exam-timetable');
      setTimetable(response.data);
    } catch (error) {
      setMessage(
        'Error fetching exam timetable: ' + error.response.data.message
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Exam Timetable</h2>
      {message && <p className="mb-4 text-center">{message}</p>}
      {timetable ? (
        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="text-lg font-semibold">{timetable.title}</h3>
          <p className="whitespace-pre-wrap">{timetable.content}</p>
          <p className="text-sm text-gray-500 mt-2">
            Posted on: {new Date(timetable.createdAt).toLocaleString()}
          </p>
        </div>
      ) : (
        <p>No exam timet able available.</p>
      )}
    </div>
  );
}
