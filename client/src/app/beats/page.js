'use client';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BeatCard from '../../components/BeatCard';
import axios from 'axios';
import { FiSearch, FiFilter } from 'react-icons/fi';

// Mock data for initial render if API fails or is empty
// Prices set to ₹10 for test mode. Audio uses public CDN sample (no 404).
const mockBeats = [
  { _id: '1', title: 'Midnight Drive', price: 10, bpm: 140, duration: '3:20', genre: 'Trap', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', coverArtUrl: '/assets/audiowave.jpg' },
  { _id: '2', title: 'Soulful Sundays', price: 10, bpm: 90, duration: '2:45', genre: 'Lo-Fi', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', coverArtUrl: '/assets/piano.jpg' },
  { _id: '3', title: 'Hype Beast', price: 10, bpm: 160, duration: '3:10', genre: 'Drill', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', coverArtUrl: '/assets/interface.jpg' },
];

export default function BeatsPage() {
  const [beats, setBeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBeats = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const { data } = await axios.get(`${apiUrl}/beats`);
        if (data.length > 0) {
          setBeats(data);
        } else {
          setBeats(mockBeats);
        }
      } catch (error) {
        console.error('Failed to fetch beats', error);
        setBeats(mockBeats);
      } finally {
        setLoading(false);
      }
    };

    fetchBeats();
  }, []);

  const handlePlay = (id) => {
    if (currentPlayingId === id) return;
    setCurrentPlayingId(id);
  };

  const handlePause = () => {
    setCurrentPlayingId(null);
  };

  const filteredBeats = beats.filter(beat => 
    beat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    beat.genre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />

      <div className="pt-24 pb-12 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Make Your Next <span className="text-gradient">Hit</span></h1>
          <p className="text-gray-500 max-w-2xl mx-auto mb-8">
            Browse our catalog of premium, industry-ready beats. Keep 100% of your master royalties.
          </p>
          
          <div className="max-w-xl mx-auto relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by title, genre, mood..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading beats...</p>
          ) : filteredBeats.length > 0 ? (
            filteredBeats.map((beat) => (
              <BeatCard 
                key={beat._id} 
                beat={beat} 
                isPlaying={currentPlayingId === beat._id} 
                onPlay={() => handlePlay(beat._id)} 
                onPause={handlePause} 
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No beats found matching your search.</p>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
