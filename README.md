# 📝 Next.js MongoDB Blog

A full-stack blog platform built with **Next.js**, **MongoDB**, and **Tailwind CSS**.

## 🌍 About the Project

This platform was developed as part of the Erasmus+ **Anti-Bullying Project**, aiming to provide a safe and structured environment where users can share stories, ideas, or information related to bullying awareness, prevention, and support.

## Live Demo
Check out the live version [here](https://anti-bullying-blog.vercel.app/)

## ✨ Features

- 🧑‍💻 **User Authentication** with JWT (JSON Web Tokens)
- ✍️ **CRUD Operations** for blog posts (Create, Read, Update, Delete)
- ⚡ **Responsive Design** using Tailwind CSS
- 🌐 **API Routes** for seamless backend integration
- 🔐 Protected routes and session-based access control
- 🌱 MongoDB integration with Mongoose

---

## 🛠️ Built With

- **[Next.js](https://nextjs.org/)** – React-based framework used for its seamless full-stack capabilities, including API routes and SSR/SSG.
- **[MongoDB](https://www.mongodb.com/)** – NoSQL database chosen for its flexibility and scalability, ideal for dynamic content like blog posts.
- **[Mongoose](https://mongoosejs.com/)** – ODM (Object Data Modeling) library to define schemas and interact with MongoDB more intuitively.
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework that allows rapid and responsive UI development with minimal custom CSS.
- **[JWT (JSON Web Token)](https://jwt.io/)** – Secure, stateless authentication mechanism for protecting routes and APIs.


## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ibrahimhozhun/nextjs-mongodb-blog.git
cd nextjs-mongodb-blog
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Run the Development Server

```bash
npm run dev
```

The app should be running at [http://localhost:3000](http://localhost:3000).


---

## 🛡️ Authentication & Authorization

- Uses JWT stored in HTTP-only cookies for authentication
- Protected API routes and pages with role-based access checks

---

## 🧑‍🎓 Author

**İbrahim Halil Özhun**  
[GitHub](https://github.com/ibrahimhozhun)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
