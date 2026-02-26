'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FiPlay, FiPause, FiShoppingCart, FiCheckCircle, FiCopy } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { initializePayment } from '../utils/paymentHandler';

const BeatCard = ({ beat, isPlaying, onPlay, onPause }) => {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [paying, setPaying] = useState(false);
  const [txn, setTxn] = useState(null); // Stores transaction result after payment

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    if (duration) setProgress((current / duration) * 100);
  };

  const handleEnded = () => {
    onPause();
    setProgress(0);
  };

  const handleBuy = async () => {
    setPaying(true);
    try {
      const order = await initializePayment(
        beat.price,
        [{ name: beat.title, price: beat.price, itemType: 'Beat', itemId: beat._id }]
      );
      // Store transaction details to display on page
      setTxn(order);
    } catch (err) {
      // Error toasts are already handled in paymentHandler
    } finally {
      setPaying(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <motion.div
      className={`relative w-full rounded-2xl overflow-hidden flex flex-col transition-all duration-300 border mb-4 hover:shadow-lg ${isPlaying ? 'bg-purple-900/20 border-purple-500' : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Main Beat Row */}
      <div className="p-4 flex flex-wrap md:flex-nowrap items-center gap-4">
        {/* Cover Art */}
        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={beat.coverArtUrl || '/assets/rex-labs.png'}
            alt={beat.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <button
              onClick={isPlaying ? onPause : onPlay}
              className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
            >
              {isPlaying ? <FiPause size={14} /> : <FiPlay size={14} className="ml-0.5" />}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="flex-grow min-w-0">
          <h3 className="font-bold text-lg truncate dark:text-white">{beat.title}</h3>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">{beat.bpm} BPM</span>
            <span className="bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">{beat.key || 'Cm'}</span>
            <span>{beat.duration}</span>
          </div>
        </div>

        {/* Waveform Visualization */}
        <div className="hidden md:flex flex-grow h-8 items-center gap-0.5 opacity-50 mx-4">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-300 ${i / 40 * 100 < progress ? 'bg-purple-500' : 'bg-gray-300 dark:bg-zinc-700'}`}
              style={{ height: `${Math.abs(Math.sin(i * 0.4) * 60) + 20}%` }}
            />
          ))}
        </div>

        {/* Price & Buy */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-gray-100 dark:border-zinc-800 pt-4 md:pt-0 mt-2 md:mt-0 flex-shrink-0">
          <span className="font-bold text-lg text-purple-500">₹{beat.price}</span>
          <button
            onClick={handleBuy}
            disabled={paying || !!txn}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all shadow-lg shadow-purple-500/20 ${txn ? 'bg-green-600 text-white cursor-default' : 'bg-purple-600 text-white hover:bg-purple-700'} disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {txn ? (
              <><FiCheckCircle size={16} /> Paid</>
            ) : paying ? (
              <>Processing...</>
            ) : (
              <><FiShoppingCart size={16} /> Buy ₹{beat.price}</>
            )}
          </button>
        </div>
      </div>

      {/* ── Transaction Success Banner ── */}
      <AnimatePresence>
        {txn && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-green-500/30 bg-green-900/10 px-4 py-3"
          >
            <p className="text-xs font-semibold text-green-400 mb-2 flex items-center gap-1.5">
              <FiCheckCircle size={13} /> Payment Successful — Transaction Details
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <TxnRow label="Payment ID" value={txn.razorpayPaymentId} onCopy={copyToClipboard} />
              <TxnRow label="Order ID" value={txn.razorpayOrderId} onCopy={copyToClipboard} />
              <TxnRow label="Status" value={txn.status?.toUpperCase()} noIcon />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio
        ref={audioRef}
        src={beat.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </motion.div>
  );
};

// Small helper row for transaction details
const TxnRow = ({ label, value, onCopy, noIcon }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[10px] text-gray-500 uppercase tracking-widest">{label}</span>
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-green-300 font-mono break-all">{value || '—'}</span>
      {!noIcon && value && (
        <button
          onClick={() => onCopy(value)}
          className="text-gray-500 hover:text-green-400 transition-colors flex-shrink-0"
          title="Copy"
        >
          <FiCopy size={11} />
        </button>
      )}
    </div>
  </div>
);

export default BeatCard;
