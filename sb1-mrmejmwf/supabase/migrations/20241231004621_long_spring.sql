/*
  # RFQ System Schema

  1. Tables
    - rfqs: Stores Request for Quotes
    - quotes: Stores supplier quotes for RFQs

  2. Security
    - Row Level Security enabled for both tables
    - Policies for proper access control

  3. Constraints
    - Foreign key relationships
    - Check constraints for data validity
    - Default values for audit fields
*/

-- Create RFQs table
CREATE TABLE IF NOT EXISTS rfqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL,
  buyer_id uuid NOT NULL,
  supplier_id uuid NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  delivery_date date NOT NULL CHECK (delivery_date >= CURRENT_DATE),
  delivery_location text NOT NULL,
  specifications text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'quoted', 'accepted', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create Quotes table
CREATE TABLE IF NOT EXISTS quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rfq_id uuid NOT NULL REFERENCES rfqs(id) ON DELETE CASCADE,
  unit_price numeric NOT NULL CHECK (unit_price > 0),
  total_price numeric NOT NULL CHECK (total_price > 0),
  delivery_time text NOT NULL,
  valid_until timestamptz NOT NULL CHECK (valid_until > now()),
  terms text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE rfqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- RFQ Policies
CREATE POLICY "Users can view their own RFQs"
  ON rfqs FOR SELECT
  USING (auth.uid() IN (buyer_id, supplier_id));

CREATE POLICY "Buyers can create RFQs"
  ON rfqs FOR INSERT
  WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Involved parties can update RFQs"
  ON rfqs FOR UPDATE
  USING (auth.uid() IN (buyer_id, supplier_id));

-- Quote Policies
CREATE POLICY "Involved parties can view quotes"
  ON quotes FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM rfqs
    WHERE rfqs.id = quotes.rfq_id
    AND auth.uid() IN (rfqs.buyer_id, rfqs.supplier_id)
  ));

CREATE POLICY "Suppliers can create quotes"
  ON quotes FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM rfqs
    WHERE rfqs.id = quotes.rfq_id
    AND auth.uid() = rfqs.supplier_id
  ));

CREATE POLICY "Suppliers can update their quotes"
  ON quotes FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM rfqs
    WHERE rfqs.id = quotes.rfq_id
    AND auth.uid() = rfqs.supplier_id
  ));