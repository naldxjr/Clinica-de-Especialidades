import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';


import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';


import { CadastroPaciente } from './pages/CadastroPaciente';
import { CadastroMedico } from './pages/CadastroMedico';
import { CadastroEspecialidade } from './pages/CadastroEspecialidade';
import { CadastroConvenio } from './pages/CadastroConvenio';
import { CadastroPlano } from './pages/CadastroPlano'; 


const Home: React.FC = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h2>Bem-vindo ao Sistema de Agendamento</h2>
    <p>Selecione uma opção no menu acima para começar.</p>
  </div>
);


const AppLayout: React.FC = () => {
  const layoutStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const mainStyle: React.CSSProperties = {
    flex: 1, 
  };

  return (
    <div style={layoutStyle}>
      <Navbar />
      <main style={mainStyle}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>

        <Route index element={<Home />} />

        <Route path="pacientes" element={<CadastroPaciente />} />
        <Route path="medicos" element={<CadastroMedico />} />
        <Route path="especialidades" element={<CadastroEspecialidade />} />
        <Route path="convenios" element={<CadastroConvenio />} />
        <Route path="planos" element={<CadastroPlano />} />

      </Route>
    </Routes>
  );
}

export default App;