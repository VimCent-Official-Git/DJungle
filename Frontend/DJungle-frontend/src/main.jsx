import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import App from './App';
import './index.css';

// Configuración del root
const container = document.getElementById('root');
const root = createRoot(container);

// Renderizado inicial
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);