import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/common/Layout';

// Carga diferida de componentes para mejor performance
const HomePage = lazy(() => import('./pages/Home'));
const LoginPage = lazy(() => import('./pages/Auth/Login'));
const RegisterPage = lazy(() => import('./pages/Auth/Register'));

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Rutas públicas */}
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          
          {/* Ruta 404 */}
        </Route>
      </Routes>
 
  );
}

export default App;