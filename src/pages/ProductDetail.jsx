// src/pages/ProductDetail.jsx
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { apiService } from "../services/api";
import { CartContext } from "../contexts/CartContext";

export const ProductDetail = () => {
  // 1. Capturamos el ID que viene en la ruta (/producto/12)
  const { id } = useParams();
  const navigate = useNavigate();

  // 2. Consumimos el contexto global del carrito
  const { agregarProducto } = useContext(CartContext);

  // 3. useStates locales obligatorios para el control de la API en esta vista
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 4. useEffect obligatorio para buscar el producto por ID al montar el componente
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || "No se pudo cargar el detalle del producto.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetail();
    }
  }, [id]);

  // Manejador para la acción del botón de compra
  const handleAgregar = () => {
    if (product) {
      agregarProducto(product, 1); // Agregamos 1 unidad por defecto
      // Opcional: Podríamos redirigir al carrito o mostrar un aviso, lo dejamos fluido
    }
  };

  // Control obligatorio de Loading
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Control obligatorio de Error
  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => navigate("/productos")}
            >
              Volver al catálogo
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  // Limpieza rápida de corchetes en las imágenes que devuelve a veces la Fake API de Platzi
  const imageUrl =
    product?.images[0]?.replace(/[\[\]"]/g, "") ||
    "https://via.placeholder.com/640";

  return (
    <Container maxWidth="lg">
      {/* Botón para regresar al catálogo rápidamente */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Volver atrás
      </Button>

      <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
        <Grid container spacing={4}>
          {/* Requisito obligatorio: Imagen grande */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={imageUrl}
              alt={product?.title}
              sx={{
                width: "100%",
                height: 600,
                objectFit: "cover",
                borderRadius: 2,
                boxShadow: 1,
              }}
            />
          </Grid>

          {/* Requisito obligatorio: Título, Descripción, Precio, Categoría */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "#065596",
              color: "#ffffff",
            }}
          >
            <Typography
              variant="overline"
              color="text.secondary"
              fontWeight="bold"
            >
              Categoría: {product?.category?.name}
            </Typography>

            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              gutterBottom
              sx={{ mt: 1 }}
            >
              {product?.title}
            </Typography>

            <Typography
              variant="h4"
              color="primary.main"
              fontWeight="bold"
              sx={{ my: 2 }}
            >
              ${product?.price}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ lineHeight: 1.7, mb: 4 }}
            >
              {product?.description}
            </Typography>

            {/* Requisito obligatorio: Botón agregar al carrito */}
            <Box>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<AddShoppingCartIcon />}
                onClick={handleAgregar}
                sx={{ fontWeight: "bold", px: 4, py: 1.5 }}
              >
                Agregar al carrito
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
