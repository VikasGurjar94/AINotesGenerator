# 📝 ExamNotes AI
**Live Demo:** [https://ainotesgenerator-frontend.onrender.com](https://ainotesgenerator-frontend.onrender.com)

ExamNotes AI is an advanced, AI-powered web application designed to help students and professionals quickly generate high-quality notes, project documentation, and diagrams. It features seamless Google authentication, a robust credit system via Razorpay, and instant PDF downloads for offline studying.

## ✨ Features
- **🤖 AI Note Generation:** Instantly generate exam-focused notes, project notes, and revision materials.
- **📊 Charts & Graphs:** Automatically generate structured diagrams and flowcharts alongside your text.
- **🔐 Secure Authentication:** Seamless Google Sign-in powered by Firebase Authentication.
- **💳 Payment Gateway:** Buy credits to generate more notes using Razorpay (Test/Live modes).
- **⬇️ PDF Export:** Download clean, printable, and offline-ready PDFs of your AI-generated notes.
- **📱 Responsive UI:** A beautiful, animated, and fully responsive user interface built with Tailwind CSS and Framer Motion.

## 🛠️ Tech Stack
- **Frontend:** React.js, Vite, Tailwind CSS, Framer Motion, Redux Toolkit
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase (Google Auth)
- **Payments:** Razorpay
- **Deployment:** Render

## 🚀 Wait, how do I run this locally?

You need two terminal windows to run this full-stack app.

### 1. Start the Backend Server
First, navigate to the `server` folder, install the dependencies, and start it.
```bash
cd server
npm install
npm run dev
```

### 2. Start the Frontend Client
In your second terminal, navigate to the `client` folder, install dependencies, and start Vite.
```bash
cd client
npm install
npm run dev
```

### 3. Environment Variables
To make things work locally, you need `.env` files in both the `client` and `server` folders.

#### client/.env:
```env
VITE_API_URL=http://localhost:8000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

#### server/.env:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLIENT_URL=http://localhost:5173
```

## 🤝 Contributing
Feel free to fork this repository, make changes, and submit pull requests. If you find any bugs or have feature requests, please open an issue!
