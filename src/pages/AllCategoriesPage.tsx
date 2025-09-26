import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { 
  ArrowLeft,
  Hamburger,
  ShoppingBag,
  Pill,
  Scissors,
  Car,
  Storefront,
  TShirt,
  CaretRight
} from 'phosphor-react';

interface Category {
  id: number;
  name: string;
  icon: React.ReactNode;
  route: string;
  description?: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Restaurantes',
    icon: <Hamburger size={24} className="text-orange-500" />,
    route: '/restaurant-subcategories',
  },
  {
    id: 2,
    name: 'Lanchonetes',
    icon: <Hamburger size={24} className="text-yellow-500" />,
    route: '/category/lanchonetes',
  },
  {
    id: 3,
    name: 'Farmácias',
    icon: <Pill size={24} className="text-green-500" />,
    route: '/category/farmacias',
  },
  {
    id: 4,
    name: 'Salão de Beleza',
    icon: <Scissors size={24} className="text-pink-500" />,
    route: '/category/salao-beleza',
  },
  {
    id: 5,
    name: 'Barbeiro',
    icon: <Scissors size={24} className="text-blue-500" />,
    route: '/category/barbeiro',
  },
  {
    id: 6,
    name: 'Supermercado',
    icon: <ShoppingBag size={24} className="text-red-500" />,
    route: '/category/supermercado',
  },
  {
    id: 7,
    name: 'Loja de Roupa',
    icon: <TShirt size={24} className="text-purple-500" />,
    route: '/category/loja-roupa',
  },
  {
    id: 8,
    name: 'Postos de Combustível',
    icon: <Car size={24} className="text-gray-600" />,
    route: '/category/postos',
  },
  {
    id: 9,
    name: 'Lojas em Geral',
    icon: <Storefront size={24} className="text-indigo-500" />,
    route: '/category/lojas-geral',
  }
];

function AllCategoriesPage() {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar 
        variant="page"
        title="Todas as Categorias"
        showBackButton={true}
        showSearch={false}
        showUserIcon={true}
      />

      {/* Conteúdo principal */}
      <div className="pt-16 pb-20">
        <div className="px-4 py-6">          
          {/* Lista de categorias */}
          <div className="space-y-3">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.route)}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-200 active:scale-95 transform"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-900">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <ArrowLeft size={20} className="text-gray-400 transform rotate-180" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AllCategoriesPage;