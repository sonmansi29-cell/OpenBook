# 📚 OpenBook – Full Stack Online Bookstore

OpenBook is a modern full-stack online bookstore application that allows users to browse books, manage their wishlist, add items to a shopping cart, place orders, and write reviews. The project is built with a React frontend and Django REST Framework backend, following a scalable full-stack architecture.

---

## 🚀 Live Demo

Frontend:https://open-book-cdz061vsk-mansi-sonawanes-projects-024a781c.vercel.app/

Backend API: Coming Soon

GitHub Repository:
https://github.com/sonmansi29-cell/OpenBook

---

## ✨ Features

### 👤 User Management
- User Registration
- User Login & Logout
- JWT Authentication
- User Profile Management
- Secure Password Handling

### 📚 Book Management
- Browse Available Books
- View Book Details
- Book Categories
- Search Books
- Featured Books

### ❤️ Wishlist
- Add Books to Wishlist
- Remove Books from Wishlist
- View Saved Books

### 🛒 Shopping Cart
- Add Books to Cart
- Update Quantity
- Remove Items
- Cart Total Calculation

### 📦 Order Management
- Place Orders
- Order History
- Order Tracking
- Order Summary

### ⭐ Reviews & Ratings
- Add Reviews
- Book Ratings
- Customer Feedback

### 📱 Responsive Design
- Mobile Friendly
- Tablet Support
- Desktop Optimized

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- JavaScript (ES6+)
- CSS3
- Axios
- React Router DOM

## Backend

- Python
- Django
- Django REST Framework
- JWT Authentication

## Database

- PostgreSQL

## Version Control

- Git
- GitHub

---

# 📂 Project Structure

```text
OpenBook/
│
├── accounts/
├── books/
├── cart/
├── orders/
├── reviews/
├── wishlist/
├── config/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── manage.py
└── README.md
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/sonmansi29-cell/OpenBook.git
cd OpenBook
```

---

## 2️⃣ Create Virtual Environment

```bash
python -m venv .venv
```

Activate Environment

### Windows

```bash
.venv\Scripts\activate
```

### Mac/Linux

```bash
source .venv/bin/activate
```

---

## 3️⃣ Install Backend Dependencies

```bash
pip install -r requirements.txt
```

---

## 4️⃣ Apply Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## 5️⃣ Run Django Server

```bash
python manage.py runserver
```

Backend URL:

```text
http://127.0.0.1:8000/
```

---

## 6️⃣ Setup Frontend

Open a new terminal:

```bash
cd client
npm install
```

Run Frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173/
```

---

# 🔑 Authentication

The application uses JWT Authentication for secure access.

Features:

- Access Tokens
- Refresh Tokens
- Protected Routes
- Secure API Communication

---

# 📡 API Endpoints

## Authentication

```text
/api/auth/register/
/api/auth/login/
/api/auth/profile/
```

## Books

```text
/api/books/
/api/books/<id>/
```

## Cart

```text
/api/cart/
```

## Wishlist

```text
/api/wishlist/
```

## Orders

```text
/api/orders/
```

## Reviews

```text
/api/reviews/
```

---

# 🎯 Future Enhancements

- Online Payments
- Email Notifications
- Admin Dashboard
- Recommendation System
- AI-Powered Book Suggestions
- Advanced Search Filters
- Dark Mode

---

# 📸 Screenshots

Add project screenshots here after deployment.

Example:

- Home Page
- Book Details
- Shopping Cart
- Wishlist
- User Profile

---

# 👩‍💻 Author

### Mansi Sonawane

Full Stack Developer

GitHub:
https://github.com/sonmansi29-cell

LinkedIn:
https://www.linkedin.com/in/mansi-sonawane-6948402b4

---

# 📄 License

This project is developed for educational, learning, and portfolio purposes.

---

⭐ If you like this project, consider giving it a star on GitHub.
