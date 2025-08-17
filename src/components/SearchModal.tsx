import React, { useState } from 'react';
import { MagnifyingGlass, X, House, Heart, ShoppingBag, CaretDown, CaretUp } from 'phosphor-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, activeTab, setActiveTab }) => {
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

  const categories = [
    { name: 'Restaurantes', icon: '🍽️' },
    { name: 'Farmácias', icon: '💊' },
    { name: 'Supermercados', icon: '🛒' },
    { name: 'Padarias', icon: '🥖' },
    { name: 'Vestuário', icon: '👕' },
    { name: 'Esportes', icon: '⚽' }
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
              className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
          </div>

          {/* Sugestões de categorias */}
          <div className="mb-1">
            <h3 className="text-sm font-medium text-gray-700 mb-1">Locais sugeridos:</h3>
            <div className="space-y-1">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="flex items-center space-x-3 w-full py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span className="text-gray-700">{category.name}</span>
                </button>
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
              <div className="space-y-3">
                {scheduleOptions.map((option) => (
                  <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="schedule"
                      value={option.value}
                      checked={selectedSchedule === option.value}
                      onChange={(e) => setSelectedSchedule(e.target.value)}
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-gray-800"
                      style={{
                        accentColor: selectedSchedule === option.value ? '#1f2937' : '#e5e7eb',
                        colorScheme: 'light'
                      }}
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
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
              <div className="space-y-3">
                {filterOptions.map((option) => (
                  <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={selectedFilters.includes(option.value)}
                      onChange={() => handleFilterChange(option.value)}
                      className="w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-gray-800"
                      style={{
                        accentColor: selectedFilters.includes(option.value) ? '#1f2937' : '#e5e7eb',
                        colorScheme: 'light'
                      }}
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
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