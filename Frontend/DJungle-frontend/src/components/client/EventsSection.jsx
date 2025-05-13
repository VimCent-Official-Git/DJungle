import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/outline';

const EventsSection = ({ events }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Mis Eventos</h2>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Nuevo Evento
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border rounded-lg">
          <h3 className="font-medium mb-3">Crear Nuevo Evento</h3>
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Título del evento"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Fecha</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Presupuesto</label>
                <input
                  type="number"
                  placeholder="$"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
            <div>
              <input
                type="text"
                placeholder="Ubicación"
                className="w-full px-3 py-2 border rounded-md"
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
                Crear Evento
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between">
                <h3 className="font-medium">{event.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  event.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                  event.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {event.status === 'PENDING' ? 'Pendiente' : 
                   event.status === 'CONFIRMED' ? 'Confirmado' : 'Completado'}
                </span>
              </div>
              <p className="text-sm text-gray-600 my-2">{event.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{new Date(event.date).toLocaleDateString()} • {event.location}</span>
                <span className="font-medium">${event.budget}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No tienes eventos programados</p>
        )}
      </div>
    </div>
  );
};

export default EventsSection;