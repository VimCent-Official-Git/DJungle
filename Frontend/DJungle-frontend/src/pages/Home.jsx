import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DJCard from '../components/shared/DJCard';
import EventCard from '../components/shared/EventCard';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  const featuredDJs = []; // Aquí iría la data de tu API
  const upcomingEvents = []; // Aquí iría la data de tu API

  return (
    <div className="max-w-7xl mx-auto">
      <section className="mb-12 text-center py-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Encuentra el DJ perfecto para tu evento</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Conectamos DJs talentosos con clientes que buscan animar sus fiestas y eventos especiales
        </p>
        {!user && (
          <div className="flex justify-center gap-4">
            <Link 
              to="/register?role=client" 
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Soy Cliente
            </Link>
            <Link 
              to="/register?role=dj" 
              className="bg-indigo-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-900 transition"
            >
              Soy DJ
            </Link>
          </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">DJs Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDJs.length > 0 ? (
            featuredDJs.map(dj => (
              <DJCard key={dj.id} dj={dj} />
            ))
          ) : (
            <p className="text-gray-500">No hay DJs destacados por el momento</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Próximos Eventos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p className="text-gray-500">No hay eventos próximos por el momento</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;