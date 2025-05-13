# StudyHub Frontend

## Overview

The **StudyHub frontend** is a dynamic and responsive web interface developed using **React.js**, part of a full-stack BootCamp learning platform. This project was built as part of the **4TWIN engineering syllabus** at **Esprit School of Engineering**, under the supervision of **Mr. Radhouene Massoudi**.

The platform supports **AI-assisted learning, certification, course navigation, interactive forums**, and a modern cart system for course enrollment — all tailored for students, professors, companies, and guest users.

## Features

- 🎓 Personalized dashboards for **Students**, **Professors**, **Admins**, and **Companies**
- 🧠 Real-time quiz feedback with **AI evaluation results**
- 💬 Forum for collaborative learning (chat, post, reply)
- 🛒 Course shopping cart and enrollment flow
- 🔐 Login, registration, and session handling
- 📄 View/download certificates
- 📊 Live course stats, profile info, and leaderboard
- 🧩 Adaptive interface based on user role

## Tech Stack

### Frontend
- **React.js**
- **React Router** (SPA navigation)
- **Redux Toolkit** (global state management)
- **Axios** (API requests)
- **Tailwind CSS** (styling)
- **Socket.IO Client** (real-time forum)
- **Chart.js** (dashboard data visualizations)

### Backend (see backend repo)
- Node.js + Express.js
- MongoDB
- TensorFlow.js

### Dev Tools
- Vite (for fast builds)
- ESLint + Prettier
- GitHub Actions (CI/CD optional)




## Getting Started

### Prerequisites

- Node.js v16+
- Backend API running (see backend setup)

### Installation


# Clone the repo
git clone (https://github.com/codezella-hub/BootcampAppFront/)
cd studyhub-frontend

# Install dependencies
npm install

# Start development server
npm run dev

Role-Based Dashboards
👨‍🎓 Student Dashboard: Quiz results, enrolled courses, certificate viewer

👩‍🏫 Professor Dashboard: Course creation, quiz submission, student tracking

🧑‍💼 Company Dashboard: Talent scouting, posting offers, reviewing applicants

🛠️ Admin Dashboard: User management, course moderation, statistics

👁️ Guest View: Browse public courses, register to begin learning

Acknowledgments
This frontend was designed and implemented as part of the academic program for 4TWIN - Full Stack & AI Module at Esprit School of Engineering, supervised by Mr. Radhouene Massoudi. It is tightly integrated with the AI-enhanced backend, offering a seamless UX for all user roles.

#react, #redux, #tailwindcss, #vite, #socketio, #web-development, #esprit, #4twin, #frontend, #ai, #education-platform, #learning, #certification, #quiz-app

## Directory Structure
```bash
/frontend
├── public/ # Static files
├── src/
│ ├── assets/ # Images, logos
│ ├── components/ # Reusable UI elements
│ ├── layouts/ # Dashboard layouts by role
│ ├── pages/ # Route views (Home, Courses, Profile...)
│ ├── services/ # Axios API functions
│ ├── store/ # Redux slices & store setup
│ ├── styles/ # Global Tailwind and custom CSS
│ └── main.jsx # App root
├── tailwind.config.js
└── vite.config.js
