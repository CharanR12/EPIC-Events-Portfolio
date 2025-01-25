/*
  # Add dummy data for gaming events website

  1. Content Added
    - Hero content (1 row)
    - Gallery events (6 rows)
    - Games (6 rows)

  2. Data Overview
    - Realistic gaming event data
    - High-quality image URLs
    - Descriptive content
*/

-- Add hero content
INSERT INTO hero_content (title, subtitle, background_image)
VALUES (
  'Level Up Your Events',
  'Transform any gathering into an epic gaming adventure. Professional equipment, expert hosting, unforgettable memories.',
  'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&q=80'
);

-- Add events for gallery
INSERT INTO events (name, image, date) VALUES
('eSports Tournament 2024', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80', '2024-03-15'),
('Gaming Convention', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80', '2024-02-20'),
('VR Gaming Night', 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&q=80', '2024-02-10'),
('Retro Gaming Party', 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80', '2024-01-30'),
('Gaming Marathon', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80', '2024-01-15'),
('LAN Party Event', 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&q=80', '2024-01-05');

-- Add games
INSERT INTO games (name, image, preview, description, how_to_play, equipment) VALUES
(
  'Virtual Reality Experience',
  'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80',
  'Immerse yourself in stunning virtual worlds',
  'Step into a new dimension of gaming with our premium VR setup. Experience the latest in virtual reality technology with full-motion tracking and haptic feedback.',
  'Put on the VR headset, grab the controllers, and follow the in-game tutorials. Our staff will help you get started and ensure a comfortable experience.',
  'Oculus Quest 2, Gaming PC, Motion sensors, Safety equipment'
),
(
  'Racing Simulator',
  'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&q=80',
  'Feel the thrill of professional racing',
  'Experience the adrenaline rush of professional racing with our high-end racing simulator. Features force feedback steering and realistic pedal control.',
  'Adjust the seat position, select your preferred track and car, and start racing. Practice mode available for beginners.',
  'Racing seat, Force feedback wheel, Pedals, Triple monitor setup'
),
(
  'Arcade Classic Collection',
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80',
  'Relive the golden age of arcade gaming',
  'A curated collection of classic arcade games from the 80s and 90s. Perfect for retro gaming enthusiasts and introducing new generations to gaming history.',
  'Insert coin (virtual), select your game, and start playing. Each game has its unique controls and objectives.',
  'Custom arcade cabinet, Classic joysticks and buttons, 32-inch display'
),
(
  'Nintendo Switch Party',
  'https://images.unsplash.com/photo-1578735799461-21578a01489c?auto=format&fit=crop&q=80',
  'Multiplayer fun for everyone',
  'Perfect for group entertainment with a variety of party games. Supports up to 8 players simultaneously with our multiple Switch setup.',
  'Pick up a controller, select your character, and jump into the fun. Games range from racing to party games to fighting.',
  'Multiple Nintendo Switch consoles, Pro controllers, Party games collection'
),
(
  'PS5 Gaming Station',
  'https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&q=80',
  'Next-gen gaming experience',
  'Experience the latest PlayStation 5 games in stunning 4K resolution with ray tracing and instant loading times.',
  'Choose your game from our extensive library, grab a controller, and enjoy. Multiple save slots available for progress tracking.',
  'PS5 console, DualSense controllers, 4K TV, Gaming headsets'
),
(
  'Xbox Series X Zone',
  'https://images.unsplash.com/photo-1621259182978-fbf433fd6eb7?auto=format&fit=crop&q=80',
  'Ultimate gaming power',
  'Dive into the world of Xbox gaming with the most powerful console. Features Quick Resume and backward compatibility.',
  'Sign in to your profile or use our guest account, select a game, and start playing. Xbox Game Pass library available.',
  'Xbox Series X, Wireless controllers, Gaming chairs, Sound system');