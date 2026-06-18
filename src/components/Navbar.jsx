// src/components/Navbar.jsx
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Badge,
  IconButton,
  Link,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront"; // Icono de la tienda a la izquierda
import { CartContext } from "../contexts/CartContext";

export const Navbar = () => {
  const { cart } = useContext(CartContext);

  // Calcular la cantidad total de productos para la burbuja
  const cantidadCarrito =
    cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#1976d2", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Bloque Izquierdo: Icono de tienda + Nombre */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <StorefrontIcon sx={{ color: "#ffffff" }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#ffffff",
              fontSize: "1.1rem",
            }}
          >
            FAKE STORE
          </Typography>
        </Box>

        {/* Bloque Derecho: Enlaces fijos y Carrito */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {/* Enlaces de Texto exactamente como tu captura */}
          <Link
            component={RouterLink}
            to="/"
            color="inherit"
            underline="none"
            sx={{
              fontSize: "0.85rem",
              opacity: 0.85,
              "&:hover": { opacity: 1 },
            }}
          >
            HOME
          </Link>
          <Link
            component={RouterLink}
            to="/productos"
            color="inherit"
            underline="none"
            sx={{
              fontSize: "0.85rem",
              opacity: 0.85,
              "&:hover": { opacity: 1 },
            }}
          >
            PRODUCTOS
          </Link>
          <Link
            component={RouterLink}
            to="/contacto"
            color="inherit"
            underline="none"
            sx={{
              fontSize: "0.85rem",
              opacity: 0.85,
              "&:hover": { opacity: 1 },
            }}
          >
            CONTACTO
          </Link>
          <Link
            component={RouterLink}
            to="/login"
            color="inherit"
            underline="none"
            sx={{ fontSize: "0.85rem", fontWeight: "bold" }}
          >
            LOGIN
          </Link>
          <Link
            component={RouterLink}
            to="/registro"
            color="inherit"
            underline="none"
            sx={{
              fontSize: "0.85rem",
              opacity: 0.85,
              "&:hover": { opacity: 1 },
            }}
          >
            REGISTRO
          </Link>

          {/* Icono de Carrito Blanco */}
          <IconButton
            component={RouterLink}
            to="/carrito"
            sx={{ color: "#ffffff", p: 0.5 }}
          >
            <Badge badgeContent={cantidadCarrito} color="error">
              <ShoppingCartIcon sx={{ fontSize: "1.4rem" }} />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
