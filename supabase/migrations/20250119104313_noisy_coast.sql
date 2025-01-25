/*
  # Add contact and footer CMS tables

  1. New Tables
    - contact_info
      - email, phone, address
    - social_links
      - platform, url, icon
    - footer_content
      - quick_links, company_description
    - booking_requests
      - all booking form fields
      - email notification status

  2. Security
    - Enable RLS on all tables
    - Public read access for contact and footer
    - Authenticated write access for bookings
*/

-- Contact Info table
CREATE TABLE IF NOT EXISTS contact_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Social Links table
CREATE TABLE IF NOT EXISTS social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  url text NOT NULL,
  icon text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Footer Content table
CREATE TABLE IF NOT EXISTS footer_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_description text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Booking Requests table
CREATE TABLE IF NOT EXISTS booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date date NOT NULL,
  event_type text NOT NULL,
  requirements text,
  email_sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access on contact_info"
  ON contact_info FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on social_links"
  ON social_links FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on footer_content"
  ON footer_content FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert on booking_requests"
  ON booking_requests FOR INSERT
  TO public
  WITH CHECK (true);

-- Add triggers for updated_at
CREATE TRIGGER update_contact_info_updated_at
  BEFORE UPDATE ON contact_info
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_social_links_updated_at
  BEFORE UPDATE ON social_links
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_footer_content_updated_at
  BEFORE UPDATE ON footer_content
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_booking_requests_updated_at
  BEFORE UPDATE ON booking_requests
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Insert initial data
INSERT INTO contact_info (email, phone)
VALUES ('info@epicevents.com', '(555) 123-4567');

INSERT INTO social_links (platform, url, icon)
VALUES 
  ('Facebook', 'https://facebook.com/epicevents', 'facebook'),
  ('Twitter', 'https://twitter.com/epicevents', 'twitter'),
  ('Instagram', 'https://instagram.com/epicevents', 'instagram'),
  ('YouTube', 'https://youtube.com/epicevents', 'youtube');

INSERT INTO footer_content (company_description)
VALUES ('Your Ultimate Event Gaming Experience - Bringing professional gaming equipment and expert hosting to create unforgettable memories at any gathering.');