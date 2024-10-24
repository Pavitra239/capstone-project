import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import EnrollStudent from './EnrollStudent';
import SendEmails from './SendEmails';
import PostNotification from './PostNotification';
import ManageStudents from './ManageStudents';
import ManageLeaves from './ManageLeaves';

export default function AdminDashboard() {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-5">
          <Link
            to="/admin"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/enroll"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Enroll Student
          </Link>
          <Link
            to="/admin/send-emails"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Send Emails
          </Link>
          <Link
            to="/admin/post-notification"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Post Notification
          </Link>
          <Link
            to="/admin/manage-students"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Manage Students
          </Link>
          <Link
            to="/admin/manage-leaves"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Manage Leaves
          </Link>
          <button
            onClick={logout}
            className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-10">
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-2xl font-bold">Welcome to Admin Dashboard</h1>
            }
          />
          <Route path="/enroll" element={<EnrollStudent />} />
          <Route path="/send-emails" element={<SendEmails />} />
          <Route path="/post-notification" element={<PostNotification />} />
          <Route path="/manage-students" element={<ManageStudents />} />
          <Route path="/manage-leaves" element={<ManageLeaves />} />
        </Routes>
      </main>
    </div>
  );
}
