// src/App.jsx
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import { AppRoutes } from './routes/AppRoutes';

// Definimos un estilo y paleta de colores consistente con MUI (Libre elección)
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Azul clásico para el e-commerce
    },
    secondary: {
      main: '#ff9800', // Naranja para botones de acción como "Agregar al carrito"
    },
    background: {
      default: '#f5f5f5', // Fondo gris claro muy sutil para las páginas
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline normaliza los estilos CSS entre navegadores */}
      <CssBaseline /> 
      <UserProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;