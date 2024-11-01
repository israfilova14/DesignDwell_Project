import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/pages/home";
import Login from "../components/pages/login";
import SignUp from "../components/pages/signup";
import AdminPanel from "../components/pages/admin/admin_panel";
import AllUsers from "../components/pages/admin/admin_users/all_users";
import AllProducts from "../components/pages/admin/admin_products/all_products";
import ProductDetail from "../components/pages/product_detail";
import Basket from "../components/pages/user_collections/basket";
import Favorite from "../components/pages/user_collections/favorite";
import ViewProductByCategoryAndFilter from "../components/pages/view_product_by_category_and_filter";
import SearchProduct from "../components/pages/search_product";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App/>,
            children: [
                {
                    path: "/",
                    element: <Home/>
                },
                {
                    path: "/login",
                    element: <Login/>
                },
                {
                    path: "/signup",
                    element: <SignUp/>
                },
                {
                    path: "/product/:id",
                    element: <ProductDetail/>
                },
                {
                    path: "/product-category",
                    element: <ViewProductByCategoryAndFilter/>
                },
                {
                    path: "/basket",
                    element: <Basket/>
                },
                {
                    path: "/favorite",
                    element: <Favorite/>
                },
                {
                    path: "/search",
                    element: <SearchProduct/>
                },
                {
                    path: "admin-panel",
                    element: <AdminPanel/>,
                    children: [
                        {
                            path: "all-users",
                            element: <AllUsers/>
                        },
                        {
                            path: "all-products",
                            element: <AllProducts/>
                        }
                    ]
                }
            ]
        }
    ]
)

export default router