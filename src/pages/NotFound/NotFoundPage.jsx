// src/pages/NotFound.jsx
import { FiAlertTriangle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <FiAlertTriangle className="mx-auto mb-6 h-12 w-12 text-red-500" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
