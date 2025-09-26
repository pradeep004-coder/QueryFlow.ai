# QueryFlow.AI

An AI-powered chat application with authentication and persistent chat history, built using **Next.js, TailwindCSS, Node.js, Express, and MongoDB**.

---

## 🚀 Features

* 🔐 **Authentication** – Login & Signup with JWT-based authentication.
* 💬 **Chat System** – Users can send and receive chat messages in real time.
* 📜 **Persistent History** – Chats are stored in MongoDB and fetched when the user logs back in.
* 📂 **Collapsible Sidebar** – Shows navigation and options (logout, etc.).
* 📊 **Confirm Logout Popup** – With animation and TailwindCSS styling.
* ⚡ **Responsive UI** – Styled with Tailwind for smooth and adaptive design.

---

## 🛠 Tech Stack

### Frontend

* **Next.js 13+ (App Router)**
* **React** (Functional Components, Hooks)
* **TailwindCSS** (for styling)

### Backend

* **Node.js**
* **Express.js**
* **MongoDB (Mongoose)**
* **JWT Authentication**

---

## 🗂 Folder Structure

### Frontend (`src/`)

```
src/
│
├── app/
│   ├── login/
│   │   └── page.js        # Login page
│   ├── signup/
│   │   └── page.js        # Signup page
│   ├── layout.js          # Root layout
│   └── page.js            # Default home (chat page)
│
├── components/
│   ├── Answers.jsx        # Handles answers (chat bubbles)
│   ├── ChatSection.jsx    # Main chat display area
│   ├── Collapsible.jsx    # Sidebar toggle
│   ├── ConfirmLogout.jsx  # Logout confirmation modal
│   ├── InputSection.jsx   # Input field + send button
│   ├── Navbar.jsx         # Top navigation bar
│   ├── Question.jsx       # Chat/question component
│   ├── Sidebar.jsx        # Sidebar with navigation
│   └── WelcomeContent.jsx # Welcome screen content
│
├── constants/
│   └── Constants.js       # Static constants/config
│
├── utils/
│   └── Helper.js          # Utility/helper functions
│
└── globals.css            # Tailwind base styles
```

📌 **Frontend Routes (file-based)**

* `/login` → Login page
* `/signup` → Signup page
* `/` → Chat application (main interface)

---

### Backend

* **Authentication APIs**

  * `POST /login` → User login (returns JWT).
  * `POST /signup` → User signup.

* **Chat APIs**

  * `POST /postchat` → Save a new chat (unique per user & question/answer).
  * `POST /getchats` → Fetch chat history (paginated).

* **Auth Middleware**

  * Verifies JWT and attaches `req.user`.

* **Database (MongoDB)**

  * **User Collection** → Stores user credentials (hashed passwords).
  * **Chat Collection** → Stores chat messages linked with userId.
  * Unique index on `{ userId, question, answer }` to prevent duplicates.

---

## ⚙️ How It Works

1. User signs up or logs in.
2. JWT is stored in frontend and attached to API requests.
3. Chat messages are saved in MongoDB via backend.
4. When user refreshes or logs back in → chats are fetched and displayed.
5. User can log out → confirm popup appears before logging out.

---

## ▶️ Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:3000/`

### Backend

```bash
cd backend
npm install
npm start
```

Runs on `http://localhost:8333/`
