const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} DJungle - Plataforma para DJs y Clientes</p>
        <div className="mt-2 flex justify-center space-x-4">
          <a href="#" className="hover:text-indigo-300">Términos</a>
          <a href="#" className="hover:text-indigo-300">Privacidad</a>
          <a href="#" className="hover:text-indigo-300">Contacto</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;