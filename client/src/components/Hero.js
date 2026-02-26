'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiMusic, FiMic } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/studio.jpg"
          alt="Studio Background"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
            From Beat to Master
            <span className="block text-gradient mt-2">One Studio, One Vision.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10">
            Professional Mixing, Mastering & Beat Production for the modern artist.
            Elevate your sound with Rex Labs.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link href="/book">
              <button className="flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-purple-500/30">
                <FiMic size={20} />
                Book a Session
              </button>
            </Link>
            
            <Link href="/beats">
              <button className="flex items-center gap-2 px-8 py-4 bg-transparent border border-gray-500 hover:border-purple-400 text-white rounded-full font-bold transition-all hover:bg-white/5">
                <FiMusic size={20} />
                Buy Beats
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gray-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
