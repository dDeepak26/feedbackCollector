import React from 'react';

export default function AdminToggle({ isAdminView, toggle }) {
  return (
    <nav className="bg-gray-800 px-6 py-4 shadow-md flex items-center justify-between flex-wrap">
      <h1 className="text-2xl sm:text-3xl font-semibold text-white">
        Feedback Portal
      </h1>
      <button
        onClick={toggle}
        className="mt-2 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
      >
        {!isAdminView ? 'Back to Form' : 'View Submitted Feedback'}
      </button>
    </nav>
  );
}
