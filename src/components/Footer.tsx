import React, { useEffect, useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../lib/i18n/LanguageContext';
import type { Database } from '../lib/database.types';

type SocialLink = Database['public']['Tables']['social_links']['Row'];
type FooterContent = Database['public']['Tables']['footer_content']['Row'];
type ContactInfo = Database['public']['Tables']['contact_info']['Row'];

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [footerContent, setFooterContent] = useState<FooterContent | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { t,language } = useLanguage();

  useEffect(() => {
    async function fetchFooterData() {
      try {
        // Fetch social links
        const { data: socialData } = await supabase
          .from('social_links')
          .select('*');
        
        // Fetch footer content
        const { data: footerData } = await supabase
          .from('footer_content')
          .select('*')
          .single();
        
        // Fetch contact info
        const { data: contactData } = await supabase
          .from('contact_info')
          .select('*')
          .single();

        if (socialData) setSocialLinks(socialData);
        if (footerData) setFooterContent(footerData);
        if (contactData) setContactInfo(contactData);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFooterData();
  }, []);

  const getLocalizedContent = (en: string | null, ta: string | null) => {
    if (language === 'ta' && ta) return ta;
    return en || '';
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'facebook':
        return <Facebook className="h-6 w-6" />;
      case 'twitter':
        return <Twitter className="h-6 w-6" />;
      case 'instagram':
        return <Instagram className="h-6 w-6" />;
      case 'youtube':
        return <Youtube className="h-6 w-6" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <footer className="bg-text text-background animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Loading placeholders */}
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-secondary/40 text-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img src="/logo.svg" alt="Epic Events" className="h-10 w-10" />
              <span className="ml-2 text-xl font-bold font-poppins">Epic Events</span>
            </div>
            <p className="text-accent/80 mb-4">
              
              {footerContent ? getLocalizedContent(footerContent.company_description, footerContent.company_description_ta) : t('hero.title')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent/60 hover:text-accent transition-colors"
                >
                  {getIconComponent(link.icon)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-poppins">{t('nav.home')}</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-accent/60 hover:text-accent transition-colors"
                >
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('games')}
                  className="text-accent/60 hover:text-accent transition-colors"
                >
                  {t('nav.games')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="text-accent/60 hover:text-accent transition-colors"
                >
                  {t('nav.gallery')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('booking')}
                  className="text-accent/60 hover:text-accent transition-colors"
                >
                  {t('nav.bookNow')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-poppins">{t('contact.title')}</h3>
            <ul className="space-y-2">
              {contactInfo && (
                <>
                  <li>
                    <a href={`mailto:${contactInfo.email}`} className="text-accent/60 hover:text-accent transition-colors flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {contactInfo.email}
                    </a>
                  </li>
                  <li>
                    <a href={`tel:${contactInfo.phone}`} className="text-accent/60 hover:text-accent transition-colors flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {contactInfo.phone}
                    </a>
                  </li>  <li>
                    <a href={`tel:${contactInfo.phone_2}`} className="text-accent/60 hover:text-accent transition-colors flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {contactInfo.phone_2}
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-accent/20 text-center text-accent/60">
          <p>&copy; {new Date().getFullYear()} Epic Events. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}