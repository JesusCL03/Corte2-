// ============================================
// SERVICIO DE AUTENTICACIÓN
// ============================================
import { API_CONFIG, handleResponse } from '../config/api.config';

// TODO: Función de Login - Conectar con tu API
export const loginUser = async (username, password) => {
  try {
    // ==== REEMPLAZAR ESTA SECCIÓN CON TU LLAMADA A LA API ====
    /*
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });

    const data = await handleResponse(response);
    
    // Guardar token de autenticación
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    
    // Guardar información del usuario
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return { success: true, data };
    */

    // CÓDIGO TEMPORAL PARA DEMOSTRACIÓN (REMOVER AL CONECTAR TU API)
    if (username === 'admin' && password === 'admin') {
      // Simular token (esto debe venir de tu API)
      localStorage.setItem('authToken', 'demo-token-12345');
      localStorage.setItem('user', JSON.stringify({ username }));
      
      return { success: true, data: { username } };
    } else {
      throw new Error('Credenciales incorrectas');
    }
    // ==== FIN DE LA SECCIÓN A REEMPLAZAR ====

  } catch (error) {
    return { success: false, error: error.message };
  }
};

// TODO: Función de Registro - Conectar con tu API
export const registerUser = async (userData) => {
  try {
    // ==== REEMPLAZAR ESTA SECCIÓN CON TU LLAMADA A LA API ====
    /*
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userData.username,
        email: userData.email,
        password: userData.password
      })
    });

    const data = await handleResponse(response);
    return { success: true, data };
    */

    // CÓDIGO TEMPORAL PARA DEMOSTRACIÓN (REMOVER AL CONECTAR TU API)
    console.log('Registrando usuario:', userData);
    
    // Validación básica
    if (!userData.username || !userData.email || !userData.password) {
      throw new Error('Todos los campos son requeridos');
    }
    
    return { 
      success: true, 
      data: { 
        message: 'Usuario registrado exitosamente',
        username: userData.username 
      } 
    };
    // ==== FIN DE LA SECCIÓN A REEMPLAZAR ====

  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Función para cerrar sesión
export const logoutUser = () => {
  // Limpiar datos del localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  
  // TODO: Si tu API requiere invalidar el token en el servidor:
  /*
  const token = localStorage.getItem('authToken');
  if (token) {
    fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGOUT}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).catch(err => console.error('Error al cerrar sesión:', err));
  }
  */
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return token !== null;
};

// Función para obtener el usuario actual
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};