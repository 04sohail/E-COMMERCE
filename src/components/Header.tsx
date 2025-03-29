import { useState } from 'react';
import { ShoppingCart, User, LogOut, ChevronDown } from 'lucide-react';
import { useUser } from '../contexts/user/useUser';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate()
  const { user, logoutUser } = useUser()
  const handleLogout = () => {
    logoutUser()
    navigate("/")
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center h-20 px-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src="../../public/logo.webp" className='h-13 ml-10' />
        </div>

        {/* Right Side - Cart and Profile */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <div className="relative">
            <ShoppingCart
              className="text-gray-600 hover:text-indigo-500 cursor-pointer"
              size={24}
            />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </div>

          {/* Profile Dropdown */}
          <div
            className="relative"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <div className="flex items-center cursor-pointer">
              <User className="text-gray-600 hover:text-indigo-500" size={24} />
              <ChevronDown className="ml-1 text-gray-500" size={16} />
            </div>

            {isProfileDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4"
                // Stop click propagation to prevent closing the dropdown immediately
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-sm text-gray-600 mb-2">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs">{user.email}</p>
                </div>
                <hr className="my-2" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center text-left text-sm text-red-500 hover:bg-gray-100 p-2 rounded"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;