// ============================================
// CONFIGURACIÓN DE API
// ============================================
// TODO: Reemplaza estas URLs con las de tu servidor

export const API_CONFIG = {
  BASE_URL: 'http://tu-servidor.com/api', // Cambiar por tu URL
  ENDPOINTS: {
    // Autenticación
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    
    // Sensor DHT22
    SENSOR_DATA: '/sensor/current',
    SENSOR_HISTORY: '/sensor/history',
    
    // Control de dispositivos
    LED_CONTROL: '/led/control',
    LCD_UPDATE: '/lcd/update',
    KEYPAD_INPUT: '/keypad/input'
  }
};

// Función helper para obtener headers con autenticación
export const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

// Función helper para manejar respuestas de la API
export const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Error en la petición');
  }
  return response.json();
};