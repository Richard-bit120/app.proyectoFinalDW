// src/contexts/UserContext.jsx
import { createContext, useState } from 'react';
import { apiService } from '../services/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Estados obligatorios para usuario y feedback visual (loading/error)
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función obligatoria: login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Intentamos autenticar con la API de Platzi
      const data = await apiService.login(email, password);
      
      if (data.access_token) {
        // Para cumplir la consigna de forma simple guardamos los datos básicos del form
        // (La API real requiere otro fetch para sacar el perfil, pero guardando el email ya nos sirve)
        setUsuario({ email, name: email.split('@')[0] });
        return true;
      }
    } catch (err) {
      setError('Credenciales inválidas. Intenta de nuevo.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Función obligatoria: registro
  const registro = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      await apiService.register(name, email, password);
      // Tras un registro exitoso, podemos auto-loguear al usuario
      setUsuario({ name, email });
      return true;
    } catch (err) {
      setError('Error al registrar el usuario. El email podría estar duplicado.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Función obligatoria: logout
  const logout = () => {
    setUsuario(null);
  };

  return (
    <UserContext.Provider value={{ usuario, loading, error, login, registro, logout }}>
      {children}
    </UserContext.Provider>
  );
};