import React, { useState } from 'react';
import { Calendar, Menu, X } from 'lucide-react';
import { useLanguage } from '../lib/i18n/LanguageContext';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-navbar items-center">
          <div className="flex items-center">
            <img src="/logo.svg" alt="Epic Events" className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold font-poppins text-accent">Epic Events</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-text/80 hover:text-text transition-colors">
              {t('nav.home')}
            </button>
            <button onClick={() => scrollToSection('games')} className="text-text/80 hover:text-text transition-colors">
              {t('nav.games')}
            </button>
            <button onClick={() => scrollToSection('gallery')} className="text-text/80 hover:text-text transition-colors">
              {t('nav.gallery')}
            </button>
            <button 
              onClick={() => scrollToSection('booking')} 
              className="bg-accent/90 text-secondary px-6 py-2 rounded-lg hover:bg-accent transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2 group font-medium"
            >
              <span>{t('nav.bookNow')}</span>
              <Calendar className="h-5 w-5 calendar-icon" />
            </button>
            <LanguageToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageToggle />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-text/80">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute w-full left-0 top-navbar">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 glass-effect shadow-lg rounded-b-lg">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left px-3 py-2 text-text/80 hover:bg-secondary/10 rounded-md">
                {t('nav.home')}
              </button>
              <button onClick={() => scrollToSection('games')} className="block w-full text-left px-3 py-2 text-text/80 hover:bg-secondary/10 rounded-md">
                {t('nav.games')}
              </button>
              <button onClick={() => scrollToSection('gallery')} className="block w-full text-left px-3 py-2 text-text/80 hover:bg-secondary/10 rounded-md">
                {t('nav.gallery')}
              </button>
              <button onClick={() => scrollToSection('booking')} className="block w-full text-center px-3 py-2 bg-accent/90 text-secondary rounded-md hover:bg-accent flex items-center justify-center gap-2">
                <span>{t('nav.bookNow')}</span>
                <Calendar className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}