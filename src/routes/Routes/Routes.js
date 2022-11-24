import { createBrowserRouter } from "react-router-dom";
import Products from "../../components/Products/Products";
import Main from "../../layout/Main";
import Home from "../../pages/Home/Home";

const router = createBrowserRouter([
    {
        path: '/', element: <Main></Main>,
        children: [
            { path: '/', element: <Home></Home> },
            {
                path: '/products/:id', element: <Products></Products>,
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`)
            }
        ]
    }
]);

export default router;