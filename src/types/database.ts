export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'customer' | 'sales' | 'sales_manager'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          role?: 'customer' | 'sales' | 'sales_manager'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'customer' | 'sales' | 'sales_manager'
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
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
        Insert: {
          id?: string
          code: string
          name: string
          description: string
          price: number
          image_url: string
          destination: string
          duration_days: number
          includes_flight?: boolean
          includes_hotel?: boolean
          includes_car_rental?: boolean
          all_inclusive?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string
          name?: string
          description?: string
          price?: number
          image_url?: string
          destination?: string
          duration_days?: number
          includes_flight?: boolean
          includes_hotel?: boolean
          includes_car_rental?: boolean
          all_inclusive?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          user_id: string
          status: 'pending' | 'confirmed' | 'delivered' | 'cancelled'
          total_amount: number
          payment_status: 'pending' | 'paid' | 'failed'
          stripe_payment_intent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number: string
          user_id: string
          status?: 'pending' | 'confirmed' | 'delivered' | 'cancelled'
          total_amount: number
          payment_status?: 'pending' | 'paid' | 'failed'
          stripe_payment_intent_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          user_id?: string
          status?: 'pending' | 'confirmed' | 'delivered' | 'cancelled'
          total_amount?: number
          payment_status?: 'pending' | 'paid' | 'failed'
          stripe_payment_intent_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          total_price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          total_price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          total_price?: number
          created_at?: string
        }
      }
      order_history: {
        Row: {
          id: string
          order_number: string
          user_id: string
          total_amount: number
          delivered_at: string
          created_at: string
        }
        Insert: {
          id?: string
          order_number: string
          user_id: string
          total_amount: number
          delivered_at: string
          created_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          user_id?: string
          total_amount?: number
          delivered_at?: string
          created_at?: string
        }
      }
      email_notifications: {
        Row: {
          id: string
          type: 'order_confirmation' | 'order_status_change' | 'internal_alert'
          recipient_email: string
          subject: string
          content: string
          sent_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          type: 'order_confirmation' | 'order_status_change' | 'internal_alert'
          recipient_email: string
          subject: string
          content: string
          sent_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          type?: 'order_confirmation' | 'order_status_change' | 'internal_alert'
          recipient_email?: string
          subject?: string
          content?: string
          sent_at?: string | null
          created_at?: string
        }
      }
      internal_email_config: {
        Row: {
          id: string
          department: string
          email: string
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          department: string
          email: string
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          department?: string
          email?: string
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}