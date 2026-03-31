# Task Manager App

## 📌 Overview

A full-stack task management application with authentication and CRUD operations. Users can register, login, and manage their own tasks securely.

---

## 🛠 Tech Stack

* Frontend: React (Vite), Tailwind CSS
* Backend: NestJS
* Database: PostgreSQL (Prisma)
* Auth: JWT

---

## 🌐 Live Demo

https://methodical-01-rh3k.vercel.app/

---

## 🎨 Design

Figma Design: https://www.figma.com/design/8eo1ClWBLCXbvdrIX2TQ6S/Untitled?node-id=0-1&t=mYVrpJhvnUGDo14N-0

---

## 📚 Repository

GitHub: https://github.com/sarmilan2413/Methodical.git

---

## ⚙️ Setup

### Backend

```bash
cd backend
npm install
npm run start:dev
```

### Frontend

```bash
cd pixel-perfection-studio-682-main
npm install
npm run dev
```

---

## 🔑 Environment Variables

Backend:

```env
DATABASE_URL=your_db_url
JWT_SECRET=your_secret
PORT=3000
```

Frontend:

```env
VITE_API_URL=your_backend_url/api
```

---

## 🔗 API

* POST /api/auth/register
* POST /api/auth/login
* GET /api/users/me
* CRUD /api/tasks

---

## 👨‍💻 Author

Sarmilan
