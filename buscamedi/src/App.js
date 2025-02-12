import React from 'react';
import logo from './assets/images/logo.png';  
import './assets/styles/main.css';  
import './assets/styles/index.css';
import Header from './components/Header';  
import Footer from './components/Footer';  
import Main from './components/Main';  
import MedicationList from './components/MedicationList';  


function App() {
  return (
    <div className="App">
      {/* Header do site */}
      <Header />

      <main>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Bem-vindo ao BuscaMedi</h1>
          <p>Encontre os melhores medicamentos ao seu alcance.</p>
        </div>

        {/* Componente para pesquisa e listagem de medicamentos */}
        <Main />
        <MedicationList />
      </main>

      {/* Rodapé */}
      <Footer />
    </div>
  );
}

export default App;
