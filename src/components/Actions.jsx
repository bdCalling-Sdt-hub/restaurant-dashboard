import React from 'react';

const Actions = ({ user, onClose }) => {
  if (!user) {
    return null; 
  }

  return (
    <div className="fixed inset-0 bg-white/60 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <h2 className="text-lg font-semibold mb-4">Are you sure you want to block?</h2>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      
      </div>
    </div>
  );
};

export default Actions;