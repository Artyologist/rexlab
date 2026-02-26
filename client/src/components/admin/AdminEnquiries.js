'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { FiMail, FiCheckSquare } from 'react-icons/fi';

export default function AdminEnquiries({ token }) {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const fetchEnquiries = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const { data } = await axios.get(`${apiUrl}/enquiries`, config);
      setEnquiries(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const markAsRead = async (id) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      await axios.put(`${apiUrl}/enquiries/${id}`, { status: 'read' }, config);
      fetchEnquiries();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Client Enquiries</h2>
      
      <div className="grid gap-4">
        {enquiries.map(enquiry => (
          <div key={enquiry._id} className={`p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border ${enquiry.status === 'new' ? 'border-purple-500 ring-1 ring-purple-500' : 'border-gray-200 dark:border-zinc-800'}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{enquiry.name}</h3>
                <a href={`mailto:${enquiry.email}`} className="text-purple-600 hover:underline text-sm flex items-center gap-1">
                  <FiMail /> {enquiry.email}
                </a>
              </div>
              <span className="text-xs text-gray-400">{format(new Date(enquiry.createdAt), 'MMM do, h:mm a')}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{enquiry.message}</p>
            
            {enquiry.status === 'new' && (
              <button 
                onClick={() => markAsRead(enquiry._id)}
                className="text-sm bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <FiCheckSquare /> Mark as Read
              </button>
            )}
          </div>
        ))}
        {enquiries.length === 0 && !loading && <p className="text-center text-gray-500">No enquiries found.</p>}
      </div>
    </div>
  );
}
