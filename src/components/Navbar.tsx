import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MagnifyingGlass, User, ArrowLeft } from 'phosphor-react';

interface NavbarProps {
  variant?: 'home' | 'page' | 'dashboard';
  title?: string;
  showBackButton?: boolean;
  showSearch?: boolean;
  showUserIcon?: boolean;
  showLogo?: boolean;
  onSearchClick?: () => void;
  onBackClick?: () => void;
  className?: string;
  rightButton?: React.ReactNode;
}

function Navbar({ 
  variant = 'page',
  title,
  showBackButton = false,
  showSearch = false,
  showUserIcon = true,
  showLogo = true,
  onSearchClick,
  onBackClick,
  className = '',
  rightButton
}: NavbarProps) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-sm ${className}`}>
      <div className="px-4 py-3 flex items-center justify-between w-full">
        {/* Left Section */}
        <div className="flex items-center space-x-3 flex-1">
          {showBackButton && (
            <button 
              onClick={handleBackClick}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          
          {/* Logo - Only show if no back button */}
          {showLogo && !showBackButton && (
            <button 
              onClick={handleLogoClick}
              className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
            >
              Local Top
            </button>
          )}

          {/* Title - Show after back button if present */}
          {title && variant !== 'home' && showBackButton && (
            <h1 className="text-lg font-semibold text-gray-900 flex-1">
              {title}
            </h1>
          )}
        </div>

        {/* Center Section - Title (only when no back button) */}
        {title && variant !== 'home' && !showBackButton && (
          <h1 className="text-lg font-semibold text-gray-900 absolute left-1/2 transform -translate-x-1/2">
            {title}
          </h1>
        )}

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {rightButton && rightButton}
          
          {showSearch && (
            <button 
              onClick={onSearchClick}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <MagnifyingGlass size={20} />
            </button>
          )}
          
          {showUserIcon && (
            <Link 
              to="/dashboard"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <User size={20} />
            </Link>
          )}
        </div>
      </div>

      {/* Search Bar for home variant */}
      {variant === 'home' && showSearch && (
        <div className="px-4 pb-3">
          <button 
            onClick={onSearchClick}
            className="w-full flex items-center justify-center space-x-2 bg-white border border-neutral-200 rounded-full px-4 py-3 shadow-xl text-gray-500 max-w-[500px] mx-auto hover:bg-gray-50 transition-colors"
          >
            <MagnifyingGlass size={20} />
            <span>Buscar lanchonetes, lojas...</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;