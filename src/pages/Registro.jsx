// src/pages/Registro.jsx
import { useState, useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Alert, CircularProgress, Paper } from '@mui/material';
import { UserContext } from '../contexts/UserContext';

export const Registro = () => {
  const { registro, loading, error } = useContext(UserContext);
  const navigate = useNavigate();

  // useStates obligatorios para el formulario de registro
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validacionError, setValidacionError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidacionError(null);

    // Requisito: Validaciones básicas
    if (!nombre || !email || !password || !confirmPassword) {
      setValidacionError('Todos los campos son obligatorios.');
      return;
    }

    if (password.length < 4) {
      setValidacionError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    // Requisito: Validar Confirmar Password
    if (password !== confirmPassword) {
      setValidacionError('Las contraseñas no coinciden.');
      return;
    }

    // Disparamos la creación de usuario en el Contexto
    const exito = await registro(nombre, email, password);
    if (exito) {
      navigate('/perfil'); // Lo mandamos derecho al perfil ya logueado
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 2, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" align="center" fontWeight="bold" gutterBottom>
          Crear Cuenta
        </Typography>
        
        {/* Renderizado de alertas */}
        {(validacionError || error) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {validacionError || error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          {/* Requisito: Nombre */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nombre Completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          {/* Requisito: Email */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Correo Electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Requisito: Password */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Requisito: Confirmar Password */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirmar Contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Botón de acción */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            disabled={loading}
            sx={{ mt: 3, mb: 2, py: 1.2, fontWeight: 'bold' }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Registrarse'}
          </Button>

          <Typography variant="body2" align="center">
            ¿Ya tenés cuenta?{' '}
            <Button component={RouterLink} to="/login" variant="text" size="small">
              Ingresá acá
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};