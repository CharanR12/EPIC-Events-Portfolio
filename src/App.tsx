import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Games from './components/Games';
import Gallery from './components/Gallery';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Games />
      <Gallery />
      <BookingForm />
      <Footer />
    </div>
  );
}

export default App;