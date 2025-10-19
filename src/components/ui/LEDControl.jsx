// ============================================
// COMPONENTE: LED CONTROL
// ============================================
import React from 'react';
import { Lightbulb } from 'lucide-react';

const LEDControl = ({ leds, onToggle }) => {
  const ledConfig = [
    { id: 1, name: 'LED 1 (Rojo)', color: 'red' },
    { id: 2, name: 'LED 2 (Verde)', color: 'green' },
    { id: 3, name: 'LED 3 (Azul)', color: 'blue' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <Lightbulb className="mr-2 text-yellow-500" />
        Control de LEDs
      </h2>
      <div className="space-y-4">
        {ledConfig.map((led) => (
          <div key={led.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div 
                className={`w-6 h-6 rounded-full transition-all ${
                  leds[`led${led.id}`]
                    ? `bg-${led.color}-500 shadow-lg shadow-${led.color}-500/50`
                    : 'bg-gray-300'
                }`}
              ></div>
              <span className="font-semibold text-gray-700">{led.name}</span>
            </div>
            <button
              onClick={() => onToggle(led.id)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                leds[`led${led.id}`]
                  ? `bg-${led.color}-500 text-white hover:bg-${led.color}-600`
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              {leds[`led${led.id}`] ? 'ON' : 'OFF'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LEDControl;