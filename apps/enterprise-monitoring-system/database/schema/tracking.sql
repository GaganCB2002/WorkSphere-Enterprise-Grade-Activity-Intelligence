-- ====================================================================
-- Table: live_tracking
-- Description: Hardware-enforced WinRT GPS geolocation telemetry.
-- ====================================================================

CREATE TABLE IF NOT EXISTS live_tracking (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    latitude NUMERIC(10,7) NOT NULL,
    longitude NUMERIC(10,7) NOT NULL,
    accuracy_meters NUMERIC(5,2) NOT NULL,
    signal_source VARCHAR(50) NOT NULL,
    recorded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tracking_emp_id ON live_tracking(employee_id);
CREATE INDEX IF NOT EXISTS idx_tracking_recorded_at ON live_tracking(recorded_at);
