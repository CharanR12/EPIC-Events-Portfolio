import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Games from './components/Games';
import Gallery from './components/Gallery';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import { LanguageProvider } from './lib/i18n/LanguageContext';
import { GameSelectionProvider } from './lib/contexts/GameSelectionContext';

function App() {
  return (
    <LanguageProvider>
      <GameSelectionProvider>
        <div className="min-h-screen">
          <Navbar />
          <Hero />
          <Games />
          <Gallery />
          <BookingForm />
          <Footer />
        </div>
      </GameSelectionProvider>
    </LanguageProvider>
  );
}

export default App;