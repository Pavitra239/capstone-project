import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Profile from './Profile';
import ApplyLeave from './ApplyLeave';
import Notifications from './Notifications';
import ExamTimetable from './ExamTimetable';
import ExamGatePass from './ExamGatePass';

export default function StudentDashboard() {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-5">
          <Link
            to="/student"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Dashboard
          </Link>
          <Link
            to="/student/profile"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Profile
          </Link>
          <Link
            to="/student/apply-leave"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Apply Leave
          </Link>
          <Link
            to="/student/notifications"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Notifications
          </Link>
          <Link
            to="/student/exam-timetable"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Exam Timetable
          </Link>
          <Link
            to="/student/exam-gate-pass"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Exam Gate Pass
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
              <h1 className="text-2xl font-bold">
                Welcome to Student Dashboard
              </h1>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/apply-leave" element={<ApplyLeave />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/exam-timetable" element={<ExamTimetable />} />
          <Route path="/exam-gate-pass" element={<ExamGatePass />} />
        </Routes>
      </main>
    </div>
  );
}
