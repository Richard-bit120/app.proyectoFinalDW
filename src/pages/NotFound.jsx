// src/pages/NotFound.jsx
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h1" fontWeight="bold" color="primary.main" sx={{ fontSize: '6rem' }}>
        404
      </Typography>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Página no encontrada
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Lo sentimos, la ruta que estás intentando acceder no existe o fue movida temporalmente.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        startIcon={<HomeIcon />} 
        onClick={() => navigate('/')}
      >
        Volver a la Página Principal
      </Button>
    </Container>
  );
};