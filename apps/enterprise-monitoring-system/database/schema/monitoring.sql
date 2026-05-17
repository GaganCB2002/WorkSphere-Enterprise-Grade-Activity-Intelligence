-- ====================================================================
-- Table: workstation_telemetry
-- Description: High-frequency WinRT workstation monitoring telemetry.
-- ====================================================================

CREATE TABLE IF NOT EXISTS workstation_telemetry (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    cpu_usage NUMERIC(5,2) NOT NULL,
    memory_usage NUMERIC(5,2) NOT NULL,
    active_window VARCHAR(255) NOT NULL,
    keystroke_rate INT NOT NULL,
    mouse_clicks INT NOT NULL,
    screenshot_url VARCHAR(512),
    recorded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_telemetry_emp_id ON workstation_telemetry(employee_id);
CREATE INDEX IF NOT EXISTS idx_telemetry_recorded_at ON workstation_telemetry(recorded_at);
