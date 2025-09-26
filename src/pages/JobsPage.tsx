import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { 
  ArrowLeft,
  Heart,
  MapPin,
  Clock
} from 'phosphor-react';

interface Job {
  id: number;
  title: string;
  location: string;
  type: string; // 'full-time', 'part-time', 'contract'
  area: string;
  description: string;
  requirements: string[];
}

const jobAreas = [
  'Todas',
  'Tecnologia',
  'Vendas',
  'Marketing',
  'Administração',
  'Recursos Humanos',
  'Financeiro',
  'Saúde',
  'Educação',
  'Engenharia',
  'Design',
  'Atendimento'
];

const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Desenvolvedor Frontend React',
    location: 'São Paulo - SP',
    type: 'full-time',
    area: 'Tecnologia',
    description: 'Buscamos um desenvolvedor frontend experiente em React para integrar nossa equipe de desenvolvimento de soluções web inovadoras.',
    requirements: ['React', 'TypeScript', 'CSS/SCSS', 'Git', '2+ anos de experiência']
  },
  {
    id: 2,
    title: 'Vendedor Externo',
    location: 'Rio de Janeiro - RJ',
    type: 'full-time',
    area: 'Vendas',
    description: 'Oportunidade para vendedor experiente em vendas B2B, com foco em relacionamento e desenvolvimento de novos clientes.',
    requirements: ['Experiência em vendas', 'CNH B', 'Ensino médio completo', 'Boa comunicação']
  },
  {
    id: 3,
    title: 'Analista de Marketing Digital',
    location: 'Belo Horizonte - MG',
    type: 'full-time',
    area: 'Marketing',
    description: 'Profissional para gerenciar campanhas digitais, análise de métricas e estratégias de marketing para clientes locais.',
    requirements: ['Google Ads', 'Facebook Ads', 'Analytics', 'Excel avançado', 'Superior completo']
  },
  {
    id: 4,
    title: 'Assistente Administrativo',
    location: 'Santos - SP',
    type: 'full-time',
    area: 'Administração',
    description: 'Vaga para assistente administrativo com conhecimento em rotinas de escritório e atendimento ao cliente.',
    requirements: ['Ensino médio completo', 'Pacote Office', 'Experiência administrativa', 'Boa comunicação']
  },
  {
    id: 5,
    title: 'Designer Gráfico',
    location: 'Curitiba - PR',
    type: 'full-time',
    area: 'Design',
    description: 'Designer para criação de materiais gráficos, identidade visual e peças publicitárias para empresas locais.',
    requirements: ['Adobe Creative Suite', 'Portfolio', 'Superior em Design', 'Criatividade', '1+ ano experiência']
  },
  {
    id: 6,
    title: 'Atendente de Loja',
    location: 'Fortaleza - CE',
    type: 'part-time',
    area: 'Atendimento',
    description: 'Oportunidade para atendente em loja de roupas, com foco em vendas e relacionamento com clientes.',
    requirements: ['Ensino médio', 'Experiência em vendas', 'Boa apresentação', 'Disponibilidade de horário']
  }
];

function JobsPage() {
  const navigate = useNavigate();
  const [selectedArea, setSelectedArea] = useState('Todas');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedArea === 'Todas') {
      setFilteredJobs(mockJobs);
    } else {
      setFilteredJobs(mockJobs.filter(job => job.area === selectedArea));
    }
  }, [selectedArea]);



  const getJobTypeLabel = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'Tempo Integral';
      case 'part-time':
        return 'Meio Período';
      case 'contract':
        return 'Contrato';
      default:
        return type;
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'text-neutral-600';
      case 'part-time':
        return 'text-neutral-600';
      case 'contract':
        return 'text-neutral-600';
      default:
        return 'text-neutral-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com botão voltar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center flex-1">
            <button 
              onClick={() => navigate(-1)}
              className="text-gray-900 mr-4"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 flex-1">Empregos Locais</h1>
          </div>
          <button className="text-gray-900">
            <Heart size={24} />
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="pt-16">
        {/* Abas de filtro por área */}
        <div className="bg-white px-4 py-4 border-b border-gray-200">
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
            {jobAreas.map((area) => (
              <button
                key={area}
                onClick={() => setSelectedArea(area)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  selectedArea === area
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de empregos */}
        <div className="px-4 py-6">
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                onClick={() => navigate(`/job/${job.id}`)}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
              >
                {/* Header do cartão */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                      <div className="inline-block rounded-full border-gray-300 px-3 py-1 border-2">
                        <p className="text-sm text-gray-500 font-medium">{job.area}</p>
                      </div>
                      
                    </div>
                  </div>
                </div>

                {/* Informações do emprego */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-gray-500" />
                    <span className="text-gray-600">{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-gray-500" />
                    <span className={`text-gray-600 ${getJobTypeColor(job.type)}`}>
                      {getJobTypeLabel(job.type)}
                    </span>
                  </div>
                </div>

                {/* Descrição */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

                {/* Requisitos principais */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                        {req}
                      </span>
                    ))}
                    {job.requirements.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                        +{job.requirements.length - 3} mais
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mensagem quando não há empregos */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <div className="text-6xl">💼</div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum emprego encontrado</h3>
              <p className="text-gray-600">Não há vagas disponíveis para a área selecionada no momento.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default JobsPage;