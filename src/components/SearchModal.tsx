import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlass, X, House, Heart, ShoppingBag, CaretDown, CaretUp, Star, MapPin } from 'phosphor-react';
import { Radio, RadioGroup, FormControlLabel, Checkbox, FormGroup } from '@mui/material';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState('todos');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const hasActiveFilters = searchText.trim() !== '' || selectedFilters.length > 0 || selectedSchedule !== 'todos';

  const handleFilterChange = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearSearch = () => {
    setSearchText('');
    setSelectedSchedule('todos');
    setSelectedFilters([]);
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      navigate(`/search/${encodeURIComponent(searchText.trim())}`);
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Mock data para os 3 negócios sugeridos
  const suggestedBusinesses = [
    {
      id: 1,
      name: 'Café da Esquina',
      rating: 4.8,
      reviewCount: 122,
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      isOpen: true,
      address: 'Rua Augusta, 1200 - São Paulo, SP',
      category: 'Café',
      closingTime: '18:00'
    },
    {
      id: 2,
      name: 'Restaurante Bella Vista',
      rating: 4.6,
      reviewCount: 89,
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      isOpen: true,
      address: 'Av. Paulista, 2000 - São Paulo, SP',
      category: 'Italiana',
      closingTime: '22:00'
    },
    {
      id: 3,
      name: 'Padaria Central',
      rating: 4.5,
      reviewCount: 156,
      image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      isOpen: false,
      address: 'Rua do Comércio, 100 - São Paulo, SP',
      category: 'Padaria',
      openingTime: '6:00'
    }
  ];

  const scheduleOptions = [
    { value: 'aberto', label: 'Aberto Agora' },
    { value: 'todos', label: 'Todos os Horários' }
  ];

  const filterOptions = [
    { value: 'cartao', label: 'Aceita Cartão' },
    { value: 'delivery', label: 'Delivery Disponível' },
    { value: 'acessivel', label: 'Acessível' },
    { value: 'estacionamento', label: 'Estacionamento' },
    { value: 'avaliacao', label: 'Avaliação 4.5 ou Acima' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header do Modal */}
      <div className="bg-white border-b border-gray-200 px-4 pt-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          {/* Div balanceadora à esquerda */}
          <div className="w-8 h-8"></div>
          
          {/* Abas centrais - Layout Mobile */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setActiveTab('restaurantes')}
                className={`flex flex-col items-center space-y-1 text-xs font-medium ${
                  activeTab === 'restaurantes' 
                    ? 'text-gray-900 border-b-2 border-gray-900 pb-3' 
                    : 'text-gray-500 border-b-2 border-white pb-3'
                }`}
              >
                <House size={20} />
                <span>Restaurantes</span>
              </button>
              <button 
                onClick={() => setActiveTab('cuidado')}
                className={`flex flex-col items-center space-y-1 text-xs font-medium ${
                  activeTab === 'cuidado' 
                    ? 'text-gray-900 border-b-2 border-gray-900 pb-3' 
                    : 'text-gray-500 border-b-2 border-white pb-3'
                }`}
              >
                <Heart size={20} />
                <span>Cuidado</span>
              </button>
              <button 
                onClick={() => setActiveTab('mercado')}
                className={`flex flex-col items-center space-y-1 text-xs font-medium ${
                  activeTab === 'mercado' 
                    ? 'text-gray-900 border-b-2 border-gray-900 pb-3' 
                    : 'text-gray-500 border-b-2 border-white pb-3'
                }`}
              >
                <ShoppingBag size={20} />
                <span>Mercado</span>
              </button>
            </div>
          </div>
          
          {/* Botão fechar */}
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Conteúdo do Modal */}
      <div className="flex-1 overflow-y-auto bg-gray-100">
        {/* Seção de Busca */}
        <div className="p-4 bg-white mx-4 mt-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Onde?</h2>
          
          {/* Campo de busca */}
          <div className="relative mb-3">
            <MagnifyingGlass size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text-sm"
              placeholder="Buscar cidade, bairro ou endereço"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
          </div>

          {/* Sugestões de negócios */}
          <div className="mb-1">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Locais sugeridos:</h3>
            <div className="space-y-3">
              {suggestedBusinesses.map((business) => (
                <div
                  key={business.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/business/${business.id}`)}
                >
                  {/* Foto do negócio à esquerda */}
                  <img 
                    src={business.image} 
                    alt={business.name}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  {/* Informações à direita */}
                  <div className="flex-1 min-w-0">
                    {/* Nome do negócio */}
                    <h4 className="font-medium text-gray-900 mb-1 truncate">
                      {business.name}
                    </h4>
                    
                    {/* Avaliações */}
                    <div className="flex items-center mb-2">
                      <Star size={14} className="text-yellow-500 mr-1" weight="fill" />
                      <span className="text-sm text-gray-900 mr-1">{business.rating}</span>
                      <span className="text-sm text-gray-500">({business.reviewCount})</span>
                    </div>
                    
                    {/* Categoria em badge cinza e endereço */}
                    <div className="flex items-center mb-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium mr-2 flex-shrink-0">
                        {business.category}
                      </span>
                      <div className="flex items-center text-gray-600 min-w-0">
                        <MapPin size={12} className="mr-1 flex-shrink-0" />
                        <span className="text-xs truncate">{business.address}</span>
                      </div>
                    </div>
                    
                    {/* Status de aberto/fechado com horários */}
                    <div className="flex items-center">
                      <span className={`text-xs font-medium mr-1 ${
                        business.isOpen ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {business.isOpen ? 'Aberto' : 'Fechado'}
                      </span>
                      <span className="text-gray-400 text-xs">•</span>
                      <span className="text-xs text-gray-600 ml-1">
                        {business.isOpen 
                          ? `Fecha às ${business.closingTime}` 
                          : `Abre às ${business.openingTime}`
                        }
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Accordion Horário */}
        <div className="bg-white mx-4 mt-4 rounded-lg border border-gray-200">
          <button
            onClick={() => setIsScheduleOpen(!isScheduleOpen)}
            className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg font-medium">Horário</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Aberto agora</span>
              {isScheduleOpen ? <CaretUp size={20} /> : <CaretDown size={20} />}
            </div>
          </button>
          
          {isScheduleOpen && (
            <div className="px-4 pb-4">
              <RadioGroup
                value={selectedSchedule}
                onChange={(e) => setSelectedSchedule(e.target.value)}
                sx={{ '& .MuiFormControlLabel-root': { margin: 0, marginBottom: '12px' } }}
              >
                {scheduleOptions.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={
                      <Radio
                        sx={{
                          color: '#9ca3af',
                          '&.Mui-checked': {
                            color: '#1f2937',
                          },
                          '& .MuiSvgIcon-root': {
                            fontSize: 20,
                          },
                        }}
                      />
                    }
                    label={<span className="text-gray-700 ml-2">{option.label}</span>}
                  />
                ))}
              </RadioGroup>
            </div>
          )}
        </div>

        {/* Accordion Filtros */}
        <div className="bg-white mx-4 mt-4 mb-4 rounded-lg border border-gray-200">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg font-medium">Filtros</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Nenhum filtro</span>
              {isFiltersOpen ? <CaretUp size={20} /> : <CaretDown size={20} />}
            </div>
          </button>
          
          {isFiltersOpen && (
            <div className="px-4 pb-4">
              <FormGroup sx={{ '& .MuiFormControlLabel-root': { margin: 0, marginBottom: '12px' } }}>
                {filterOptions.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Checkbox
                        checked={selectedFilters.includes(option.value)}
                        onChange={() => handleFilterChange(option.value)}
                        sx={{
                          color: '#9ca3af',
                          '&.Mui-checked': {
                            color: '#1f2937',
                          },
                          '& .MuiSvgIcon-root': {
                            fontSize: 20,
                          },
                        }}
                      />
                    }
                    label={<span className="text-gray-700 ml-2">{option.label}</span>}
                  />
                ))}
              </FormGroup>
            </div>
          )}
        </div>
      </div>

      {/* NavBottom Fixo */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={clearSearch}
            disabled={!hasActiveFilters}
            className={`w-1/2 px-6 py-3 rounded-lg font-medium transition-colors ${
              hasActiveFilters
                ? 'text-gray-700 hover:bg-gray-100 border border-gray-300'
                : 'text-gray-400 cursor-not-allowed border border-gray-200'
            }`}
          >
            Limpar Busca
          </button>
          
          <button
            onClick={handleSearch}
            disabled={!hasActiveFilters}
            className={`w-1/2 px-6 py-3 rounded-lg font-medium transition-colors ${
              hasActiveFilters
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <MagnifyingGlass size={20} />
              <span>Buscar</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;