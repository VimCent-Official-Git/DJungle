import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/outline';

const PortfolioSection = ({ posts }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Mi Portafolio</h2>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Agregar
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border rounded-lg">
          <h3 className="font-medium mb-3">Nueva Publicación</h3>
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Título"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <textarea
                placeholder="Descripción"
                className="w-full px-3 py-2 border rounded-md"
                rows="3"
              />
            </div>
            <div>
              <select className="w-full px-3 py-2 border rounded-md">
                <option value="">Seleccionar tipo de medio</option>
                <option value="IMAGE">Imagen</option>
                <option value="VIDEO">Video</option>
                <option value="AUDIO">Audio</option>
              </select>
            </div>
            <div>
              <input
                type="file"
                className="w-full"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Publicar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="border rounded-lg p-4">
              <h3 className="font-medium">{post.title}</h3>
              <p className="text-gray-600 text-sm my-2">{post.content}</p>
              {post.mediaType === 'IMAGE' && (
                <img 
                  src={post.media[0]} 
                  alt={post.title}
                  className="w-full h-48 object-cover rounded"
                />
              )}
              <div className="mt-3 flex justify-between text-sm text-gray-500">
                <span>Publicado el {new Date(post.createdAt).toLocaleDateString()}</span>
                <button className="text-red-500">Eliminar</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No hay publicaciones aún</p>
        )}
      </div>
    </div>
  );
};

export default PortfolioSection;