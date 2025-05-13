const StatsSection = () => {
  const stats = [
    { name: 'Eventos realizados', value: '24' },
    { name: 'Clientes satisfechos', value: '18' },
    { name: 'Calificación promedio', value: '4.8' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-indigo-600">{stat.value}</p>
            <p className="text-gray-600">{stat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;