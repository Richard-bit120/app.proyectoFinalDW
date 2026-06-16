// src/pages/Perfil.jsx
import { useContext } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom"; // O usar directamente botones de redirección
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Avatar,
  Divider,
  Alert,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { UserContext } from "../contexts/UserContext";
import { CartContext } from "../contexts/CartContext";

export const Perfil = () => {
  const { usuario, logout } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  // Requisito obligatorio: Calcular la cantidad acumulada de ítems en el carrito
  const totalItemsEnCarrito = cart.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  // Requisito obligatorio: Si no está logueado, mostrar mensaje correspondiente
  if (!usuario) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          No has iniciado sesión. Debes autenticarte para ver los datos de tu
          perfil.
        </Alert>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => navigate("/login")}
        >
          Ir al Login
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{ p: 4, mt: 4, borderRadius: 2, textAlign: "center" }}
      >
        {/* Avatar Estético usando el Nombre del Usuario */}
        <Avatar
          sx={{
            width: 80,
            height: 80,
            mx: "auto",
            bgcolor: "primary.main",
            mb: 2,
          }}
        >
          {usuario.name[0].toUpperCase()}
        </Avatar>

        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Mi Perfil
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Datos de la cuenta activa.
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Requisito obligatorio: Nombre y Email */}
        <Box sx={{ my: 3, textAlign: "left" }}>
          <Typography variant="subtitle1" color="text.secondary">
            <strong>Nombre:</strong> {usuario.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Email:</strong> {usuario.email}
          </Typography>

          {/* Requisito obligatorio: Cantidad de productos en carrito */}
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Productos en Carrito:</strong> {totalItemsEnCarrito}{" "}
            {totalItemsEnCarrito === 1 ? "unidad" : "unidades"}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Acciones del Perfil */}
        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<ShoppingCartIcon />}
            onClick={() => navigate("/carrito")}
          >
            Ver Carrito
          </Button>
          <Button variant="contained" color="error" fullWidth onClick={logout}>
            Cerrar Sesión
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
