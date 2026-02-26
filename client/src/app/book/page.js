'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { differenceInDays, format } from 'date-fns';
import { motion } from 'framer-motion';
import { FiClock, FiCheck, FiUser, FiInfo } from 'react-icons/fi';

const sessionTypes = [
  { id: 'recording', title: 'Full Recording', duration: '4h', price: 200, desc: 'Complete studio access for tracking vocals and instruments.' },
  { id: 'vocal', title: 'Vocals Recording', duration: '2h', price: 120, desc: 'Optimized vocal chain setup for singers and rappers.' },
  { id: 'mixing', title: 'Mixing & Mastering', duration: 'Project', price: 300, desc: 'Professional mixing and mastering for your track.' },
  { id: 'custom', title: 'Custom Project', duration: 'Varies', price: '?', desc: 'Tailored services for albums or special projects.' },
];

export default function BookSessionPage() {
  const [date, setDate] = useState(new Date());
  const [sessionType, setSessionType] = useState(null);
  const [timeSlot, setTimeSlot] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Time slots logic (mock)
  const availableTimeSlots = ['10:00 - 14:00', '14:30 - 18:30', '19:00 - 23:00'];

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTypeSelect = (type) => {
    setSessionType(type);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      await axios.post(`${apiUrl}/sessions`, {
        clientName: formData.name,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        date,
        timeSlot,
        sessionType: sessionType?.title,
        notes: formData.notes
      });
      setSuccess(true);
      setStep(4);
    } catch (error) {
      console.error(error);
      alert('Failed to book session. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />

      <div className="pt-24 pb-12 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book a <span className="text-gradient">Session</span></h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Reserve your studio time online. secure your spot and start creating.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          
          {/* Step 1: Select Date & Time */}
          <div className={`space-y-6 ${step >= 1 ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
            <h2 
              className={`text-2xl font-bold flex items-center gap-2 ${step > 1 ? 'cursor-pointer hover:text-purple-500 transition-colors' : ''}`}
              onClick={() => step > 1 && setStep(1)}
            >
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
              Select Date
            </h2>
            <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800">
              <Calendar 
                onChange={handleDateChange} 
                value={date} 
                className="w-full bg-transparent border-none dark:text-white"
                tileClassName={({ date, view }) => view === 'month' && date.getDay() === 0 ? 'text-red-500' : null}
              />
            </div>

            {date && (
              <div className="space-y-4">
                <h3 className="font-bold">Available Slots ({format(date, 'MMM do')})</h3>
                <div className="grid grid-cols-2 gap-2">
                  {availableTimeSlots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => { setTimeSlot(slot); setStep(2); }}
                      className={`p-3 rounded-lg text-sm font-medium border transition-all ${timeSlot === slot ? 'bg-purple-600 text-white border-purple-600' : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 hover:border-purple-400'}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Select Session Type */}
          <div className={`space-y-6 ${step >= 2 ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
            <h2 
              className={`text-2xl font-bold flex items-center gap-2 ${step > 2 ? 'cursor-pointer hover:text-purple-500 transition-colors' : ''}`}
              onClick={() => step > 2 && setStep(2)}
            >
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">2</span>
              Session Type
            </h2>
            <div className="space-y-4">
              {sessionTypes.map((type) => (
                <div 
                  key={type.id}
                  onClick={() => { handleTypeSelect(type); setStep(3); }}
                  className={`cursor-pointer p-4 rounded-xl border transition-all ${sessionType?.id === type.id ? 'bg-purple-50 dark:bg-purple-900/10 border-purple-500 ring-1 ring-purple-500' : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 hover:border-purple-300'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold">{type.title}</h3>
                    <span className="text-purple-600 font-bold">${type.price}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <span className="flex items-center gap-1"><FiClock size={14} /> {type.duration}</span>
                  </div>
                  <p className="text-xs text-gray-400">{type.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Details & Payment */}
          <div className={`space-y-6 ${step >= 3 ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">3</span>
              Your Details
            </h2>
            
            {step === 4 ? (
              <div className="p-8 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-xl text-center border border-green-200 dark:border-green-800">
                <FiCheck className="mx-auto text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-2">Booking Confirmed!</h3>
                <p>We&apos;ve sent a confirmation email to {formData.email}.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-3 text-gray-400" />
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                      className="w-full pl-10 p-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-purple-500 outline-none" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-purple-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-purple-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
                  <textarea 
                    name="notes" 
                    value={formData.notes} 
                    onChange={handleChange} 
                    className="w-full p-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-purple-500 outline-none h-24" 
                  />
                </div>

                <div className="p-4 bg-gray-50 dark:bg-zinc-900 rounded-lg text-sm text-gray-500 flex items-start gap-2">
                  <FiInfo className="mt-0.5 flex-shrink-0" />
                  <p>A deposit may be required to secure your booking. Payment details will be sent via email.</p>
                </div>

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:shadow-lg transition-transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Booking...' : 'Confirm Booking'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
