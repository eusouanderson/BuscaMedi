import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="/assets/images/logo.png" alt="BuscaMedi Logo" className="h-10 mr-3" />
          <h1 className="text-white text-3xl font-bold">BuscaMedi</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#home" className="text-white hover:text-yellow-300 transition-colors">Início</a>
            </li>
            <li>
              <a href="#about" className="text-white hover:text-yellow-300 transition-colors">Sobre</a>
            </li>
            <li>
              <a href="#contact" className="text-white hover:text-yellow-300 transition-colors">Contato</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
