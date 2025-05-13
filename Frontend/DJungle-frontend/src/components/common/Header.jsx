import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-indigo-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          DJungle
        </Link>
        
        <nav className="flex items-center space-x-6">
          {user ? (
            <>
              <Link 
                to={user.role === 'DJ' ? '/dj' : '/client'} 
                className="hover:text-indigo-200 transition"
              >
                Mi Perfil
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-white text-indigo-700 px-4 py-1 rounded hover:bg-gray-100 transition"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-200 transition">
                Iniciar Sesión
              </Link>
              <Link 
                to="/register" 
                className="bg-white text-indigo-700 px-4 py-1 rounded hover:bg-gray-100 transition"
              >
                Registrarse
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;