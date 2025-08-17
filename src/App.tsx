import React, { useState, useEffect } from 'react';
import { Star, CaretRight } from 'phosphor-react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import SearchModal from './components/SearchModal';
import CategoryPage from './pages/CategoryPage';
import LoginPage from './pages/LoginPage';
import FavoritesPage from './pages/FavoritesPage';
import BusinessPage from './pages/BusinessPage';
import './App.css';

interface Restaurant {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  image: string;
  isOpen: boolean;
}

const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Café da Esquina',
    rating: 4.8,
    reviewCount: 122,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 2,
    name: 'Restaurante Bella Vista',
    rating: 4.6,
    reviewCount: 89,
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 3,
    name: 'Barbearia Premium',
    rating: 4.9,
    reviewCount: 156,
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 4,
    name: 'Bistrô Moderno',
    rating: 4.7,
    reviewCount: 203,
    image: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 5,
    name: 'Cantina Italiana',
    rating: 4.5,
    reviewCount: 178,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 6,
    name: 'Sushi House',
    rating: 4.8,
    reviewCount: 245,
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 7,
    name: 'Steakhouse Premium',
    rating: 4.9,
    reviewCount: 289,
    image: 'https://images.pexels.com/photos/1251208/pexels-photo-1251208.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 8,
    name: 'Café Gourmet',
    rating: 4.6,
    reviewCount: 167,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 9,
    name: 'Pizzaria Artesanal',
    rating: 4.7,
    reviewCount: 198,
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 10,
    name: 'Hamburgeria Gourmet',
    rating: 4.8,
    reviewCount: 234,
    image: 'https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  }
];

const baratoEBemRestaurants: Restaurant[] = [
  {
    id: 11,
    name: 'Lanchonete Popular',
    rating: 4.3,
    reviewCount: 145,
    image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 12,
    name: 'Comida Caseira',
    rating: 4.5,
    reviewCount: 189,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 13,
    name: 'Self Service Econômico',
    rating: 4.2,
    reviewCount: 123,
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 14,
    name: 'Padaria Central',
    rating: 4.4,
    reviewCount: 167,
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 15,
    name: 'Boteco do Bairro',
    rating: 4.6,
    reviewCount: 198,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 16,
    name: 'Restaurante Família',
    rating: 4.3,
    reviewCount: 134,
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 17,
    name: 'Cantina da Vovó',
    rating: 4.7,
    reviewCount: 212,
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 18,
    name: 'Prato Feito Express',
    rating: 4.1,
    reviewCount: 98,
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 19,
    name: 'Marmitaria Saborosa',
    rating: 4.4,
    reviewCount: 156,
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  },
  {
    id: 20,
    name: 'Buffet Econômico',
    rating: 4.5,
    reviewCount: 178,
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isOpen: true
  }
];

