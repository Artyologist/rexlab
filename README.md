<h1 align="center">🎙️ Rex Labs — Professional Studio Platform</h1>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" />
  <img src="https://img.shields.io/badge/Frontend-Next.js%2014-black?logo=next.js" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/Backend-Express%204.18-green?logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/Database-MongoDB%20Atlas-brightgreen?logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Storage-Supabase-3ECF8E?logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/Client-Vercel-black?logo=vercel" alt="Vercel" />
  <img src="https://img.shields.io/badge/Server-Render-46E3B7?logo=render" alt="Render" />
</p>

<p align="center">
  A full-stack MERN platform for professional audio engineers and music producers — featuring a beat marketplace, studio booking system, and a secure admin dashboard.
</p>

---

## 🌐 Live Application

| Service | URL |
|---|---|
| **Frontend (Client)** | [https://rexlab.vercel.app](https://rexlab.vercel.app) |
| **Backend (API)** | [https://rexlab.onrender.com/api](https://rexlab.onrender.com/api) |

---

## ✨ Key Features

- **🎵 Beat Marketplace** — Browse, preview, and purchase beats with cover art, BPM, genre, mood tags, and streaming previews. Beat ownership is tracked with a sold status flag.
- **💳 Razorpay Payment Integration** — Secure order creation and server-side HMAC-SHA256 signature verification via the Razorpay API, with full order records persisted in MongoDB.
- **📅 Studio Session Booking** — Interactive calendar-driven booking flow supporting session types: Full Recording, Vocals, Audio/Instrumental, Mixing & Mastering, and Custom, with payment status tracking (pending → advance_paid → full_paid).
- **🔐 JWT + Role-Based Auth** — Stateless authentication using JSON Web Tokens. A two-tier role system (`admin` / `client`) enforces route-level access control via `protect` and `admin` middleware.
- **⚙️ Secure Admin Dashboard** — A protected `/admin` area for managing beats (CRUD), viewing and updating studio session statuses, and handling customer enquiries with read/replied status tracking.
- **☁️ Supabase File Storage** — High-resolution WAV/ZIP beat files and audio previews are stored on Supabase Storage, keeping the main database lean and performant.

---

## 🛠️ Tech Stack

### Frontend (`/client`)

| Technology | Version | Purpose |
|---|---|---|
| Next.js | `14.1.0` | App Router, SSR/SSG framework |
| React | `^18` | UI component library |
| Tailwind CSS | `^3.3.0` | Utility-first styling |
| Framer Motion | `^12.33.0` | Animations and transitions |
| Axios | `^1.13.5` | HTTP client for API calls |
| `@supabase/supabase-js` | `^2.99.1` | Supabase Storage client |
| `react-calendar` | `^6.0.0` | Booking calendar UI |
| `next-themes` | `^0.4.6` | Dark/light mode toggling |
| `react-hot-toast` | `^2.6.0` | Toast notifications |
| `react-icons` | `^5.5.0` | Icon library |
| `date-fns` | `^4.1.0` | Date formatting utilities |

### Backend (`/server`)

| Technology | Version | Purpose |
|---|---|---|
| Node.js | `>=18` | Runtime environment |
| Express | `^4.18.2` | REST API framework |
| Mongoose | `^8.0.3` | MongoDB ODM |
| `jsonwebtoken` | `^9.0.3` | JWT generation and verification |
| `bcryptjs` | `^2.4.3` | Password hashing (salt rounds: 10) |
| Razorpay | `^2.9.6` | Payment gateway SDK |
| Stripe | `^14.10.0` | Payment gateway SDK (secondary) |
| `@supabase/supabase-js` | `^2.99.1` | Supabase Storage admin client |
| Cloudinary | `^1.41.2` | Alternative media storage |
| Nodemailer | `^6.9.7` | Email notifications |
| Multer | `^1.4.5-lts.1` | Multipart file upload handling |
| `express-async-handler` | `^1.2.0` | Async error propagation |
| Nodemon | `^3.1.11` | Dev server auto-restart |
| dotenv | `^16.3.1` | Environment variable management |

### Infrastructure

| Service | Role |
|---|---|
| MongoDB Atlas | Cloud-hosted database |
| Supabase Storage | Beat audio file hosting |
| Vercel | Next.js frontend deployment |
| Render | Express backend deployment |

---

## 📁 Repository Structure

```
rex-labs/
├── client/                        # Next.js 14 frontend (App Router)
│   ├── src/
│   │   ├── app/                   # App Router pages
│   │   │   ├── page.js            # Homepage (Hero, Showcase, Studio Gallery)
│   │   │   ├── beats/             # Beat store listing page
│   │   │   ├── book/              # Session booking page
│   │   │   ├── about/             # About page
│   │   │   ├── contact/           # Contact / enquiry form
│   │   │   ├── enquiry/           # Enquiry submission page
│   │   │   ├── location/          # Studio location page
│   │   │   ├── admin/
│   │   │   │   ├── login/         # Admin login page
│   │   │   │   └── dashboard/     # Admin dashboard (beats, sessions, enquiries)
│   │   │   ├── privacy-policy/
│   │   │   ├── refund-policy/
│   │   │   ├── shipping-policy/
│   │   │   └── terms/
│   │   ├── components/            # Reusable UI components (Hero, NavBar, etc.)
│   │   ├── context/               # React context providers
│   │   ├── providers.js           # ThemeProvider & global wrappers
│   │   └── utils/                 # Utility helpers (API clients, formatters)
│   ├── public/                    # Static assets (studio images, DAW logos)
│   ├── next.config.mjs
│   ├── tailwind.config.js
│   └── vercel.json                # Vercel deployment config
│
├── server/                        # Express.js REST API
│   ├── controllers/               # Route handler logic
│   │   ├── authController.js      # Register / Login
│   │   ├── beatController.js      # Beat CRUD
│   │   ├── sessionController.js   # Session booking CRUD
│   │   ├── enquiryController.js   # Enquiry management
│   │   └── paymentController.js   # Razorpay order & verification
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT protect + admin role guard
│   │   └── errorMiddleware.js     # Centralised error handler
│   ├── models/                    # Mongoose schemas
│   │   ├── User.js
│   │   ├── Beat.js
│   │   ├── Session.js
│   │   ├── Order.js
│   │   └── Enquiry.js
│   ├── routes/                    # Express routers
│   │   ├── authRoutes.js
│   │   ├── beatRoutes.js
│   │   ├── sessionRoutes.js
│   │   ├── enquiryRoutes.js
│   │   └── paymentRoutes.js
│   ├── seeder.js                  # DB seed script (admin user + sample beats)
│   ├── server.js                  # Entry point, DB connection, middleware setup
│   └── render.yaml                # Render.com deployment config
│
├── dev-start.bat                  # Windows dev launcher (runs both servers)
├── package.json                   # Root: concurrently runs client + server
└── README.md
```

---

## 🏗️ Core Architecture

Rex Labs follows a **monorepo, decoupled full-stack architecture**. The frontend and backend are developed and deployed independently but communicate over a JSON REST API.

```
┌─────────────────────────────────────────────┐
│                  Browser                    │
│            Next.js 14 App Router            │
│   (Vercel → https://rexlab.vercel.app)      │
└─────────────┬───────────────────────────────┘
              │ HTTPS / Axios (JSON)
              │ CORS whitelist: localhost:3000,
              │   *.vercel.app
              ▼
┌─────────────────────────────────────────────┐
│          Express REST API (Node.js)          │
│   (Render → https://rexlab.onrender.com)    │
│                                             │
│  ┌──────────┐  ┌────────┐  ┌────────────┐  │
│  │  Auth    │  │ Beats  │  │  Sessions  │  │
│  │ /api/    │  │ /api/  │  │  /api/     │  │
│  │  users   │  │  beats │  │  sessions  │  │
│  └──────────┘  └────────┘  └────────────┘  │
│  ┌──────────┐  ┌──────────────────────────┐ │
│  │Enquiries │  │       Payment            │ │
│  │/api/     │  │  /api/payment/order      │ │
│  │enquiries │  │  /api/payment/verify     │ │
│  └──────────┘  └──────────────────────────┘ │
└──────────┬──────────────┬───────────────────┘
           │              │
           ▼              ▼
  ┌──────────────┐  ┌──────────────┐
  │ MongoDB Atlas│  │   Supabase   │
  │  (documents) │  │   Storage    │
  │              │  │ (audio/WAV)  │
  └──────────────┘  └──────────────┘
```

**Payment Flow:**
1. Client calls `POST /api/payment/order` → server creates a Razorpay order (amount in paise, currency INR) and saves a `pending` Order record to MongoDB.
2. Client renders the Razorpay checkout modal using the returned `orderId` and `key`.
3. On payment success, client calls `POST /api/payment/verify` with `razorpay_order_id`, `razorpay_payment_id`, and `razorpay_signature`.
4. Server recomputes the expected HMAC-SHA256 signature. If it matches, the Order is updated to `paid` status.

---

## 🗄️ Database Schema

### `users`
| Field | Type | Constraints |
|---|---|---|
| `username` | String | Required, Unique |
| `email` | String | Required, Unique, Lowercase |
| `password` | String | Required, bcrypt hashed (salt: 10) |
| `role` | String | Enum: `admin`, `client` (default: `client`) |
| `createdAt` | Date | Default: `Date.now` |

### `beats`
| Field | Type | Notes |
|---|---|---|
| `title` | String | Required |
| `audioUrl` | String | Required — preview MP3 (Supabase) |
| `highResUrl` | String | Optional — WAV/ZIP download link (Supabase) |
| `coverArtUrl` | String | Optional cover image |
| `price` | Number | Required (INR) |
| `genre` | String | Required |
| `mood` | String | Optional |
| `bpm` | Number | Optional |
| `duration` | String | e.g., `"3:45"` |
| `isSold` | Boolean | Default: `false` |
| `plays` | Number | Default: `0` |
| `downloads` | Number | Default: `0` |

### `sessions`
| Field | Type | Notes |
|---|---|---|
| `clientName` | String | Required |
| `clientEmail` | String | Required, Lowercase |
| `clientPhone` | String | Required |
| `date` | Date | Required |
| `timeSlot` | String | e.g., `"14:00 - 18:00"` |
| `sessionType` | String | Enum: `Full Recording`, `Audio / Instrumental`, `Vocals Recording`, `Mixing & Mastering`, `Custom` |
| `notes` | String | Optional |
| `status` | String | Enum: `pending`, `booked`, `completed`, `cancelled` |
| `paymentStatus` | String | Enum: `pending`, `advance_paid`, `full_paid` |

### `orders`
| Field | Type | Notes |
|---|---|---|
| `user` | ObjectId (ref: User) | Optional (guest checkout supported) |
| `items[]` | Array | `{ name, price, itemType: Beat|Session, itemId }` |
| `totalAmount` | Number | Required |
| `razorpayOrderId` | String | Required, Unique |
| `razorpayPaymentId` | String | Populated post-verification |
| `razorpaySignature` | String | Populated post-verification |
| `status` | String | Enum: `pending`, `paid`, `failed` |

### `enquiries`
| Field | Type | Notes |
|---|---|---|
| `name` | String | Required |
| `email` | String | Required, Lowercase |
| `message` | String | Required |
| `status` | String | Enum: `new`, `read`, `replied` |

---

## 🔐 Security

| Mechanism | Implementation |
|---|---|
| **Password Hashing** | `bcryptjs` with salt rounds of 10 via a Mongoose `pre-save` hook |
| **JWT Auth** | `jsonwebtoken` — Bearer tokens validated in `authMiddleware.js` |
| **Role Guard** | `admin` middleware checks `req.user.role === 'admin'` before allowing write operations |
| **Payment Verification** | HMAC-SHA256 signature recomputed server-side using `RAZORPAY_KEY_SECRET`; signatures are compared before marking an order as `paid` |
| **CORS Policy** | Whitelist restricts origins to `localhost:3000`, `rexlab.vercel.app`, `rexlabs.vercel.app`, and all `*.vercel.app` preview URLs |
| **Error Handling** | Centralised `notFound` + `errorHandler` middleware prevents stack trace leakage to clients |

---

## 🚀 Local Development Setup

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB Atlas** account with a cluster URI
- **Razorpay** account (test mode key pair)
- **Supabase** project with Storage configured

### 1. Clone & Install

```bash
git clone https://github.com/Artyologist/rexlab.git
cd rexlab

# Install all dependencies (root + client + server)
npm run install-all
```

### 2. Configure Environment Variables

**`server/.env`**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/rexlabs
JWT_SECRET=your_super_secret_jwt_key

# Razorpay (Test Mode)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_service_role_key
```

**`client/.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Seed the Database

Creates an admin user (`admin@rexlabs.com` / `password123`) and sample beats:

```bash
cd server
npm run data:import
```

To wipe the seed data:
```bash
npm run data:destroy
```

### 4. Run Development Servers

**Option A — Windows (Recommended):**
```bat
.\dev-start.bat
```

**Option B — Concurrent (from root):**
```bash
npm start
```

**Option C — Separate terminals:**
```bash
# Terminal 1
cd server && npm run dev   # http://localhost:5000

# Terminal 2
cd client && npm run dev   # http://localhost:3000
```

### 5. Admin Access

| URL | Credentials |
|---|---|
| `http://localhost:3000/admin/login` | `admin@rexlabs.com` / `password123` |

---

## 📊 Project Stats

| Metric | Value |
|---|---|
| **API Endpoints** | 15 (Auth: 2, Beats: 5, Sessions: 5, Enquiries: 4, Payment: 2 — see routes) |
| **Mongoose Models** | 5 (User, Beat, Session, Order, Enquiry) |
| **Frontend Pages** | 12 (Home, Beats, Book, About, Contact, Enquiry, Location, Admin Login, Admin Dashboard, Privacy, Refund, Terms) |
| **Frontend Deployment** | Vercel (Next.js managed) |
| **Backend Deployment** | Render.com (Node web service, port 10000) |
| **Database** | MongoDB Atlas (cloud) |
| **File Storage** | Supabase Storage |
| **UI Framework** | Next.js 14 App Router |
| **Auth Strategy** | Stateless JWT (Bearer token) |

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<p align="center">Built with 🎵 by <strong>Rex Labs</strong></p>
