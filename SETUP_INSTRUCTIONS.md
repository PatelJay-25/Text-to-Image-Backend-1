# Setup Instructions

## Environment Variables Setup

### Server (.env file in server directory)
Create a file named `.env` in the `server` directory with the following content:

```
PORT=4000
DATABASE_URL=mongodb://localhost:27017/imagify
SECRET=hellojikehosare
RAZORPAY_KEY_ID=rzp_test_jIKqm1ysgxZrOC
RAZORPAY_KEY_SECRET=6y2WwPu1CxrKH5i8I1c4512R
CLIPDROP_API=your_clipdrop_api_key_here
CURRENCY=INR
```

### Client (.env file in Client directory)
Create a file named `.env` in the `Client` directory with the following content:

```
VITE_BACKEND_URL=http://localhost:4000
```

## Issues Fixed:

1. **JWT Secret Error**: Fixed hardcoded JWT secret in userControllers.js
2. **401 Unauthorized Error**: Added proper token validation and error handling
3. **Payment Issues**: Fixed Razorpay key mismatch between frontend and backend
4. **Navbar Enhancement**: Improved user display and dropdown menu
5. **Login Flow**: Fixed user data loading after login/register

## To run the project:

1. Install dependencies:
   ```bash
   cd server && npm install
   cd ../Client && npm install
   ```

2. Create the .env files as shown above

3. Start MongoDB

4. Start the servers:
   ```bash
   # Terminal 1
   cd server && npm start
   
   # Terminal 2  
   cd Client && npm run dev
   ```

The application should now work without the JWT secret error and payment issues should be resolved. 