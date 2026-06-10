// src/components/Navbar.jsx
import { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Necesitas instalar @mui/icons-material
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { UseCategories } from '../hooks/useCategories';
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';

export const Navbar = () => {
  const { categories } = UseCategories();
  const { cart } = useContext(CartContext);
  const { usuario, logout } = useContext(UserContext);
  const navigate = useNavigate();

  // Calcular la cantidad total de productos en el carrito
  const cantidadCarrito = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        {/* Logo y Nombre del E-commerce */}
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold', flexGrow: 1 }}
        >
          FakeStore 🛒
        </Typography>

        {/* Navbar con categorías de la API */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, mr: 2 }}>
          <Button component={RouterLink} to="/productos" color="inherit">
            Todos
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              component={RouterLink}
              to={`/productos?categoria=${cat.id}`}
              color="inherit"
              sx={{ textTransform: 'capitalize' }}
            >
              {cat.name}
            </Button>
          ))}
          <Button component={RouterLink} to="/contacto" color="inherit">
            Contacto
          </Button>
        </Box>

        {/* Sección de Carrito y Usuario */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Botón Carrito con Badge de cantidad */}
          <IconButton component={RouterLink} to="/carrito" color="inherit">
            <Badge badgeContent={cantidadCarrito} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Estado de Usuario (Bienvenida / Login) */}
          {usuario ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                ¡Hola, {usuario.name}!
              </Typography>
              <IconButton component={RouterLink} to="/perfil" color="inherit">
                <AccountCircleIcon />
              </IconButton>
              <Button color="error" variant="contained" size="small" onClick={logout}>
                Salir
              </Button>
            </Box>
          ) : (
            <Button component={RouterLink} to="/login" color="inherit" variant="outlined">
              Ingresar
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};