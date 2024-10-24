import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function ExamGatePass() {
  const [gatePass, setGatePass] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchExamGatePass();
  }, []);

  const fetchExamGatePass = async () => {
    try {
      const response = await api.get('/students/exam-gate-pass');
      setGatePass(response.data);
    } catch (error) {
      setMessage(
        'Error fetching exam gate pass: ' + error.response.data.message
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Exam Gate Pass</h2>
      {message && <p className="mb-4 text-center">{message}</p>}
      {gatePass ? (
        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="text-lg font-semibold">{gatePass.title}</h3>
          <p className="whitespace-pre-wrap">{gatePass.content}</p>
          <p className="text-sm text-gray-500 mt-2">
            Valid until: {new Date(gatePass.createdAt).toLocaleString()}
          </p>
        </div>
      ) : (
        <p>No exam gate pass available.</p>
      )}
    </div>
  );
}
