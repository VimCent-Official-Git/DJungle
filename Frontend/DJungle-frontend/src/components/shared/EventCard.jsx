import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="p-4 border-b">
        <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{formatDate(event.date)}</p>
        <p className="text-gray-700 line-clamp-2">{event.description}</p>
      </div>
      <div className="p-4 bg-gray-50">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">{event.location}</span>
          <Link 
            to={`/events/${event.id}`}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;