import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../lib/i18n/LanguageContext';
import toast from 'react-hot-toast';
import type { Database } from '../lib/database.types';
import MultiSelect from './MultiSelect';

type BookingRequest = Database['public']['Tables']['booking_requests']['Insert'];
type ContactInfo = Database['public']['Tables']['contact_info']['Row'];
type BasicGame = Database['public']['Tables']['basic_game_cards']['Row'];

export default function BookingForm() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [games, setGames] = useState<BasicGame[]>([]);
  const [formData, setFormData] = useState<BookingRequest>({
    name: '',
    email: '',
    phone: '',
    date: '',
    event_type: '',
    requirements: '',
    selected_games: []
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch contact info
        const { data: contactData } = await supabase
          .from('contact_info')
          .select('*')
          .single();

        // Fetch games
        const { data: gamesData } = await supabase
          .from('basic_game_cards')
          .select('*')
          .order('name', { ascending: true });

        if (contactData) setContactInfo(contactData);
        if (gamesData) setGames(gamesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const [loading, setLoading] = useState(false);
  const { t, language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('booking_requests')
        .insert([formData]);

      if (error) throw error;

      toast.success('Booking request submitted successfully! We will contact you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        event_type: '',
        requirements: '',
        selected_games: []
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error('Failed to submit booking request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGamesChange = (selectedGames: string[]) => {
    setFormData({
      ...formData,
      selected_games: selectedGames
    });
  };

  const getLocalizedContent = (en: string | null, ta: string | null) => {
    if (language === 'ta' && ta) return ta;
    return en || '';
  };

  const gameOptions = games.map(game => ({
    value: game.id,
    label: getLocalizedContent(game.name, game.name_ta)
  }));

  return (
    <section id="booking" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-8 font-poppins">
              {t('booking.title')}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('booking.name')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input pr-10 bg-secondary/40 border-black hover:bg-secondary hover:border-accent focus:bg-secondary focus:border-blue-500 border rounded-md"
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('booking.email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input pr-10 bg-secondary/40 border-black hover:bg-secondary hover:border-accent focus:bg-secondary focus:border-blue-500 border rounded-md"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('booking.phone')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="form-input pr-10 bg-secondary/40 border-black hover:bg-secondary hover:border-accent focus:bg-secondary focus:border-blue-500 border rounded-md"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('booking.date')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="form-input pr-10 bg-secondary/40 border-black hover:bg-secondary hover:border-accent focus:bg-secondary focus:border-blue-500 border rounded-md"
                      disabled={loading}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="event_type" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('booking.eventType')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="event_type"
                    name="event_type"
                    value={formData.event_type}
                    onChange={handleChange}
                    required
                    className="form-input pr-10 bg-secondary/40 border-black hover:bg-secondary/80 hover:border-accent focus:bg-secondary focus:border-blue-500 border rounded-md"
                    disabled={loading}
                  >
                    <option value="">{t('booking.selectEventType')}</option>
                    <option value="birthday">{t('booking.birthday')}</option>
                    <option value="corporate">{t('booking.corporate')}</option>
                    <option value="tournament">{t('booking.tournament')}</option>
                    <option value="other">{t('booking.other')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="selected_games" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('booking.selectGames')}
                </label>
                <MultiSelect
                  options={gameOptions}
                  value={formData.selected_games || []}
                  onChange={handleGamesChange}
                  placeholder={t('booking.selectGames')}
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('booking.requirements')}
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements || ''}
                  onChange={handleChange}
                  rows={4}
                  className="form-input pr-10 bg-secondary/40 border-black hover:bg-secondary hover:border-accent focus:bg-secondary focus:border-blue-500 border rounded-md"
                  disabled={loading}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-accent/90 text-secondary py-4 px-6 rounded-lg hover:bg-accent text-secondary transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group font-medium ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span>{loading ? t('booking.submitting') : t('booking.submit')}</span>
                <Calendar className="h-5 w-5 calendar-icon" />
              </button>
            </form>
          </div>

          <div className="lg:pl-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-accent mb-8 font-poppins">{t('contact.title')}</h3>
              {contactInfo && (
              <div className="space-y-8">
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center p-4 rounded-lg hover:bg-secondary/60 transition-colors group"
                >
                  <div className="bg-secondary/40 p-3 rounded-full group-hover:bg-secondary transition-colors">
                    <Mail className="h-6 w-6 text-gray-900" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900 mb-1">{t('contact.emailUs')}</h4>
                    <span className="text-gray-600 group-hover:text-accent transition-colors">
                    {contactInfo.email}
                    </span>
                  </div>
                </a>
                <div className="flex items-center p-4 rounded-lg hover:bg-secondary/60 transition-colors group">
                  <div className="bg-secondary/40 p-3 rounded-full group-hover:bg-secondary transition-colors">
                    <Phone className="h-6 w-6 text-gray-900" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900 mb-1">{t('contact.callUs')}</h4>
                    <div className="flex flex-col">
                      <a 
                        href={`tel:${contactInfo.phone}`}
                        className="text-gray-600 group-hover:text-accent transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                      {contactInfo.phone_2 && (
                        <a 
                          href={`tel:${contactInfo.phone_2}`}
                          className="text-gray-600 group-hover:text-accent transition-colors"
                        >
                          {contactInfo.phone_2}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}