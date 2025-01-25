import React from 'react';
import { useLanguage } from '../lib/i18n/LanguageContext';
import { Languages } from 'lucide-react';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary/20 transition-colors"
      aria-label="Toggle language"
    >
      <Languages className="h-5 w-5" />
      <span className="text-sm font-medium">{language === 'en' ? 'தமிழ்' : 'English'}</span>
    </button>
  );
}