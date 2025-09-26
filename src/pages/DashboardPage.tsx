import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  Bell,
  User,
  Clock,
  MapPin,
  MagnifyingGlass,
  Eye,
  CaretDown,
  UserCircle,
  Gear,
  Storefront,
  ClockCounterClockwise,
  SignOut
} from 'phosphor-react';
import Navbar from '../components/Navbar';

interface Business {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  image: string;
  isOpen: boolean;
  address?: string;
}

interface Review {
  id: number;
  businessName: string;
  businessImage: string;
  rating: number;
  text: string;
  date: string;
}

interface HistoryItem {
  id: number;
  businessName: string;
  businessImage: string;
  category: string;
  visitedAt: string;
  action: string;
}

// Mock data
const mockFavorites: Business[] = [
  {
    id: 1,
    name: 'Café da Esquina',
    category: 'Café',
    rating: 4.8,
    reviewCount: 122,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true,
    address: 'Rua das Flores, 123 - Centro'
  },
  {
    id: 2,
    name: 'Pizzaria Italiana',
    category: 'Pizzaria',
    rating: 4.6,
    reviewCount: 203,
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: false,
    address: 'Av. Paulista, 456 - Bela Vista'
  }
];

const mockReviews: Review[] = [
  {
    id: 1,
    businessName: 'Café da Esquina',
    businessImage: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    rating: 5,
    text: 'Excelente café! Ambiente aconchegante e atendimento impecável.',
    date: '2024-01-15'
  },
  {
    id: 2,
    businessName: 'Bistrô Moderno',
    businessImage: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    rating: 4,
    text: 'Boa comida, mas o atendimento poderia ser mais rápido.',
    date: '2024-01-10'
  }
];

const mockHistory: HistoryItem[] = [
  {
    id: 1,
    businessName: 'Sushi House',
    businessImage: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    category: 'Japonês',
    visitedAt: '2024-01-20 14:30',
    action: 'Visualizou detalhes'
  },
  {
    id: 2,
    businessName: 'Hamburgueria Gourmet',
    businessImage: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    category: 'Hamburgueria',
    visitedAt: '2024-01-19 19:15',
    action: 'Clicou no WhatsApp'
  }
];

const mockSuggestions: Business[] = [
  {
    id: 3,
    name: 'Doceria Francesa',
    category: 'Doceria',
    rating: 4.7,
    reviewCount: 167,
    image: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 4,
    name: 'Churrascaria Premium',
    category: 'Churrascaria',
    rating: 4.6,
    reviewCount: 298,
    image: 'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 5,
    name: 'Açaí Premium',
    category: 'Sorveteria',
    rating: 4.3,
    reviewCount: 92,
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: false
  }
];

