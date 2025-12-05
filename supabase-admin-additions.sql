-- Add admin role to users table
ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user';

-- Create admin user (you'll need to hash the password with bcrypt)
-- Password: admin123 (CHANGE THIS IMMEDIATELY!)
-- Hashed with bcrypt: $2a$10$example...
INSERT INTO users (email, password, name, role) VALUES 
('admin@contentai.com', '$2a$10$YourHashedPasswordHere', 'Admin User', 'admin');

-- Add system settings table
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add activity logs table for admin tracking
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    metadata JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);

-- Insert default system settings
INSERT INTO system_settings (key, value, description) VALUES
('maintenance_mode', 'false'::jsonb, 'Enable/disable maintenance mode'),
('max_free_trial_days', '14'::jsonb, 'Number of days for free trial'),
('allow_signups', 'true'::jsonb, 'Allow new user registrations');
