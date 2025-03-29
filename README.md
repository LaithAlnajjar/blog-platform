# Code & Craft Blog Platform

This is a full-stack blogging platform with:

- A **backend API** (Node.js, Express, PostgreSQL)
- A **public blog frontend** (React)
- An **admin panel** (React) for managing posts

## 🚀 Features

### Backend (API)

- Authentication (JWT-based)
- Post creation, editing, publishing, and deletion
- Comment system
- User roles (Admin & Public)
- Secure API with validation

### Public Blog (Frontend)

- View published posts
- Comment on posts
- Responsive UI

### Admin Panel

- Post & comment management
- Publish/unpublish posts
- Secure authentication for admins

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express, PostgreSQL, Prisma, Passport
- **Frontend:** React, React Router, TinyMCE (admin panel)
- **Authentication:** JWT, bcrypt
- **Deployment:** Vercel (frontend), Railway (backend)

---

## 🔧 Installation & Setup

### 1️⃣ Clone the repository

```sh
git clone https://github.com/your-username/blog-project.git
cd blog-project
```

### 2️⃣ Backend Setup

```sh
cd blog-api
cp .env.example .env  # Fill in required values (DATABASE_URL, SECRET, JWT_SECRET)
npm install
npx prisma migrate dev  # Apply migrations
npm start  # Start backend
```

### 3️⃣ Public Blog Setup

```sh
cd public-blog
npm install
npm run dev  # Start frontend
```

### 4️⃣ Admin Panel Setup

```sh
cd admin
cp .env.example .env  # Set TinyMCE key
npm install
npm run dev  # Start admin panel
```

---

## 📌 API Documentation

### **Authentication**

#### 🔹 Login

```http
POST /login
```

#### 🔹 Register

```http
POST /register
```

### **Posts**

#### 🔹 Get All Posts

```http
GET /posts
```

Returns a list of published blog posts.

#### 🔹 Get A Specific Post By Id

```http
GET /posts/:id
```

#### 🔹 Update A Specific Post

```http
PUT /posts/:id
```

#### 🔹 DELETE A Specific Post

```http
DELETE /posts/:id
```

#### 🔹 Create a Post (Admin)

```http
POST /posts
```

**Headers:**

```
Authorization: Bearer <token>
```

**Body:**

```json
{
  "title": "New Post",
  "content": "Post content",
  "published": true
}
```

### **Comments**

#### 🔹 Get All Comments on a Post

```http
GET /posts/:id/comments
```

#### 🔹 Add Comment

```http
POST /posts/:id/comments
```

#### 🔹 Update A Specific Comment

```http
PUT /posts/:postId/comments/:commentId
```

#### 🔹 Delete A Specific Comment

```http
DELETE /posts/:postId/comments/:commentId
```

---

## 🚀 Deployment

### **Live URLs**

- **Public Blog:** [https://blog-platform-5yhg.vercel.app/](https://blog-platform-5yhg.vercel.app/)
- **Admin Panel:** [https://blog-platform-admin-qx96xnaee-laithalnajjars-projects.vercel.app/](https://blog-platform-admin-qx96xnaee-laithalnajjars-projects.vercel.app/)

### **Backend Deployment (Railway)**

1. Push the backend code to GitHub.
2. Sign in to [Railway](https://railway.app/) and create a new project.
3. Link your GitHub repository.
4. Set environment variables (`DATABASE_URL`, `SECRET`, `JWT_SECRET`).
5. Deploy the project.

### **Frontend Deployment (Vercel)**

1. Push both the **public blog** and **admin panel** code to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and create two projects:
   - One for `public-blog`
   - One for `admin`
3. Link the repositories and deploy.
4. Set environment variables in Vercel (`VITE_API_URL` for API connection).
5. Deploy and test.
