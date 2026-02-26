'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit, FiTrash2, FiPlus, FiMusic } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function AdminBeats({ token }) {
  const [beats, setBeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBeat, setEditingBeat] = useState(null);
  const [formData, setFormData] = useState({
    title: '', price: '', genre: '', duration: '', bpm: '', audioUrl: '', coverArtUrl: ''
  });

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const fetchBeats = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const { data } = await axios.get(`${apiUrl}/beats`);
      setBeats(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error('Failed to load beats');
    }
  };

  useEffect(() => {
    fetchBeats();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this beat?')) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        await axios.delete(`${apiUrl}/beats/${id}`, config);
        setBeats(beats.filter(beat => beat._id !== id));
        toast.success('Beat deleted successfully');
      } catch (error) {
        toast.error('Failed to delete beat');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      if (editingBeat) {
        await axios.put(`${apiUrl}/beats/${editingBeat._id}`, formData, config);
        toast.success('Beat updated successfully');
        setEditingBeat(null);
      } else {
        await axios.post(`${apiUrl}/beats`, formData, config);
        toast.success('New beat added successfully');
      }
      setFormData({ title: '', price: '', genre: '', duration: '', bpm: '', audioUrl: '', coverArtUrl: '' });
      fetchBeats();
    } catch (error) {
      toast.error('Failed to save beat');
    }
  };

  const startEdit = (beat) => {
    setEditingBeat(beat);
    setFormData({
      title: beat.title,
      price: beat.price,
      genre: beat.genre,
      duration: beat.duration,
      bpm: beat.bpm,
      audioUrl: beat.audioUrl,
      coverArtUrl: beat.coverArtUrl
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Beats</h2>
        <button 
          onClick={() => { setEditingBeat(null); setFormData({ title: '', price: '', genre: '', duration: '', bpm: '', audioUrl: '', coverArtUrl: '' }); }}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <FiPlus /> Add New Beat
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800">
        <h3 className="font-bold mb-4">{editingBeat ? 'Edit Beat' : 'Add New Beat'}</h3>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700" required />
          <input type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700" required />
          <input type="text" placeholder="Genre" value={formData.genre} onChange={e => setFormData({...formData, genre: e.target.value})} className="p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700" required />
          <input type="text" placeholder="Duration (e.g. 3:20)" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700" />
          <input type="number" placeholder="BPM" value={formData.bpm} onChange={e => setFormData({...formData, bpm: e.target.value})} className="p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700" />
          <input type="text" placeholder="Audio URL" value={formData.audioUrl} onChange={e => setFormData({...formData, audioUrl: e.target.value})} className="p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700" required />
          <input type="text" placeholder="Cover Art URL" value={formData.coverArtUrl} onChange={e => setFormData({...formData, coverArtUrl: e.target.value})} className="p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700" />
        </div>
        <button type="submit" className="mt-4 px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-opacity">
          {editingBeat ? 'Update Beat' : 'Upload Beat'}
        </button>
      </form>

      {/* List */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-zinc-800">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Genre</th>
              <th className="p-4">Price</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {beats.map(beat => (
              <tr key={beat._id} className="border-t border-gray-100 dark:border-zinc-800">
                <td className="p-4 font-medium">{beat.title}</td>
                <td className="p-4 text-gray-500">{beat.genre}</td>
                <td className="p-4 text-purple-600">${beat.price}</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => startEdit(beat)} className="p-2 text-blue-500 hover:bg-blue-50 rounded"><FiEdit /></button>
                  <button onClick={() => handleDelete(beat._id)} className="p-2 text-red-500 hover:bg-red-50 rounded"><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {beats.length === 0 && !loading && <p className="p-8 text-center text-gray-500">No beats found.</p>}
      </div>
    </div>
  );
}
