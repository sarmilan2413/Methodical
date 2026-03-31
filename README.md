# Methodical

A clean and modern frontend project focused on productivity workflows, including authentication interfaces and task management screens.

## Project Overview

Methodical is a UI-first frontend application designed to provide a structured workspace experience.
It includes:

- Authentication screens (Login and Register)
- Dashboard and task workflow views
- Reusable layout and component system
- Responsive styling for desktop and mobile

## Tech Stack

- Next.js
- Tailwind CSS
- TypeScript

## Features

- Authentication UI
	- Login page UI
	- Register page UI
	- Form validation states and polished UX interactions
- Task Management UI
	- Dashboard overview cards
	- Task list and task detail/edit screens
	- Reusable layout: Navbar, Sidebar, Layout wrapper
- Reusable UI Components
	- Button
	- Input
	- Card

## Installation

1. Clone the repository:

```bash
git clone https://github.com/sarmilan2413/Methodical.git
```

2. Navigate to the project folder:

```bash
cd Methodical
```

3. Install dependencies:

```bash
npm install
```

## How To Run Locally

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in your terminal (commonly http://localhost:8080).

## Folder Structure

```text
.
|- public/
|- src/
|  |- components/
|  |  |- common/
|  |  |- layout/
|  |  |- ui/
|  |- hooks/
|  |- lib/
|  |- pages/
|  |- test/
|  |- App.tsx
|  |- main.tsx
|- index.html
|- package.json
|- tailwind.config.ts
|- tsconfig.json
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests

## Project Status

Frontend UI completed and ready for backend/API integration.
