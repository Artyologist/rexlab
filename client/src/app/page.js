'use client';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiCpu, FiHeadphones, FiMic } from 'react-icons/fi';

// Placeholder data for showcase
const showcaseProjects = [
  { id: 1, title: 'Produced: Neon Nights', artist: 'Artist One', videoId: 'dQw4w9WgXcQ' }, // Example ID
  { id: 2, title: 'Released: Original Mix', artist: 'Rex Labs', videoId: 'dQw4w9WgXcQ' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />
      
      <Hero />

      {/* Showcase Section */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Latest <span className="text-gradient">Work</span></h2>
        <div className="grid md:grid-cols-2 gap-8">
          {showcaseProjects.map((project) => (
            <motion.div 
              key={project.id}
              className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all border border-gray-200 dark:border-zinc-800"
              whileHover={{ y: -5 }}
            >
              <div className="relative aspect-video bg-black">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${project.videoId}`} 
                  title={project.title} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="absolute inset-0"
                ></iframe>
              </div>
              <div className="p-6 bg-white dark:bg-zinc-900">
                <h3 className="text-xl font-bold mb-1 dark:text-white">{project.title}</h3>
                <p className="text-gray-500 text-sm">{project.artist}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Expertise & Skills */}
      <section className="py-20 bg-gray-100 dark:bg-zinc-900 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Studio <span className="text-gradient">Experience</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Over 10 years of professional music production, delivering industry-standard quality.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <FiCpu />, title: "Beat Production", desc: "Custom instrumentals tailored to your style." },
              { icon: <FiMic />, title: "Vocal Recording", desc: "Pristine vocal chains and professional direction." },
              { icon: <FiHeadphones />, title: "Mixing", desc: "Balance, clarity, and depth for your tracks." },
              { icon: <FiCheckCircle />, title: "Mastering", desc: "Radio-ready loudness and polish." }
            ].map((skill, index) => (
              <motion.div 
                key={index}
                className="p-8 bg-white dark:bg-zinc-950 rounded-2xl border border-gray-200 dark:border-zinc-800 hover:border-purple-500 transition-colors text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl text-purple-600 mb-4 inline-block p-4 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">{skill.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{skill.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Tools */}
          <div className="mt-16 flex flex-wrap justify-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using placeholder images for FL Studio and Ableton */}
            <div className="relative w-32 h-12">
               <Image src="/assets/fl-studio.png" alt="FL Studio" fill style={{objectFit: 'contain'}} />
            </div>
            <div className="relative w-32 h-12">
               <Image src="/assets/abelton.png" alt="Ableton Live" fill style={{objectFit: 'contain'}} />
            </div>
          </div>
        </div>
      </section>

      {/* Studio Gallery (Grid) */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">The <span className="text-gradient">Space</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group">
            <Image src="/assets/studio.jpg" alt="Main Studio" fill className="object-cover transition-transform group-hover:scale-110" />
          </div>
          <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden group">
            <Image src="/assets/sound-board.jpg" alt="Gear 1" fill className="object-cover transition-transform group-hover:scale-110" />
          </div>
          <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden group">
             <Image src="/assets/piano.jpg" alt="Gear 2" fill className="object-cover transition-transform group-hover:scale-110" />
          </div>
          <div className="col-span-2 row-span-1 relative rounded-2xl overflow-hidden group">
             <Image src="/assets/interface.jpg" alt="Gear 3" fill className="object-cover transition-transform group-hover:scale-110" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
