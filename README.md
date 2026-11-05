# HomeEase 🏠

A full-stack local service booking platform built with the **MERN** stack. HomeEase connects customers with trusted local professionals — plumbers, electricians, cleaners, tutors, salon experts, AC technicians and more.

---

## ✨ What it does

- **Browse services** – customers can explore all available services, filter by category and search by title
- **Book instantly** – pick a service, choose a slot and confirm the booking in a few clicks
- **Provider dashboard** – service providers can list new services, track bookings and update their status
- **Customer dashboard** – view booking history and manage upcoming services
- **Reviews & ratings** – customers can rate completed services to help others decide
- **Role-based access** – separate experiences for customers, providers and admins
- **Secure auth** – JWT-based login/register with bcrypt password hashing

---

## 🧱 Tech Stack

### Frontend (`client/`)
- React 19 + Vite
- React Router for navigation
- Axios for API calls
- Bootstrap 5 + Bootstrap Icons for UI
- Auth state managed via React Context

### Backend (`server/`)
- Node.js + Express.js
- MongoDB + Mongoose
- JWT authentication
- BcryptJS for password hashing
- CORS enabled

---

## 📂 Project Structure

```
HomeEase/
├── client/                     # React frontend
│   └── src/
│       ├── components/         # Navbar, modals, protected routes
│       ├── pages/              # Home, Login, Register, dashboards, etc.
│       ├── context/            # AuthContext
│       └── utils/api.js        # Axios instance with auth interceptor
│
├── server/                     # Express backend
│   ├── config/db.js            # MongoDB connection
│   ├── controllers/            # auth, service, booking, review logic
│   ├── models/                 # User, Service, Booking, Review schemas
│   ├── routes/                 # API route definitions
│   ├── middleware/             # authMiddleware (JWT protect + roles)
│   ├── server.js               # App entry point
│   └── seed.js                 # Optional demo data seeder
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB running locally (or a cloud connection string)

### 1. Clone & install

```bash
git clone https://github.com/DHANUSHNAGARAJ123/HomeEase.git
cd HomeEase

# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 2. Configure environment

Create `server/.env`:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/servity
JWT_SECRET=your_secret_key
```

The frontend reads the API base URL from `VITE_API_URL` (defaults to `http://localhost:5001/api`).

### 3. Run the app

```bash
# Terminal 1 – backend
cd server
npm run dev

# Terminal 2 – frontend
cd client
npm run dev
```

- Frontend → http://localhost:5173
- Backend API → http://localhost:5001

---

## 🗄️ Database

The app uses a single MongoDB database (`servity` by default) with four collections:

| Collection | Purpose |
|---|---|
| `users` | Customers, providers and admins |
| `services` | Service listings created by providers |
| `bookings` | Customer booking records |
| `reviews` | Ratings and comments on services |

Collections are created automatically by Mongoose — no manual setup needed in Compass.

### Optional seed data

```bash
cd server
npm run seed
```

This creates a demo provider (`provider@demo.com` / `password123`) and sample services. Skip it if you want a clean database.

---

## 🔌 API Overview

### Auth — `/api/auth`
- `POST /register` – create account
- `POST /login` – login, returns JWT
- `GET /me` – current user profile

### Services — `/api/services`
- `GET /` – list services (supports `?category=`, `?search=`, `?limit=`)
- `GET /:id` – service details
- `POST /` – create service *(provider/admin)*
- `PUT /:id` – update service *(owner/admin)*
- `DELETE /:id` – delete service *(owner/admin)*

### Bookings — `/api/bookings`
- `GET /` – user's bookings
- `POST /` – create booking
- `PUT /:id` – update status
- `DELETE /:id` – cancel booking

### Reviews — `/api/reviews`
- `POST /` – add a review
- `GET /:serviceId` – reviews for a service

---

## 👥 Roles

- **Customer** – browse services, book them, leave reviews
- **Provider** – create/manage services, handle bookings
- **Admin** – full access to all resources

---

## 🛠️ Useful Commands

```bash
# Backend
npm run dev     # start server (port 5001)
npm run seed    # seed demo data

# Frontend
npm run dev     # start Vite dev server (port 5173)
npm run build   # production build
npm run lint    # ESLint check
```

---

## 🐛 Troubleshooting

**`EADDRINUSE` on port 5001** – another server instance is already running. Stop it or change `PORT` in `server/.env`.

**`ERR_CONNECTION_REFUSED` from frontend** – backend isn't running, or `VITE_API_URL`/port doesn't match `server/.env`.

**MongoDB connection error** – make sure MongoDB is running locally and `MONGODB_URI` includes the database name (e.g. `/servity`).

---

## 📄 License

ISC

---

**Author:** [Dhanush Nagaraj](https://github.com/DHANUSHNAGARAJ123)
