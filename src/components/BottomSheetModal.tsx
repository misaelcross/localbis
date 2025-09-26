import React, { useEffect } from 'react';
import { CheckCircle } from 'phosphor-react';

interface BottomSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  buttonText = "Continuar",
  onButtonClick
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className={`
          absolute inset-0 bg-black transition-all duration-300 ease-out
          ${isOpen ? 'bg-opacity-50' : 'bg-opacity-0'}
        `}
        onClick={handleBackdropClick}
      />
      
      {/* Bottom Sheet */}
      <div className={`
        relative w-full bg-white rounded-t-3xl shadow-2xl
        transform transition-all duration-500 ease-out
        ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full opacity-0 scale-95'}
      `}>
        {/* Handle */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full transition-colors hover:bg-gray-400" />
        </div>

        {/* Content */}
        <div className="px-6 pb-8">
          {/* Success Icon with animation */}
          <div className="flex justify-center mb-6">
            <div className={`
              w-20 h-20 bg-green-100 rounded-full flex items-center justify-center
              transform transition-all duration-700 ease-out delay-200
              ${isOpen ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}
            `}>
              <CheckCircle size={48} className="text-green-500" weight="fill" />
            </div>
          </div>

          {/* Title with slide animation */}
          <h2 className={`
            text-2xl font-bold text-gray-900 text-center mb-4
            transform transition-all duration-500 ease-out delay-300
            ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            {title}
          </h2>

          {/* Message with slide animation */}
          <p className={`
            text-gray-600 text-center mb-8 leading-relaxed
            transform transition-all duration-500 ease-out delay-400
            ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            {message}
          </p>

          {/* Action Button with slide animation and consistent styling */}
          <button
            onClick={handleButtonClick}
            className={`
              w-full bg-black text-white py-4 px-6 rounded-lg font-semibold text-lg 
              hover:bg-gray-800 active:bg-gray-900 transition-all duration-200 
              shadow-lg hover:shadow-xl active:scale-95
              transform transition-all duration-500 ease-out delay-500
              ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomSheetModal;