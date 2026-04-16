# 🛒 Laravel React eCommerce

A modern full-stack eCommerce application built with Laravel for the backend and React.js for the frontend. This project demonstrates scalable architecture, RESTful API integration, and a seamless online shopping experience.

---

## 📌 Project Description

Laravel React eCommerce is a robust and scalable platform designed for managing online stores. It includes an admin panel for product and inventory management and a responsive user interface for customers.

---

## 🚀 Features

### 👤 User Features
- Browse products and categories
- View product details
- Add items to cart
- Apply coupons and shipping charges
- Secure checkout process
- View order history
- Responsive UI

### 🔐 Admin Features
- Admin authentication and authorization
- Manage products, categories, brands, and sizes
- Upload and manage product images
- Configure shipping charges
- Manage discount coupons
- Order management
- User management

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React.js 19
- Vite
- React Router
- Axios
- React Toastify
- Bootstrap

### 🔹 Backend
- Laravel 11
- MySQL
- Eloquent ORM
- Laravel Sanctum Authentication
- RESTful APIs
- Laravel Seeders & Migrations

### 🔹 Development Tools
- Git & GitHub
- Composer
- Node.js >= 18 (Recommended: Node.js 20 LTS)
- MySQL
- Apache / Nginx
- Ubuntu

---

## 📁 Project Structure

laravel-react-ecommerce/
├── backend/
│   ├── app/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
└── README.md

---

## ⚙️ Installation Guide

### Prerequisites
- PHP >= 8.2
- Composer
- Node.js >= 18
- MySQL
- Git

---

## 🔧 Backend Setup (Laravel)

cd backend
composer install
cp .env.example .env

Configure DB:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_react_ecommerce_db
DB_USERNAME=root
DB_PASSWORD=

Run:

php artisan key:generate
php artisan migrate --seed
php artisan serve

Backend:
http://127.0.0.1:8000

API:
http://127.0.0.1:8000/api

---

## 🌱 Database Seeders

$this->call(UserTableSeeder::class);
$this->call(BrandTableSeeder::class);
$this->call(CategoryTableSeeder::class);
$this->call(SizeTableSeeder::class);
$this->call(ShippingChargesTableSeeder::class);
$this->call(CouponTableSeeder::class);

---

## 👥 Default Credentials

Admin:
Email: admin@example.com
Password: admin123

Customer:
Email: customer@example.com
Password: customer123

---

## 💻 Frontend Setup

cd frontend
npm install

.env:
VITE_API_URL=http://127.0.0.1:8000/api

npm run dev

Frontend:
http://localhost:5173

---

## 🔗 API Endpoints

Public:
GET /products/latest
GET /products/featured
GET /products/categories
GET /products/brands
GET /get-products
GET /get-products/{id}
POST /register
POST /login
POST /admin/login
POST /apply-coupon
GET /shipping-charge

Admin (Sanctum protected):
Authorization: Bearer TOKEN

GET /categories
POST /categories
PUT /categories/{id}
DELETE /categories/{id}

GET /brands
POST /brands
PUT /brands/{id}
DELETE /brands/{id}

GET /products
POST /products
PUT /products/{id}
DELETE /products/{id}

GET /orders
GET /orders/{id}
POST /order/status/update/{id}

POST /temp-image
POST /product/image/upload/{productId}
DELETE /product/image/delete/{id}
POST /product/image/default/{id}
GET /product/sizes
POST /product/sizes

User:
POST /save-order
GET /user/orders
GET /user/orders/{id}

Shipping & Coupon:
GET /shipping-charge
POST /shipping-charge
PUT /shipping-charge/{id}
DELETE /shipping-charge/{id}

GET /coupon
POST /coupon
PUT /coupon/{id}
DELETE /coupon/{id}

---

---

## 👨‍💻 Author
Sohan
GitHub: https://github.com/sohan065
Email: mdsohan065@gmail.com

---

## ⭐ Support
If you like this project, give it a star ⭐
