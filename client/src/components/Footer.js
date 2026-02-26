import Link from 'next/link';
import { FiInstagram, FiTwitter, FiYoutube, FiMail, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800 py-12">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-2xl font-bold tracking-tight text-gradient mb-4 block">
            Rex Labs
          </Link>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm">
            Professional audio engineering and music production studio dedicated to crafting the perfect sound for artists worldwide.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-bold mb-4 dark:text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/beats" className="text-gray-500 hover:text-purple-500 transition-colors">Buy Beats</Link></li>
            <li><Link href="/book" className="text-gray-500 hover:text-purple-500 transition-colors">Book Session</Link></li>
            <li><Link href="/enquiry" className="text-gray-500 hover:text-purple-500 transition-colors">Enquiry</Link></li>
            <li><Link href="/admin/login" className="text-gray-500 hover:text-purple-500 transition-colors">Admin Login</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold mb-4 dark:text-white">Contact</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-gray-500">
              <FiMail className="text-purple-500" />
              <span>contact@rexlabs.com</span>
            </li>
            <li className="flex items-center gap-2 text-gray-500">
              <FiMapPin className="text-purple-500" />
              <span>123 Music Ave, Studio City</span>
            </li>
            <li className="flex gap-4 mt-4">
              <a href="#" className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-full hover:text-purple-500 transition-colors"><FiInstagram size={20} /></a>
              <a href="#" className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-full hover:text-purple-500 transition-colors"><FiTwitter size={20} /></a>
              <a href="#" className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-full hover:text-purple-500 transition-colors"><FiYoutube size={20} /></a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-100 dark:border-zinc-900 mt-12 pt-8 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Rex Labs. All rights reserved.
      </div>
    </footer>
  );
}
