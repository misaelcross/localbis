import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { ArrowLeft } from 'phosphor-react';

interface Subcategory {
  id: number;
  name: string;
  route: string;
}

const restaurantSubcategories: Subcategory[] = [
  {
    id: 1,
    name: 'Brasileira',
    route: '/category/restaurantes/brasileira'
  },
  {
    id: 2,
    name: 'Japonesa',
    route: '/category/restaurantes/japonesa'
  },
  {
    id: 3,
    name: 'Italiana',
    route: '/category/restaurantes/italiana'
  },
  {
    id: 4,
    name: 'Árabe',
    route: '/category/restaurantes/arabe'
  },
  {
    id: 5,
    name: 'Mexicana',
    route: '/category/restaurantes/mexicana'
  },
  {
    id: 6,
    name: 'Americana (hambúrgueres, fast food)',
    route: '/category/restaurantes/americana'
  },
  {
    id: 7,
    name: 'Chinesa',
    route: '/category/restaurantes/chinesa'
  },
  {
    id: 8,
    name: 'Vegetariana / Vegana',
    route: '/category/restaurantes/vegetariana'
  }
];

function RestaurantSubcategoriesPage() {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubcategoryClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com botão voltar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="px-4 py-3 flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="text-gray-900 mr-4"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Restaurantes</h1>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="pt-16 pb-20">
        <div className="bg-white">
          {/* Lista de subcategorias */}
          <div>
            {restaurantSubcategories.map((subcategory, index) => (
              <div key={subcategory.id}>
                <div
                  onClick={() => handleSubcategoryClick(subcategory.route)}
                  className="px-4 py-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-normal text-gray-900">
                        {subcategory.name}
                      </h3>
                    </div>
                  </div>
                </div>
                {index < restaurantSubcategories.length - 1 && (
                  <div className="border-b border-gray-200 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RestaurantSubcategoriesPage;