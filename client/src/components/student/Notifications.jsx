import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/students/notifications');
      setNotifications(response.data);
    } catch (error) {
      setMessage(
        'Error fetching notifications: ' + error.response.data.message
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      {message && <p className="mb-4 text-center">{message}</p>}
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className="bg-white p-4 rounded-md shadow"
            >
              <h3 className="text-lg font-semibold">{notification.title}</h3>
              <p className="text-gray-600">{notification.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                Posted on: {new Date(notification.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
