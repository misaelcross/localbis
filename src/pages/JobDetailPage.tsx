import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { 
  Heart, 
  Globe, 
  MapPin,
  ArrowLeft,
  Clock,
  Users,
  Briefcase
} from 'phosphor-react';

interface Job {
  id: number;
  title: string;
  company: string;
  rating: number;
  reviewCount: number;
  location: string;
  type: string;
  salary: string;
  isActive: boolean;
  image: string;
  companyLogo: string;
  description: string;
  requirements: string[];
  benefits: string[];
  workSchedule: string;
  contractType: string;
  experience: string;
  education: string;
  companySize: string;
  companyWebsite: string;
  companyPhone: string;
  companyEmail: string;
}

const mockJob: Job = {
  id: 1,
  title: 'Desenvolvedor Frontend React',
  company: 'TechCorp Solutions',
  rating: 4.6,
  reviewCount: 89,
  location: 'São Paulo - SP',
  type: 'Tempo Integral',
  salary: 'R$ 6.000 - R$ 8.000',
  isActive: true,
  image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
  companyLogo: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  description: 'Estamos procurando um desenvolvedor frontend experiente para se juntar à nossa equipe dinâmica. Você trabalhará em projetos inovadores usando as mais recentes tecnologias web, incluindo React, TypeScript e outras ferramentas modernas. Nossa empresa valoriza a criatividade, colaboração e crescimento profissional contínuo.',
  requirements: [
    'Experiência sólida com React e JavaScript',
    'Conhecimento em TypeScript',
    'Familiaridade com HTML5 e CSS3',
    'Experiência com Git e controle de versão',
    'Conhecimento em metodologias ágeis',
    'Inglês intermediário',
    'Experiência com testes unitários',
    'Conhecimento em APIs REST'
  ],
  benefits: [
    'Plano de saúde completo',
    'Vale refeição R$ 35/dia',
    'Vale transporte',
    'Seguro de vida',
    'Participação nos lucros',
    'Horário flexível',
    'Home office 2x por semana',
    'Auxílio educação',
    'Gympass',
    'Day off no aniversário'
  ],
  workSchedule: 'Segunda a Sexta, 9h às 18h',
  contractType: 'CLT',
  experience: '2-4 anos',
  education: 'Superior completo em Tecnologia',
  companySize: '50-100 funcionários',
  companyWebsite: 'https://techsolutions.com.br',
  companyPhone: '(11) 3456-7890',
  companyEmail: 'rh@techsolutions.com.br'
};



const mockSimilarJobs = [
  {
    id: 2,
    title: 'Desenvolvedor Full Stack',
    company: 'StartupTech',
    location: 'São Paulo - SP',
    type: 'Tempo Integral'
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'DesignStudio',
    location: 'Rio de Janeiro - RJ',
    type: 'Tempo Integral'
  },
  {
    id: 4,
    title: 'Analista de Dados',
    company: 'DataCorp',
    location: 'Belo Horizonte - MG',
    type: 'Tempo Integral'
  }
];

const mockRecommendedJobs = [
  {
    id: 5,
    title: 'UI/UX Designer',
    company: 'Design Studio',
    location: 'São Paulo - SP',
    salary: 'R$ 4.500 - R$ 6.500',
    rating: 4.4,
    reviewCount: 78,
    image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isActive: true
  },
  {
    id: 6,
    title: 'Product Manager',
    company: 'ProductCorp',
    location: 'São Paulo - SP',
    salary: 'R$ 10.000 - R$ 15.000',
    rating: 4.8,
    reviewCount: 156,
    image: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    isActive: true
  }
];

