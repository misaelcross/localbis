import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  User,
  Bell,
  Heart,
  MapPin,
  Phone,
  Envelope,
  Camera,
  CaretRight,
  Eye,
  Moon,
  Trash,
  SignOut,
  CalendarBlank
} from 'phosphor-react';
import Navbar from '../components/Navbar';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  location: string;
  memberSince: string;
  totalReviews: number;
  averageRating: number;
}

const mockUserProfile: UserProfile = {
  name: 'João Silva',
  email: 'joao.silva@email.com',
  phone: '(11) 99999-9999',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  location: 'São Paulo, SP',
  memberSince: '2023-01-15',
  totalReviews: 24,
  averageRating: 4.3
};



interface ProfileSectionProps {
  userProfile: UserProfile;
  formatMemberSince: (dateString: string) => string;
  handleEditField: (field: string, currentValue: string) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ userProfile, formatMemberSince, handleEditField }) => (
  <div className="space-y-6">
    {/* Avatar e informações básicas */}
    <div className="text-center">
      <div className="relative inline-block">
        <img 
          src={userProfile.avatar} 
          alt={userProfile.name}
          className="w-24 h-24 rounded-full object-cover mx-auto"
        />
        <button className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
          <Camera size={16} />
        </button>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mt-4">{userProfile.name}</h2>
      <p className="text-gray-600">{userProfile.email}</p>
      <div className="flex items-center justify-center space-x-1 mt-2">
        <MapPin size={16} className="text-gray-500" />
        <span className="text-sm text-gray-600">{userProfile.location}</span>
      </div>
    </div>

    {/* Estatísticas */}
    <div className="flex gap-4 p-4">
      <div className="text-center flex-1 border border-neutral-200 rounded-lg p-4">
        <div className="flex items-center justify-center mb-1">
          <Heart size={20} className="text-red-500" />
        </div>
        <p className="text-lg font-semibold text-gray-900">{userProfile.totalReviews}</p>
        <p className="text-xs text-gray-600">Avaliações</p>
      </div>
      <div className="text-center flex-1 border border-neutral-200 rounded-lg p-4">
        <div className="flex items-center justify-center mb-1">
          <User size={20} className="text-blue-500" />
        </div>
        <p className="text-lg font-semibold text-gray-900">{formatMemberSince(userProfile.memberSince)}</p>
        <p className="text-xs text-gray-600">Membro desde</p>
      </div>
    </div>

    {/* Informações pessoais */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Informações Pessoais</h3>
      
      <div className="space-y-3">
        <div 
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => handleEditField('name', userProfile.name)}
        >
          <div className="flex items-center space-x-3">
            <User size={20} className="text-gray-600" />
            <div>
              <div className="font-medium text-gray-900">Nome</div>
              <div className="text-sm text-gray-600">{userProfile.name}</div>
            </div>
          </div>
          <CaretRight size={16} className="text-gray-400" />
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <CalendarBlank size={20} className="text-gray-600" />
            <div>
              <div className="font-medium text-gray-900">Membro desde</div>
              <div className="text-sm text-gray-600">{formatMemberSince(userProfile.memberSince)}</div>
            </div>
          </div>
        </div>

        <div 
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => handleEditField('email', userProfile.email)}
        >
          <div className="flex items-center space-x-3">
            <Envelope size={20} className="text-gray-600" />
            <div>
              <div className="font-medium text-gray-900">Email</div>
              <div className="text-sm text-gray-600">{userProfile.email}</div>
            </div>
          </div>
          <CaretRight size={16} className="text-gray-400" />
        </div>

        <div 
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => handleEditField('phone', userProfile.phone)}
        >
          <div className="flex items-center space-x-3">
            <Phone size={20} className="text-gray-600" />
            <div>
              <div className="font-medium text-gray-900">Telefone</div>
              <div className="text-sm text-gray-600">{userProfile.phone}</div>
            </div>
          </div>
          <CaretRight size={16} className="text-gray-400" />
        </div>
      </div>
    </div>
  </div>
);

