import React, { useState } from 'react';
import api from '../../utils/api';

export default function PostNotification() {
  const [notificationData, setNotificationData] = useState({
    title: '',
    content: '',
    type: 'general',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setNotificationData({
      ...notificationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        '/admin/post-notification',
        notificationData
      );
      setMessage('Notification posted successfully');
      setNotificationData({ title: '', content: '', type: 'general' });
    } catch (error) {
      setMessage('Error posting notification: ' + error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Post Notification</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={notificationData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-1">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={notificationData.content}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
            rows="4"
          ></textarea>
        </div>
        <div>
          <label htmlFor="type" className="block mb-1">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={notificationData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="general">General</option>
            <option value="exam_timetable">Exam Timetable</option>
            <option value="faculty_change">Faculty Change</option>
            <option value="exam_gate_pass">Exam Gate Pass</option>
            <option value="circular">Circular</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Post Notification
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
