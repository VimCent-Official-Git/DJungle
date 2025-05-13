import { Link } from 'react-router-dom';

const DJCard = ({ dj }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img 
          src={dj.profileImage || '/default-dj.jpg'} 
          alt={dj.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{dj.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{dj.bio}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{dj.location}</span>
          <Link 
            to={`/dj/${dj.id}`}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            Ver perfil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DJCard;