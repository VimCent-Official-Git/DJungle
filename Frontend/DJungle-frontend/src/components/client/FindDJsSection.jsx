import { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';

const FindDJsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Esto sería reemplazado por datos reales de la API
  const djs = [
    {
      id: 1,
      name: 'DJ Example',
      bio: 'Especialista en música electrónica y eventos corporativos',
      location: 'Ciudad de México',
      rating: 4.8,
      profileImage: '/dj1.jpg'
    },
    {
      id: 2,
      name: 'DJ Sample',
      bio: 'Mezclas únicas para bodas y fiestas privadas',
      location: 'Guadalajara',
      rating: 4.5,
      profileImage: '/dj2.jpg'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Encontrar DJs</h2>
      
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar DJs por nombre, ubicación o género musical"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {djs.map((dj) => (
          <div key={dj.id} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
            <img 
              src={dj.profileImage} 
              alt={dj.name}
              className="h-16 w-16 rounded-full object-cover mr-4"
            />
            <div className="flex-grow">
              <h3 className="font-medium">{dj.name}</h3>
              <p className="text-sm text-gray-600">{dj.bio}</p>
              <div className="flex items-center mt-1">
                <span className="text-yellow-500">★ {dj.rating}</span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-500">{dj.location}</span>
              </div>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
              Contactar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindDJsSection;