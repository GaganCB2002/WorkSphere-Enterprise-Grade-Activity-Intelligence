-- ====================================================================
-- Table: productivity_analytics
-- Description: Daily aggregated employee productivity & burnout analytics.
-- ====================================================================

CREATE TABLE IF NOT EXISTS productivity_analytics (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    productive_hours NUMERIC(4,2) NOT NULL,
    idle_hours NUMERIC(4,2) NOT NULL,
    burnout_risk_score NUMERIC(5,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(employee_id, date)
);

CREATE INDEX IF NOT EXISTS idx_analytics_emp_date ON productivity_analytics(employee_id, date);
