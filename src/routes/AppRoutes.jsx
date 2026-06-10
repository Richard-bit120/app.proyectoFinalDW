// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Productos } from '../pages/Productos';
import { ProductDetail } from '../pages/ProductDetail';
import { Login } from '../pages/Login';
import { Registro } from '../pages/Registro';
import { Carrito } from '../pages/Carrito';
import { Perfil } from '../pages/Perfil';
import { Contacto } from '../pages/Contacto';
import { NotFound } from '../pages/NotFound';

// Agregamos el import del Layout contenedor
import { MainLayout } from '../components/MainLayout';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Todas estas páginas heredarán el Navbar y el Footer de manera automática */}
        <Route element={<MainLayout />}>
          {/* Rutas Principales */}
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          
          {/* Autenticación y Usuario */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/perfil" element={<Perfil />} />
          
          {/* Adicionales */}
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/contacto" element={<Contacto />} />
          
          {/* Requisito obligatorio: Página 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
