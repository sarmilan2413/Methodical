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
DATABASE_URL="postgresql://postgres:1234@localhost:5432/task_manager"
JWT_SECRET="task_manager_super_secret_change_this"
PORT=3000
```

Frontend:

```env
VITE_API_URL=http://localhost:3000/api
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
