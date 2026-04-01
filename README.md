# 🚀 FinQuest – Gamified Financial Literacy Platform

## 🧠 Overview
**FinQuest** is a full-stack web application that makes financial learning interactive and engaging through gamification.  
It helps users understand budgeting, saving, and smart financial decisions using quizzes, challenges, and real-life scenarios.

---

## 🎯 Key Features
- 🎮 Gamified learning (quests, rewards, scoring)
- 📊 Financial education modules
- 🧩 Scenario-based decision making
- 📈 Progress tracking dashboard
- 🔐 User authentication (JWT-based)

---

## 🏗️ Project Architecture

Client (React) → Backend (Node.js + Express) → Database (MongoDB)

---

## 📁 Folder Structure
---
FinQuest/
│
├── client/ # Frontend (React)
│ ├── public/
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Pages (Dashboard, Login, etc.)
│ │ ├── utils/ # API calls / helpers
│ │ ├── App.js
│ │ └── index.js
│
├── server/ # Backend (Node.js + Express)
│ ├── controllers/ # Business logic
│ ├── routes/ # API routes
│ ├── models/ # Database schemas
│ ├── middleware/ # Authentication middleware
│ ├── config/ # DB connection
│ └── server.js
│
├── .env
├── package.json
└── README.md
---

---

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML, CSS, JavaScript
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Mongoose)

### Authentication
- JWT (JSON Web Tokens)

---

## 🔥 Core Functionalities

### 🎮 Gamified Learning
- Complete quests and challenges
- Earn rewards and track progress

### 🧩 Scenario-Based Decisions
- Real-world financial choices
- Instant feedback system

### 📊 Dashboard
- View performance and progress
- Track completed modules

### 🔐 Authentication
- Secure login/signup
- Token-based authorization

---

## ⚙️ API Endpoints (Sample)
