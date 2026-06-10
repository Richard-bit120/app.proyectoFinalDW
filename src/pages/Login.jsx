// src/pages/Login.jsx
import { useState, useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Alert, CircularProgress, Paper } from '@mui/material';
import { UserContext } from '../contexts/UserContext';

export const Login = () => {
  const { login, loading, error } = useContext(UserContext);
  const navigate = useNavigate();

  // useState obligatorio para controlar los campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validacionError, setValidacionError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidacionError(null);

    // Requisito: Validaciones básicas
    if (!email || !password) {
      setValidacionError('Por favor, completa todos los campos.');
      return;
    }

    if (!email.includes('@')) {
      setValidacionError('Por favor, ingresa un formato de email válido.');
      return;
    }

    // Ejecutamos la función de login del Contexto (que adentro usa fetch y useEffect)
    const exito = await login(email, password);
    if (exito) {
      navigate('/perfil'); // Redirección al perfil tras loguearse
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" align="center" fontWeight="bold" gutterBottom>
          Iniciar Sesión
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Ingresa tus credenciales para acceder a tu cuenta de FakeStore.
        </Typography>

        {/* Feedback visual de errores locales o de la API */}
        {(validacionError || error) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {validacionError || error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          {/* Requisito: Input Email */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Correo Electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          {/* Requisito: Input Password */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Requisito: Botón ingresar */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 3, mb: 2, py: 1.2, fontWeight: 'bold' }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Ingresar'}
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            ¿No tenés una cuenta?{' '}
            <Button component={RouterLink} to="/registro" variant="text" size="small">
              Registrate acá
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};