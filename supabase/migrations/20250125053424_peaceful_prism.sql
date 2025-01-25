/*
  # Add basic game cards table for CMS

  1. New Tables
    - basic_game_cards
      - name (text)
      - image (text)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS
    - Public read access
    - Admin write access
*/

CREATE TABLE IF NOT EXISTS basic_game_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE basic_game_cards ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access on basic_game_cards"
  ON basic_game_cards FOR SELECT
  TO public
  USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_basic_game_cards_updated_at
  BEFORE UPDATE ON basic_game_cards
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Insert initial data
INSERT INTO basic_game_cards (name, image) VALUES
('Virtual Reality Experience', 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80'),
('Racing Simulator', 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&q=80'),
('Arcade Classic Collection', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80'),
('Nintendo Switch Party', 'https://images.unsplash.com/photo-1578735799461-21578a01489c?auto=format&fit=crop&q=80'),
('PS5 Gaming Station', 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&q=80'),
('Xbox Series X Zone', 'https://images.unsplash.com/photo-1621259182978-fbf433fd6eb7?auto=format&fit=crop&q=80');