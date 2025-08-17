import React, { useState, useEffect } from 'react';
import { MagnifyingGlass, User, House, Heart, ShoppingBag } from 'phosphor-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSearchClick: () => void;
}

function Header({ activeTab, setActiveTab, onSearchClick }: HeaderProps) {
  const [showIcons, setShowIcons] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowIcons(scrollY <= 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="px-4 py-3 flex flex-col items-center justify-between w-full">
        <div className="w-full flex items-center justify-between pb-4 md:pb-4">
          <h1 className="text-2xl font-bold text-gray-900">Local Top</h1>
          
          {/* Desktop Tab Navigation */}
          <div className="hidden md:flex items-center space-x-8 py-2">
            <button 
              onClick={() => setActiveTab('restaurantes')}
              className={`flex items-center justify-center space-x-2 text-sm font-medium pb-1 w-[100px] ${
                activeTab === 'restaurantes' 
                  ? 'text-gray-900 border-b-2 border-gray-900 pb-3' 
                  : 'text-gray-500 border-b-2 border-white pb-3'
              }`}
            >
              {showIcons && <House size={36} />}
              <span>Restaurantes</span>
            </button>
            <button 
              onClick={() => setActiveTab('cuidado')}
              className={`flex items-center justify-center space-x-2 text-sm font-medium pb-1 w-[100px] ${
                activeTab === 'cuidado' 
                  ? 'text-gray-900 border-b-2 border-gray-900 pb-3' 
                  : 'text-gray-500 border-b-2 border-white pb-3'
              }`}
            >
              {showIcons && <Heart size={36} />}
              <span>Cuidado</span>
            </button>
            <button 
              onClick={() => setActiveTab('mercado')}
              className={`flex items-center justify-center space-x-2 text-sm font-medium pb-1 w-[100px] ${
                activeTab === 'mercado' 
                  ? 'text-gray-900 border-b-2 border-gray-900 pb-3' 
                  : 'text-gray-500 border-b-2 border-white pb-3'
              }`}
            >
              {showIcons && <ShoppingBag size={36} />}
              <span>Mercado</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-600">
              <User size={20} />
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <button 
          onClick={onSearchClick}
          className="w-full flex items-center justify-center space-x-2 bg-white border border-neutral-200 rounded-full px-4 py-3 shadow-xl text-gray-500 mb-0 md:mb-6 max-w-[500px] hover:bg-gray-50 transition-colors"
        >
          <MagnifyingGlass size={20} />
          <span>Buscar lanchonetes, lojas...</span>
        </button>
      </div>
      
      {/* Mobile Tab Navigation */}
      <div className="px-4 md:hidden">
        <div className="flex justify-around">
          <button 
            onClick={() => setActiveTab('restaurantes')}
            className={`flex flex-col items-center justify-center py-4 text-sm font-medium w-[100px] ${
              activeTab === 'restaurantes' 
                ? 'text-gray-900 border-b-[3px] border-gray-900' 
                : 'text-gray-500 border-b-[3px] border-white'
            }`}
          >
            {showIcons && <House size={24} className="mb-1" />}
            <span>Restaurantes</span>
          </button>
          <button 
            onClick={() => setActiveTab('cuidado')}
            className={`flex flex-col items-center justify-center py-4 text-sm font-medium w-[100px] ${
              activeTab === 'cuidado' 
                ? 'text-gray-900 border-b-[3px] border-gray-900' 
                : 'text-gray-500 border-b-[3px] border-white'
            }`}
          >
            {showIcons && <Heart size={24} className="mb-1" />}
            <span>Cuidado</span>
          </button>
          <button 
            onClick={() => setActiveTab('mercado')}
            className={`flex flex-col items-center justify-center py-4 text-sm font-medium w-[100px] ${
              activeTab === 'mercado' 
                ? 'text-gray-900 border-b-[3px] border-gray-900' 
                : 'text-gray-500 border-b-[3px] border-white'
            }`}
          >
            {showIcons && <ShoppingBag size={24} className="mb-1" />}
            <span>Mercado</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;