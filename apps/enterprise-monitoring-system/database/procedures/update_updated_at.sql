-- ====================================================================
-- Procedure: fn_update_updated_at
-- Description: PL/pgSQL function to auto-update updated_at timestamp.
-- ====================================================================

CREATE OR REPLACE FUNCTION fn_update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
