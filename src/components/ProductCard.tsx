import React from 'react'
import { MapPin, Calendar, Plane, Hotel, Car, Star } from 'lucide-react'
import { Product } from '../types'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore()
  const { user } = useAuthStore()

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Debes iniciar sesión para agregar productos al carrito')
      return
    }

    if (user.role !== 'customer') {
      toast.error('Solo los clientes pueden agregar productos al carrito')
      return
    }

    addItem(product)
    toast.success('Producto agregado al carrito')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.all_inclusive && (
          <div className="absolute top-4 left-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Todo Incluido
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">4.8</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-2 text-gray-600 mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{product.destination}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{product.duration_days} días</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          {product.includes_flight && (
            <div className="flex items-center space-x-1 text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">
              <Plane className="w-4 h-4" />
              <span className="text-xs">Vuelo</span>
            </div>
          )}
          {product.includes_hotel && (
            <div className="flex items-center space-x-1 text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">
              <Hotel className="w-4 h-4" />
              <span className="text-xs">Hotel</span>
            </div>
          )}
          {product.includes_car_rental && (
            <div className="flex items-center space-x-1 text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">
              <Car className="w-4 h-4" />
              <span className="text-xs">Auto</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary-600">
              {formatPrice(product.price)}
            </span>
            <span className="text-gray-500 text-sm ml-1">por persona</span>
          </div>
          
          {user?.role === 'customer' && (
            <button
              onClick={handleAddToCart}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Agregar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}