'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, login } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-gradient">
          Rex Labs
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-purple-500 transition-colors">
            Home
          </Link>
          <Link href="/beats" className="text-sm font-medium hover:text-purple-500 transition-colors">
            Buy Beats
          </Link>
          <Link href="/book" className="text-sm font-medium hover:text-purple-500 transition-colors">
            Book Session
          </Link>
          <Link href="/enquiry" className="text-sm font-medium hover:text-purple-500 transition-colors">
            Enquiry
          </Link>
          {user && (
            <Link href="/admin/dashboard" className="text-sm font-medium text-pink-500 hover:text-pink-400">
              Admin
            </Link>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 dark:text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-zinc-800 p-6 flex flex-col space-y-6 h-[calc(100vh-4rem)]">
          <Link href="/" onClick={() => setIsOpen(false)} className="block text-lg font-medium hover:text-purple-500">
            Home
          </Link>
          <Link href="/beats" onClick={() => setIsOpen(false)} className="block text-lg font-medium hover:text-purple-500">
            Buy Beats
          </Link>
          <Link href="/book" onClick={() => setIsOpen(false)} className="block text-lg font-medium hover:text-purple-500">
            Book Session
          </Link>
          <Link href="/enquiry" onClick={() => setIsOpen(false)} className="block text-lg font-medium hover:text-purple-500">
            Enquiry
          </Link>
          {user && (
            <Link href="/admin/dashboard" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-pink-500">
              Admin Dashboard
            </Link>
          )}
          <div className="pt-2 border-t border-gray-100 dark:border-zinc-800 flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Theme</span>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800"
            >
              {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
