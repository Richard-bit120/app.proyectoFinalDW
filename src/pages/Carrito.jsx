// src/pages/Carrito.jsx
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  IconButton,
  Divider,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CartContext } from "../contexts/CartContext";

export const Carrito = () => {
  // Consumimos todas las funciones y estados obligatorios del CartContext
  const { cart, total, eliminarProducto, vaciarCarrito } =
    useContext(CartContext);

  // Si el carrito no tiene elementos, mostramos un aviso estético y un botón de retorno
  if (cart.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Tu carrito de compras está vacío actualmente. ¡Anímate a agregar algún
          producto!
        </Alert>
        <Button
          component={RouterLink}
          to="/productos"
          variant="contained"
          startIcon={<ArrowBackIcon />}
        >
          Ir al catálogo de productos
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h1"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 4 }}
      >
        Tu Carrito de Compras 🛒
      </Typography>

      <Grid container spacing={4}>
        {/* Lado Izquierdo: Listado de Productos Agregados */}
        <Grid item xs={12} md={8}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {cart.map((item) => {
              // Limpieza de URL para compatibilidad con la API de Platzi
              const imageUrl =
                product?.images[0]?.replace(/[\[\]"]/g, "") ||
                "https://via.placeholder.com/640";

              // Requisito: Precio subtotal por tipo de producto (cantidad * precio unitario)
              const subtotalItem = item.product.price * item.quantity;

              return (
                <Paper
                  key={item.product.id}
                  elevation={1}
                  sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}
                >
                  {/* Requisito: Imagen */}
                  <Box
                    component="img"
                    src={imageUrl}
                    alt={item.product.title}
                    sx={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 1,
                    }}
                  />

                  {/* Requisito: Nombre e información básica */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
                    >
                      {item.product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Precio unitario: ${item.product.price}
                    </Typography>
                    {/* Requisito: Cantidad */}
                    <Typography
                      variant="body2"
                      color="text.primary"
                      fontWeight="medium"
                    >
                      Cantidad: {item.quantity}
                    </Typography>
                  </Box>

                  {/* Requisito: Precio Subtotal e Icono Eliminar */}
                  <Box
                    sx={{
                      textAlign: "right",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="primary.main"
                    >
                      Subtotal: ${subtotalItem}
                    </Typography>

                    {/* Requisito: Eliminar producto */}
                    <IconButton
                      color="error"
                      onClick={() => eliminarProducto(item.product.id)}
                      title="Eliminar producto"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Paper>
              );
            })}
          </Box>

          {/* Requisito: Vaciar carrito completo */}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-start" }}>
            <Button
              variant="outlined"
              color="error"
              onClick={vaciarCarrito}
              startIcon={<DeleteIcon />}
            >
              Vaciar Carrito
            </Button>
          </Box>
        </Grid>

        {/* Lado Derecho: Resumen de Compra */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{ p: 3, borderRadius: 2, bgcolor: "background.paper" }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Resumen del Pedido
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="body1">Productos seleccionados:</Typography>
              <Typography variant="body1" fontWeight="bold">
                {cart.reduce((acc, item) => acc + item.quantity, 0)} uds.
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Requisito: Total */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}
            >
              <Typography variant="h5" fontWeight="bold">
                Total:
              </Typography>
              <Typography variant="h5" fontWeight="bold" color="secondary.main">
                ${total}
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
              startIcon={<ShoppingBagIcon />}
              onClick={() =>
                alert("¡Simulación de checkout completada con éxito!")
              }
              sx={{ fontWeight: "bold", py: 1.5 }}
            >
              Proceder al Pago
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
