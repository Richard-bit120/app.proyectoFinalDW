// src/components/MainLayout.jsx
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const MainLayout = () => {
  return (
    // Flexbox para asegurar que el footer quede abajo si la pantalla tiene poco contenido
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      {/* Contenedor principal de las páginas */}
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Outlet />
      </Box>
      
      <Footer />
    </Box>
  );
};