// src/components/MainLayout.jsx
import { Box, Container } from '@mui/material'; // Importamos Container
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const MainLayout = () => {
  return (
    // Flexbox para asegurar que el footer quede abajo si la pantalla tiene poco contenido
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      {/* Contenedor principal de las páginas con ancho fluido global */}
      <Container 
        component="main" 
        maxWidth={false} // Rompe el límite del ancho rígido (100% fluido)
        disableGutters   // Elimina los márgenes internos predeterminados
        sx={{ flexGrow: 1, px: 4, py: 3 }} // Agrega un colchón de aire limpio en los costados
      >
        <Outlet />
      </Container>
      
      <Footer />
    </Box>
  );
};
