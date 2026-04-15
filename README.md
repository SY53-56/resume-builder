# 🚀 AI Interview Strategy Builder

An AI-powered web application that helps users generate a personalized interview strategy based on a job description and their profile (resume or self-description).

---

## ✨ Features

* 🔐 User Authentication (Register / Login / Logout)
* 🍪 Secure Cookie-based Authentication (JWT)
* 📄 Upload Resume (PDF/DOCX)
* 🧠 AI-generated Interview Strategy
* ⚡ Real-time Feedback using Toast Notifications
* 📊 Dynamic Interview Plan Generation
* 🧾 Self-description alternative to resume
* 🌐 Full-stack MERN Application

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Context API (State Management)
* React Toastify (Notifications)

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Bcrypt (Password Hashing)

---

## 📁 Project Structure

```
project-root/
│
├── client/                # Frontend (React)
│   ├── features/
│   │   ├── auth/
│   │   └── interview/
│   ├── hooks/
│   ├── pages/
│   └── App.jsx
│
├── server/                # Backend (Node + Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── app.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Authentication Flow

* User registers → password hashed using bcrypt
* JWT token generated and stored in HTTP-only cookies
* Protected routes use middleware to verify token
* Logout → token added to blacklist

---


---

## 🎯 How It Works

1. User logs in / registers
2. Inputs:

   * Job Description
   * Resume OR Self Description
3. Backend processes data
4. AI generates interview strategy
5. User gets a personalized report

---



## 🚀 Deployment

* Frontend: Vercel / Netlify
* Backend: Render
* Database: MongoDB Atlas

---

## 🧠 Future Improvements

* 🔄 Refresh Token System
* 📊 Analytics Dashboard
* 🧾 Resume Parsing with AI
* 🎤 Mock Interview Feature
* 🌍 Multi-language Support

---

## 🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first.

---

## 👨‍💻 Author

Your sahul kumar
GitHub: (https://github.com/SY53-56)

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---
