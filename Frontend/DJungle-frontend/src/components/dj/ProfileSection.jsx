import { useState } from 'react';
import { PencilIcon, CheckIcon, XIcon } from '@heroicons/react/outline';

const ProfileSection = ({ profile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: profile?.bio || '',
    phone: profile?.phone || '',
    location: profile?.location || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para actualizar el perfil
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">Mi Perfil</h2>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
        ) : (
          <div className="flex space-x-2">
            <button 
              onClick={handleSubmit}
              className="text-green-600 hover:text-green-800"
            >
              <CheckIcon className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="text-red-600 hover:text-red-800"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center mb-6">
        <img 
          src={profile?.profileImage || '/default-profile.jpg'} 
          alt="Profile"
          className="h-20 w-20 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="text-lg font-medium">{profile?.name}</h3>
          <p className="text-indigo-600">DJ Verificado</p>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Biografía</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Biografía</h4>
            <p className="mt-1">{profile?.bio || 'No hay biografía'}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Contacto</h4>
            <p className="mt-1">{profile?.phone || 'No especificado'}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Ubicación</h4>
            <p className="mt-1">{profile?.location || 'No especificada'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;