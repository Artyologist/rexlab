'use client';
import { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { FiMusic, FiCalendar, FiMessageSquare, FiLogOut } from 'react-icons/fi';
import AdminBeats from '../../../components/admin/AdminBeats';
import AdminSessions from '../../../components/admin/AdminSessions';
import AdminEnquiries from '../../../components/admin/AdminEnquiries';

export default function AdminDashboardPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('beats');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 font-sans flex flex-col">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar (Navigation) */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 p-4 md:sticky md:top-24">
              <div className="mb-6 px-4 hidden md:block">
                <h2 className="font-bold text-lg">Admin Dashboard</h2>
                <p className="text-xs text-gray-500">Welcome, {user.username}</p>
              </div>
              
              <nav className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                <button 
                  onClick={() => setActiveTab('beats')}
                  className={`flex-shrink-0 flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-lg transition-colors whitespace-nowrap ${activeTab === 'beats' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 font-medium' : 'hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-400'}`}
                >
                  <FiMusic size={18} /> Beats
                </button>
                <button 
                  onClick={() => setActiveTab('sessions')}
                  className={`flex-shrink-0 flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-lg transition-colors whitespace-nowrap ${activeTab === 'sessions' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 font-medium' : 'hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-400'}`}
                >
                  <FiCalendar size={18} /> Sessions
                </button>
                <button 
                  onClick={() => setActiveTab('enquiries')}
                  className={`flex-shrink-0 flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-lg transition-colors whitespace-nowrap ${activeTab === 'enquiries' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 font-medium' : 'hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-400'}`}
                >
                  <FiMessageSquare size={18} /> Enquiries
                </button>
              </nav>

              <div className="mt-4 md:mt-8 pt-4 border-t border-gray-100 dark:border-zinc-800">
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-2 md:py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                >
                  <FiLogOut size={18} /> Logout
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <section className="flex-grow">
            {activeTab === 'beats' && <AdminBeats token={user.token} />}
            {activeTab === 'sessions' && <AdminSessions token={user.token} />}
            {activeTab === 'enquiries' && <AdminEnquiries token={user.token} />}
          </section>

        </div>
      </div>

    </main>
  );
}
