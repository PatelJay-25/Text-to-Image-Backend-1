# 🎨 Imagify - AI-Powered Image Generation Platform

Imagify is a modern web application that allows users to generate high-quality images from text descriptions using AI technology. The platform features a credit-based system for image generation and integrates with Razorpay for secure payments.

## ✨ Features

- **AI Image Generation**: Transform text descriptions into high-quality images
- **User Authentication**: Secure login and registration system
- **Credit System**: Purchase credits to generate images
- **Payment Integration**: Seamless payment processing with Razorpay
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **Real-time Notifications**: Toast notifications for user feedback
- **Image Management**: View and manage generated images

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Toastify** - Toast notifications
- **Context API** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Razorpay** - Payment gateway integration
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Imagify/
├── Client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React context for state management
│   │   ├── assets/       # Images and static assets
│   │   └── App.jsx       # Main application component
│   ├── package.json
│   └── vite.config.js
└── server/               # Backend Node.js application
    ├── config/          # Database configuration
    ├── controllers/     # Business logic
    ├── middleware/      # Authentication middleware
    ├── models/         # Database models
    ├── routes/         # API routes
    └── server.js       # Main server file
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Razorpay account for payments

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the server directory:
   ```env
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret_key
   ```

4. **Start the server**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd Client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 🎯 Usage

### Getting Started
1. **Register/Login**: Create an account or sign in to access the platform
2. **Purchase Credits**: Choose from available plans (Basic, Advanced, Business)
3. **Generate Images**: Enter text descriptions to create AI-generated images
4. **Download/Share**: Save your generated images or share them directly

### Available Plans
- **Basic**: ₹10 for 100 credits (Personal use)
- **Advanced**: ₹50 for 500 credits (Business use)
- **Business**: ₹250 for 5000 credits (Enterprise use)

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/register` - User registration
- `POST /api/v1/login` - User login

### Image Generation
- `POST /api/image/generate` - Generate image from text
- `GET /api/image/user-images` - Get user's generated images

### Payments
- `POST /api/payment/razorpay-order` - Create payment order
- `POST /api/payment/verify` - Verify payment

## 🎨 Key Components

### Frontend Components
- **Navbar**: Navigation and user menu
- **Login**: Authentication modal
- **HomeContent**: Main landing page
- **BuyCredit**: Credit purchase interface
- **Result**: Image generation results
- **Generatebtn**: Image generation trigger

### Backend Controllers
- **userControllers**: User authentication and management
- **imageController**: Image generation and management
- **paymentController**: Payment processing with Razorpay

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS configuration for secure cross-origin requests
- Payment verification with Razorpay signatures

## 🚀 Deployment

### Frontend Deployment
```bash
cd Client
npm run build
```

### Backend Deployment
```bash
cd server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions, please contact the development team.

---

**Imagify** - Transform your ideas into stunning visuals with AI-powered image generation! 🎨✨ 