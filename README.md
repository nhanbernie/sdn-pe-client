# Contact Management Client

A modern React application for managing contacts with real-time search functionality.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ & npm
- Backend API running on `http://localhost:3001`
- Backend API url `https://sdn-pe-server.onrender.com`

### Installation

```bash
# Clone the repository
git clone https://github.com/nhanbernie/sdn-pe-client.git
cd contact-client

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🛠 Tech Stack

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **TanStack Query** - Data fetching
- **Shadcn/ui** + **Tailwind CSS** - UI components
- **React Router** - Navigation

## 📋 Features

- **CRUD Operations** - Create, Read, Update, Delete contacts
- **Real-time Search** - Search contacts by name with debouncing
- **Group Filtering** - Filter contacts by categories
- **Sorting** - Sort contacts A-Z or Z-A
- **Pagination** - Navigate through contact pages
- **Responsive Design** - Works on all devices

## 🔧 Configuration

Create `.env.local` file:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

## 📖 API Integration

The app integrates with a REST API:

- `GET /api/contacts?search=term` - Get/search contacts
- `GET /api/contacts/:id` - Get single contact
- `POST /api/contacts` - Create contact
- `PATCH /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

## 🏗 Project Structure

```
src/
├── components/         # React components
├── hooks/             # Custom React hooks
├── services/          # API service layer
├── types/             # TypeScript type definitions
└── lib/               # Utility functions
```

## 🚀 Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

