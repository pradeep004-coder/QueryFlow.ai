
# **QueryFlow – AI Chat Assistant**

QueryFlow is an AI-powered chat application built with **Next.js**, **Node.js**, and **Gemini AI API**, designed for fast, intelligent, and seamless query handling.
It provides real-time conversational responses, secure user accounts, rich UI/UX features, and persistent chat storage.

🔗 **Live Demo:** [https://query-flow-ai-red.vercel.app/](https://query-flow-ai-red.vercel.app/)

---

## 🚀 **Tech Stack**

### **Frontend**

* Next.js (App Router)
* React
* Tailwind CSS
* HTML, CSS, JavaScript
* Gemini AI API
* Syntax Highlighting + Markdown Rendering

### **Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose

### **Deployment**

* Vercel (Frontend)
* Render (Backend)

---

## ⭐ **Features**

### 🔥 **Major Features**

* **Real-Time AI Responses**
  Instant, accurate answers powered by the Gemini AI API.

* **User Authentication System**
  Secure login/sign-up with token-based authentication.

* **Automatic Login Persistence (24 Hours)**
  No need to re-login if the user revisits within 24 hours on the same device.

* **Chat Storage**
  All chats are stored and loaded from MongoDB so users never lose progress.

* **Navigate to Any Query/Response Instantly**
  Jump to any part of the conversation with smooth scroll anchoring.

---

### 💻 **Developer-Friendly Features**

* **Collapsible Responses** (Ideal for long answers)
* **Syntax Highlighting for Code Blocks**
* **Copy to Clipboard** for code and AI responses
* **Multi-Line Query Support**
* **Markdown Rendering for AI Answers**

---

### 📱 **User-Friendly Design**

* **Responsive UI** optimized for mobile, tablet & desktop
* **Clean & minimal interface**
* **Date & Time Badging** for each message
* **Smooth animations** and interaction feedback

---

## 📁 **Folder Structure**

### **Backend**

Backend/
│── Controllers/
│   ├── AuthController.js
│   ├── ChatController.js
│
│── Middlewares/
│   ├── AuthValidation.js
│   ├── ChatMiddleware.js
│
│── Models/
│   ├── chat.js
│   ├── db.js
│   ├── user.js
│
│── Routes/
│   ├── AuthRouter.js
│   ├── ChatRouter.js
│
│── index.js
│── package.json
│── vercel.json
│── .env


### **Frontend**

Frontend/
│── public/
│   ├── icons & images
│
│── src/
│   ├── app/
│   │   ├── login/page.js
│   │   ├── signup/page.js
│   │   ├── context/context.js
│   │   ├── page.js (main chat UI)
│   │
│   ├── components/
│   │   ├── Answers.jsx
│   │   ├── ChatSection.jsx
│   │   ├── Code.jsx
│   │   ├── Collapsible.jsx
│   │   ├── ConfirmLogout.jsx
│   │   ├── DateBadge.jsx
│   │   ├── InputSection.jsx
│   │   ├── MarkDown.jsx
│   │   ├── Navbar.jsx
│   │   ├── Question.jsx
│   │   ├── Sidebar.jsx
│   │   └── WelcomeContent.jsx
│   │
│   ├── constants/
│   │   └── Constants.js
│   │
│   ├── utils/
│   │   └── Helper.js
│
│── globals.css
│── package.json


---

## ⚙️ **How It Works**

1. User logs in (or stays logged-in via 24hr token).
2. User enters a query.
3. Query is sent Gemini AI API.
4. Response returns in real-time and gets rendered with Markdown & syntax highlighting.
5. Chat is stored in MongoDB for future sessions.
6. User can navigate, collapse, copy, and manage responses easily.

---

## 🛠️ **Installation & Setup**

### **1. Clone the repository**

git clone https://github.com/pradeep004-coder/QueryFlow.ai.git
cd QueryFlow.ai



### **2. Backend Setup**

cd Backend
npm install


Create a **.env** file with:

MONGO_URI=your_mongo_url
JWT_SECRET=your_secret
GEMINI_API_KEY=your_key


Start backend:
node index.js

### **3. Frontend Setup**

cd Frontend
npm install
npm run dev

---

## 📌 **Future Improvements**

* Dark/Light theme toggle
* Export chat as PDF
* Voice input & response
* Multi-model AI selection

---