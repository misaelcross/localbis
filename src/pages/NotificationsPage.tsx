import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Check, 
  X, 
  Trash, 
  Star, 
  Heart, 
  Storefront, 
  Clock,
  CheckCircle,
  Info,
  Warning,
  Gift,
  DotsThreeVertical,
  Gear
} from 'phosphor-react';
import Navbar from '../components/Navbar';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'promotion';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon?: React.ReactNode;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Negócio Aprovado!',
    message: 'Seu negócio "Restaurante do João" foi aprovado e já está visível na plataforma.',
    time: '2 min atrás',
    read: false,
    icon: <CheckCircle size={24} className="text-green-500" />
  },
  {
    id: '2',
    type: 'info',
    title: 'Nova avaliação recebida',
    message: 'Maria Silva deixou uma avaliação de 5 estrelas no seu negócio.',
    time: '1 hora atrás',
    read: false,
    icon: <Star size={24} className="text-yellow-500" />
  },
  {
    id: '3',
    type: 'promotion',
    title: 'Oferta especial disponível',
    message: 'Promova seu negócio com 50% de desconto no plano premium por 3 meses.',
    time: '3 horas atrás',
    read: true,
    icon: <Gift size={24} className="text-purple-500" />
  },
  {
    id: '4',
    type: 'info',
    title: 'Novo favorito',
    message: 'Seu negócio foi adicionado aos favoritos por 5 usuários hoje.',
    time: '1 dia atrás',
    read: true,
    icon: <Heart size={24} className="text-red-500" />
  },
  {
    id: '5',
    type: 'warning',
    title: 'Informações incompletas',
    message: 'Complete as informações do seu negócio para melhorar sua visibilidade.',
    time: '2 dias atrás',
    read: true,
    icon: <Warning size={24} className="text-orange-500" />
  }
];

function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [showDropdown, setShowDropdown] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showDropdown && !target.closest('.dropdown-container')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getNotificationBg = (type: string, read: boolean) => {
    if (read) return 'bg-gray-50';
    
    switch (type) {
      case 'success': return 'bg-green-50 border-l-4 border-green-500';
      case 'warning': return 'bg-orange-50 border-l-4 border-orange-500';
      case 'promotion': return 'bg-purple-50 border-l-4 border-purple-500';
      default: return 'bg-blue-50 border-l-4 border-blue-500';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        variant="page"
        title="Notificações"
        showBackButton={true}
        showSearch={false}
        showUserIcon={false}
        showLogo={false}
        onBackClick={() => navigate('/')}
        rightButton={
          <div className="relative dropdown-container">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-gray-600 hover:text-gray-900 transition-colors p-1"
            >
              <DotsThreeVertical size={24} />
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={() => {
                    markAllAsRead();
                    setShowDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Check size={16} />
                  <span>Marcar todas como lidas</span>
                </button>
                <button
                  onClick={() => {
                    navigate('/profile?tab=settings');
                    setShowDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Gear size={16} />
                  <span>Configuração de notificações</span>
                </button>
              </div>
            )}
          </div>
        }
      />

      <div className="pt-16 pb-20">
        {/* Header com estatísticas */}
        <div className="px-4 py-6 bg-gray-50 border-b">
          {/* Filtros */}
          <div className="flex items-center">
            <div className="flex w-full">
              <button
                onClick={() => setFilter('all')}
                className={`text-sm font-medium pb-1 flex-1 text-center ${
                  filter === 'all'
                    ? 'text-gray-900 border-b-2 border-gray-900 pb-3'
                    : 'text-gray-500 border-b-2 border-white pb-3'
                }`}
              >
                Todas ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`text-sm font-medium pb-1 flex-1 text-center ${
                  filter === 'unread'
                    ? 'text-gray-900 border-b-2 border-gray-900 pb-3'
                    : 'text-gray-500 border-b-2 border-white pb-3'
                }`}
              >
                Não lidas ({unreadCount})
              </button>
            </div>
          </div>
        </div>

        {/* Lista de notificações */}
        <div className="px-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {filter === 'unread' ? 'Nenhuma notificação não lida' : 'Nenhuma notificação'}
              </h3>
              <p className="text-gray-600">
                {filter === 'unread' 
                  ? 'Todas as suas notificações foram lidas.'
                  : 'Você não tem notificações no momento.'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-3 py-4">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg transition-all ${getNotificationBg(notification.type, notification.read)}`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Ícone */}
                    <div className="flex-shrink-0 mt-1">
                      {notification.icon}
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`text-sm font-semibold ${
                            notification.read ? 'text-gray-700' : 'text-gray-900'
                          }`}>
                            {notification.title}
                          </h3>
                          <p className={`text-sm mt-1 ${
                            notification.read ? 'text-gray-500' : 'text-gray-700'
                          }`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2 flex items-center">
                            <Clock size={12} className="mr-1" />
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;