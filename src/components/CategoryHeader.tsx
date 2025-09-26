import React from 'react';
import { ArrowLeft, Heart, User } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';



function CategoryHeader({ categoryTitle }: { categoryTitle: string }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="px-4 py-3 flex flex-col items-center justify-between w-full">
        
        {/* Título e descrição da categoria com ícones */}
        <div className="w-full flex items-center space-x-3 mb-0 md:mb-6 max-w-[500px] min-w-0">
          <button 
            onClick={handleBackClick}
            className="text-gray-600 hover:text-gray-900 flex-shrink-0"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex-1 flex flex-col justify-center items-center bg-white border border-neutral-200 rounded-full px-4 py-3 shadow-xl min-w-0">
            <h2 className="text-sm font-medium text-gray-900 truncate w-full text-center">
              {categoryTitle}
            </h2>
            <p className="text-xs text-gray-500 truncate w-full text-center">
              6 negócios encontrados
            </p>
          </div>
          
          <button className="text-gray-600 hover:text-red-500 flex-shrink-0">
            <Heart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryHeader;