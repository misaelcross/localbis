import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoryHeader from '../components/CategoryHeader';
import CategoryCard from '../components/CategoryCard';
import Footer from '../components/Footer';

interface Restaurant {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  image: string;
  isOpen: boolean;
  address?: string;
  category?: string;
  deliveryTime?: string;
  badges?: string[];
}

// Dados mock de restaurantes para resultados de busca
const mockSearchResults: Restaurant[] = [
  {
    id: 1,
    name: 'Café da Esquina',
    rating: 4.8,
    reviewCount: 122,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true,
    address: 'Rua Augusta, 1200 - São Paulo, SP',
    badges: ['Café especial', 'Brunch', 'Wi-Fi grátis']
  },
  {
    id: 2,
    name: 'Restaurante Bella Vista',
    rating: 4.6,
    reviewCount: 89,
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true,
    address: 'Av. Paulista, 2000 - São Paulo, SP',
    badges: ['Italiana', 'Romântico', 'Vista panorâmica']
  },
  {
    id: 3,
    name: 'Barbearia Premium',
    rating: 4.9,
    reviewCount: 156,
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true,
    address: 'Rua Oscar Freire, 500 - São Paulo, SP',
    badges: ['Premium', 'Moderno', 'Agendamento online']
  },
  {
    id: 4,
    name: 'Bistrô Moderno',
    rating: 4.7,
    reviewCount: 203,
    image: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true,
    address: 'Rua da Consolação, 800 - São Paulo, SP',
    badges: ['Contemporâneo', 'Happy hour', 'Terraço']
  },
  {
    id: 5,
    name: 'Cantina Italiana',
    rating: 4.5,
    reviewCount: 178,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true,
    address: 'Rua Bela Cintra, 300 - São Paulo, SP',
    badges: ['Tradicional', 'Massa fresca', 'Família']
  },
  {
    id: 6,
    name: 'Sushi House',
    rating: 4.8,
    reviewCount: 245,
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true,
    address: 'Rua Liberdade, 150 - São Paulo, SP',
    badges: ['Japonês', 'Peixe fresco', 'Rodízio']
  },
  {
    id: 7,
    name: 'Lanchonete Popular',
    rating: 4.3,
    reviewCount: 145,
    image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true,
    address: 'Rua do Comércio, 100 - São Paulo, SP',
    badges: ['Econômico', 'Porções generosas', 'Tradicional']
  },
  {
    id: 8,
    name: 'Comida Caseira',
    rating: 4.5,
    reviewCount: 189,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true,
    address: 'Av. São João, 450 - São Paulo, SP',
    badges: ['Caseiro', 'Self-service', 'Tempero da vovó']
  }
];

function SearchPage() {
  const { searchTerm } = useParams<{ searchTerm: string }>();

  // Scroll para o topo quando a página carregar ou termo de busca mudar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchTerm]);

  // Decodifica o termo de busca da URL
  const decodedSearchTerm = searchTerm ? decodeURIComponent(searchTerm) : '';

  // Em uma aplicação real, aqui seria feita a busca baseada no termo
  // Por enquanto, retornamos todos os resultados mock
  const searchResults = mockSearchResults;

  return (
    <div className="min-h-screen bg-neutral-50">
      <CategoryHeader categoryTitle={decodedSearchTerm} />
      
      {/* Conteúdo principal */}
      <div className="mx-auto px-4 py-6 space-y-4 max-w-2xl">
        {searchResults.length > 0 ? (
          searchResults.map((restaurant) => (
            <CategoryCard key={restaurant.id} restaurant={restaurant} />
          ))
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum resultado encontrado
            </h3>
            <p className="text-gray-600">
              Não encontramos resultados para "{decodedSearchTerm}". Tente buscar por outros termos.
            </p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default SearchPage;