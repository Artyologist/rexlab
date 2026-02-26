'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FiChevronDown, FiChevronUp, FiMessageCircle, FiMail } from 'react-icons/fi';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { question: "How much does a beat cost?", answer: "Our beats start at $29.99 for a basic lease. Exclusive rights are negotiable." },
  { question: "Can I book a session for next week?", answer: "Yes! Check our booking page for real-time availability." },
  { question: "What equipment do you use?", answer: "We use top-tier gear including Neumann mics, Universal Audio interfaces, and high-end plugins." },
  { question: "Do you offer mixing services remotely?", answer: "Absolutely. You can upload your stems, and we'll send back the mixed track." },
];

export default function EnquiryPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [activeIndex, setActiveIndex] = useState(null);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post('http://localhost:5000/api/enquiries', formData);
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />

      <div className="pt-24 pb-12 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in <span className="text-gradient">Touch</span></h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Have a question? We're here to help you make your best music.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FiMessageCircle className="text-purple-500" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900">
                  <button 
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center p-4 text-left font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    {faq.question}
                    {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 text-gray-500 dark:text-gray-400 text-sm border-t border-gray-100 dark:border-zinc-800">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-800 h-fit">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FiMail className="text-purple-500" />
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea 
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none"
                ></textarea>
              </div>

              {status === 'sent' && (
                <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm text-center">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm text-center">
                  Something went wrong. Please try again.
                </div>
              )}

              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full py-3 bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold rounded-lg transition-colors disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending...' : 'Send Enquiry'}
              </button>
            </form>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
