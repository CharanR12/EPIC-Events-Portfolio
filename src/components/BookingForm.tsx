import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, X, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../lib/i18n/LanguageContext';
import { useGameSelection } from './GameSelectionContext';
import toast from 'react-hot-toast';
import type { Game } from './types';

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  event_type: string;
  requirements: string;
  selected_games: number[];
  number_of_people?: number;
  time_slot?: string;
}

export default function BookingForm() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const { t, language } = useLanguage();
  const { selectedGames, toggleGameSelection, clearSelectedGames } = useGameSelection();

  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    event_type: '',
    requirements: '',
    selected_games: [],
    number_of_people: undefined,
    time_slot: ''
  });

  // Get tomorrow's date for min date in date picker
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Get date 3 months from now for max date
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateString = maxDate.toISOString().split('T')[0];

  useEffect(() => {
    async function fetchContactInfo() {
      try {
        const { data, error } = await supabase
          .from('contact_info')
          .select('*')
          .single();

        if (error) throw error;
        setContactInfo(data);
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    }

    fetchContactInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate selected games
      if (selectedGames.length === 0) {
        throw new Error(t('booking.errorNoGamesSelected'));
      }

      const bookingData = {
        ...formData,
        selected_games: selectedGames.map(game => game.id)
      };

      const { error } = await supabase
        .from('booking_requests')
        .insert([bookingData]);

      if (error) throw error;

      toast.success(t('booking.successMessage'));
      
      // Reset form and selected games
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        event_type: '',
        requirements: '',
        selected_games: [],
        number_of_people: undefined,
        time_slot: ''
      });
      clearSelectedGames();
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error(error instanceof Error ? error.message : t('booking.errorMessage'));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getLocalizedGameName = (game: Game) => {
    return language === 'ta' && game.name_ta ? game.name_ta : game.name;
  };

  return (
    <section id="booking" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-8 font-poppins">
              {t('booking.title')}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selected Games Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('booking.selectedGames')}
                </label>
                {selectedGames.length === 0 ? (
                  <p className="text-gray-500 text-sm italic">
                    {t('booking.noGamesSelected')}
                  </p>
                ) : (
                  <div className="space-y-2">
                    {selectedGames.map(game => (
                      <div 
                        key={game.id}
                        className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg"
                      >
                        <span className="text-gray-700">{getLocalizedGameName(game)}</span>
                        <button
                          type="button"
                          onClick={() => toggleGameSelection(game)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('booking.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input w-full rounded-lg bg-secondary/40 border-gray-300 focus:border-accent focus:ring-accent"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('booking.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input w-full rounded-lg bg-secondary/40 border-gray-300 focus:border-accent focus:ring-accent"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Contact and Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('booking.phone')} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="form-input w-full rounded-lg bg-secondary/40 border-gray-300 focus:border-accent focus:ring-accent"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="number_of_people" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('booking.numberOfPeople')} *
                  </label>
                  <input
                    type="number"
                    id="number_of_people"
                    name="number_of_people"
                    value={formData.number_of_people || ''}
                    onChange={handleChange}
                    required
                    min="1"
                    max="100"
                    className="form-input w-full rounded-lg bg-secondary/40 border-gray-300 focus:border-accent focus:ring-accent"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('booking.date')} *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={minDate}
                    max={maxDateString}
                    className="form-input w-full rounded-lg bg-secondary/40 border-gray-300 focus:border-accent focus:ring-accent"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="time_slot" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('booking.timeSlot')} *
                  </label>
                  <select
                    id="time_slot"
                    name="time_slot"
                    value={formData.time_slot}
                    onChange={handleChange}
                    required
                    className="form-select w-full rounded-lg bg-secondary/40 border-gray-300 focus:border-accent focus:ring-accent"
                    disabled={loading}
                  >
                    <option value="">{t('booking.selectTimeSlot')}</option>
                    <option value="morning">{t('booking.timeSlots.morning')}</option>
                    <option value="afternoon">{t('booking.timeSlots.afternoon')}</option>
                    <option value="evening">{t('booking.timeSlots.evening')}</option>
                  </select>
                </div>
              </div>

              {/* Event Type */}
              <div>
                <label htmlFor="event_type" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('booking.eventType')} *
                </label>
                <select
                  id="event_type"
                  name="event_type"
                  value={formData.event_type}
                  onChange={handleChange}
                  required
                  className="form-select w-full rounded-lg bg-secondary/40 border-gray-300 focus:border-accent focus:ring-accent"
                  disabled={loading}
                >
                  <option value="">{t('booking.selectEventType')}</option>
                  <option value="birthday">{t('booking.eventTypes.birthday')}</option>
                  <option value="corporate">{t('booking.eventTypes.corporate')}</option>
                  <option value="school">{t('booking.eventTypes.school')}</option>
                  <option value="tournament">{t('booking.eventTypes.tournament')}</option>
                  <option value="other">{t('booking.eventTypes.other')}</option>
                </select>
              </div>

              {/* Special Requirements */}
              <div>
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('booking.requirements')}
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={4}
                  className="form-textarea w-full rounded-lg bg-secondary/40 border-gray-300 focus:border-accent focus:ring-accent"
                  disabled={loading}
                  placeholder={t('booking.requirementsPlaceholder')}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || selectedGames.length === 0}
                className={`w-full bg-accent/90 text-white py-4 px-6 rounded-lg 
                  transition-all duration-300 flex items-center justify-center gap-2
                  ${loading || selectedGames.length === 0 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-accent hover:shadow-lg transform hover:-translate-y-0.5'}`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{t('booking.submitting')}</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5" />
                    <span>{t('booking.submit')}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="lg:pl-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-accent mb-8 font-poppins">
                {t('contact.title')}
              </h3>
              
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
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {t('contact.emailUs')}
                      </h4>
                      <span className="text-gray-600 group-hover:text-accent transition-colors">
                        {contactInfo.email}
                      </span>
                    </div>
                  </a>

                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center p-4 rounded-lg hover:bg-secondary/60 transition-colors group"
                  >
                    <div className="bg-secondary/40 p-3 rounded-full group-hover:bg-secondary transition-colors">
                      <Phone className="h-6 w-6 text-gray-900" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {t('contact.callUs')}
                      </h4>
                      <span className="text-gray-600 group-hover:text-accent transition-colors">
                        {contactInfo.phone}
                    </span>
                  </div>
                </a>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}