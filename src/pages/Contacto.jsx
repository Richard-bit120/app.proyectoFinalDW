// src/pages/Contacto.jsx
import { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export const Contacto = () => {
  // useStates obligatorios para manejar inputs del formulario y mensajes de éxito
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  
  const [errorLocal, setErrorLocal] = useState(null);
  const [enviadoExitoso, setEnviadoExitoso] = useState(false); // Controla el mensaje de éxito

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorLocal(null);

    // Validaciones básicas antes del envío
    if (!nombre || !email || !asunto || !mensaje) {
      setErrorLocal('Por favor, completa todos los campos del formulario de contacto.');
      return;
    }

    if (!email.includes('@')) {
      setErrorLocal('El formato de correo electrónico ingresado no es válido.');
      return;
    }

    // Requisito obligatorio: Mostrar mensaje de envío exitoso
    setEnviadoExitoso(true);
    
    // Limpiamos los inputs del formulario simulando el éxito
    setNombre('');
    setEmail('');
    setAsunto('');
    setMensaje('');
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 2, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Contacto
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          ¿Tienes alguna duda, consulta técnica o sugerencia? Déjanos tu mensaje y el equipo te responderá a la brevedad.
        </Typography>

        {/* Renderizado Condicional del Mensaje de Envío Exitoso */}
        {enviadoExitoso && (
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setEnviadoExitoso(false)}>
            ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo muy pronto.
          </Alert>
        )}

        {errorLocal && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorLocal}
          </Alert>
        )}

        <Box component="form" onSubmit={handleFormSubmit} noValidate>
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

          {/* Requisito: Asunto */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Asunto"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
          />

          {/* Requisito: Mensaje (Multilínea) */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Mensaje"
            multiline
            rows={4}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            endIcon={<SendIcon />}
            sx={{ mt: 3, px: 4, fontWeight: 'bold' }}
          >
            Enviar Mensaje
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};