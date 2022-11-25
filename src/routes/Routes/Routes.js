import { createBrowserRouter } from "react-router-dom";
import Products from "../../components/Products/Products";
import Main from "../../layout/Main";
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
    }
]);

export default router;