import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { 
  Star, 
  Share, 
  PencilSimple, 
  Globe, 
  MapPin,
  CaretDown,
  CaretUp,
  WhatsappLogo,
  X,
  Eye,
  EyeSlash
} from 'phosphor-react';

interface Business {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  category: string;
  priceRange: string;
  isOpen: boolean;
  image: string;
  address: string;
  phone: string;
  website: string;
  description: string;
  hours: { [key: string]: string };
  amenities: string[];
}

const mockBusiness: Business = {
  id: 1,
  name: 'Café da Esquina',
  rating: 4.8,
  reviewCount: 122,
  category: 'Café',
  priceRange: '$$',
  isOpen: true,
  image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
  phone: '(11) 1234-5678',
  website: 'https://cafedaesquina.com.br',
  description: 'Um aconchegante café no coração da cidade, conhecido por seus grãos especiais e ambiente acolhedor. Servimos cafés artesanais, doces caseiros e lanches saudáveis em um espaço que combina tradição e modernidade.',
  hours: {
    'Segunda': '7:00 - 18:00',
    'Terça': '7:00 - 18:00',
    'Quarta': '7:00 - 18:00',
    'Quinta': '7:00 - 18:00',
    'Sexta': '7:00 - 20:00',
    'Sábado': '8:00 - 20:00',
    'Domingo': '8:00 - 16:00'
  },
  amenities: ['Wi-Fi gratuito', 'Aceita cartão', 'Estacionamento', 'Acessível', 'Pet friendly', 'Área kids']
};

const mockImages = [
  'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop'
];

