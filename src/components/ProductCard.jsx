// src/components/ProductCard.jsx
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';

export const ProductCard = ({ product }) => {
  // Limpieza rápida de la URL de la imagen (la API a veces devuelve strings con corchetes)
  const imageUrl = product.images[0]?.replace(/[\[\]"]/g, '') || 'https://via.placeholder.com/640';

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Requisito: Imagen */}
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={product.title}
        sx={{ objectFit: 'cover' }}
      />
      
      {/* Requisito: Nombre y Precio */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2" noWrap>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Categoría: {product.category?.name}
        </Typography>
        <Typography variant="h6" color="primary.main" fontWeight="bold">
          ${product.price}
        </Typography>
      </CardContent>

      {/* Requisito: Botón "Ver detalle" */}
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          component={RouterLink}
          to={`/producto/${product.id}`}
          variant="contained"
          color="primary"
          fullWidth
        >
          Ver detalle
        </Button>
      </Box>
    </Card>
  );
};