interface SettingsSectionProps {
  notificationsEnabled: boolean;
  setNotificationsEnabled: (value: boolean) => void;
  privacySettings: {
    profileVisible: boolean;
    showEmail: boolean;
    showPhone: boolean;
  };
  setPrivacySettings: (settings: any) => void;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  notificationsEnabled,
  setNotificationsEnabled,
  privacySettings,
  setPrivacySettings,
  isDarkMode,
  setIsDarkMode
}) => (
  <div className="space-y-6">
    {/* Notificações */}
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notificações</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Bell size={20} className="text-gray-600" />
            <div>
              <div className="font-medium text-gray-900">Notificações Push</div>
              <div className="text-sm text-gray-600">Receber notificações no dispositivo</div>
            </div>
          </div>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notificationsEnabled ? 'bg-neutral-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>

    {/* Privacidade */}
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacidade</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Eye size={20} className="text-gray-600" />
            <div>
              <div className="font-medium text-gray-900">Perfil Público</div>
              <div className="text-sm text-gray-600">Permitir que outros vejam seu perfil</div>
            </div>
          </div>
          <button
            onClick={() => setPrivacySettings({
              ...privacySettings,
              profileVisible: !privacySettings.profileVisible
            })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              privacySettings.profileVisible ? 'bg-neutral-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                privacySettings.profileVisible ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Envelope size={20} className="text-gray-600" />
            <div>
              <div className="font-medium text-gray-900">Mostrar Email</div>
              <div className="text-sm text-gray-600">Exibir email no perfil público</div>
            </div>
          </div>
          <button
            onClick={() => setPrivacySettings({
              ...privacySettings,
              showEmail: !privacySettings.showEmail
            })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              privacySettings.showEmail ? 'bg-neutral-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                privacySettings.showEmail ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>

    {/* Conta */}
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Conta</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Moon size={20} className="text-gray-600" />
            <div>
              <div className="font-medium text-gray-900">Modo Escuro</div>
              <div className="text-sm text-gray-600">Ativar tema escuro</div>
            </div>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isDarkMode ? 'bg-neutral-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isDarkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <button className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="flex items-center space-x-3">
            <Trash size={20} className="text-red-600" />
            <div className="text-left">
              <div className="font-medium text-red-600">Excluir Conta</div>
              <div className="text-sm text-gray-600">Remover permanentemente sua conta</div>
            </div>
          </div>
          <CaretRight size={16} className="text-gray-400" />
        </button>

        <button className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="flex items-center space-x-3">
            <SignOut size={20} className="text-gray-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Sair</div>
              <div className="text-sm text-gray-600">Fazer logout da conta</div>
            </div>
          </div>
          <CaretRight size={16} className="text-gray-400" />
        </button>
      </div>
    </div>
  </div>
);

function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');
  const [editingField, setEditingField] = useState<string>('');
  const [editValue, setEditValue] = useState<string>('');
  const [userProfile, setUserProfile] = useState(mockUserProfile);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check URL params for tab selection
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['profile', 'settings'].includes(tabParam)) {
      setActiveTab(tabParam as 'profile' | 'settings');
    }
  }, [location.search]);

  const formatMemberSince = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${year}`;
  };

  const handleEditField = (field: string, currentValue: string) => {
    setEditingField(field);
    setEditValue(currentValue);
    // Modal functionality would be implemented here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar 
        variant="page"
        title="Perfil"
        showBackButton={true}
        showSearch={false}
        showUserIcon={false}
        showLogo={false}
        onBackClick={() => navigate('/dashboard')}
      />

      {/* Custom Profile Header with Tabs */}
      <div className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 z-40">
        {/* Tabs de navegação */}
        <div className="px-6">
          <div className="flex">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 pb-4 border-b-2 transition-colors ${
                activeTab === 'profile'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center">
                <span className="font-medium">Perfil</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 pb-4 border-b-2 transition-colors ${
                activeTab === 'settings'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center">
                <span className="font-medium">Configurações</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="pt-32 pb-32 px-6">
          {activeTab === 'profile' ? (
            <ProfileSection 
              userProfile={userProfile}
              formatMemberSince={formatMemberSince}
              handleEditField={handleEditField}
            />
          ) : (
            <SettingsSection
              notificationsEnabled={notificationsEnabled}
              setNotificationsEnabled={setNotificationsEnabled}
              privacySettings={privacySettings}
              setPrivacySettings={setPrivacySettings}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          )}
        </div>
    </div>
  );
};

export default ProfilePage;