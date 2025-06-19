/*
  # Portal Turismo - Esquema Inicial de Base de Datos

  1. Nuevas Tablas
    - `users` - Usuarios del sistema (clientes, vendedores, gerentes)
    - `products` - Paquetes turísticos con imágenes y detalles
    - `orders` - Pedidos de los clientes
    - `order_items` - Items individuales de cada pedido
    - `order_history` - Historial de pedidos entregados
    - `email_notifications` - Registro de notificaciones enviadas
    - `internal_email_config` - Configuración de emails internos

  2. Seguridad
    - Habilitar RLS en todas las tablas
    - Políticas para cada rol de usuario
    - Acceso controlado según el tipo de usuario

  3. Características
    - Soporte para múltiples roles de usuario
    - Sistema completo de carrito y pedidos
    - Integración con Stripe para pagos
    - Sistema de notificaciones por email
    - Historial de pedidos entregados
*/

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'sales', 'sales_manager')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Crear tabla de productos (paquetes turísticos)
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL CHECK (price > 0),
  image_url text NOT NULL,
  destination text NOT NULL,
  duration_days integer NOT NULL CHECK (duration_days > 0),
  includes_flight boolean DEFAULT false,
  includes_hotel boolean DEFAULT false,
  includes_car_rental boolean DEFAULT false,
  all_inclusive boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Crear tabla de pedidos
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'delivered', 'cancelled')),
  total_amount decimal(10,2) NOT NULL CHECK (total_amount >= 0),
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  stripe_payment_intent_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Crear tabla de items de pedidos
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price decimal(10,2) NOT NULL CHECK (unit_price > 0),
  total_price decimal(10,2) NOT NULL CHECK (total_price > 0),
  created_at timestamptz DEFAULT now()
);

-- Crear tabla de historial de pedidos entregados
CREATE TABLE IF NOT EXISTS order_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_amount decimal(10,2) NOT NULL CHECK (total_amount >= 0),
  delivered_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Crear tabla de notificaciones por email
CREATE TABLE IF NOT EXISTS email_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('order_confirmation', 'order_status_change', 'internal_alert')),
  recipient_email text NOT NULL,
  subject text NOT NULL,
  content text NOT NULL,
  sent_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Crear tabla de configuración de emails internos
CREATE TABLE IF NOT EXISTS internal_email_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  department text NOT NULL,
  email text NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE internal_email_config ENABLE ROW LEVEL SECURITY;

-- Políticas para usuarios
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Políticas para productos (todos pueden leer, solo sales/sales_manager pueden modificar)
CREATE POLICY "Anyone can read products"
  ON products
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Sales staff can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('sales', 'sales_manager')
    )
  );

-- Políticas para pedidos
CREATE POLICY "Customers can read own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('sales', 'sales_manager')
    )
  );

CREATE POLICY "Customers can create orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'customer'
    )
  );

CREATE POLICY "Sales staff can update orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('sales', 'sales_manager')
    )
  );

-- Políticas para items de pedidos
CREATE POLICY "Users can read order items for their orders"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND (
        orders.user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM users 
          WHERE users.id = auth.uid() 
          AND users.role IN ('sales', 'sales_manager')
        )
      )
    )
  );

CREATE POLICY "Customers can create order items"
  ON order_items
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Políticas para historial de pedidos
CREATE POLICY "Users can read own order history"
  ON order_history
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('sales', 'sales_manager')
    )
  );

CREATE POLICY "Sales staff can manage order history"
  ON order_history
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('sales', 'sales_manager')
    )
  );

-- Políticas para notificaciones de email
CREATE POLICY "Sales staff can manage email notifications"
  ON email_notifications
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('sales', 'sales_manager')
    )
  );

-- Políticas para configuración de emails internos
CREATE POLICY "Sales managers can manage email config"
  ON internal_email_config
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'sales_manager'
    )
  );

-- Insertar datos de ejemplo

-- Configuración de emails internos
INSERT INTO internal_email_config (department, email) VALUES
  ('Ventas', 'ventas@portalturismo.com'),
  ('Administración', 'admin@portalturismo.com'),
  ('Soporte', 'soporte@portalturismo.com');

-- Productos de ejemplo
INSERT INTO products (code, name, description, price, image_url, destination, duration_days, includes_flight, includes_hotel, includes_car_rental, all_inclusive) VALUES
  ('PAR001', 'París Romántico', 'Descubre la ciudad del amor con este increíble paquete que incluye vuelos, hotel 4 estrellas y tours por los principales atractivos parisinos.', 2500.00, 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 'París, Francia', 7, true, true, false, false),
  ('TOK001', 'Tokio Moderno', 'Sumérgete en la cultura japonesa con este paquete completo que incluye vuelos, hotel en Shibuya y experiencias únicas en la capital nipona.', 3200.00, 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 'Tokio, Japón', 10, true, true, false, false),
  ('BAR001', 'Bariloche Aventura', 'Disfruta de la Patagonia argentina con este paquete que incluye hotel con vista al lago, actividades de aventura y gastronomía local.', 1200.00, 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 'Bariloche, Argentina', 5, false, true, true, false),
  ('MIA001', 'Miami Beach', 'Relájate en las playas de Miami con este paquete todo incluido que incluye vuelos, hotel frente al mar y actividades acuáticas.', 2800.00, 'https://images.pexels.com/photos/161901/miami-beach-south-beach-miami-beach-florida-161901.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 'Miami, Estados Unidos', 6, true, true, false, true),
  ('ROM001', 'Roma Histórica', 'Explora la ciudad eterna con este paquete cultural que incluye vuelos, hotel céntrico y tours guiados por los principales sitios históricos.', 2200.00, 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 'Roma, Italia', 8, true, true, false, false),
  ('RIO001', 'Río de Janeiro Carnaval', 'Vive la experiencia del Carnaval carioca con este paquete que incluye vuelos, hotel en Copacabana y entradas a los mejores eventos.', 1800.00, 'https://images.pexels.com/photos/351283/pexels-photo-351283.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 'Río de Janeiro, Brasil', 5, true, true, false, false);