import React, { useState } from 'react';
import { MagnifyingGlass, User, Heart } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import SearchModal from '../components/SearchModal';

function FavoritesPage() {
  const [activeTab, setActiveTab] = useState('favorites');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header sem abas */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="px-4 py-3 flex flex-col items-center justify-between w-full">
          <div className="w-full flex items-center justify-between pb-4 md:pb-4">
            <h1 className="text-2xl font-bold text-gray-900">Local Top</h1>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-600">
                <User size={20} />
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <button 
            onClick={() => setIsSearchModalOpen(true)}
            className="w-full flex items-center justify-center space-x-2 bg-white border border-neutral-200 rounded-full px-4 py-3 shadow-xl text-gray-500 mb-0 md:mb-6 max-w-[500px] hover:bg-gray-50 transition-colors"
          >
            <MagnifyingGlass size={20} />
            <span>Buscar lanchonetes, lojas...</span>
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="mx-auto px-4 py-6 pt-32 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center max-w-sm">
          {/* Ícone de coração */}
          <div className="mb-6">
            <Heart size={64} className="mx-auto text-gray-300" weight="regular" />
          </div>
          
          {/* Título */}
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Seus favoritos aparecerão aqui
          </h2>
          
          {/* Descrição */}
          <p className="text-gray-500 mb-8 leading-relaxed">
            Faça login para salvar seus lugares favoritos e acessá-los facilmente a qualquer momento.
          </p>
          
          {/* Botão Entrar */}
          <button 
            onClick={handleLoginClick}
            className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Entrar
          </button>
        </div>
      </div>

      {/* BottomNav */}
      <BottomNav showBottomNav={true} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* SearchModal */}
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)}
        activeTab="restaurantes"
        setActiveTab={() => {}}
      />
    </div>
  );
}

export default FavoritesPage;