import React, { useState, useEffect } from 'react';
import { MagnifyingGlass, User, Heart } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import SearchModal from '../components/SearchModal';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function FavoritesPage() {
  const [activeTab, setActiveTab] = useState('favorites');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navbar */}
      <Navbar 
        variant="page"
        title="Favoritos"
        showBackButton={true}
        showSearch={true}
        showUserIcon={true}
        onSearchClick={() => setIsSearchModalOpen(true)}
      />

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

      <Footer />
      
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