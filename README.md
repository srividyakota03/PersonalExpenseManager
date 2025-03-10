# Personal Expense Manager  

The **Personal Expense Manager** is a web application built using the **MERN stack** that helps users track and manage their daily expenses efficiently. It features **user authentication, real-time expense tracking, and collaboration** for shared budgeting. Users can categorize expenses, set budgets, and visualize spending through interactive charts. With a clean and intuitive UI, this app simplifies personal finance management for individuals and groups.

---
This is the **frontend** structure for the **Personal Expense Manager** application, built using **React.js**. The structure is organized to ensure modularity and maintainability.

### Folders & Files:

### Backend (`backend/`)
- **`middleware/`** → Contains authentication middleware.
- **`models/`** → Defines database schemas (`Transaction.js`, `User.js`).
- **`routes/`** → Handles API endpoints (`transactionRoutes.js`, `userRoutes.js`).
- **`utils/`** → Utility functions (e.g., `generateToken.js`).
- **`server.js`** → Main backend server file.
- **`.env`** → Stores environment variables.
- **`package.json`** → Backend dependencies and scripts.

### Frontend (`frontend/`)
- **`public/`** → Contains static files like `index.html`.
- **`src/`** → Main source code.
  - **`assets/`** → Stores images, icons, and styles.
  - **`components/`** → Reusable UI components (`Navbar.jsx`, `Footer.jsx`).
  - **`pages/`** → Main pages (`Dashboard.jsx`, `LoginPage.jsx`, `SignupPage.jsx`).
  - **`App.jsx`** → Root component of the React application.
  - **`main.jsx`** → Entry point where React renders the app.
  - **`index.css`** → Global CSS file.
- **`.gitignore`** → Specifies files to ignore in Git.
- **`package.json`** → Defines frontend dependencies and scripts.
- **`README.md`** → Documentation file.
---
### Features
- User Authentication (Signup/Login with JWT)
- Add, Edit & Delete Transactions
- Expense & Income Categories
- Charts for Financial Analysis
- Dark Mode (Coming Soon!)

---
### This project is licensed under the MIT License ⚖.

