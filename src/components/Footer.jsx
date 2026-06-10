// src/components/Footer.jsx
import { Box, Container, Grid, Typography, Link } from '@mui/material';

export const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'text.primary', color: 'white', py: 4, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Columna 1: Empresa */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              FakeStore S.A.
            </Typography>
            <Typography variant="body2" color="grey.400">
              Tu e-commerce de confianza para proyectos académicos y desarrollo de software.
            </Typography>
          </Grid>

          {/* Columna 2: Contacto obligatorio */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Contacto
            </Typography>
            <Typography variant="body2" color="grey.400">
              Email: soporte@fakestore.com
            </Typography>
            <Typography variant="body2" color="grey.400">
              Teléfono: +54 (376) 4123456
            </Typography>
            <Typography variant="body2" color="grey.400">
              Dirección: Av. Corrientes 1234, Posadas, Misiones
            </Typography>
          </Grid>

          {/* Columna 3: Redes Sociales Ficticias */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Síguenos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Link href="https://facebook.com" target="_blank" color="grey.400" underline="hover">
                Facebook
              </Link>
              <Link href="https://instagram.com" target="_blank" color="grey.400" underline="hover">
                Instagram
              </Link>
              <Link href="https://twitter.com" target="_blank" color="grey.400" underline="hover">
                Twitter / X
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ borderTop: '1px solid #333', mt: 3, pt: 2, textCenter: 'center' }}>
          <Typography variant="body2" color="grey.500" align="center">
            © {new Date().getFullYear()} FakeStore. Todos los derechos reservados. Desarrollo de Software.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};