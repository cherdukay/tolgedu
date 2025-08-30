# Student Community Platform

A MERN stack application for managing a student community platform with user authentication and post management capabilities.

## Features

- User Authentication (Register/Login)
- Create, Read, Update, and Delete Posts
- Secure Password Handling
- JWT-based Authorization
- Responsive Design

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Project Structure

The project is divided into two main parts:
- `backend`: Node.js/Express.js server
- `frontend`: React application

## Installation & Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd student-community
```

2. Backend Setup:
```bash
cd backend
npm install
```

Configure your `.env` file with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student-community
JWT_SECRET=your_jwt_secret_key
```

3. Frontend Setup:
```bash
cd ../frontend
npm install

# Make sure your frontend .env file is configured:
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend application (in a new terminal):
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Documentation

### Authentication Endpoints

- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Posts Endpoints

- GET `/api/posts` - Get all posts
- POST `/api/posts` - Create a new post
- GET `/api/posts/:id` - Get a specific post
- PUT `/api/posts/:id` - Update a post
- DELETE `/api/posts/:id` - Delete a post

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

### Frontend
- React
- React Router
- Axios
- CSS

## Testing the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend application:
```bash
cd frontend
npm start
```

3. Test the following features:

### Authentication
- Register a new account with username, email, and password
- Login with your credentials
- Try accessing protected routes (should redirect to login)
- Test token persistence (refresh page should maintain session)

### Posts Management
- Create a new post from the dashboard
- View all posts on the dashboard
- Edit your own posts (verify only post owners can edit)
- Delete your own posts (verify only post owners can delete)
- Verify post author and timestamp are displayed correctly

### Error Handling
- Try submitting forms with invalid data
- Test error messages display
- Check form validation (required fields, password match, etc.)
- Test unauthorized access handling

### Responsive Design
- Test the application on different screen sizes
- Verify navigation menu works on mobile
- Check form layouts on different devices

## Known Limitations
- No password reset functionality
- No user profile management
- Basic styling and UI

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details