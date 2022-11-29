import { createBrowserRouter } from "react-router-dom";
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
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/', element: <Main></Main>,
        children: [
            { path: '/', element: <Home></Home> },
            {
                path: '/products/:id', element: <PrivateRoute><Products></Products></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`)
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
        children: [
            {
                path: '/dashboard', element: <MyProducts></MyProducts>
            },
            {
                path: '/dashboard/addProduct', element: <AddProduct></AddProduct>
            },
            {
                path: '/dashboard/addOrders', element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/allSellers', element: <AllSellers></AllSellers>
            },
            {
                path: '/dashboard/allBuyers', element: <AllBuyers></AllBuyers>
            },
        ]
    }
]);

export default router;