# 🚀 NexPrep

<div align="center">
  <p><strong>A comprehensive interview and coding preparation platform.</strong></p>
  <p>Built to help candidates master algorithms, practice company-specific questions (PYQs), track their progress, and engage with a thriving community.</p>
</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Available Scripts](#-available-scripts)
- [State Management & API](#-state-management--api)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 About the Project

**NexPrep** is designed for modern developers preparing for technical interviews. Whether you are aiming for FAANG companies or startups, this platform provides curated resources, progress analytics, and a collaborative environment.

This repository contains the **Frontend** of NexPrep, showcasing a sleek, modern, and highly responsive UI built with Next.js App Router and Tailwind CSS.

---

## ✨ Key Features

- **🔐 Robust Authentication:** Seamless user registration, login, and secure session management.
- **📊 Personalized Dashboard:** Centralized view of your upcoming tasks, daily goals, and overall learning trajectory.
- **📈 Comprehensive Analytics:** Track your coding consistency, strengths, and areas of improvement through beautiful, interactive charts powered by `recharts`.
- **🏢 Company-Specific PYQs:** Practice Previous Year Questions (PYQs) curated specifically for top tech companies (Google, Amazon, Microsoft, etc.).
- **🎯 Task Management:** Organize your study plan, manage preparation tasks, and set daily/weekly schedules.
- **🧠 Smart Recommendations:** Get dynamic, personalized recommendations for your next topics and questions based on your performance.
- **💬 Real-time Community Chat:** Connect with peers, share resources, and chat in real-time using Socket.io integration.

---

## 🛠️ Tech Stack

This project leverages cutting-edge web technologies:

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) | React framework utilizing the modern App Router. |
| **Library** | [React 19](https://react.dev/) | Component-based UI library. |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS framework for rapid UI development. |
| **State Management**| [Zustand](https://zustand-demo.pmnd.rs/) | Small, fast, and scalable bearbones state-management. |
| **Data Visualization**| [Recharts](https://recharts.org/) | Composable charting library built on React components. |
| **HTTP Client** | [Axios](https://axios-http.com/) | Promise-based HTTP client for API requests. |
| **Real-time Comms** | [Socket.io Client](https://socket.io/) | Real-time bidirectional event-based communication. |
| **Icons** | [Lucide React](https://lucide.dev/) | Beautiful and consistent icon toolkit. |
| **Notifications** | [React Hot Toast](https://react-hot-toast.com/) | Smoking hot React notifications. |

---

## 📂 Folder Structure

The project follows a scalable and modular folder structure:

```text
frontend-nexprep/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── analytics/        # Analytics dashboard page
│   ├── community/        # Real-time chat & forums
│   ├── company-pyqs/     # Company-specific questions
│   ├── dashboard/        # Main user dashboard
│   ├── recommendations/  # Smart topic recommendations
│   └── tasks/            # Task management page
├── components/           # Reusable React components
│   ├── auth/             # Login, Register, Profile components
│   ├── dashboard/        # Dashboard specific widgets
│   ├── community/        # Chat interface components
│   └── ui/               # Shared UI elements (buttons, inputs, modals)
├── hooks/                # Custom React Hooks (e.g., useSocket, useFetch)
├── lib/                  # Utility functions, API helpers, formatters
├── store/                # Zustand global state stores (e.g., useAuthStore)
├── public/               # Static assets (images, fonts, favicon)
├── .env                  # Environment variables configuration
├── package.json          # Project dependencies and scripts
└── next.config.mjs       # Next.js configuration
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm`, `yarn`, or `pnpm`

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd frontend-nexprep
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root of your project and configure the required environment variables. 

Example `.env`:
```env
NEXT_PUBLIC_API_URL=https://nexprep-backend-1.onrender.com/api/v1
```
*(Note: Ensure your backend server is running and accessible if you are testing local API endpoints.)*

### Start Development Server

Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 💻 Available Scripts

In the project directory, you can run:

- `npm run dev` - Runs the app in development mode.
- `npm run build` - Builds the app for production to the `.next` folder. It correctly bundles React in production mode and optimizes the build for the best performance.
- `npm run start` - Starts the production server using the generated build.
- `npm run lint` - Runs ESLint to catch and fix potential issues in the codebase.

---

## 🧠 State Management & API

- **Zustand** is used for global state management. Stores are located in the `/store` directory (e.g., managing user sessions, theme preferences, and global notifications).
- **Axios** is configured in the `/lib` folder to handle API requests efficiently, including interceptors for appending authorization tokens to requests.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Bootstrapped with `create-next-app`.*
