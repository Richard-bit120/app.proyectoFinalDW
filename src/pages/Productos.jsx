// src/pages/Productos.jsx
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Grid, TextField, MenuItem, Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { ProductCard } from '../components/ProductCard';

export const Productos = () => {
  // 1. Consumo de Custom Hooks obligatorios
  const { products, loading, error } = useProducts();
  const { categories } = useCategories();

  // Permite leer los query params de la URL (?categoria=ID) que vienen del Navbar
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoriaInicial = queryParams.get('categoria') || 'todos';

  // 2. useStates obligatorios (Buscador y filtros)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoriaInicial);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Sincronizar el filtro de categoría si el usuario hace clic en el Navbar
  useEffect(() => {
    setSelectedCategory(categoriaInicial);
  }, [categoriaInicial]);

  // 3. useEffect obligatorio para aplicar filtros combinados (Buscador + Categoría)
  useEffect(() => {
    let result = [...products];

    // Filtro por categoría (si no es 'todos')
    if (selectedCategory !== 'todos') {
      result = result.filter(
        (product) => product.category && product.category.id === parseInt(selectedCategory)
      );
    }

    // Buscador por nombre (Ignora mayúsculas/minúsculas)
    if (searchQuery.trim() !== '') {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, products]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
        Catálogo Completo
      </Typography>

      {/* Sección de Filtros (Buscador + Select de Categorías) */}
      <Box sx={{ display: 'flex', flexDir: { xs: 'column', sm: 'row' }, gap: 2, mb: 5 }}>
        {/* Requisito obligatorio: Buscador por nombre */}
        <TextField
          label="Buscar producto por nombre..."
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Requisito obligatorio: Filtro por categoría */}
        <TextField
          select
          label="Categoría"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          sx={{ minWidth: { sm: 200 } }}
        >
          <MenuItem value="todos">Todas las categorías</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Control obligatorio de Loading */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress size={50} />
        </Box>
      )}

      {/* Control obligatorio de Error */}
      {error && (
        <Alert severity="error" sx={{ my: 3 }}>
          No pudimos conectar con el catálogo de Platzi: {error}
        </Alert>
      )}

      {/* Feedback si la búsqueda no arroja resultados */}
      {!loading && !error && filteredProducts.length === 0 && (
        <Alert severity="info" sx={{ mt: 2 }}>
          No se encontraron productos que coincidan con los filtros aplicados.
        </Alert>
      )}

      {/* Requisito obligatorio: Grid de Cards de Material UI */}
      {!loading && !error && (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};