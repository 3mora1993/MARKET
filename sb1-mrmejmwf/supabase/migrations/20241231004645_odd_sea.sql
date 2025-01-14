/*
  # RFQ System Triggers

  1. Functions
    - update_rfq_status: Updates RFQ status when quote is added
    - handle_rfq_status_change: Manages RFQ status updates

  2. Triggers
    - update_rfq_status_trigger: Fires after quote insertion
    - rfq_status_change_trigger: Fires before RFQ status update

  3. Security
    - SECURITY DEFINER for elevated privileges
    - Explicit search_path for security
*/

-- Function to automatically update RFQ status when a quote is added
CREATE OR REPLACE FUNCTION update_rfq_status()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE rfqs
  SET 
    status = 'quoted',
    updated_at = CURRENT_TIMESTAMP
  WHERE id = NEW.rfq_id
  AND status = 'pending';
  
  RETURN NEW;
END;
$$;

-- Function to handle RFQ status updates and set updated_at
CREATE OR REPLACE FUNCTION handle_rfq_status_change()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;

-- Clean up existing triggers
DROP TRIGGER IF EXISTS update_rfq_status_trigger ON quotes;
DROP TRIGGER IF EXISTS rfq_status_change_trigger ON rfqs;

-- Create trigger for quote creation
CREATE TRIGGER update_rfq_status_trigger
  AFTER INSERT ON quotes
  FOR EACH ROW
  EXECUTE FUNCTION update_rfq_status();

-- Create trigger for RFQ status updates
CREATE TRIGGER rfq_status_change_trigger
  BEFORE UPDATE OF status ON rfqs
  FOR EACH ROW
  EXECUTE FUNCTION handle_rfq_status_change();