const mockReviews = [
  {
    id: 1,
    userName: 'Maria Silva',
    rating: 5,
    date: '2024-01-15',
    text: 'Excelente café! Ambiente aconchegante e atendimento impecável. O cappuccino é o melhor da região.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: 2,
    userName: 'João Santos',
    rating: 4,
    date: '2024-01-10',
    text: 'Ótimo lugar para trabalhar. Wi-Fi rápido e café delicioso. Apenas o preço poderia ser um pouco melhor.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  }
];

const mockSimilarBusinesses = [
  {
    id: 2,
    name: 'Bistrô Moderno',
    category: 'Restaurante',
    rating: 4.7,
    reviewCount: 89,
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 3,
    name: 'Padaria Central',
    category: 'Padaria',
    rating: 4.5,
    reviewCount: 156,
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: false
  },
  {
    id: 4,
    name: 'Pizzaria Italiana',
    category: 'Pizzaria',
    rating: 4.6,
    reviewCount: 203,
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 5,
    name: 'Sushi House',
    category: 'Japonês',
    rating: 4.8,
    reviewCount: 145,
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 6,
    name: 'Hamburgueria Gourmet',
    category: 'Hamburgueria',
    rating: 4.4,
    reviewCount: 178,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: false
  },
  {
    id: 7,
    name: 'Açaí Premium',
    category: 'Sorveteria',
    rating: 4.3,
    reviewCount: 92,
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  }
];

const mockPeopleAlsoVisited = [
  {
    id: 8,
    name: 'Café Artesanal',
    category: 'Café',
    rating: 4.9,
    reviewCount: 234,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 9,
    name: 'Doceria Francesa',
    category: 'Doceria',
    rating: 4.7,
    reviewCount: 167,
    image: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: false
  },
  {
    id: 10,
    name: 'Churrascaria Premium',
    category: 'Churrascaria',
    rating: 4.6,
    reviewCount: 298,
    image: 'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 11,
    name: 'Lanchonete Retrô',
    category: 'Lanchonete',
    rating: 4.2,
    reviewCount: 134,
    image: 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 12,
    name: 'Tapiocaria Nordestina',
    category: 'Tapiocaria',
    rating: 4.5,
    reviewCount: 87,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: false
  },
  {
    id: 13,
    name: 'Smoothie Bar',
    category: 'Sucos',
    rating: 4.4,
    reviewCount: 112,
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  }
];

function BusinessPage() {
  const navigate = useNavigate();
  const [showAllHours, setShowAllHours] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: ''
  });
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const business = mockBusiness; // Em uma aplicação real, buscar por businessId

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        weight={i < Math.floor(rating) ? 'fill' : 'regular'}
        className="text-yellow-400"
      />
    ));
  };



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica de login/cadastro
    console.log('Form submitted:', formData);
    setShowLoginModal(false);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Olá! Gostaria de saber mais sobre o ${business.name}.`);
    const phone = business.phone.replace(/\D/g, '');
    window.open(`https://wa.me/55${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        variant="page"
        title={business.name}
        showBackButton={true}
        showSearch={false}
        showUserIcon={false}
        onBackClick={() => navigate(-1)}
      />

      {/* 1. Hero do Negócio - Carrossel de Imagens */}
      <div className="relative pt-16">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {mockImages.map((image, index) => (
              <div key={index} className="embla__slide flex-none w-full">
                <img 
                  src={image} 
                  alt={`${business.name} - Foto ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Indicador de fotos */}
        <div className="absolute top-20 right-4 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-sm">
          {selectedIndex + 1}/{mockImages.length}
        </div>
      </div>

      {/* 2. Barra de Ações */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="grid grid-cols-3 gap-3">
          <button className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <Globe size={20} className="text-gray-700 mb-1" />
            <span className="text-xs text-gray-700">Site</span>
          </button>
          <button className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <Share size={20} className="text-gray-700 mb-1" />
            <span className="text-xs text-gray-700">Compartilhar</span>
          </button>
          <button className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <MapPin size={20} className="text-gray-700 mb-1" />
            <span className="text-xs text-gray-700">Localização</span>
          </button>
        </div>
      </div>

      {/* 3. Informações do Negócio */}
      <div className="px-4 py-4 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{business.name}</h2>
        <div className="flex items-center mb-2">
          <div className="flex items-center mr-4">
            {renderStars(business.rating)}
            <span className="text-gray-900 ml-2 font-medium">{business.rating}</span>
          </div>
          <span className="text-gray-600">({business.reviewCount} avaliações)</span>
        </div>
        
        {/* Características do Negócio */}
        <div className='mt-4'>
          <div className="flex flex-wrap gap-2">
            {['Café especial', 'Brunch', 'Wi-Fi grátis', 'Ambiente aconchegante', 'Opções veganas'].map((characteristic, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
              >
                {characteristic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Localização e Horário */}
      <div className="px-4 py-6 border-b border-gray-100">
        {/* Mapa do Google Maps */}
        <div className="w-full h-48 rounded-lg mb-4 overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975!2d-46.6344!3d-23.5505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59541c6c79c3%3A0x36b90a85f0f8cb33!2sRua%20das%20Flores%2C%20123%20-%20Centro%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt!2sbr!4v1640995200000!5m2!1spt!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização do Café da Esquina"
          />
        </div>
        
        <div className="mb-4">
          <p className="text-gray-900 font-medium mb-2">{business.address}</p>
          <button className="text-gray-900 font-medium underline">Obter direções</button>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              {!showAllHours ? (
                <>
                  <span className={`font-medium ${
                    business.isOpen ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {business.isOpen ? 'Aberto Agora' : 'Fechado'}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600 text-sm">
                    {business.isOpen ? 'Fecha às 18:00' : 'Abre às 7:00'}
                  </span>
                </>
              ) : (
                <span className={`font-medium ${
                  business.isOpen ? 'text-green-600' : 'text-red-600'
                }`}>
                  {business.isOpen ? 'Aberto Agora' : 'Fechado'}
                </span>
              )}
            </div>
            <button 
              onClick={() => setShowAllHours(!showAllHours)}
              className="text-gray-900"
            >
              {showAllHours ? <CaretUp size={20} /> : <CaretDown size={20} />}
            </button>
          </div>
          
          {showAllHours && (
            <div className="space-y-2">
              {(() => {
                const today = new Date().getDay();
                const daysOrder = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
                const currentDay = daysOrder[today];
                
                return daysOrder.map((day) => (
                  <div key={day} className="flex justify-between">
                    <span className={`${
                      day === currentDay ? 'text-gray-900 font-bold' : 'text-gray-700'
                    }`}>
                      {day}
                    </span>
                    <span className={`font-medium ${
                      day === currentDay ? 'text-gray-900 font-bold' : 'text-gray-900'
                    }`}>
                      {business.hours[day] || 'Fechado'}
                    </span>
                  </div>
                ));
              })()
              }
            </div>
          )}
        </div>
      </div>

      {/* 5. Sobre a Empresa */}
      <div className="px-4 py-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sobre a empresa</h3>
        <p className="text-gray-700 leading-relaxed">
          {showFullDescription 
            ? business.description 
            : `${business.description.substring(0, 150)}...`
          }
        </p>
        <button 
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="text-gray-900 font-medium underline mt-2"
        >
          {showFullDescription ? 'Ler menos' : 'Ler mais'}
        </button>
      </div>

      {/* 6. Avaliações */}
      <div className="px-4 py-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Avaliações</h3>
        
        {/* Nota média e distribuição */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-gray-900 mr-2">{business.rating}</span>
              <div className="flex items-center">
                {renderStars(business.rating)}
              </div>
            </div>
            <span className="text-gray-600">{business.reviewCount} avaliações</span>
          </div>
          
          {/* Distribuição de estrelas simplificada */}
          <div className="space-y-1">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 w-2">{stars}</span>
                <Star size={12} weight="fill" className="text-yellow-400" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full" 
                    style={{ width: `${Math.random() * 80 + 20}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Avaliações individuais */}
        <div className="space-y-4">
          {mockReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
              <div className="flex items-start space-x-3">
                <img 
                  src={review.avatar} 
                  alt={review.userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900">{review.userName}</h4>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-3 text-gray-900 font-medium border border-gray-300 rounded-lg">
          Ver todas as avaliações
        </button>
      </div>

      {/* 7. Negócios Similares */}
      <div className="px-4 py-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Negócios similares</h3>
        <div className="grid grid-cols-2 gap-4">
          {mockSimilarBusinesses.slice(0, 4).map((similarBusiness) => (
            <div key={similarBusiness.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <img 
                src={similarBusiness.image} 
                alt={similarBusiness.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h4 className="font-medium text-gray-900 text-sm mb-1 truncate">{similarBusiness.name}</h4>
                <p className="text-gray-600 text-xs mb-2">{similarBusiness.category}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star size={12} weight="fill" className="text-yellow-400 mr-1" />
                    <span className="text-xs text-gray-900">{similarBusiness.rating}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    similarBusiness.isOpen 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {similarBusiness.isOpen ? 'Aberto' : 'Fechado'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Pessoas também visitaram */}
      <div className="px-4 py-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pessoas também visitaram</h3>
        <div className="grid grid-cols-2 gap-4">
          {mockPeopleAlsoVisited.slice(0, 4).map((visitedBusiness) => (
            <div key={visitedBusiness.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <img 
                src={visitedBusiness.image} 
                alt={visitedBusiness.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h4 className="font-medium text-gray-900 text-sm mb-1 truncate">{visitedBusiness.name}</h4>
                <p className="text-gray-600 text-xs mb-2">{visitedBusiness.category}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star size={12} weight="fill" className="text-yellow-400 mr-1" />
                    <span className="text-xs text-gray-900">{visitedBusiness.rating}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    visitedBusiness.isOpen 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {visitedBusiness.isOpen ? 'Aberto' : 'Fechado'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav Flutuante */}
      <div className="fixed bottom-4 left-4 right-4 z-50">
        <div className="bg-white rounded-full shadow-lg border border-gray-200 px-4 py-3">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowLoginModal(true)}
              className="flex-1 flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-full"
            >
              <PencilSimple size={20} className="text-gray-700" />
              <span className="text-gray-700 font-medium">Avaliar</span>
            </button>
            <button 
              onClick={handleWhatsApp}
              className="flex-1 flex items-center justify-center space-x-2 py-3 bg-black rounded-full"
            >
              <WhatsappLogo size={20} className="text-white" />
              <span className="text-white font-medium">WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Sheet Modal para Login/Cadastro */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-end">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowLoginModal(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">
                {isLogin ? 'Entrar na sua conta' : 'Criar conta'}
              </h2>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Digite seu nome completo"
                      required={!isLogin}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Digite seu e-mail"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Digite sua senha"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmar senha
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Confirme sua senha"
                      required={!isLogin}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  {isLogin ? 'Entrar' : 'Criar conta'}
                </button>
              </form>

              {/* Toggle Login/Register */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-1 text-black font-medium underline"
                  >
                    {isLogin ? 'Criar conta' : 'Entrar'}
                  </button>
                </p>
              </div>

              {/* Social Login */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Ou continue com</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-gray-700">Google</span>
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="text-gray-700">Facebook</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sheet Modal para Avaliação */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-end">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowReviewModal(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Avaliar {business.name}
              </h2>
              <button 
                onClick={() => setShowReviewModal(false)}
                className="text-gray-500"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <div className="p-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                // Aqui você pode adicionar a lógica para salvar a avaliação
                console.log('Avaliação enviada:', reviewData);
                setShowReviewModal(false);
                setReviewData({ rating: 0, comment: '' });
              }} className="space-y-6">
                
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Sua avaliação
                  </label>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setReviewData(prev => ({ ...prev, rating: i + 1 }))}
                        className="text-3xl transition-colors"
                      >
                        <Star
                          size={32}
                          weight={i < reviewData.rating ? 'fill' : 'regular'}
                          className={i < reviewData.rating ? 'text-yellow-400' : 'text-gray-300'}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {reviewData.rating > 0 ? `${reviewData.rating} estrela${reviewData.rating > 1 ? 's' : ''}` : ''}
                    </span>
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comentário (opcional)
                  </label>
                  <textarea
                    value={reviewData.comment}
                    onChange={(e) => setReviewData(prev => ({ ...prev, comment: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                    placeholder="Conte sobre sua experiência..."
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={reviewData.rating === 0}
                  className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Enviar Avaliação
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default BusinessPage;