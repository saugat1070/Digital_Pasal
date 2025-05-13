# 🛒 Digital-Dokan

**Digital-Dokan** is a robust and modular **e-commerce platform** built using **TypeScript**, **Node.js**, and **Express.js**, with **PostgreSQL** as its relational database. It is designed to enable secure and efficient buying and selling of products online. The platform offers comprehensive features for product listing, order processing, user management, and payment handling.

---

##  Features

-  **User & Admin Management**  
  Secure authentication and role-based access control using middleware and token generation.

-  **Product & Category Management**  
  Modular controllers and routes handle CRUD operations for products and categories.

-  **Cart & Order Processing**  
  Add to cart, view cart, checkout, and track order details using PostgreSQL-backed models.

-  **JWT-Based Security**  
  JSON Web Token (JWT) implementation for user session and route protection.

- **File Uploads**  
  Image and file handling via `multer` middleware.

- **Email Notifications**  
  Integrated `mailSender` service for sending registration, order, or OTP notifications.

- **Error Handling Middleware**  
  Centralized `errorHandler.ts` ensures consistent error logging and response formatting across the app.

- **PostgreSQL Database Integration**  
  Efficient data storage and relational querying using PostgreSQL, configured in `db_connect.ts`.

- **Clean Project Structure**  
  Well-organized directories for controllers, models, routes, middleware, and services to maintain scalability and readability.

- **Payment Integration**
Integrate payment gateway services such as Esewa and khalti

---

## 📁 Project Structure
```
server/
├── node_modules/               # Project dependencies
├── src/                        # Source files
│   ├── config/                 # Configuration files (if present)
│   ├── Controller/             # Controllers handling business logic
│   │   ├── cartController.ts
│   │   ├── categoryController.ts
│   │   ├── orderController.ts
│   │   ├── productController.ts
│   │   └── userController.ts
│   ├── Database/
│   │   ├── db_connect.ts       # postgresql and relationship connection config
│   │   └── models/             # postgresql schema models
│   │       ├── cartModel.ts
│   │       ├── categoryModel.ts
│   │       ├── orderDetailModel.ts
│   │       ├── orderModel.ts
│   │       ├── paymentModel.ts
│   │       ├── productModel.ts
│   │       └── userModel.ts
│   ├── globals/
│   │   └── types.ts            # TypeScript global types
│   ├── middleware/             # Express middlewares
│   │   ├── multer.ts           # Multer configuration for file uploads
│   │   └── userMiddleware.ts   # Middleware for user authentication/authorization
│   ├── routes/                 # API route definitions
│   │   ├── cartRoute.ts
│   │   ├── categoryRoute.ts
│   │   ├── orderRoute.ts
│   │   ├── productRoute.ts
│   │   └── userRoute.ts
│   ├── services/               # Utility and service logic
│   │   ├── errorHandler.ts
│   │   ├── findData.ts
│   │   ├── generateToken.ts
│   │   ├── mailSender.ts
│   │   ├── otpExpire.ts
│   │   ├── otpGenerate.ts
│   │   └── sendResponse.ts
│   ├── storage/                # File storage (e.g., uploads, images)
│   └── app.ts                  # App initialization
├── .env                        # Environment variables
├── .gitignore                  # Git ignore rules
├── adminSeeder.ts             # Admin seeding script
├── helloTs.txt                # (Possibly test or demo file)
├── package.json               # Project metadata and scripts
├── package-lock.json          # Locked versions of dependencies
├── server.ts                  # Server entry point
└── tsconfig.json              # TypeScript configuration
```
---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL
- npm or yarn

### Setup Instructions

```bash
# Clone the repository
git clone https://github.com/saugat1070/digital-dokan.git
cd digital-dokan

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit the .env file with your DB credentials and JWT secret

# Run the development server
npm run dev
```
