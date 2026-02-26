'use client';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from './context/AuthContext';

import { Toaster } from 'react-hot-toast';

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        {children}
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: '#059669',
            },
          },
          error: {
            style: {
              background: '#DC2626',
            },
          },
        }} />
      </AuthProvider>
    </ThemeProvider>
  );
}
