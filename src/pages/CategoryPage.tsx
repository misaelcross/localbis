import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoryHeader from '../components/CategoryHeader';
import CategoryCard from '../components/CategoryCard';

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

// Dados dos restaurantes por categoria
const categoryData: { [key: string]: { title: string; restaurants: Restaurant[] } } = {
  'novos-restaurantes-para-conhecer': {
    title: 'Novos restaurantes para conhecer',
    restaurants: [
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
      }
    ]
  },
  'onde-comer-barato-e-bem': {
    title: 'Onde comer barato e bem',
    restaurants: [
      {
        id: 11,
        name: 'Lanchonete Popular',
        rating: 4.3,
        reviewCount: 145,
        image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        isOpen: true,
        address: 'Rua do Comércio, 100 - São Paulo, SP',
        badges: ['Econômico', 'Porções generosas', 'Tradicional']
      },
      {
        id: 12,
        name: 'Comida Caseira',
        rating: 4.5,
        reviewCount: 189,
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        isOpen: true,
        address: 'Av. São João, 450 - São Paulo, SP',
        badges: ['Caseiro', 'Self-service', 'Tempero da vovó']
      },
      {
        id: 13,
        name: 'Self Service Econômico',
        rating: 4.2,
        reviewCount: 123,
        image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        isOpen: true,
        address: 'Rua Barão de Itapetininga, 200 - São Paulo, SP',
        badges: ['Buffet livre', 'Preço fixo', 'Variedade']
      }
    ]
  },
  'comida-tipica-tradicional': {
    title: 'Comida típica tradicional',
    restaurants: [
      {
        id: 101,
        name: 'Casa da Feijoada',
        rating: 4.7,
        reviewCount: 234,
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        isOpen: true,
        address: 'Rua da Liberdade, 300 - São Paulo, SP',
        badges: ['Feijoada', 'Brasileira', 'Sábados especiais']
      },
      {
        id: 102,
        name: 'Boteco do Zé',
        rating: 4.5,
        reviewCount: 189,
        image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        isOpen: true,
        address: 'Rua do Gasômetro, 150 - São Paulo, SP',
        badges: ['Boteco', 'Petiscos', 'Chopp gelado']
      },
      {
        id: 103,
        name: 'Churrascaria Gaúcha',
        rating: 4.8,
        reviewCount: 312,
        image: 'https://images.pexels.com/photos/1251208/pexels-photo-1251208.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        isOpen: true,
        address: 'Av. Faria Lima, 1000 - São Paulo, SP',
        badges: ['Churrasco', 'Rodízio', 'Carne premium']
      }
    ]
  },
  'sabores-internacionais': {
    title: 'Sabores internacionais',
    restaurants: [
      {
        id: 201,
        name: 'Sushi Zen',
        rating: 4.8,
        reviewCount: 267,
        image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        isOpen: true,
        address: 'Rua da Liberdade, 500 - São Paulo, SP',
        badges: ['Japonês', 'Sushi premium', 'Ambiente zen']
      },
      {
        id: 202,
        name: 'Pizzeria Italiana',
        rating: 4.7,
        reviewCount: 198,
        image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        isOpen: true,
        address: 'Rua Bela Vista, 250 - São Paulo, SP',
        badges: ['Pizza napolitana', 'Forno a lenha', 'Italiana']
      },
      {
        id: 203,
        name: 'Taco Mexicano',
        rating: 4.5,
        reviewCount: 156,
        image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        isOpen: true,
        address: 'Rua Augusta, 800 - São Paulo, SP',
        badges: ['Mexicano', 'Picante', 'Guacamole fresco']
      }
    ]
  },
  'os-mais-procurados': {
    title: 'Os mais procurados',
    restaurants: [
      {
        id: 301,
        name: 'Burger King Premium',
        rating: 4.9,
        reviewCount: 456,
        image: 'https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        isOpen: true,
        address: 'Shopping Center Norte - São Paulo, SP',
        badges: ['Fast food', 'Drive-thru', '24 horas']
      },
      {
        id: 302,
        name: 'Pizza Hut Gourmet',
        rating: 4.8,
        reviewCount: 389,
        image: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        isOpen: true,
        address: 'Av. Paulista, 1500 - São Paulo, SP',
        badges: ['Pizza', 'Delivery', 'Promoções']
      }
    ]
  },
  'aberto-agora-para-matar-a-fome': {
    title: 'Aberto agora para matar a fome',
    restaurants: [
      {
        id: 401,
        name: '24h Burguer',
        rating: 4.5,
        reviewCount: 234,
        image: 'https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        isOpen: true,
        address: 'Rua da Consolação, 1200 - São Paulo, SP',
        badges: ['24 horas', 'Hambúrguer', 'Delivery']
      },
      {
        id: 402,
        name: 'Night Café',
        rating: 4.3,
        reviewCount: 167,
        image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        isOpen: true,
        address: 'Rua Augusta, 900 - São Paulo, SP',
        badges: ['Café noturno', 'Wi-Fi', 'Estudo']
      }
    ]
  },
  'onde-comer-hamburguer-artesanal': {
    title: 'Onde comer hambúrguer artesanal',
    restaurants: [
      {
        id: 501,
        name: 'Burger Artisan',
        rating: 4.9,
        reviewCount: 345,
        image: 'https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        isOpen: true,
        address: 'Rua Oscar Freire, 800 - São Paulo, SP',
        badges: ['Artesanal', 'Carne premium', 'Pão brioche']
      },
      {
        id: 502,
        name: 'Craft Burger Co.',
        rating: 4.8,
        reviewCount: 278,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        isOpen: true,
        address: 'Rua dos Jardins, 400 - São Paulo, SP',
        badges: ['Craft beer', 'Hambúrguer gourmet', 'Ambiente descolado']
      }
    ]
  },
  'novas-lanchonetes-para-experimentar': {
    title: 'Novas lanchonetes para experimentar',
    restaurants: [
      {
        id: 601,
        name: 'Fresh Snack Bar',
        rating: 4.5,
        reviewCount: 89,
        image: 'https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        isOpen: true,
        address: 'Rua da Vila Madalena, 200 - São Paulo, SP',
        badges: ['Novidade', 'Saudável', 'Orgânico']
      },
      {
        id: 602,
        name: 'Urban Bites',
        rating: 4.3,
        reviewCount: 67,
        image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        isOpen: true,
        address: 'Rua Pinheiros, 150 - São Paulo, SP',
        badges: ['Urbano', 'Moderno', 'Instagram friendly']
      }
    ]
  }
};

function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  // Scroll para o topo quando a página carregar ou categoria mudar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categorySlug]);

  const categoryInfo = categorySlug ? categoryData[categorySlug] : null;

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Categoria não encontrada</h2>
          <p className="text-gray-600">A categoria solicitada não existe ou foi removida.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <CategoryHeader categoryTitle={categoryInfo.title} />
      
      {/* Conteúdo principal */}
      <div className="mx-auto px-4 py-6 space-y-4 max-w-2xl">
        {categoryInfo.restaurants.map((restaurant) => (
          <CategoryCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;