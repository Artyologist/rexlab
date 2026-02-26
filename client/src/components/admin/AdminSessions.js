'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { FiCheck, FiX, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function AdminSessions({ token }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const fetchSessions = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/sessions', config);
      setSessions(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error('Failed to load sessions');
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/sessions/${id}`, { status }, config);
      toast.success(`Session marked as ${status}`);
      fetchSessions();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'booked': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Session Bookings</h2>
      
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-zinc-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-zinc-800">
              <tr>
                <th className="p-4">Client</th>
                <th className="p-4">Date/Time</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map(session => (
                <tr key={session._id} className="border-t border-gray-100 dark:border-zinc-800">
                  <td className="p-4">
                    <div className="font-bold">{session.clientName}</div>
                    <div className="text-xs text-gray-500">{session.clientEmail}</div>
                  </td>
                  <td className="p-4">
                    <div>{format(new Date(session.date), 'MMM do, yyyy')}</div>
                    <div className="text-xs text-gray-500">{session.timeSlot}</div>
                  </td>
                  <td className="p-4 text-sm">{session.sessionType}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(session.status)} uppercase`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    {session.status !== 'booked' && (
                      <button onClick={() => updateStatus(session._id, 'booked')} className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200" title="Mark as Booked"><FiCheck /></button>
                    )}
                    {session.status !== 'completed' && (
                      <button onClick={() => updateStatus(session._id, 'completed')} className="p-2 bg-green-100 text-green-600 rounded hover:bg-green-200" title="Mark as Completed"><FiCheck /></button>
                    )}
                    {session.status !== 'cancelled' && (
                      <button onClick={() => updateStatus(session._id, 'cancelled')} className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200" title="Cancel"><FiX /></button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sessions.length === 0 && !loading && <p className="p-8 text-center text-gray-500">No sessions booked yet.</p>}
      </div>
    </div>
  );
}
