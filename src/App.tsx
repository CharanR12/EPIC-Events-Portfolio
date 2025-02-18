import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Games from './components/Games';
import OtherServices from './components/OtherServices';
import Gallery from './components/Gallery';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import { LanguageProvider } from './lib/i18n/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <Games />
        {/* <OtherServices /> */}
        {/* <Gallery /> */}
        <BookingForm />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;