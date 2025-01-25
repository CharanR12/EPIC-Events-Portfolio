/*
  # Initial Schema Setup for Gaming Events CMS

  1. New Tables
    - `games`
      - `id` (uuid, primary key)
      - `name` (text)
      - `image` (text, URL)
      - `preview` (text)
      - `description` (text)
      - `how_to_play` (text)
      - `equipment` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `events`
      - `id` (uuid, primary key)
      - `name` (text)
      - `image` (text, URL)
      - `date` (date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `hero_content`
      - `id` (uuid, primary key)
      - `title` (text)
      - `subtitle` (text)
      - `background_image` (text, URL)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage content
    - Allow public read access
*/

-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image text NOT NULL,
  preview text NOT NULL,
  description text NOT NULL,
  how_to_play text NOT NULL,
  equipment text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image text NOT NULL,
  date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create hero_content table
CREATE TABLE IF NOT EXISTS hero_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text NOT NULL,
  background_image text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;

-- Policies for games
CREATE POLICY "Allow public read access on games" 
  ON games FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Allow authenticated users to manage games" 
  ON games FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Policies for events
CREATE POLICY "Allow public read access on events" 
  ON events FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Allow authenticated users to manage events" 
  ON events FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Policies for hero_content
CREATE POLICY "Allow public read access on hero_content" 
  ON hero_content FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Allow authenticated users to manage hero_content" 
  ON hero_content FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_games_updated_at
  BEFORE UPDATE ON games
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_hero_content_updated_at
  BEFORE UPDATE ON hero_content
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();