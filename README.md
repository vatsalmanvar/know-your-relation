# Know Your Relation

A full-stack MERN application for creating and managing family trees with an interactive visual interface.

## Features

- User authentication (Register/Sign In)
- Create and manage family trees
- Interactive family tree visualization
- Modify existing family trees
- View family trees by name

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing
- Express Validator for input validation
- Helmet for security
- Rate limiting

### Frontend
- React
- React Router
- React Flow Renderer
- Bootstrap
- Axios

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5001
NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your-secret-key-here-change-in-production
JWT_EXPIRE=7d

CORS_ORIGIN=http://localhost:3000
```

5. Start the backend server:
```bash
npm run dev
```

The server will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```bash
cp .env.example .env
```

4. Update the `.env` file:
```env
REACT_APP_API_URL=http://localhost:5001/api
```

5. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Project Structure

```
know-your-relation/
├── backend/
│   ├── config/
│   │   └── config.js          # Configuration management
│   ├── middleware/
│   │   ├── auth.js            # JWT authentication middleware
│   │   ├── errorHandler.js    # Global error handler
│   │   └── validators.js      # Input validation middleware
│   ├── models/
│   │   ├── familyschema.js    # Family tree model
│   │   └── userSchema.js      # User model
│   ├── routes/
│   │   └── auth.js             # API routes
│   ├── utils/
│   │   └── generateToken.js   # JWT token generation
│   ├── db.js                   # MongoDB connection
│   └── index.js                # Express server setup
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── context/            # React context
│   │   ├── services/           # API service layer
│   │   └── utils/              # Utility functions
│   └── public/
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/signin` - Sign in user

### Family Trees
- `POST /api/saveFamilyTree` - Save a new family tree
- `POST /api/modifyTree` - Update an existing family tree
- `POST /api/viewFamilyTree` - View a family tree by name
- `POST /api/getfamilylist` - Get list of families for a user

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Input validation and sanitization
- Rate limiting to prevent abuse
- Helmet.js for security headers
- CORS configuration
- Environment variables for sensitive data

## Development

### Backend
- Development mode with auto-reload: `npm run dev`
- Production mode: `npm start`

### Frontend
- Development server: `npm start`
- Build for production: `npm run build`

## Production Deployment

1. Set `NODE_ENV=production` in backend `.env`
2. Update `CORS_ORIGIN` to your frontend domain
3. Use a strong `JWT_SECRET` in production
4. Build the frontend: `npm run build`
5. Serve the frontend build folder using a web server (nginx, Apache, etc.)

## License

ISC

## Authors

Vatsal and Vishnu
