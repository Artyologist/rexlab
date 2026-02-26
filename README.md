# Rex Labs - Professional Studio Platform

Full-stack MERN application for Audio Engineers and Music Producers.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, MongoDB (Atlas)
- **Auth**: JWT with specialized Admin Role
- **Styling**: Custom CSS & Tailwind with Dark Mode

## Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account (Connection URI)

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   # This will install dependencies for both client and server if configured, otherwise:
   cd client && npm install
   cd ../server && npm install
   ```

2. **Configure Environment**
   - Navigate to `server/` and rename/copy `.env.example` (if exists) or create `.env`:
     ```env
     PORT=5000
     MONGODB_URI=your_mongodb_atlas_uri
     JWT_SECRET=your_secret_key
     ```
   - Client uses default `localhost:5000` for API proxy.

3. **Seed Database (Mock Data)**
   - Run this to create an Admin user (`admin@rexlabs.com` / `password123`) and sample beats.
   ```bash
   cd server
   npm run data:import
   ```

4. **Run Development Server**
   - **Recommended for Windows**: Double-click `dev-start.bat` or run:
     ```bash
     .\dev-start.bat
     ```
   - **Alternative**: Run the following in separate terminals:
     ```bash
     cd server && npm run dev
     cd client && npm run dev
     ```
   - **Original method (if Concurrent works)**:
     ```bash
     npm start
     ```

## Features
- **Portfolio**: Showcase previous work and studio gear.
- **Beat Store**: Browse, play, and buy beats with a custom audio player.
- **Booking System**: Interactive calendar for studio sessions.
- **Admin Dashboard**: secure area to manage beats, sessions, and enquiries.
- **Dark Mode**: Toggle between light and dark themes.

## Admin Access
- URL: `/admin/login`
- Default Credentials: `admin@rexlabs.com` / `password123`
