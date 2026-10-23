# 💻 UsedLaptopsShop — Resale Laptop Marketplace

A full-stack MERN e-commerce web application where users can buy and sell second-hand laptops. Built with a modern **Dark Glassmorphic UI**, role-based authentication (Admin, Seller, Buyer), JWT security, and real-time data handling.

🌐 **Live Demo:** [https://cheap-laptops-f95b4.web.app](https://cheap-laptops-f95b4.web.app/)  
📂 **Client Repository:** [GitHub Client Side](https://github.com/Abdulkarim6/Buy-Cheap-Laptops-clientSide)  
📂 **Server Repository:** [GitHub Server Side](https://github.com/Abdulkarim6/Buy-cheap-laptops-serverSide)  

---

## 🔑 Demo Login Credentials

To test different role-based functionalities, use the following credentials:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `karim@gmail.com` | `karim12@#` |
| **Seller** | `karim1@gmail.com` | `123123` |
| **Buyer** | `karim2@gmail.com` | `123123` |

---

## ✨ Key Features

### 🛡️ Core & Security Features
* **Role-Based Authorization (RBAC):** Distinct dashboards and access rights for Admins, Sellers, and Buyers.
* **JWT & Firebase Authentication:** Secure user authentication using Firebase Auth alongside JSON Web Token (JWT) verification stored in local storage for API endpoints.
* **Wash Trading Protection:** E-commerce business logic implementation that strictly prevents Sellers from purchasing or booking their own listed products.
* **Private & Role Routes:** Protected navigation routes ensuring non-authorized users cannot access internal dashboard pages.

### 💻 Buyer Capabilities
* **Browse & Filter Laptops:** Explore categorized second-hand laptop listings with detailed specifications.
* **Product Booking:** Instantly book laptops directly from the product details page.
* **My Orders Dashboard:** Track booked items, check payment status (Paid/Unpaid), and manage orders in a responsive glassmorphic table.

### 🏷️ Seller Capabilities
* **Add New Product:** List second-hand laptops with image upload integration via ImgBB API, condition details, purchase year, and price breakdown.
* **My Products Management:** View listed laptops, delete items via modal confirmation, and advertise products to showcase them on the homepage.

### 👑 Admin Capabilities
* **Manage Sellers:** View all registered sellers, verify seller authenticity (adds a verified badge), or delete seller accounts.
* **Manage Buyers:** View and manage all registered buyer accounts across the platform.

### 🎨 Design & Responsive UI
* **Dark Glassmorphic Design:** Modern, sleek, dark-themed user interface utilizing subtle borders, background blurs, and cyan accent colors.
* **Mobile-Optimized Tables:** Custom table configurations (`min-w-[650px]` & `md:table-cell`) ensuring zero horizontal overflow issues on small screens.
* **React Portals:** Modal confirmation pop-ups rendered directly via `ReactDOM.createPortal` for clean overlay positioning above sticky layouts.

---

## 🛠️ Tech Stack

### Frontend (Client)
* **Core:** React.js, React Router DOM (v6)
* **Styling:** Tailwind CSS, DaisyUI, Glassmorphism CSS
* **Icons:** React Icons, Heroicons
* **State & Data Fetching:** TanStack Query (`@tanstack/react-query`)
* **Form Handling:** React Hook Form
* **Authentication:** Firebase Auth
* **Notifications:** React Hot Toast

### Backend (Server)
* **Environment:** Node.js, Express.js
* **Database:** MongoDB
* **Security & Tokens:** JSON Web Token (JWT), CORS, Dotenv
* **Hosting/Deployment:** Vercel (Backend API), Firebase Hosting (Frontend)
