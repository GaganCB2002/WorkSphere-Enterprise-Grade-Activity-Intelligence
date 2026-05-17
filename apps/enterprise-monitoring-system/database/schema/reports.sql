-- ====================================================================
-- Table: forensic_reports
-- Description: Compliance, audit, and AI-generated forensic reports.
-- ====================================================================

CREATE TABLE IF NOT EXISTS forensic_reports (
    id BIGSERIAL PRIMARY KEY,
    report_id VARCHAR(100) UNIQUE NOT NULL,
    generated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    file_url VARCHAR(512) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reports_report_id ON forensic_reports(report_id);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON forensic_reports(created_at);
