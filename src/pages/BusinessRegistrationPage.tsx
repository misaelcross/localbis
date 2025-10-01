import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Storefront,
  MapPin,
  Clock,
  Camera
} from 'phosphor-react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import BottomSheetModal from '../components/BottomSheetModal';

interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

interface BusinessData {
  name: string;
  description: string;
  category: string;
  subcategory: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  images: string[];
  hours: BusinessHours[];
}

const initialBusinessData: BusinessData = {
  name: '',
  description: '',
  category: '',
  subcategory: '',
  email: '',
  phone: '',
  website: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  images: [],
  hours: [
    { day: 'Segunda-feira', open: '09:00', close: '18:00', closed: false },
    { day: 'Terça-feira', open: '09:00', close: '18:00', closed: true },
    { day: 'Quarta-feira', open: '09:00', close: '18:00', closed: true },
    { day: 'Quinta-feira', open: '09:00', close: '18:00', closed: true },
    { day: 'Sexta-feira', open: '09:00', close: '18:00', closed: true },
    { day: 'Sábado', open: '09:00', close: '14:00', closed: true },
    { day: 'Domingo', open: '09:00', close: '14:00', closed: true }
  ]
};

const categories = [
  'Restaurantes',
  'Serviços',
  'Comércio',
  'Saúde',
  'Educação',
  'Entretenimento',
  'Beleza',
  'Tecnologia'
];

// Tema light mode para o MUI
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const brazilianStates = [
  'AC - Acre',
  'AL - Alagoas',
  'AP - Amapá',
  'AM - Amazonas',
  'BA - Bahia',
  'CE - Ceará',
  'DF - Distrito Federal',
  'ES - Espírito Santo',
  'GO - Goiás',
  'MA - Maranhão',
  'MT - Mato Grosso',
  'MS - Mato Grosso do Sul',
  'MG - Minas Gerais',
  'PA - Pará',
  'PB - Paraíba',
  'PR - Paraná',
  'PE - Pernambuco',
  'PI - Piauí',
  'RJ - Rio de Janeiro',
  'RN - Rio Grande do Norte',
  'RS - Rio Grande do Sul',
  'RO - Rondônia',
  'RR - Roraima',
  'SC - Santa Catarina',
  'SP - São Paulo',
  'SE - Sergipe',
  'TO - Tocantins'
];

function BusinessRegistrationPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<'basic' | 'details' | 'hours'>('basic');
  const [businessData, setBusinessData] = useState<BusinessData>(initialBusinessData);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

  const handleInputChange = (field: keyof BusinessData, value: string) => {
    setBusinessData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleZipCodeChange = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numericValue = value.replace(/\D/g, '');
    
    // Aplica a máscara 00.000-000
    let formattedValue = numericValue;
    if (numericValue.length > 2) {
      formattedValue = numericValue.slice(0, 2) + '.' + numericValue.slice(2);
    }
    if (numericValue.length > 5) {
      formattedValue = numericValue.slice(0, 2) + '.' + numericValue.slice(2, 5) + '-' + numericValue.slice(5, 8);
    }
    
    setBusinessData(prev => ({
      ...prev,
      zipCode: formattedValue
    }));
  };

  const handlePhoneChange = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numericValue = value.replace(/\D/g, '');
    
    // Aplica a máscara (00) 0 0000-0000
    let formattedValue = numericValue;
    
    if (numericValue.length > 0) {
      formattedValue = '(' + numericValue.slice(0, 2);
    }
    if (numericValue.length > 2) {
      formattedValue = '(' + numericValue.slice(0, 2) + ') ' + numericValue.slice(2);
    }
    if (numericValue.length > 3) {
      formattedValue = '(' + numericValue.slice(0, 2) + ') ' + numericValue.slice(2, 3) + ' ' + numericValue.slice(3);
    }
    if (numericValue.length > 7) {
      formattedValue = '(' + numericValue.slice(0, 2) + ') ' + numericValue.slice(2, 3) + ' ' + numericValue.slice(3, 7) + '-' + numericValue.slice(7, 11);
    }
    
    setBusinessData(prev => ({
      ...prev,
      phone: formattedValue
    }));
  };

  const handleHourChange = (index: number, field: keyof BusinessHours, value: string | boolean | Dayjs | null) => {
    if (field === 'open' || field === 'close') {
      // Se o valor é um dayjs object (do TimePicker), converte para string no formato HH:MM
      let timeString = '';
      if (dayjs.isDayjs(value)) {
        timeString = value.format('HH:mm');
      } else if (typeof value === 'string') {
        timeString = value;
      }
      
      // Apenas atualiza o dia específico - permite personalização individual
      setBusinessData(prev => ({
        ...prev,
        hours: prev.hours.map((hour, i) => 
          i === index ? { ...hour, [field]: timeString } : hour
        )
      }));
    } else if (field === 'closed') {
      // Quando um dia é marcado como "Aberto" (closed = false)
      if (value === false) {
        setBusinessData(prev => {
          const updatedHours: BusinessHours[] = [...prev.hours];
          
          // Se não é Segunda-feira (index 0), herda os horários da Segunda-feira
          if (index !== 0) {
            const mondayHours = prev.hours[0]; // Segunda-feira é sempre o índice 0
            updatedHours[index] = {
              day: updatedHours[index].day,
              open: mondayHours.open,
              close: mondayHours.close,
              closed: false
            };
          } else {
            // Se é Segunda-feira, apenas marca como aberto
            updatedHours[index] = { ...updatedHours[index], closed: false };
          }
          
          return {
            ...prev,
            hours: updatedHours
          };
        });
      } else if (typeof value === 'boolean') {
        // Quando um dia é marcado como "Fechado" (closed = true)
        setBusinessData(prev => ({
          ...prev,
          hours: prev.hours.map((hour, i) => 
            i === index ? { ...hour, closed: value } : hour
          )
        }));
      }
    }
  };



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Cadastro de negócio:', businessData);
    // Aqui seria implementada a lógica de cadastro
    // Simula sucesso no cadastro
    setShowSuccessModal(true);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/dashboard');
  };

  const isBasicStepValid = () => {
    return businessData.name && businessData.description && businessData.category && businessData.email && businessData.phone;
  };

  const isDetailsStepValid = () => {
    return businessData.address && businessData.city && businessData.state && businessData.zipCode;
  };

  const renderBasicInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Storefront size={32} className="text-gray-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Informações Básicas</h2>
        <p className="text-gray-600 mt-2">Conte-nos sobre seu negócio</p>
      </div>

      {/* Nome do negócio */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
          Nome do negócio
        </label>
        <input
          type="text"
          id="name"
          value={businessData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Nome do seu negócio"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900 placeholder-gray-400"
        />
      </div>

      {/* Descrição */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
          Descrição
        </label>
        <textarea
          id="description"
          value={businessData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Descreva seu negócio em poucas palavras"
          required
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900 placeholder-gray-400 resize-none"
        />
      </div>

      {/* Categoria */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-900 mb-2">
          Categoria
        </label>
        <select
          id="category"
          value={businessData.category}
          onChange={(e) => handleInputChange('category', e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900"
        >
          <option value="">Selecione uma categoria</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* E-mail */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          value={businessData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="contato@seunegocio.com"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900 placeholder-gray-400"
        />
      </div>

      {/* Telefone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
          Telefone
        </label>
        <input
          type="tel"
          id="phone"
          value={businessData.phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          placeholder="(11) 9 9999-9999"
          maxLength={16}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900 placeholder-gray-400"
        />
      </div>

      {/* Website */}
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-900 mb-2">
          Website
        </label>
        <input
          type="url"
          id="website"
          value={businessData.website}
          onChange={(e) => handleInputChange('website', e.target.value)}
          placeholder="https://www.seunegocio.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900 placeholder-gray-400"
        />
      </div>
    </div>
  );

  const renderDetailsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin size={32} className="text-gray-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Localização</h2>
        <p className="text-gray-600 mt-2">Onde seus clientes podem encontrar você</p>
      </div>

      {/* Endereço */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-900 mb-2">
          Endereço
        </label>
        <input
          type="text"
          id="address"
          value={businessData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          placeholder="Rua, número, bairro"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900 placeholder-gray-400"
        />
      </div>

      {/* Cidade */}
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-900 mb-2">
          Cidade
        </label>
        <input
          type="text"
          id="city"
          value={businessData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          placeholder="Sua cidade"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900 placeholder-gray-400"
        />
      </div>

      {/* Estado e CEP */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-900 mb-2">
            Estado
          </label>
          <select
            id="state"
            value={businessData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900"
          >
            <option value="">Selecione um estado</option>
            {brazilianStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-900 mb-2">
            CEP
          </label>
          <input
            type="text"
            id="zipCode"
            value={businessData.zipCode}
            onChange={(e) => handleZipCodeChange(e.target.value)}
            placeholder="00.000-000"
            maxLength={10}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Upload de imagens */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Fotos do negócio
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <Camera size={32} className="text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">Adicione fotos do seu negócio</p>
          <button
            type="button"
            className="text-sm text-gray-900 underline hover:text-gray-700"
          >
            Escolher arquivos
          </button>
        </div>
      </div>
    </div>
  );

  const renderHoursStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock size={32} className="text-gray-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Horário de Funcionamento</h2>
        <p className="text-gray-600 mt-2">Quando seu negócio está aberto</p>
      </div>

      <div className="space-y-4">
        {businessData.hours.map((hour, index) => (
          <div key={hour.day} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-900">{hour.day}</span>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={!hour.closed}
                  onChange={(e) => handleHourChange(index, 'closed', !e.target.checked)}
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                  style={{
                    accentColor: !hour.closed ? '#1f2937' : '#e5e7eb',
                    colorScheme: 'light'
                  }}
                />
                <span className="ml-2 text-sm text-gray-600">Aberto</span>
              </label>
            </div>
            
            {!hour.closed && (
              <ThemeProvider theme={lightTheme}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Abertura
                      </label>
                      <TimePicker
                        value={hour.open ? dayjs(`2000-01-01T${hour.open}:00`) : null}
                        onChange={(newValue) => handleHourChange(index, 'open', newValue)}
                        ampm={false}
                        slotProps={{
                          textField: {
                            size: "small",
                            fullWidth: true,
                            sx: {
                              '& .MuiOutlinedInput-root': {
                                fontSize: '0.875rem',
                                '&:hover fieldset': {
                                  borderColor: '#1f2937',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#1f2937',
                                  borderWidth: '2px',
                                },
                              },
                            }
                          }
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Fechamento
                      </label>
                      <TimePicker
                        value={hour.close ? dayjs(`2000-01-01T${hour.close}:00`) : null}
                        onChange={(newValue) => handleHourChange(index, 'close', newValue)}
                        ampm={false}
                        slotProps={{
                          textField: {
                            size: "small",
                            fullWidth: true,
                            sx: {
                              '& .MuiOutlinedInput-root': {
                                fontSize: '0.875rem',
                                '&:hover fieldset': {
                                  borderColor: '#1f2937',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#1f2937',
                                  borderWidth: '2px',
                                },
                              },
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </LocalizationProvider>
              </ThemeProvider>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header fixo */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <button 
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900 flex-1">
                Cadastrar Negócio
              </h1>
            </div>
          </div>
        </div>

        {/* Progress indicator - Dashboard style tabs */}
        <div className="px-6 pb-0">
          <div className="flex justify-around">
            <button
              onClick={() => setActiveStep('basic')}
              className={`flex flex-col items-center justify-center py-4 text-sm font-medium w-[100px] ${
                activeStep === 'basic' 
                  ? 'text-gray-900 border-b-[3px] border-gray-900' 
                  : 'text-gray-500 border-b-[3px] border-white'
              }`}
            >
              <span>Básico</span>
            </button>
            <button
              onClick={() => setActiveStep('details')}
              disabled={!isBasicStepValid()}
              className={`flex flex-col items-center justify-center py-4 text-sm font-medium w-[100px] ${
                activeStep === 'details' 
                  ? 'text-gray-900 border-b-[3px] border-gray-900' 
                  : isBasicStepValid() ? 'text-gray-500 border-b-[3px] border-white' : 'text-gray-400 border-b-[3px] border-white cursor-not-allowed'
              }`}
            >
              <span>Detalhes</span>
            </button>
            <button
              onClick={() => setActiveStep('hours')}
              disabled={!isBasicStepValid() || !isDetailsStepValid()}
              className={`flex flex-col items-center justify-center py-4 text-sm font-medium w-[100px] ${
                activeStep === 'hours' 
                  ? 'text-gray-900 border-b-[3px] border-gray-900' 
                  : (isBasicStepValid() && isDetailsStepValid()) ? 'text-gray-500 border-b-[3px] border-white' : 'text-gray-400 border-b-[3px] border-white cursor-not-allowed'
              }`}
            >
              <span>Horários</span>
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="pt-32 pb-32 px-6">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit}>
            {activeStep === 'basic' && renderBasicInfoStep()}
            {activeStep === 'details' && renderDetailsStep()}
            {activeStep === 'hours' && renderHoursStep()}

            {/* Aceitar termos (apenas no último step) */}
            {activeStep === 'hours' && (
              <div className="mt-8">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    required
                    className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 mt-1"
                    style={{
                      accentColor: acceptTerms ? '#1f2937' : '#e5e7eb',
                      colorScheme: 'light'
                    }}
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-900">
                    Aceito os{' '}
                    <button type="button" className="text-gray-900 underline hover:text-gray-700">
                      termos de uso
                    </button>{' '}
                    e{' '}
                    <button type="button" className="text-gray-900 underline hover:text-gray-700">
                      política de privacidade
                    </button>
                  </label>
                </div>
              </div>
            )}

            {/* Botões de navegação */}
            <div className="mt-8 space-y-4">
              {activeStep === 'basic' && (
                <button
                  type="button"
                  onClick={() => setActiveStep('details')}
                  disabled={!isBasicStepValid()}
                  className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              )}

              {activeStep === 'details' && (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setActiveStep('hours')}
                    disabled={!isDetailsStepValid()}
                    className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Continuar
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep('basic')}
                    className="w-full border border-gray-300 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Voltar
                  </button>
                </div>
              )}

              {activeStep === 'hours' && (
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={!acceptTerms}
                    className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Cadastrar Negócio
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep('details')}
                    className="w-full border border-gray-300 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Voltar
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Modal de Sucesso */}
      <BottomSheetModal
        isOpen={showSuccessModal}
        onClose={handleModalClose}
        title="Negócio Cadastrado com Sucesso!"
        message="Seu negócio foi cadastrado e está sendo analisado. Você receberá uma notificação quando for aprovado."
        buttonText="Ir para Dashboard"
        onButtonClick={handleModalClose}
      />
    </div>
  );
}

export default BusinessRegistrationPage;