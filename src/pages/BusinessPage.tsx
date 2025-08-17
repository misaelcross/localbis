import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { 
  Star, 
  Heart, 
  Share, 
  Camera, 
  PencilSimple, 
  Globe, 
  BookmarkSimple,
  MapPin,
  Clock,
  Phone,
  CaretDown,
  CaretUp,
  MagnifyingGlass,
  ArrowLeft,
  WifiHigh,
  CreditCard,
  Car,
  Wheelchair,
  Dog,
  Baby,
  WhatsappLogo
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
  const { businessId } = useParams();
  const navigate = useNavigate();
  const [showAllHours, setShowAllHours] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const business = mockBusiness; // Em uma aplicação real, buscar por businessId

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

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

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wi-fi gratuito':
        return <WifiHigh size={20} />;
      case 'aceita cartão':
        return <CreditCard size={20} />;
      case 'estacionamento':
        return <Car size={20} />;
      case 'acessível':
        return <Wheelchair size={20} />;
      case 'pet friendly':
        return <Dog size={20} />;
      case 'área kids':
        return <Baby size={20} />;
      default:
        return <Star size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header com botão voltar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)}
              className="text-gray-900 mr-4"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 truncate">{business.name}</h1>
          </div>
          <button className="text-gray-900">
            <Heart size={24} />
          </button>
        </div>
      </div>

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
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          <button className="flex flex-col items-center min-w-[80px] p-3 bg-gray-50 rounded-lg">
            <WhatsappLogo size={20} className="text-gray-700 mb-1" />
            <span className="text-xs text-gray-700">WhatsApp</span>
          </button>
          <button className="flex flex-col items-center min-w-[80px] p-3 bg-gray-50 rounded-lg">
            <PencilSimple size={20} className="text-gray-700 mb-1" />
            <span className="text-xs text-gray-700">Avaliar</span>
          </button>
          <button className="flex flex-col items-center min-w-[80px] p-3 bg-gray-50 rounded-lg">
            <Globe size={20} className="text-gray-700 mb-1" />
            <span className="text-xs text-gray-700">Site</span>
          </button>
          <button className="flex flex-col items-center min-w-[80px] p-3 bg-gray-50 rounded-lg">
            <Share size={20} className="text-gray-700 mb-1" />
            <span className="text-xs text-gray-700">Compartilhar</span>
          </button>
          <button className="flex flex-col items-center min-w-[80px] p-3 bg-gray-50 rounded-lg">
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
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">{business.category}</span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-600">{business.priceRange}</span>
          <span className="text-gray-600">•</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            business.isOpen 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {business.isOpen ? 'Aberto' : 'Fechado'}
          </span>
        </div>
      </div>

      {/* 3. Localização e Horário */}
      <div className="px-4 py-6 border-b border-gray-100">
        {/* Mapa placeholder */}
        <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
          <MapPin size={32} className="text-gray-400" />
        </div>
        
        <div className="mb-4">
          <p className="text-gray-900 font-medium mb-2">{business.address}</p>
          <button className="text-gray-900 font-medium underline">Obter direções</button>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">Horário de funcionamento</h3>
            <button 
              onClick={() => setShowAllHours(!showAllHours)}
              className="text-gray-900 underline"
            >
              {showAllHours ? <CaretUp size={20} /> : <CaretDown size={20} />}
            </button>
          </div>
          
          <div className="space-y-2">
            {Object.entries(business.hours)
              .slice(0, showAllHours ? undefined : 3)
              .map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="text-gray-700">{day}</span>
                  <span className="text-gray-900 font-medium">{hours}</span>
                </div>
              ))
            }
          </div>
        </div>

        <button className="text-gray-900 font-medium underline">Sugerir edição</button>
      </div>

      {/* 4. Comodidades */}
      <div className="px-4 py-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Comodidades</h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {business.amenities
            .slice(0, showAllAmenities ? undefined : 4)
            .map((amenity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-gray-600">
                  {getAmenityIcon(amenity)}
                </div>
                <span className="text-gray-900 text-sm">{amenity}</span>
              </div>
            ))
          }
        </div>
        {business.amenities.length > 4 && (
          <button 
            onClick={() => setShowAllAmenities(!showAllAmenities)}
            className="text-gray-900 font-medium underline"
          >
            {showAllAmenities ? 'Ver menos atributos' : 'Ver mais atributos'}
          </button>
        )}
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
                <Star size={12} className="text-yellow-400" weight="fill" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full" 
                    style={{ width: `${Math.random() * 80 + 20}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filtros */}
        <div className="space-y-3 mb-4">
          <select className="w-full p-3 border border-gray-200 rounded-lg">
            <option>Ordenar por: Mais recentes</option>
            <option>Ordenar por: Mais úteis</option>
            <option>Ordenar por: Maior nota</option>
          </select>
          
          <div className="relative">
            <MagnifyingGlass size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar nas avaliações..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg"
            />
          </div>
        </div>

        {/* Lista de avaliações */}
        <div className="space-y-4 mb-6">
          {mockReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-4">
              <div className="flex items-start space-x-3">
                <img 
                  src={review.avatar} 
                  alt={review.userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
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

        <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium">
          Escreva sua avaliação
        </button>
      </div>



      {/* 8. Negócios Semelhantes Próximos */}
      <div className="px-4 py-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Negócios semelhantes próximos</h3>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {mockSimilarBusinesses.map((business) => (
            <div key={business.id} className="min-w-[200px] flex-shrink-0 flex flex-col gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="relative">
                <img 
                  src={business.image} 
                  alt={business.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                {business.isOpen && (
                  <span className="absolute top-2 left-2 bg-green-700/50 backdrop-blur text-white text-xs px-2 py-1 rounded">
                    Aberto
                  </span>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{business.name}</h4>
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-500" weight="fill" />
                  <span className="text-sm text-gray-600">{business.rating} ({business.reviewCount})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9. As Pessoas Também Visitaram */}
      <div className="px-4 py-6 pb-20">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">As pessoas também visitaram</h3>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {mockPeopleAlsoVisited.map((business) => (
            <div key={business.id} className="min-w-[200px] flex-shrink-0 flex flex-col gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="relative">
                <img 
                  src={business.image} 
                  alt={business.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                {business.isOpen && (
                  <span className="absolute top-2 left-2 bg-green-700/50 backdrop-blur text-white text-xs px-2 py-1 rounded">
                    Aberto
                  </span>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{business.name}</h4>
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-500" weight="fill" />
                  <span className="text-sm text-gray-600">{business.rating} ({business.reviewCount})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BusinessPage;