function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'favorites' | 'reviews' | 'history'>('favorites');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [showIcons, setShowIcons] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Mock user data
  const userData = {
    name: 'João Silva',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  };

  // Check URL params for tab selection
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['favorites', 'reviews', 'history'].includes(tabParam)) {
      setActiveTab(tabParam as 'favorites' | 'reviews' | 'history');
    }
  }, [location.search]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowIcons(scrollY <= 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        weight={index < Math.floor(rating) ? 'fill' : 'regular'}
        className={index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'favorites':
        return (
          <div className="space-y-4">
            {mockFavorites.length > 0 ? (
              mockFavorites.map((business) => (
                <div key={business.id} className="flex flex-col gap-3 cursor-pointer" onClick={() => navigate(`/business/${business.id}`)}>
                  <div className="relative">
                    <img 
                      src={business.image} 
                      alt={business.name}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    {business.isOpen && (
                      <span className="absolute top-2 left-2 bg-green-700/50 backdrop-blur text-white text-xs px-2 py-1 rounded">
                        Aberto
                      </span>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-2">
                        {business.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star size={16} className="text-yellow-500" weight="fill" />
                        <span className="text-sm font-medium text-gray-900">
                          {business.rating}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({business.reviewCount} avaliações)
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin size={14} className="mr-1" />
                      <span className="text-sm">
                        {business.address || `${business.category} • São Paulo, SP`}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Um dos seus negócios favoritos, sempre oferecendo qualidade e um excelente atendimento.
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                        business.isOpen 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {business.isOpen ? 'Aberto agora' : 'Fechado'}
                      </span>
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                        {business.category}
                      </span>
                      <span className="inline-block bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
                        <Heart size={12} className="inline mr-1" weight="fill" />
                        Favorito
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Você ainda não tem favoritos</p>
                <p className="text-sm text-gray-400 mt-2">
                  Explore negócios e adicione aos seus favoritos
                </p>
              </div>
            )}
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-4">
            {mockReviews.length > 0 ? (
              mockReviews.map((review) => (
                <div key={review.id} className="flex flex-col gap-3">
                  <div className="relative">
                    <img 
                      src={review.businessImage} 
                      alt={review.businessName}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-2">
                        {review.businessName}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star size={16} className="text-yellow-500" weight="fill" />
                        <span className="text-sm font-medium text-gray-900">
                          {review.rating}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <Clock size={14} className="mr-1" />
                      <span className="text-sm">
                        Avaliado em {formatDate(review.date)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      "{review.text}"
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                        Sua avaliação
                      </span>
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                        {review.rating} estrelas
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Star size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Você ainda não fez avaliações</p>
                <p className="text-sm text-gray-400 mt-2">
                  Visite negócios e compartilhe sua experiência
                </p>
              </div>
            )}
          </div>
        );

      case 'history':
        return (
          <div className="space-y-4">
            {mockHistory.length > 0 ? (
              mockHistory.map((item) => (
                <div key={item.id} className="flex flex-col gap-3">
                  <div className="relative">
                    <img 
                      src={item.businessImage} 
                      alt={item.businessName}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-2">
                        {item.businessName}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-500">
                          {formatDateTime(item.visitedAt)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin size={14} className="mr-1" />
                      <span className="text-sm">
                        {item.category} • São Paulo, SP
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      Você {item.action.toLowerCase()} este negócio recentemente.
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-block bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                        {item.action}
                      </span>
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Clock size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Seu histórico está vazio</p>
                <p className="text-sm text-gray-400 mt-2">
                  Suas interações com negócios aparecerão aqui
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Dashboard Header with Logo, Bell and User Menu */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => navigate('/')}
            className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
          >
            Local Top
          </button>
          
          {/* Right side - Bell and User Menu */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/notifications')}
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <Bell size={24} />
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                3
              </span>
            </button>
            
            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img 
                  src={userData.avatar} 
                  alt={userData.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="hidden md:block text-sm font-medium text-gray-900">
                  {userData.name}
                </span>
                <CaretDown size={16} className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={userData.avatar} 
                        alt={userData.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                        <p className="text-xs text-gray-500">joao.silva@email.com</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <button 
                      onClick={() => navigate('/profile')}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <UserCircle size={16} className="mr-3" />
                      Ver perfil
                    </button>
                    
                    <button 
                      onClick={() => navigate('/profile?tab=settings')}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Gear size={16} className="mr-3" />
                      Configurações
                    </button>
                    
                    <button 
                      onClick={() => navigate('/register-business')}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Storefront size={16} className="mr-3" />
                      Cadastrar negócio
                    </button>
                    
                    <button 
                      onClick={() => navigate('/dashboard?tab=favorites')}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Heart size={16} className="mr-3" />
                      Favoritos
                    </button>
                    
                    <button 
                      onClick={() => navigate('/dashboard?tab=reviews')}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Star size={16} className="mr-3" />
                      Minhas avaliações
                    </button>
                    
                    <button 
                      onClick={() => navigate('/dashboard?tab=history')}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <ClockCounterClockwise size={16} className="mr-3" />
                      Histórico
                    </button>

                    {/* Logout */}
                    <button 
                      onClick={() => {
                        // Add logout logic here
                        navigate('/login');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <SignOut size={18} />
                      <span>Sair da conta</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search and Tabs Section */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-white shadow-sm">
        <div className="px-4 py-3 flex flex-col items-center justify-between w-full">
          <div className="w-full flex items-center justify-center pb-4 md:pb-4">
            {/* Desktop Tab Navigation */}
            <div className="hidden md:flex items-center space-x-8 py-2">
              <button 
                onClick={() => setActiveTab('favorites')}
                className={`flex items-center justify-center space-x-2 text-sm font-medium pb-1 w-[100px] ${
                  activeTab === 'favorites' 
                    ? 'text-gray-900 border-b-2 border-gray-900 pb-3' 
                    : 'text-gray-500 border-b-2 border-white pb-3'
                }`}
              >
                {showIcons && <Heart size={36} />}
                <span>Favoritos</span>
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`flex items-center justify-center space-x-2 text-sm font-medium pb-1 w-[100px] ${
                  activeTab === 'reviews' 
                    ? 'text-gray-900 border-b-2 border-gray-900 pb-3' 
                    : 'text-gray-500 border-b-2 border-white pb-3'
                }`}
              >
                {showIcons && <Star size={36} />}
                <span>Avaliações</span>
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={`flex items-center justify-center space-x-2 text-sm font-medium pb-1 w-[100px] ${
                  activeTab === 'history' 
                    ? 'text-gray-900 border-b-2 border-gray-900 pb-3' 
                    : 'text-gray-500 border-b-2 border-white pb-3'
                }`}
              >
                {showIcons && <Clock size={36} />}
                <span>Histórico</span>
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
        
        {/* Mobile Tab Navigation */}
        <div className="px-4 md:hidden">
          <div className="flex justify-around">
            <button 
              onClick={() => setActiveTab('favorites')}
              className={`flex flex-col items-center justify-center py-4 text-sm font-medium w-[100px] ${
                activeTab === 'favorites' 
                  ? 'text-gray-900 border-b-[3px] border-gray-900' 
                  : 'text-gray-500 border-b-[3px] border-white'
              }`}
            >
              {showIcons && <Heart size={24} className="mb-1" />}
              <span>Favoritos</span>
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`flex flex-col items-center justify-center py-4 text-sm font-medium w-[100px] ${
                activeTab === 'reviews' 
                  ? 'text-gray-900 border-b-[3px] border-gray-900' 
                  : 'text-gray-500 border-b-[3px] border-white'
              }`}
            >
              {showIcons && <Star size={24} className="mb-1" />}
              <span>Avaliações</span>
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex flex-col items-center justify-center py-4 text-sm font-medium w-[100px] ${
                activeTab === 'history' 
                  ? 'text-gray-900 border-b-[3px] border-gray-900' 
                  : 'text-gray-500 border-b-[3px] border-white'
              }`}
            >
              {showIcons && <Clock size={24} className="mb-1" />}
              <span>Histórico</span>
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="mx-auto px-4 py-6 space-y-6 max-w-2xl pt-32 md:pt-32">
        {/* Tab Content */}
        <div>
          {renderTabContent()}
        </div>

        {/* Sugestões */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Negócios que você pode gostar</h3>
          <div className="space-y-6">
            {mockSuggestions.map((business) => (
              <div 
                key={business.id} 
                className="flex flex-col gap-3 cursor-pointer"
                onClick={() => navigate(`/business/${business.id}`)}
              >
                <div className="relative">
                  <img 
                    src={business.image} 
                    alt={business.name}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  {business.isOpen && (
                    <span className="absolute top-2 left-2 bg-green-700/50 backdrop-blur text-white text-xs px-2 py-1 rounded">
                      Aberto
                    </span>
                  )}
                </div>
                
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-900 flex-1 pr-2">
                      {business.name}
                    </h4>
                    <div className="flex items-center space-x-1">
                      <Star size={16} className="text-yellow-500" weight="fill" />
                      <span className="text-sm font-medium text-gray-900">
                        {business.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({business.reviewCount} avaliações)
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin size={14} className="mr-1" />
                    <span className="text-sm">
                      {business.category} • São Paulo, SP
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    Descubra este incrível negócio e tenha uma experiência única com qualidade e atendimento excepcional.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                      business.isOpen 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {business.isOpen ? 'Aberto agora' : 'Fechado'}
                    </span>
                    <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                      {business.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;