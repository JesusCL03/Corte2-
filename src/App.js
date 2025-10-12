import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, Home, LogOut, User, Lightbulb, Activity, Monitor, Grid3x3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Componente principal de la aplicación
function App() {
  // Estado para controlar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Estado para controlar qué página mostrar
  const [currentPage, setCurrentPage] = useState('home');
  
  // Estado para almacenar el usuario actual
  const [currentUser, setCurrentUser] = useState('');
  
  // Estado global para historial completo (compartido entre componentes)
  const [fullHistory, setFullHistory] = useState([]);

  // Componente de Login 
  const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
      if (username === 'admin' && password === 'admin') {
        setCurrentUser(username);
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
        {/* Efectos de fondo decorativos */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-white/10 rounded-full -top-48 -left-48 blur-3xl"></div>
          <div className="absolute w-96 h-96 bg-white/10 rounded-full -bottom-48 -right-48 blur-3xl"></div>
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10">
          {/* Encabezado del login */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <Thermometer className="text-white" size={40} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              DHT22 
            </h1>
            <p className="text-gray-600 mt-2">Sistema de Control </p>
            <p className="text-gray-600 mt-2">by Jesus Castillo y Camilo Gonzales </p>
          </div>

          {/* Formulario de login */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="Ingresa tu usuario"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="Ingresa tu contraseña"
              />
            </div>

            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded">
                <p className="font-semibold">{error}</p>
              </div>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition duration-200 font-semibold"
            >
              Iniciar Sesión
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Demo: usuario: <strong>admin</strong> / contraseña: <strong>admin</strong></p>
          </div>
        </div>
      </div>
    );
  };

  // Componente de Navegación 
  const Navbar = () => {
    return (
      <nav className="bg-white shadow-lg border-b-2 border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
                <Thermometer className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                DHT22 
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage('home')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition font-medium ${
                  currentPage === 'home' 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Home size={20} />
                <span>Inicio</span>
              </button>

              <button
                onClick={() => setCurrentPage('sensor')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition font-medium ${
                  currentPage === 'sensor' 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Activity size={20} />
                <span>Dashboard</span>
              </button>

              <div className="flex items-center space-x-3 border-l-2 border-gray-200 pl-4 ml-2">
                <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                  <User size={18} className="text-indigo-600" />
                  <span className="text-gray-700 font-medium">{currentUser}</span>
                </div>
                <button
                  onClick={() => {
                    setIsAuthenticated(false);
                    setCurrentUser('');
                    setCurrentPage('home');
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md"
                >
                  <LogOut size={18} />
                  <span>Salir</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  };

  // Componente de Página Principal Mejorado
  const HomePage = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-12 mb-8 text-white">
            <h1 className="text-5xl font-bold mb-4">
              Sistema de Monitoreo
            </h1>
            <p className="text-xl text-white/90 mb-6">
              Controla y monitorea tu sensor DHT22 Y LEDs
            </p>
            <button
              onClick={() => setCurrentPage('sensor')}
              className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition"
            >
              Ir al Dashboard
            </button>
          </div>

          {/* Tarjetas de características */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="bg-gradient-to-br from-orange-400 to-red-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Thermometer className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Temperatura</h3>
              <p className="text-gray-600">Monitoreo en tiempo real con gráficas históricas</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="bg-gradient-to-br from-blue-400 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Droplets className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Humedad</h3>
              <p className="text-gray-600">Control de humedad relativa del ambiente</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Control LEDs</h3>
              <p className="text-gray-600">3 LEDs controlables desde la interfaz</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="bg-gradient-to-br from-purple-400 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Monitor className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">LCD Display</h3>
              <p className="text-gray-600">Visualización de datos en pantalla LCD</p>
            </div>
          </div>

          {/* Información del sistema */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Componentes del Sistema</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <Thermometer className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Sensor DHT22</h4>
                    <p className="text-gray-600 text-sm">Medición precisa de temperatura y humedad</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Lightbulb className="text-yellow-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">3 LEDs </h4>
                    <p className="text-gray-600 text-sm">Indicadores visuales controlables</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Grid3x3 className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Teclado Matricial </h4>
                    <p className="text-gray-600 text-sm">Entrada de datos y control manual</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Monitor className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">LCD </h4>
                    <p className="text-gray-600 text-sm">Pantalla de visualización local</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Componente de Dashboard del Sensor - MEJORADO CON GRÁFICAS Y CONTROLES
  const SensorPage = () => {
    // Estados para los datos del sensor
    const [temperature, setTemperature] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [lastUpdate, setLastUpdate] = useState(new Date());
    
    // Estados para los LEDs
    const [led1, setLed1] = useState(false);
    const [led2, setLed2] = useState(false);
    const [led3, setLed3] = useState(false);
    
    // Estado para el historial de datos (para las gráficas)
    const [dataHistory, setDataHistory] = useState([]);
    
    // Estado para el display LCD
    const [lcdLine1, setLcdLine1] = useState('DHT22 Sensor');
    const [lcdLine2, setLcdLine2] = useState('Iniciando...');
    
    // Estado para el teclado matricial
    const [keypadInput, setKeypadInput] = useState('');
    
    // Estado para el modo del LCD (menu, temp, hum, both, leds)
    const [lcdMode, setLcdMode] = useState('menu');

    // Efecto para actualizar datos del sensor y gráficas
    useEffect(() => {
      const updateSensorData = () => {
        const newTemp = (Math.random() * 20 + 15).toFixed(1);
        const newHumidity = (Math.random() * 50 + 30).toFixed(1);
        const now = new Date();
        
        setTemperature(newTemp);
        setHumidity(newHumidity);
        setLastUpdate(now);
        
        // Actualizar LCD según el modo seleccionado
        updateLCDDisplay(lcdMode, newTemp, newHumidity);
        
        // Agregar datos al historial (últimos 20 puntos)
        setDataHistory(prev => {
          const newData = [...prev, {
            time: now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            temperatura: parseFloat(newTemp),
            humedad: parseFloat(newHumidity)
          }];
          return newData.slice(-20); // Mantener solo los últimos 20 puntos
        });
      };

      updateSensorData();
      const interval = setInterval(updateSensorData, 5000);
      return () => clearInterval(interval);
    }, [lcdMode]);

    // Función para actualizar el LCD según el modo
    const updateLCDDisplay = (mode, temp, hum) => {
      switch(mode) {
        case 'menu':
          setLcdLine1('MENU PRINCIPAL');
          setLcdLine2('Presiona 1-5');
          break;
        case 'temp':
          setLcdLine1('TEMPERATURA');
          setLcdLine2(`${temp} C`);
          break;
        case 'hum':
          setLcdLine1('HUMEDAD');
          setLcdLine2(`${hum} %`);
          break;
        case 'both':
          setLcdLine1(`Temp: ${temp}C`);
          setLcdLine2(`Hum: ${hum}%`);
          break;
        case 'leds':
          setLcdLine1('ESTADO LEDs');
          setLcdLine2(`R:${led1?'ON':'OFF'} G:${led2?'ON':'OFF'} B:${led3?'ON':'OFF'}`);
          break;
        case 'time':
          const now = new Date();
          setLcdLine1('HORA ACTUAL');
          setLcdLine2(now.toLocaleTimeString('es-ES'));
          break;
        default:
          setLcdLine1('DHT22 Sensor');
          setLcdLine2('Sistema OK');
      }
    };

    // Función para manejar clics en el teclado matricial
    const handleKeypadClick = (key) => {
      if (key === 'C') {
        // Limpiar entrada
        setKeypadInput('');
        setLcdLine1('ENTRADA');
        setLcdLine2('BORRADA');
        setTimeout(() => updateLCDDisplay(lcdMode, temperature, humidity), 1000);
      } else if (key === '#') {
        // Procesar comando
        processKeypadCommand(keypadInput);
        setKeypadInput('');
      } else {
        // Agregar tecla a la entrada
        setKeypadInput(prev => {
          const newInput = prev + key;
          // Mostrar entrada en el LCD
          setLcdLine1('ENTRADA:');
          setLcdLine2(newInput);
          return newInput;
        });
      }
    };

    // Función para procesar comandos del teclado
    const processKeypadCommand = (command) => {
      switch(command) {
        case '1':
          // Mostrar solo temperatura
          setLcdMode('temp');
          updateLCDDisplay('temp', temperature, humidity);
          break;
        case '2':
          // Mostrar solo humedad
          setLcdMode('hum');
          updateLCDDisplay('hum', temperature, humidity);
          break;
        case '3':
          // Mostrar ambos valores
          setLcdMode('both');
          updateLCDDisplay('both', temperature, humidity);
          break;
        case '4':
          // Mostrar estado de LEDs
          setLcdMode('leds');
          updateLCDDisplay('leds', temperature, humidity);
          break;
        case '5':
          // Mostrar hora actual
          setLcdMode('time');
          updateLCDDisplay('time', temperature, humidity);
          break;
        case '0':
          // Volver al menú principal
          setLcdMode('menu');
          updateLCDDisplay('menu', temperature, humidity);
          break;
        case 'A':
          // Encender LED 1
          setLed1(true);
          setLcdLine1('LED 1 ROJO');
          setLcdLine2('ENCENDIDO');
          setTimeout(() => updateLCDDisplay(lcdMode, temperature, humidity), 2000);
          break;
        case 'B':
          // Encender LED 2
          setLed2(true);
          setLcdLine1('LED 2 VERDE');
          setLcdLine2('ENCENDIDO');
          setTimeout(() => updateLCDDisplay(lcdMode, temperature, humidity), 2000);
          break;
        case 'C':
          // Encender LED 3
          setLed3(true);
          setLcdLine1('LED 3 AZUL');
          setLcdLine2('ENCENDIDO');
          setTimeout(() => updateLCDDisplay(lcdMode, temperature, humidity), 2000);
          break;
        case 'D':
          // Apagar todos los LEDs
          setLed1(false);
          setLed2(false);
          setLed3(false);
          setLcdLine1('TODOS LOS LEDs');
          setLcdLine2('APAGADOS');
          setTimeout(() => updateLCDDisplay(lcdMode, temperature, humidity), 2000);
          break;
        case '*':
          // Comando especial: Mostrar info del sistema
          setLcdLine1('SISTEMA DHT22');
          setLcdLine2('VERSION 1.0');
          setTimeout(() => updateLCDDisplay(lcdMode, temperature, humidity), 2000);
          break;
        default:
          // Comando no reconocido
          setLcdLine1('COMANDO');
          setLcdLine2('NO VALIDO');
          setTimeout(() => updateLCDDisplay(lcdMode, temperature, humidity), 2000);
      }
    };

    // Función para toggle de LEDs (aquí conectarías con tu API)
    const toggleLED = (ledNumber) => {
      switch(ledNumber) {
        case 1:
          setLed1(!led1);
          // Aquí harías: fetch('/api/led1/toggle')
          break;
        case 2:
          setLed2(!led2);
          break;
        case 3:
          setLed3(!led3);
          break;
        default:
          break;
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header del Dashboard */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Monitoreo</h1>
                <p className="text-gray-600">Última actualización: {lastUpdate.toLocaleTimeString('es-ES')}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-600 font-semibold">En línea</span>
              </div>
            </div>
          </div>

          {/* Tarjetas de Temperatura y Humedad */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Temperatura */}
            <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-xl p-8 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Temperatura</h2>
                <Thermometer size={48} className="opacity-90" />
              </div>
              <div className="text-center my-6">
                <div className="text-6xl font-bold mb-2">{temperature}°C</div>
                <p className="text-white/90 text-lg">Temperatura Ambiente</p>
              </div>
              <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-white h-full transition-all duration-500 rounded-full"
                  style={{ width: `${(temperature / 50) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Humedad */}
            <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl shadow-xl p-8 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Humedad</h2>
                <Droplets size={48} className="opacity-90" />
              </div>
              <div className="text-center my-6">
                <div className="text-6xl font-bold mb-2">{humidity}%</div>
                <p className="text-white/90 text-lg">Humedad Relativa</p>
              </div>
              <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-white h-full transition-all duration-500 rounded-full"
                  style={{ width: `${humidity}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Gráfica de Temperatura */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Activity className="mr-2 text-orange-500" />
              Historial de Temperatura
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={dataHistory}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="temperatura" stroke="#f97316" fillOpacity={1} fill="url(#colorTemp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfica de Humedad */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Activity className="mr-2 text-blue-500" />
              Historial de Humedad
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={dataHistory}>
                <defs>
                  <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="humedad" stroke="#3b82f6" fillOpacity={1} fill="url(#colorHum)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Sección de Controles */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Control de LEDs */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Lightbulb className="mr-2 text-yellow-500" />
                Control de LEDs
              </h2>
              <div className="space-y-4">
                {/* LED 1 - Rojo */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full ${led1 ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-gray-300'} transition-all`}></div>
                    <span className="font-semibold text-gray-700">LED 1 </span>
                  </div>
                  <button
                    onClick={() => toggleLED(1)}
                    className={`px-6 py-2 rounded-lg font-semibold transition ${
                      led1 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                    }`}
                  >
                    {led1 ? 'ON' : 'OFF'}
                  </button>
                </div>

                {/* LED 2 - Verde */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full ${led2 ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-300'} transition-all`}></div>
                    <span className="font-semibold text-gray-700">LED 2 </span>
                  </div>
                  <button
                    onClick={() => toggleLED(2)}
                    className={`px-6 py-2 rounded-lg font-semibold transition ${
                      led2 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                    }`}
                  >
                    {led2 ? 'ON' : 'OFF'}
                  </button>
                </div>

                {/* LED 3 - Azul */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full ${led3 ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-gray-300'} transition-all`}></div>
                    <span className="font-semibold text-gray-700">LED 3 </span>
                  </div>
                  <button
                    onClick={() => toggleLED(3)}
                    className={`px-6 py-2 rounded-lg font-semibold transition ${
                      led3 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                    }`}
                  >
                    {led3 ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            </div>

            {/* Display LCD */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Monitor className="mr-2 text-green-500" />
                Display LCD 
              </h2>
              <div className="bg-green-900 p-6 rounded-lg font-mono">
                <div className="bg-green-400 text-green-900 p-4 rounded text-xl font-bold mb-2 tracking-wider">
                  {lcdLine1.padEnd(16, ' ')}
                </div>
                <div className="bg-green-400 text-green-900 p-4 rounded text-xl font-bold tracking-wider">
                  {lcdLine2.padEnd(16, ' ')}
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-4">
                El LCD muestra los valores actuales de la protoboard
              </p>
            </div>

            {/* Teclado Matricial */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Grid3x3 className="mr-2 text-purple-500" />
                Teclado Matricial 
              </h2>
              
              {/* Display de entrada */}
              <div className="bg-gray-800 p-4 rounded-lg mb-4 h-16 flex items-center justify-end">
                <span className="text-green-400 font-mono text-2xl">
                  {keypadInput || '_ _ _ _'}
                </span>
              </div>

              {/* Teclado */}
              <div className="grid grid-cols-4 gap-2">
                {['1', '2', '3', 'A', '4', '5', '6', 'B', '7', '8', '9', 'C', '*', '0', '#', 'D'].map((key) => (
                  <button
                    key={key}
                    onClick={() => handleKeypadClick(key)}
                    className="bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xl py-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition"
                  >
                    {key}
                  </button>
                ))}
              </div>
              
              {/* Menú de comandos */}
              <div className="mt-4 bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-purple-900 mb-2"> Comandos Disponibles:</h3>
                <div className="text-sm text-purple-800 space-y-1">
                  <p><strong>1</strong> + # = Mostrar Temperatura</p>
                  <p><strong>2</strong> + # = Mostrar Humedad</p>
                  <p><strong>3</strong> + # = Mostrar Ambos</p>
                  <p><strong>4</strong> + # = Estado LEDs</p>
                  <p><strong>5</strong> + # = Ver Hora</p>
                  <p><strong>0</strong> + # = Menú Principal</p>
                  <p><strong>A</strong> + # = Encender LED Rojo</p>
                  <p><strong>B</strong> + # = Encender LED Verde</p>
                  <p><strong>C</strong> + # = Encender LED Azul</p>
                  <p><strong>D</strong> + # = Apagar Todos</p>
                  <p><strong>C</strong> = Limpiar | <strong>#</strong> = Ejecutar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Información técnica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Especificaciones DHT22</h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold">Rango Temperatura:</span>
                  <span className="text-orange-600 font-bold">-40°C a 80°C</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold">Precisión Temp:</span>
                  <span className="text-orange-600 font-bold">±0.5°C</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold">Rango Humedad:</span>
                  <span className="text-blue-600 font-bold">0-100% RH</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold">Precisión Humedad:</span>
                  <span className="text-blue-600 font-bold">±2-5% RH</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold">Frecuencia muestreo:</span>
                  <span className="text-green-600 font-bold">5 segundos</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Estado del Sistema</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-gray-700">Sensor DHT22</span>
                  </div>
                  <span className="text-green-600 font-bold">Conectado</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-gray-700">Transmisión datos</span>
                  </div>
                  <span className="text-green-600 font-bold">Activa</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-gray-700">LEDs</span>
                  </div>
                  <span className="text-green-600 font-bold">Operativos</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-gray-700">Display LCD</span>
                  </div>
                  <span className="text-green-600 font-bold">Funcionando</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-gray-700">Teclado Matricial</span>
                  </div>
                  <span className="text-green-600 font-bold">Listo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Renderizado principal
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div>
      <Navbar />
      {currentPage === 'home' ? <HomePage /> : <SensorPage />}
    </div>
  );
}

export default App;