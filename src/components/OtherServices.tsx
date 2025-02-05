import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../lib/i18n/LanguageContext';
import type { Database } from '../lib/database.types';
import * as Icons from 'lucide-react';

type Service = Database['public']['Tables']['other_services']['Row'];

export default function OtherServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data, error } = await supabase
          .from('other_services')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  const getLocalizedContent = (en: string | null, ta: string | null) => {
    if (language === 'ta' && ta) return ta;
    return en || '';
  };

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="h-8 w-8" /> : null;
  };

  if (loading) {
    return (
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="h-8 w-8 bg-gray-200 rounded-full mb-4 mx-auto"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-accent/80 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-gradient-to-br from-white to-secondary/5 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-secondary/20 hover:border-accent/20"
            >
              <div className="text-accent mb-6 flex justify-center">
                <div className="p-3 rounded-full bg-secondary/20 group-hover:bg-secondary/30 transition-colors duration-300">
                  {getIcon(service.icon)}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-text mb-4 text-center group-hover:text-accent transition-colors duration-300">
                {getLocalizedContent(service.title, service.title_ta)}
              </h3>
              <p className="text-text/80 text-center group-hover:text-text transition-colors duration-300">
                {getLocalizedContent(service.description, service.description_ta)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}