import React from 'react';
import { Compass, Heart, SignIn } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

interface BottomNavProps {
  showBottomNav: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function BottomNav({ showBottomNav, activeTab, setActiveTab }: BottomNavProps) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setActiveTab('login');
    navigate('/login');
  };

  const handleExploreClick = () => {
    setActiveTab('explore');
    navigate('/');
  };

  const handleFavoritesClick = () => {
    setActiveTab('favorites');
    navigate('/favorites');
  };

  return (
    <>
      {/* Navegação inferior */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t transition-transform duration-300 ${showBottomNav ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-md mx-auto px-4">
          <div className="flex justify-around py-2">
            <button 
              onClick={handleExploreClick}
              className={`flex flex-col items-center py-2 px-3 text-xs font-medium ${
                activeTab === 'explore' ? 'text-gray-900' : 'text-gray-900'
              }`}
            >
              <Compass size={24} className="mb-1" weight={activeTab === 'explore' ? 'fill' : 'regular'} />
              Explorar
            </button>
            <button 
              onClick={handleFavoritesClick}
              className={`flex flex-col items-center py-2 px-3 text-xs font-medium ${
                activeTab === 'favorites' ? 'text-gray-900' : 'text-neutral-500'
              }`}
            >
              <Heart size={24} className="mb-1" weight={activeTab === 'favorites' ? 'fill' : 'regular'} />
              Favoritos
            </button>
            <button 
              onClick={handleLoginClick}
              className={`flex flex-col items-center py-2 px-3 text-xs font-medium ${
                activeTab === 'login' ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              <SignIn size={24} className="mb-1" weight={activeTab === 'login' ? 'fill' : 'regular'} />
              Entrar
            </button>
          </div>
        </div>
      </div>

      {/* Espaçamento para navegação inferior */}
      <div className="h-20"></div>
    </>
  );
}

export default BottomNav;