function JobDetailPage() {
  const navigate = useNavigate();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllRequirements, setShowAllRequirements] = useState(false);
  const [showAllBenefits, setShowAllBenefits] = useState(false);

  const job = mockJob; // Em uma aplicação real, buscar por jobId

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header com botão voltar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center flex-1">
            <button 
              onClick={() => navigate(-1)}
              className="text-gray-900 mr-4"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 truncate flex-1">{job.title}</h1>
          </div>
          <button className="text-gray-900">
            <Heart size={24} />
          </button>
        </div>
      </div>



      {/* 3. Informações da Vaga */}
      <div className="px-4 py-4 border-b border-gray-100 pt-16">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{job.title}</h2>
          <p className="text-lg text-gray-700 mb-2">{job.company}</p>
        </div>
        
        {/* Informações Rápidas */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <MapPin size={20} className="text-gray-600" />
            <span className="text-gray-700 text-sm">{job.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Briefcase size={20} className="text-gray-600" />
            <span className="text-gray-700 text-sm">{job.type}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={20} className="text-gray-600" />
            <span className="text-gray-700 text-sm">{job.experience}</span>
          </div>
        </div>
        
        {/* Status da Vaga */}
        <div className="mt-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            job.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {job.isActive ? 'Vaga Ativa' : 'Vaga Encerrada'}
          </span>
        </div>
      </div>

      {/* 4. Descrição da Vaga */}
      <div className="px-4 py-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sobre a vaga</h3>
        <p className="text-gray-700 leading-relaxed">
          {showFullDescription 
            ? job.description 
            : `${job.description.substring(0, 200)}...`
          }
        </p>
        <button 
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="text-gray-900 font-medium underline mt-2"
        >
          {showFullDescription ? 'Ler menos' : 'Ler mais'}
        </button>
      </div>

      {/* 5. Requisitos */}
      <div className="px-4 py-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Requisitos</h3>
        <div className="space-y-2 mb-4">
          {job.requirements
            .slice(0, showAllRequirements ? undefined : 4)
            .map((requirement, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-neutral-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 text-sm">{requirement}</span>
              </div>
            ))
          }
        </div>
        {job.requirements.length > 4 && (
          <button 
            onClick={() => setShowAllRequirements(!showAllRequirements)}
            className="text-gray-900 font-medium underline"
          >
            {showAllRequirements ? 'Ver menos requisitos' : 'Ver mais requisitos'}
          </button>
        )}
      </div>

      {/* 6. Benefícios */}
      <div className="py-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 px-4">Benefícios</h3>
        <div className="grid grid-cols-1 gap-1 mb-4 px-4">
          {job.benefits
            .slice(0, showAllBenefits ? undefined : 4)
            .map((benefit, index) => (
              <div key={index} className="pt-1 pb-2 border-b border-neutral-300">
                <span className="text-gray-900 text-sm">{benefit}</span>
              </div>
            ))
          }
        </div>
        {job.benefits.length > 4 && (
          <button 
            onClick={() => setShowAllBenefits(!showAllBenefits)}
            className="text-gray-900 font-medium underline px-4"
          >
            {showAllBenefits ? 'Ver menos benefícios' : 'Ver mais benefícios'}
          </button>
        )}
      </div>

      {/* 7. Sobre a Empresa */}
      <div className="px-4 py-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sobre a empresa</h3>
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900">{job.company}</h4>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Users size={16} className="text-gray-600" />
            <span className="text-gray-700 text-sm">{job.companySize}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe size={16} className="text-gray-600" />
            <span className="text-gray-700 text-sm">{job.companyWebsite}</span>
          </div>
        </div>
      </div>

      {/* Vagas Similares */}
      <div className="px-4 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Vagas similares</h3>
          <span className="text-sm text-gray-900 font-medium">Ver todas</span>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {mockSimilarJobs.map((similarJob) => (
            <div key={similarJob.id} className="flex-shrink-0 w-72 bg-white border border-gray-200 rounded-lg p-4">
              <div className="mb-3">
                <h4 className="font-medium text-gray-900 mb-1">{similarJob.title}</h4>
                <p className="text-sm text-gray-600">{similarJob.company}</p>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span>{similarJob.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>{similarJob.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 11. Vagas Recomendadas */}
      <div className="px-4 py-6 pb-20">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recomendadas para você</h3>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {mockRecommendedJobs.map((job) => (
            <div key={job.id} className="min-w-[280px] flex-shrink-0 flex flex-col gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="relative">
                <img 
                  src={job.image} 
                  alt={job.company}
                  className="w-full h-32 object-cover rounded-lg"
                />
                {job.isActive && (
                  <span className="absolute top-2 left-2 bg-green-700/50 backdrop-blur text-white text-xs px-2 py-1 rounded">
                    Ativa
                  </span>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{job.title}</h4>
                <p className="text-sm text-gray-600 mb-1">{job.company}</p>
                <p className="text-sm text-gray-600 mb-2">{job.location}</p>
                <p className="text-sm font-medium text-neutral-600 mb-2">{job.salary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default JobDetailPage;