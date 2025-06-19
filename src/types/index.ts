export interface User {
  id: string
  email: string
  full_name: string
  role: 'customer' | 'sales' | 'sales_manager'
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  code: string
  name: string
  description: string
  price: number
  image_url: string
  destination: string
  duration_days: number
  includes_flight: boolean
  includes_hotel: boolean
  includes_car_rental: boolean
  all_inclusive: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  order_number: string
  user_id: string
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled'
  total_amount: number
  payment_status: 'pending' | 'paid' | 'failed'
  stripe_payment_intent_id: string | null
  created_at: string
  updated_at: string
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price: number
  total_price: number
  created_at: string
  product?: Product
}

export interface EmailNotification {
  id: string
  type: 'order_confirmation' | 'order_status_change' | 'internal_alert'
  recipient_email: string
  subject: string
  content: string
  sent_at: string | null
  created_at: string
}