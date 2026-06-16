// src/services/api.js

const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const apiService = {
  // Obtener todos los productos o filtrados
  getProducts: async () => {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) throw new Error('Error al obtener los productos');
    return await response.json();
  },

  // Obtener un solo producto por ID
  getProductById: async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Producto no encontrado');
    return await response.json();
  },

  // Obtener todas las categorías
  getCategories: async () => {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) throw new Error('Error al obtener las categorías');
    return await response.json();
  },

  // Simulación de Login (La API de Platzi provee auth, pero adaptamos a los requisitos)
  login: async (email, password) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) throw new Error('Credenciales incorrectas');
    return await response.json(); // Retorna el access_token
  },

  // Simulación de Registro de usuario
  register: async (name, email, password) => {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
        avatar: "https://picsum.photos/640/640" // Avatar por defecto requerido por la API
      })
    });
    if (!response.ok) throw new Error('No se pudo registrar el usuario');
    return await response.json();
  }
};