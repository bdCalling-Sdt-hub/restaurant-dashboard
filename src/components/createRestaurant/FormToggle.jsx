import React from 'react';

const FormToggle = ({ label, enabled, setEnabled, small = false }) => {
  return (
    <div className="flex items-center">
      {label && (
        <span className="mr-2 font-semibold text-gray-700">{label}</span>
      )}
      
      <button
        type="button"
        onClick={() => setEnabled(!enabled)}
        className={`relative ${small ? 'w-9 h-5' : 'w-11 h-6'} rounded-full transition-colors cursor-pointer
          ${enabled ? 'bg-red-500' : 'bg-gray-300'}`}
        aria-pressed={enabled}
      >
        <span 
          className={`absolute ${small ? 'top-0.5 left-0.5 w-4 h-4' : 'top-1 left-1 w-4 h-4'} bg-white rounded-full shadow-md transform transition-transform duration-200
            ${enabled ? (small ? 'translate-x-4' : 'translate-x-5') : 'translate-x-0'}`}
        />
      </button>
    </div>
  );
};

export default FormToggle;