const comidaTipicaRestaurants: Restaurant[] = [
  { id: 101, name: 'Casa da Feijoada', rating: 4.7, reviewCount: 234, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 102, name: 'Boteco do Zé', rating: 4.5, reviewCount: 189, image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 103, name: 'Churrascaria Gaúcha', rating: 4.8, reviewCount: 312, image: 'https://images.pexels.com/photos/1251208/pexels-photo-1251208.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 104, name: 'Pastelaria da Vovó', rating: 4.6, reviewCount: 156, image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 105, name: 'Açaí do Norte', rating: 4.4, reviewCount: 98, image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 106, name: 'Tapiocaria Nordestina', rating: 4.7, reviewCount: 167, image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 107, name: 'Pão de Açúcar', rating: 4.5, reviewCount: 203, image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 108, name: 'Coxinha da Esquina', rating: 4.3, reviewCount: 134, image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 109, name: 'Brigaderia Artesanal', rating: 4.9, reviewCount: 278, image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 110, name: 'Moqueca Capixaba', rating: 4.6, reviewCount: 145, image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true }
];

const saboresInternacionais: Restaurant[] = [
  { id: 201, name: 'Sushi Zen', rating: 4.8, reviewCount: 267, image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 202, name: 'Pizzeria Italiana', rating: 4.7, reviewCount: 198, image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 203, name: 'Taco Mexicano', rating: 4.5, reviewCount: 156, image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 204, name: 'Curry House', rating: 4.6, reviewCount: 189, image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 205, name: 'Bistro Francês', rating: 4.9, reviewCount: 234, image: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 206, name: 'Ramen Tokyo', rating: 4.7, reviewCount: 178, image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 207, name: 'Greek Taverna', rating: 4.4, reviewCount: 123, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 208, name: 'Thai Garden', rating: 4.6, reviewCount: 167, image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 209, name: 'Korean BBQ', rating: 4.8, reviewCount: 245, image: 'https://images.pexels.com/photos/1251208/pexels-photo-1251208.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 210, name: 'Paella Española', rating: 4.5, reviewCount: 134, image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true }
];

const maisProcurados: Restaurant[] = [
  { id: 301, name: 'Burger King Premium', rating: 4.9, reviewCount: 456, image: 'https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 302, name: 'Pizza Hut Gourmet', rating: 4.8, reviewCount: 389, image: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 303, name: 'McDonald\'s Premium', rating: 4.7, reviewCount: 567, image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 304, name: 'KFC Original', rating: 4.6, reviewCount: 234, image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 305, name: 'Subway Fresh', rating: 4.5, reviewCount: 178, image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 306, name: 'Starbucks Coffee', rating: 4.8, reviewCount: 345, image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 307, name: 'Domino\'s Pizza', rating: 4.4, reviewCount: 267, image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 308, name: 'Taco Bell', rating: 4.3, reviewCount: 156, image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 309, name: 'Dunkin\' Donuts', rating: 4.6, reviewCount: 289, image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 310, name: 'Baskin Robbins', rating: 4.7, reviewCount: 198, image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true }
];

const abertoAgora: Restaurant[] = [
  { id: 401, name: '24h Burguer', rating: 4.5, reviewCount: 234, image: 'https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 402, name: 'Night Café', rating: 4.3, reviewCount: 167, image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 403, name: 'Madrugada Pizza', rating: 4.6, reviewCount: 189, image: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 404, name: 'Express Lanches', rating: 4.4, reviewCount: 145, image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 405, name: 'Posto Grill', rating: 4.2, reviewCount: 123, image: 'https://images.pexels.com/photos/1251208/pexels-photo-1251208.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 406, name: 'Drive Thru 24h', rating: 4.5, reviewCount: 178, image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 407, name: 'Padaria Noturna', rating: 4.7, reviewCount: 234, image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 408, name: 'Hot Dog Express', rating: 4.3, reviewCount: 156, image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 409, name: 'Açaí 24 Horas', rating: 4.6, reviewCount: 198, image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 410, name: 'Conveniência Gourmet', rating: 4.4, reviewCount: 167, image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true }
];

const hamburguerArtesanal: Restaurant[] = [
  { id: 501, name: 'Burger Artisan', rating: 4.9, reviewCount: 345, image: 'https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 502, name: 'Craft Burger Co.', rating: 4.8, reviewCount: 278, image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 503, name: 'Gourmet Burger House', rating: 4.7, reviewCount: 234, image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 504, name: 'The Burger Lab', rating: 4.6, reviewCount: 189, image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 505, name: 'Prime Burger', rating: 4.8, reviewCount: 312, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 506, name: 'Handmade Burgers', rating: 4.5, reviewCount: 167, image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 507, name: 'Burger & Co.', rating: 4.7, reviewCount: 245, image: 'https://images.pexels.com/photos/1251208/pexels-photo-1251208.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 508, name: 'Artisan Kitchen', rating: 4.4, reviewCount: 156, image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 509, name: 'Burger Boutique', rating: 4.6, reviewCount: 198, image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 510, name: 'Custom Burger Bar', rating: 4.8, reviewCount: 289, image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true }
];

const novasLanchonetes: Restaurant[] = [
  { id: 601, name: 'Fresh Snack Bar', rating: 4.5, reviewCount: 89, image: 'https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 602, name: 'Urban Bites', rating: 4.3, reviewCount: 67, image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 603, name: 'Quick & Tasty', rating: 4.6, reviewCount: 123, image: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 604, name: 'Street Food Corner', rating: 4.4, reviewCount: 98, image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 605, name: 'Snack Attack', rating: 4.2, reviewCount: 76, image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 606, name: 'Bite Size', rating: 4.7, reviewCount: 145, image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 607, name: 'The New Spot', rating: 4.5, reviewCount: 112, image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 608, name: 'Modern Munchies', rating: 4.3, reviewCount: 87, image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 609, name: 'Trendy Treats', rating: 4.6, reviewCount: 134, image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 610, name: 'Next Level Snacks', rating: 4.4, reviewCount: 101, image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true }
];

// Dados para categoria "Cuidado"
const farmacias: Restaurant[] = [
  { id: 701, name: 'Farmácia Popular', rating: 4.6, reviewCount: 234, image: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 702, name: 'Drogaria São Paulo', rating: 4.5, reviewCount: 189, image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 703, name: 'Farmácia Pague Menos', rating: 4.4, reviewCount: 167, image: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 704, name: 'Drogasil', rating: 4.7, reviewCount: 298, image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 705, name: 'Farmácia Rosário', rating: 4.3, reviewCount: 145, image: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true }
];

const maquiagem: Restaurant[] = [
  { id: 711, name: 'Sephora', rating: 4.8, reviewCount: 345, image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 712, name: 'O Boticário', rating: 4.6, reviewCount: 267, image: 'https://images.pexels.com/photos/1115128/pexels-photo-1115128.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 713, name: 'Natura', rating: 4.7, reviewCount: 198, image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 714, name: 'Avon Store', rating: 4.5, reviewCount: 156, image: 'https://images.pexels.com/photos/1115128/pexels-photo-1115128.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 715, name: 'MAC Cosmetics', rating: 4.9, reviewCount: 423, image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true }
];

const vestuario: Restaurant[] = [
  { id: 721, name: 'Zara', rating: 4.7, reviewCount: 456, image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 722, name: 'H&M', rating: 4.5, reviewCount: 234, image: 'https://images.pexels.com/photos/1148960/pexels-photo-1148960.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 723, name: 'C&A', rating: 4.4, reviewCount: 189, image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 724, name: 'Renner', rating: 4.6, reviewCount: 298, image: 'https://images.pexels.com/photos/1148960/pexels-photo-1148960.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 725, name: 'Riachuelo', rating: 4.3, reviewCount: 167, image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true }
];

const artigosEsportivos: Restaurant[] = [
  { id: 731, name: 'Decathlon', rating: 4.8, reviewCount: 389, image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 732, name: 'Centauro', rating: 4.6, reviewCount: 234, image: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 733, name: 'Nike Store', rating: 4.9, reviewCount: 567, image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 734, name: 'Adidas Originals', rating: 4.7, reviewCount: 345, image: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 735, name: 'Netshoes', rating: 4.5, reviewCount: 198, image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true }
];

const saudeEBemEstar: Restaurant[] = [
  { id: 741, name: 'Academia Smart Fit', rating: 4.5, reviewCount: 456, image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 742, name: 'Clínica Odontológica', rating: 4.7, reviewCount: 234, image: 'https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 743, name: 'Spa Relaxante', rating: 4.8, reviewCount: 189, image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 744, name: 'Laboratório de Análises', rating: 4.6, reviewCount: 167, image: 'https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 745, name: 'Fisioterapia Avançada', rating: 4.4, reviewCount: 145, image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true }
];

// Dados para categoria "Mercado"
const supermercados: Restaurant[] = [
  { id: 801, name: 'Pão de Açúcar', rating: 4.6, reviewCount: 567, image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 802, name: 'Extra Hipermercado', rating: 4.4, reviewCount: 423, image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 803, name: 'Carrefour', rating: 4.5, reviewCount: 689, image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 804, name: 'Walmart', rating: 4.3, reviewCount: 345, image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 805, name: 'Atacadão', rating: 4.2, reviewCount: 234, image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true }
];

const padarias: Restaurant[] = [
  { id: 811, name: 'Padaria Bella Vista', rating: 4.7, reviewCount: 298, image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 812, name: 'Pão Quente', rating: 4.5, reviewCount: 189, image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 813, name: 'Padaria do Bairro', rating: 4.6, reviewCount: 234, image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 814, name: 'Pão de Mel', rating: 4.8, reviewCount: 345, image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 815, name: 'Padaria Artesanal', rating: 4.4, reviewCount: 167, image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true }
];

const docerias: Restaurant[] = [
  { id: 821, name: 'Confeitaria Colombo', rating: 4.9, reviewCount: 456, image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 822, name: 'Doce Sabor', rating: 4.7, reviewCount: 234, image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 823, name: 'Brigaderia Gourmet', rating: 4.8, reviewCount: 345, image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 824, name: 'Açúcar & Mel', rating: 4.6, reviewCount: 189, image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 825, name: 'Doces da Vovó', rating: 4.5, reviewCount: 167, image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true }
];

const acougues: Restaurant[] = [
  { id: 831, name: 'Açougue Premium', rating: 4.6, reviewCount: 234, image: 'https://images.pexels.com/photos/1251208/pexels-photo-1251208.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 832, name: 'Carnes Nobres', rating: 4.7, reviewCount: 189, image: 'https://images.pexels.com/photos/1251208/pexels-photo-1251208.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 833, name: 'Açougue do João', rating: 4.5, reviewCount: 156, image: 'https://images.pexels.com/photos/1251208/pexels-photo-1251208.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 834, name: 'Frigorífico Central', rating: 4.4, reviewCount: 123, image: 'https://images.pexels.com/photos/1251208/pexels-photo-1251208.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 835, name: 'Carnes Especiais', rating: 4.8, reviewCount: 267, image: 'https://images.pexels.com/photos/1251208/pexels-photo-1251208.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true }
];

const hortifrutiGranjeiros: Restaurant[] = [
  { id: 841, name: 'Hortifruti Natural', rating: 4.5, reviewCount: 198, image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 842, name: 'Feira Orgânica', rating: 4.7, reviewCount: 234, image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 843, name: 'Verduras & Frutas', rating: 4.4, reviewCount: 167, image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 844, name: 'Granja do Campo', rating: 4.6, reviewCount: 189, image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true },
  { id: 845, name: 'Mercado Verde', rating: 4.3, reviewCount: 145, image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', isOpen: true }
];

function BusinessCard({ restaurant }: { restaurant: Restaurant }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/business/${restaurant.id}`);
  };
  
  return (
    <div 
      className="min-w-[200px] flex-shrink-0 flex flex-col gap-3 cursor-pointer hover:opacity-80 transition-opacity"
      onClick={handleClick}
    >
      <div className="relative">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-32 object-cover rounded-lg"
        />
        {restaurant.isOpen && (
          <span className="absolute top-2 left-2 bg-green-700/50 backdrop-blur text-white text-xs px-2 py-1 rounded">
            Aberto
          </span>
        )}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">{restaurant.name}</h3>
        <div className="flex items-center gap-1">
          <Star size={14} className="text-yellow-500" weight="fill" />
          <span className="text-sm text-gray-600">{restaurant.rating} ({restaurant.reviewCount})</span>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const [showBottomNav, setShowBottomNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('restaurantes');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down - hide nav
        setShowBottomNav(false);
      } else if (currentScrollY < lastScrollY && currentScrollY > 50) {
        // Scrolling up - show nav
        setShowBottomNav(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const renderRestauranteSections = () => (
    <>
      {/* Seção: Novos restaurantes para conhecer */}
      <div>
        <Link to="/category/novos-restaurantes-para-conhecer">
          <h2 className="text-lg font-semibold text-gray-900 cursor-pointer mb-4 hover:text-gray-700 transition-colors">
            Novos restaurantes para{" "}
            <span className="inline-flex items-center whitespace-nowrap">
              conhecer
              <CaretRight size={20} className="ml-1" />
            </span>
          </h2>
        </Link>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {mockRestaurants.map((restaurant) => (
            <BusinessCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>

      {/* Seção: Onde comer barato e bem */}
      <div>
        <Link to="/category/onde-comer-barato-e-bem">
          <h2 className="text-lg font-semibold text-gray-900 cursor-pointer mb-4 hover:text-gray-700 transition-colors">
            Onde comer barato e{" "}
            <span className="inline-flex items-center whitespace-nowrap">
              bem
              <CaretRight size={20} className="ml-1" />
            </span>
          </h2>
        </Link>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {baratoEBemRestaurants.map((restaurant) => (
            <BusinessCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>

      {/* Seção: Comida típica tradicional */}
      <div>
        <Link to="/category/comida-tipica-tradicional">
          <h2 className="text-lg font-semibold text-gray-900 cursor-pointer mb-4 hover:text-gray-700 transition-colors">
            Comida típica{" "}
            <span className="inline-flex items-center whitespace-nowrap">
              tradicional
              <CaretRight size={20} className="ml-1" />
            </span>
          </h2>
        </Link>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {comidaTipicaRestaurants.map((restaurant) => (
            <BusinessCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>

      {/* Seção: Sabores internacionais */}
      <div>
        <Link to="/category/sabores-internacionais">
          <h2 className="text-lg font-semibold text-gray-900 cursor-pointer mb-4 hover:text-gray-700 transition-colors">
            Sabores{" "}
            <span className="inline-flex items-center whitespace-nowrap">
              internacionais
              <CaretRight size={20} className="ml-1" />
            </span>
          </h2>
        </Link>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {saboresInternacionais.map((restaurant) => (
            <BusinessCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>

      {/* Seção: Os mais procurados */}
      <div>
        <Link to="/category/os-mais-procurados">
          <h2 className="text-lg font-semibold text-gray-900 cursor-pointer mb-4 hover:text-gray-700 transition-colors">
            Os mais{" "}
            <span className="inline-flex items-center whitespace-nowrap">
              procurados
              <CaretRight size={20} className="ml-1" />
            </span>
          </h2>
        </Link>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {maisProcurados.map((restaurant) => (
            <BusinessCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>

      {/* Seção: Aberto agora para matar a fome */}
      <div>
        <Link to="/category/aberto-agora-para-matar-a-fome">
          <h2 className="text-lg font-semibold text-gray-900 cursor-pointer mb-4 hover:text-gray-700 transition-colors">
            Aberto agora para{" "}
            <span className="inline-flex items-center whitespace-nowrap">
              matar a fome
              <CaretRight size={20} className="ml-1" />
            </span>
          </h2>
        </Link>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {abertoAgora.map((restaurant) => (
            <BusinessCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>

      {/* Seção: Onde comer hambúrguer artesanal */}
      <div>
        <Link to="/category/onde-comer-hamburguer-artesanal">
          <h2 className="text-lg font-semibold text-gray-900 cursor-pointer mb-4 hover:text-gray-700 transition-colors">
            Onde comer hambúrguer{" "}
            <span className="inline-flex items-center whitespace-nowrap">
              artesanal
              <CaretRight size={20} className="ml-1" />
            </span>
          </h2>
        </Link>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {hamburguerArtesanal.map((restaurant) => (
            <BusinessCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>

      {/* Seção: Novas lanchonetes para experimentar */}
      <div>
        <Link to="/category/novas-lanchonetes-para-experimentar">
          <h2 className="text-lg font-semibold text-gray-900 cursor-pointer mb-4 hover:text-gray-700 transition-colors">
            Novas lanchonetes para{" "}
            <span className="inline-flex items-center whitespace-nowrap">
              experimentar
              <CaretRight size={20} className="ml-1" />
            </span>
          </h2>
        </Link>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {novasLanchonetes.map((restaurant) => (
            <BusinessCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </>
  );

  const renderCuidadoSections = () => (
    <>
      {/* Seção: Farmácias */}
      <div>
        <Link to="/category/farmacias">
          <h2 className="text-lg font-semibold text-gray-900 cursor-pointer mb-4 hover:text-gray-700 transition-colors">
            Farmácias{" "}
            <span className="inline-flex items-center whitespace-nowrap">
              próximas
              <CaretRight size={20} className="ml-1" />
            </span>
          </h2>
        </Link>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {farmacias.map((restaurant) => (
            <BusinessCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>

      {/* Seção: Maquiagem e Cosméticos */}
      <div>
        <Link to="/category/maquiagem-cosmeticos">
          <h2 className="text-lg font-semibold text-gray-900 cursor-pointer mb-4 hover:text-gray-700 transition-colors">
            Maquiagem e{" "}
            <span className="inline-flex items-center whitespace-nowrap">
              cosméticos
              <CaretRight size={20} className="ml-1" />
            </span>
          </h2>
        </Link>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {maquiagem.map((restaurant) => (
            <BusinessCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>

      {/* Seção: Vestuário */}
      <div>
        <Link to="/category/vestuario">
          <h2 className="text-lg font-semibold text-gray-900 cursor-pointer mb-4 hover:text-gray-700 transition-colors">
            Vestuário e{" "}
            <span className="inline-flex items-center whitespace-nowrap">
              moda
              <CaretRight size={20} className="ml-1" />
            </span>
          </h2>
        </Link>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {vestuario.map((restaurant) => (
            <BusinessCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>

      {/* Seção: Artigos Esportivos */}
      <div>
        <Link to="/category/artigos-esportivos">
          <h2 className="text-lg font-semibold text-gray-900 cursor-pointer mb-4 hover:text-gray-700 transition-colors">
            Artigos{" "}
            <span className="inline-flex items-center whitespace-nowrap">
              esportivos
              <CaretRight size={20} className="ml-1" />
            </span>
          </h2>
        </Link>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {artigosEsportivos.map((restaurant) => (
            <BusinessCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>

      {/* Seção: Saúde e Bem-estar */}
      <div>
        <Link to="/category/saude-bem-estar">
          <h2 className="text-lg font-semibold text-gray-900 cursor-pointer mb-4 hover:text-gray-700 transition-colors">
            Saúde e{" "}
            <span className="inline-flex items-center whitespace-nowrap">
              bem-estar
              <CaretRight size={20} className="ml-1" />
            </span>
          </h2>
        </Link>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {saudeEBemEstar.map((restaurant) => (
            <BusinessCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </>
  );

  const renderMercadoSections = () => (
    <>
      {/* Seção: Supermercados */}
      <div>
        <Link to="/category/supermercados">
          <h2 className="text-lg font-semibold text-gray-900 cursor-pointer mb-4 hover:text-gray-700 transition-colors">
            Supermercados{" "}
            <span className="inline-flex items-center whitespace-nowrap">
              próximos
              <CaretRight size={20} className="ml-1" />
            </span>
          </h2>
        </Link>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {supermercados.map((restaurant) => (
            <BusinessCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>

      {/* Seção: Padarias */}
      <div>
        <Link to="/category/padarias">
          <h2 className="text-lg font-semibold text-gray-900 cursor-pointer mb-4 hover:text-gray-700 transition-colors">
            Padarias{" "}
            <span className="inline-flex items-center whitespace-nowrap">
              artesanais
              <CaretRight size={20} className="ml-1" />
            </span>
          </h2>
        </Link>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {padarias.map((restaurant) => (
            <BusinessCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>

      {/* Seção: Docerias */}
      <div>
        <Link to="/category/docerias">
          <h2 className="text-lg font-semibold text-gray-900 cursor-pointer mb-4 hover:text-gray-700 transition-colors">
            Docerias e{" "}
            <span className="inline-flex items-center whitespace-nowrap">
              confeitarias
              <CaretRight size={20} className="ml-1" />
            </span>
          </h2>
        </Link>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {docerias.map((restaurant) => (
            <BusinessCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>

      {/* Seção: Açougues */}
      <div>
        <Link to="/category/acougues">
          <h2 className="text-lg font-semibold text-gray-900 cursor-pointer mb-4 hover:text-gray-700 transition-colors">
            Açougues{" "}
            <span className="inline-flex items-center whitespace-nowrap">
              premium
              <CaretRight size={20} className="ml-1" />
            </span>
          </h2>
        </Link>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {acougues.map((restaurant) => (
            <BusinessCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>

      {/* Seção: Hortifruti e Granjeiros */}
      <div>
        <Link to="/category/hortifruti-granjeiros">
          <h2 className="text-lg font-semibold text-gray-900 cursor-pointer mb-4 hover:text-gray-700 transition-colors">
            Hortifruti e{" "}
            <span className="inline-flex items-center whitespace-nowrap">
              granjeiros
              <CaretRight size={20} className="ml-1" />
            </span>
          </h2>
        </Link>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {hortifrutiGranjeiros.map((restaurant) => (
            <BusinessCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </>
  );

  const renderSections = () => {
    switch (activeTab) {
      case 'cuidado':
        return renderCuidadoSections();
      case 'mercado':
        return renderMercadoSections();
      default:
        return renderRestauranteSections();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onSearchClick={() => setIsSearchModalOpen(true)}
      />

      {/* Conteúdo principal */}
      <div className="mx-auto px-4 py-6 space-y-8 pt-56 md:pt-36">
        {renderSections()}

        {/* Seção: Avaliações recentes */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 cursor-pointer mb-4">
            Avaliações{" "}
            <span className="inline-flex items-center whitespace-nowrap">
              recentes
              <CaretRight size={20} className="ml-1" />
            </span>
          </h2>
          <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {/* Avaliação 1 */}
            <div className="rounded-lg p-4 border border-neutral-300 max-w-[280px] flex-shrink-0">
              <div className="flex items-start space-x-3 mb-3">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop" 
                  alt="Maria Silva" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Maria Silva</h3>
                  <div className="flex text-yellow-400">
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2 underline cursor-pointer">Café da Esquina</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Ambiente aconchegante e café delicioso! O atendimento é excepcional e os doces são irresistíveis. Recomendo muito!
                </p>
                <div className="flex items-center justify-between">
                  <img 
                    src="https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=80&h=60&fit=crop" 
                    alt="Café" 
                    className="w-16 h-12 rounded object-cover"
                  />
                  <button className="text-gray-900 text-sm font-medium flex items-center">
                    Ler mais
                    <CaretRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Avaliação 2 */}
            <div className="rounded-lg p-4 border border-neutral-300 max-w-[280px] flex-shrink-0">
              <div className="flex items-start space-x-3 mb-3">
                <img 
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop" 
                  alt="João Santos" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">João Santos</h3>
                  <div className="flex text-yellow-400">
                    <span>★★★★☆</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2 underline cursor-pointer">Restaurante Bella Vista</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Comida italiana autêntica com vista incrível. O ambiente é romântico e perfeito para um jantar especial.
                </p>
                <div className="flex items-center justify-between">
                  <img 
                    src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=80&h=60&fit=crop" 
                    alt="Restaurante" 
                    className="w-16 h-12 rounded object-cover"
                  />
                  <button className="text-gray-900 text-sm font-medium flex items-center">
                    Ler mais
                    <CaretRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Avaliação 3 */}
            <div className="rounded-lg p-4 border border-neutral-300 max-w-[280px] flex-shrink-0">
              <div className="flex items-start space-x-3 mb-3">
                <img 
                  src="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop" 
                  alt="Pedro Costa" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Pedro Costa</h3>
                  <div className="flex text-yellow-400">
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2 underline cursor-pointer">Barbearia Moderna</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Melhor corte de cabelo da cidade! Profissionais qualificados e ambiente moderno. Sempre saio satisfeito.
                </p>
                <div className="flex items-center justify-between">
                  <img 
                    src="https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=80&h=60&fit=crop" 
                    alt="Barbearia" 
                    className="w-16 h-12 rounded object-cover"
                  />
                  <button className="text-gray-900 text-sm font-medium flex items-center">
                    Ler mais
                    <CaretRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav showBottomNav={showBottomNav} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categorySlug" element={<CategoryPage />} />
        <Route path="/login" element={<LoginPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/business/:businessId" element={<BusinessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
