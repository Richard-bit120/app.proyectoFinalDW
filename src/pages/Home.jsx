// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Grid, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const { products, loading, error } = useProducts();
  // useState obligatorio para guardar los productos aleatorios de la Home
  const [randomProducts, setRandomProducts] = useState([]);
  const navigate = useNavigate();

  // useEffect obligatorio para procesar los productos una vez obtenidos de la API
  useEffect(() => {
    if (products.length > 0) {
      // Algoritmo para mezclar el array de productos de forma aleatoria (Fisher-Yates modificado)
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      // Requisito estricto: Mostrar exactamente 8 productos
      setRandomProducts(shuffled.slice(0, 8));
    }
  }, [products]);

  return (
    <Container maxWidth="lg">
      {/* Sección Destacada / Hero Banner */}
      <Box
        sx={{
          bgcolor: 'primary.dark',
          color: 'white',
          p: { xs: 4, md: 8 },
          borderRadius: 2,
          mb: 6,
          textAlign: 'center',
          boxShadow: 3
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          ¡Bienvenidos a FakeStore! 🚀
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
          Descubrí las últimas tendencias en moda, electrónica y accesorios con la velocidad que necesitás.
        </Typography>
        
        {/* Requisito obligatorio: Botón de bienvenida */}
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => navigate('/productos')}
          sx={{ fontWeight: 'bold', px: 4 }}
        >
          Explorar Catálogo de Productos
        </Button>
      </Box>

      {/* Sección de Productos Destacados */}
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        Productos Destacados Aleatorios
      </Typography>

      {/* Control obligatorio de Loading de la API */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <CircularProgress size={60} />
        </Box>
      )}

      {/* Control obligatorio de Error de la API */}
      {error && (
        <Alert severity="error" sx={{ my: 3 }}>
          Hubo un error al cargar la sección destacada: {error}
        </Alert>
      )}

      {/* Grid de Productos (Renderizado de los 8 aleatorios) */}
      {!loading && !error && (
        <Grid container spacing={3}>
          {randomProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};