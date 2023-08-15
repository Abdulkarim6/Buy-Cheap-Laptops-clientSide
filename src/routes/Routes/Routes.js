import { createBrowserRouter } from "react-router-dom";
import AdvertiseProductBooking from "../../components/Advertised/AdvertiseProductBooking";
import Blog from "../../components/Blog/Blog";
import DisplayError from "../../components/DisplayError/DisplayError";
import Products from "../../components/Products/Products";
import DashboardLayout from "../../layout/DashboardLayout";
import Main from "../../layout/Main";
import AddProduct from "../../pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../../pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../../pages/Dashboard/AllSellers/AllSellers";
import MyOrders from "../../pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../../pages/Dashboard/MyProducts/MyProducts";
import Home from "../../pages/Home/Home";
import SignIn from "../../pages/SignIn/SignIn";
import SignUP from "../../pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

const router = createBrowserRouter([
    {
        path: '/', element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            { path: '/', element: <Home></Home> },
            { path: '/blog', element: <Blog></Blog> },
            {
                path: '/products/:id', element: <PrivateRoute><Products></Products></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`)
            },
            {
                path: `/advertiseProductDetails/:id`, element: <AdvertiseProductBooking></AdvertiseProductBooking>,
                loader: ({ params }) => fetch(`http://localhost:5000/advertiseProductDetails/${params.id}`)
            },
            {
                path: '/signup', element: <SignUP></SignUP>
            },
            {
                path: '/signin', element: <SignIn></SignIn>
            }
        ]
    },
    {
        path: '/dashboard', element: <DashboardLayout></DashboardLayout>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard', element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/myProducts', element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/dashboard/addProduct', element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },

            {
                path: '/dashboard/allSellers', element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            {
                path: '/dashboard/allBuyers', element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
        ]
    }
]);

export default router;