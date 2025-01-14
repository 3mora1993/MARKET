/*
  # Premium Listings Schema

  1. New Tables
    - `premium_listings`
      - `id` (uuid, primary key)
      - `supplier_id` (uuid, references auth.users)
      - `tier` (text)
      - `start_date` (timestamptz)
      - `end_date` (timestamptz)
      - `status` (text)
      - `auto_renew` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for suppliers to manage their listings
    - Add policies for public read access
*/

-- Create premium_listings table
CREATE TABLE IF NOT EXISTS premium_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id uuid NOT NULL REFERENCES auth.users(id),
  tier text NOT NULL CHECK (tier IN ('standard', 'featured', 'spotlight')),
  start_date timestamptz NOT NULL DEFAULT now(),
  end_date timestamptz NOT NULL,
  status text NOT NULL CHECK (status IN ('active', 'expired', 'pending')),
  auto_renew boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  
  -- Add constraints
  CONSTRAINT valid_dates CHECK (end_date > start_date)
);

-- Create unique index for active listings per supplier
CREATE UNIQUE INDEX one_active_listing_per_supplier 
ON premium_listings (supplier_id) 
WHERE status = 'active';

-- Enable RLS
ALTER TABLE premium_listings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view active premium listings"
  ON premium_listings
  FOR SELECT
  USING (status = 'active');

CREATE POLICY "Suppliers can view their own listings"
  ON premium_listings
  FOR SELECT
  USING (auth.uid() = supplier_id);

CREATE POLICY "Suppliers can create their own listings"
  ON premium_listings
  FOR INSERT
  WITH CHECK (auth.uid() = supplier_id);

CREATE POLICY "Suppliers can update their own listings"
  ON premium_listings
  FOR UPDATE
  USING (auth.uid() = supplier_id);

-- Function to automatically update status based on dates
CREATE OR REPLACE FUNCTION update_premium_listing_status()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update status based on dates
  IF NEW.end_date < now() THEN
    NEW.status := 'expired';
  ELSIF NEW.start_date > now() THEN
    NEW.status := 'pending';
  ELSE
    NEW.status := 'active';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger
CREATE TRIGGER update_premium_status_trigger
  BEFORE INSERT OR UPDATE ON premium_listings
  FOR EACH ROW
  EXECUTE FUNCTION update_premium_listing_status();