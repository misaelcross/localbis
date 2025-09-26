import React from 'react';
import { useNavigate } from 'react-router-dom';
import { House, ArrowLeft } from 'phosphor-react';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Ilustração 404 */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-gray-300 mb-4">404</div>
          <div className="w-24 h-1 bg-black mx-auto rounded-full"></div>
        </div>

        {/* Conteúdo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Página não encontrada
          </h1>
          <p className="text-gray-600 leading-relaxed mb-6">
            Ops! A página que você está procurando não existe ou foi movida. 
            Verifique o endereço digitado ou volte para a página inicial.
          </p>
        </div>

        {/* Botões de ação */}
        <div className="space-y-3">
          <button
            onClick={handleGoHome}
            className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <House size={20} />
            Voltar para a Página Inicial
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full bg-white text-gray-700 py-3 px-6 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Voltar à Página Anterior
          </button>
        </div>

        {/* Informação adicional */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Se você acredita que isso é um erro, entre em contato conosco.</p>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;