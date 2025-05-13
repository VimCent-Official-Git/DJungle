import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import HomePage from './pages/Home';
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Register';
import DJDashboard from './pages/DJ/Dashboard';
import ClientDashboard from './pages/Client/Dashboard';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dj" element={<DJDashboard />} />
        <Route path="/client" element={<ClientDashboard />} />
      </Routes>
    </Layout>
  );
}

export default App;