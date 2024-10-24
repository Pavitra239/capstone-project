import React, { useState } from 'react';
import api from '../../utils/api';

export default function SendEmails() {
  const [emailData, setEmailData] = useState({
    subject: '',
    message: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/admin/send-emails', emailData);
      setMessage('Emails sent successfully');
      setEmailData({ subject: '', message: '' });
    } catch (error) {
      setMessage('Error sending emails: ' + error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Send Emails to Students</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="subject" className="block mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={emailData.subject}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="message" className="block mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={emailData.message}
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
          Send Emails
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
