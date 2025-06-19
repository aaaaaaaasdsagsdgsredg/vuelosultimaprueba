import React, { useState, useEffect } from 'react'
import { Search, Filter, MapPin, Calendar } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { Product } from '../types'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDestination, setSelectedDestination] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [includesFilter, setIncludesFilter] = useState({
    flight: false,
    hotel: false,
    car: false,
    allInclusive: false
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Error al cargar los productos')
    } finally {
      setLoading(false)
    }
  }

  const destinations = [...new Set(products.map(p => p.destination))]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDestination = !selectedDestination || product.destination === selectedDestination
    
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    
    const matchesIncludes = (!includesFilter.flight || product.includes_flight) &&
                           (!includesFilter.hotel || product.includes_hotel) &&
                           (!includesFilter.car || product.includes_car_rental) &&
                           (!includesFilter.allInclusive || product.all_inclusive)

    return matchesSearch && matchesDestination && matchesPrice && matchesIncludes
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Paquetes Turísticos</h1>
          <p className="text-gray-600">Descubre nuestros increíbles destinos y experiencias</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar destinos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Destination Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
              >
                <option value="">Todos los destinos</option>
                {destinations.map(destination => (
                  <option key={destination} value={destination}>{destination}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>

            {/* Includes Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Incluye:</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includesFilter.flight}
                    onChange={(e) => setIncludesFilter(prev => ({ ...prev, flight: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm">Vuelo</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includesFilter.hotel}
                    onChange={(e) => setIncludesFilter(prev => ({ ...prev, hotel: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm">Hotel</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includesFilter.allInclusive}
                    onChange={(e) => setIncludesFilter(prev => ({ ...prev, allInclusive: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm">Todo Incluido</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {filteredProducts.length} de {products.length} paquetes
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron paquetes
            </h3>
            <p className="text-gray-600">
              Intenta ajustar los filtros para encontrar más opciones
            </p>
          </div>
        )}
      </div>
    </div>
  )
}