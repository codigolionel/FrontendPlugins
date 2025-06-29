import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import EditarPlugin from './EditarPlugin';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/editar-plugin" element={<EditarPlugin />} />
    </Routes>
  </BrowserRouter>
);
