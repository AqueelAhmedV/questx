import React from 'react';

export function UnauthorizedPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl text-blue-gray-900 font-bold mb-4">Unauthorized Access</h1>
        <p className="text-gray-700">You are not authorized to access this page.</p>
      </div>
    </div>
  );
};