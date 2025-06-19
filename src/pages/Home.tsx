import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Shield, Clock, Star } from 'lucide-react'

export const Home: React.FC = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Destinos Únicos',
      description: 'Descubre los destinos más increíbles del mundo con nuestros paquetes cuidadosamente seleccionados.'
    },
    {
      icon: Shield,
      title: 'Pagos Seguros',
      description: 'Procesamos tus pagos de forma segura con la tecnología más avanzada de encriptación.'
    },
    {
      icon: Clock,
      title: 'Soporte 24/7',
      description: 'Nuestro equipo está disponible las 24 horas para ayudarte en cualquier momento.'
    },
    {
      icon: Star,
      title: 'Experiencias Premium',
      description: 'Ofrecemos experiencias de viaje de alta calidad con los mejores proveedores.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
          }}
        ></div>
        <div className="absolute inset-0 bg-primary-900/70"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Descubre el Mundo
              <span className="block text-secondary-400">con Nosotros</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
              Los mejores paquetes turísticos nacionales e internacionales. 
              Vuelos, hoteles, autos y experiencias todo incluido.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-secondary-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-secondary-600 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Ver Paquetes</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/register"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir Portal Turismo?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos tu mejor opción para vivir experiencias de viaje inolvidables
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Destinos Populares
            </h2>
            <p className="text-xl text-gray-600">
              Los destinos más solicitados por nuestros viajeros
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'París, Francia',
                image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
                description: 'La ciudad del amor y la luz'
              },
              {
                name: 'Tokio, Japón',
                image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
                description: 'Tradición y modernidad en perfecta armonía'
              },
              {
                name: 'Bariloche, Argentina',
                image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
                description: 'La Suiza argentina en la Patagonia'
              }
            ].map((destination, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden shadow-lg group">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                  <p className="text-gray-200">{destination.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            ¿Listo para tu próxima aventura?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explora nuestros paquetes turísticos y encuentra el viaje perfecto para ti
          </p>
          <Link
            to="/products"
            className="bg-secondary-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-secondary-600 transition-colors inline-flex items-center space-x-2"
          >
            <span>Explorar Paquetes</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}