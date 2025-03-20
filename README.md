# Blog API

The Blog API is a RESTful backend service for a blog platform. It provides user authentication, post management, and comment functionality. This project demonstrates backend development skills, including API design, authentication, and database management.

---

## **Features**

- **User Authentication**: Supports both session-based and JWT authentication.
- **Post Management**: Create, edit, delete, and fetch blog posts.
- **Comments**: Add and manage comments on posts.
- **Validation**: Input validation using Express Validator.
- **Security**: Password hashing, authentication middleware, and error handling.

---

## **Tech Stack**

- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Passport.js (Local Strategy) and JWT
- **Validation**: Express Validator
- **Session Management**: Express Sessions

---

## **Setup Instructions**

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blog-api.git
   ```
2. Navigate into the project directory:
   ```bash
   cd blog-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables by creating a `.env` file:
   ```env
   DATABASE_URL=your_postgres_database_url
   JWT_SECRET=your_jwt_secret
   SESSION_SECRET=your_session_secret
   ```
5. Run database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
6. Start the server:
   ```bash
   npm run dev
   ```
7. The API will be available at `http://localhost:5000` (or your specified port).

---

## **API Endpoints**

### **Authentication**

- `POST /register` – Register a new user.
- `POST /login` – Login and receive an authentication token.
- `POST /logout` – Logout current user.

### **Posts**

- `GET /posts` – Fetch all posts.
- `GET /posts/:id` – Fetch a single post.
- `POST /posts` – Create a new post (requires authentication).
- `PUT /posts/:id` – Edit a post (requires authentication and ownership).
- `DELETE /posts/:id` – Delete a post (requires authentication and ownership).

### **Comments**

- `POST /posts/:postId/comments` – Add a comment to a post.
- `GET /posts/:postId/comments` – Fetch comments for a post.
- `DELETE /comments/:id` – Delete a comment (requires authentication and ownership).
