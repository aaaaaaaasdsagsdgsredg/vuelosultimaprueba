import React from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PT</span>
              </div>
              <span className="text-xl font-bold">Portal Turismo</span>
            </div>
            <p className="text-gray-300 mb-4">
              Tu destino para los mejores paquetes turísticos nacionales e internacionales. 
              Descubre el mundo con nosotros.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@portalturismo.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Paquetes Nacionales</li>
              <li>Paquetes Internacionales</li>
              <li>Vuelos</li>
              <li>Hoteles</li>
              <li>Alquiler de Autos</li>
              <li>Todo Incluido</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Centro de Ayuda</li>
              <li>Términos y Condiciones</li>
              <li>Política de Privacidad</li>
              <li>Política de Cancelación</li>
              <li>Contacto</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Portal Turismo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}