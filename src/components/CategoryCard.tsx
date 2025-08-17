import React from 'react';
import { Star, MapPin } from 'phosphor-react';

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

interface CategoryCardProps {
  restaurant: Restaurant;
}

function CategoryCard({ restaurant }: CategoryCardProps) {
  const defaultAddress = "Rua Augusta, 1200 - São Paulo, SP";
  const defaultBadges = ["Café especial", "Brunch", "Wi-Fi grátis"];
  
  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="relative">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-48 object-cover rounded-xl"
        />
        {restaurant.isOpen && (
          <span className="absolute top-2 left-2 bg-green-700/50 backdrop-blur text-white text-xs px-2 py-1 rounded">
            Aberto
          </span>
        )}
      </div>
      
      <div>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-2">
            {restaurant.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star size={16} className="text-yellow-500" weight="fill" />
            <span className="text-sm font-medium text-gray-900">
              {restaurant.rating}
            </span>
            <span className="text-sm text-gray-500">
              ({restaurant.reviewCount} avaliações)
            </span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={14} className="mr-1" />
          <span className="text-sm">
            {restaurant.address || defaultAddress}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          Café aconchegante no centro de São Paulo, oferecendo grãos especiais, doces artesanais e ambiente perfeito para trabalhar.
        </p>
        
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {(restaurant.badges || defaultBadges).map((badge, index) => (
            <span 
              key={index}
              className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;