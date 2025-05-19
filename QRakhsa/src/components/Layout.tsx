import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, Home, Users, LogOut } from 'lucide-react'; // Changed Settings to LogOut icon

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false); // State for logout dialog

  const handleLogout = () => {
    localStorage.removeItem('token'); // Placeholder for actual logout logic
    setIsLogoutDialogOpen(false); // Close the dialog
    navigate('/login'); // Redirect to login page (replace '/login' with your actual login route)
    alert('Logged out successfully!'); // Optional: User feedback
  };

  const handleCancelLogout = () => {
    setIsLogoutDialogOpen(false); // Close the dialog without logging out
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-500" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">EmergencyQR</span>
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/" // Link to Homepage (root path)
                className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                  isActive('/')
                    ? 'text-blue-600 dark:text-blue-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500'
                }`}
              >
                <Home className="h-5 w-5 mr-1" />
                Home
              </Link>
              <Link
                to="/admindashboard/admin" // Link to AdminDashboard (under /admindashboard)
                className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                  isActive('/admindashboard/admin') // Correct isActive check for nested route
                    ? 'text-blue-600 dark:text-blue-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500'
                }`}
              >
                <Users className="h-5 w-5 mr-1" />
                Admin
              </Link>
              {/* Logout Button/Link with Dialog */}
              <button
                onClick={() => setIsLogoutDialogOpen(true)}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                  isLogoutDialogOpen
                    ? 'text-blue-600 dark:text-blue-500' // Style if dialog is open (optional)
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500'
                } bg-transparent border-none cursor-pointer`} // Added button styles
              >
                <LogOut className="h-5 w-5 mr-1" /> {/* Changed to LogOut Icon */}
                Logout {/* Changed text to Logout */}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet /> {/*  This is where the content of the matched route will be rendered */}
      </main>

      {/* Logout Confirmation Dialog */}
      {isLogoutDialogOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="logoutModal" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertCircle className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="logoutModal">
                      Confirm Logout
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        Are you sure you want to logout?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-400"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-0 sm:w-auto sm:text-sm dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 dark:border-gray-500 dark:focus:ring-blue-400"
                  onClick={handleCancelLogout}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;