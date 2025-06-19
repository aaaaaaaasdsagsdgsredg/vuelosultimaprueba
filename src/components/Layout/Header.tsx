import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, LogOut, Package, Users, BarChart3 } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useCartStore } from '../../store/cartStore'

export const Header: React.FC = () => {
  const { user, signOut } = useAuthStore()
  const { getTotalItems } = useCartStore()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const totalItems = getTotalItems()

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PT</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Portal Turismo</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-primary-600 transition-colors">
              Paquetes
            </Link>
            {user && (
              <>
                {user.role === 'customer' && (
                  <Link to="/orders" className="text-gray-700 hover:text-primary-600 transition-colors">
                    Mis Pedidos
                  </Link>
                )}
                {(user.role === 'sales' || user.role === 'sales_manager') && (
                  <>
                    <Link to="/admin/products" className="text-gray-700 hover:text-primary-600 transition-colors flex items-center space-x-1">
                      <Package className="w-4 h-4" />
                      <span>Productos</span>
                    </Link>
                    <Link to="/admin/orders" className="text-gray-700 hover:text-primary-600 transition-colors flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>Pedidos</span>
                    </Link>
                    {user.role === 'sales_manager' && (
                      <Link to="/admin/reports" className="text-gray-700 hover:text-primary-600 transition-colors flex items-center space-x-1">
                        <BarChart3 className="w-4 h-4" />
                        <span>Reportes</span>
                      </Link>
                    )}
                  </>
                )}
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {user.role === 'customer' && (
                  <Link to="/cart" className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors">
                    <ShoppingCart className="w-6 h-6" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-700" />
                  <span className="text-sm text-gray-700">{user.full_name}</span>
                  <button
                    onClick={handleSignOut}
                    className="p-1 text-gray-700 hover:text-red-600 transition-colors"
                    title="Cerrar sesión"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}