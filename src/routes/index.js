import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import AllOrders from '../pages/AllOrders'
import UserPanel from '../pages/UserPanel'
import OrderUser from '../pages/OrderUser'
import DashBord from '../pages/DashBord'
import AllCategory from '../pages/AllCategory'
import ProfilUser from '../pages/ProfilUser'
import UpdatePassword from '../pages/UpdatePassword'


const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassowrd/>
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "home",
                        element : <DashBord/>
                    },

                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-categorys",
                        element : <AllCategory/>
                    },

                    {
                        path : "all-products",
                        element : <AllProducts/>
                    },
                    {
                        path : "all-orders",
                        element : <AllOrders/>
                    }
                ]
            },


            {
                path : "user-panel",
                element : <UserPanel/>,
                children : [


                        {
                            path : "my-profil",
                            element : <ProfilUser/>
                        },

                    {
                        path : "my-order",
                        element : <OrderUser/>
                    },
                    {
                        path : "update-password",
                        element : <UpdatePassword/>
                    },
                 
                ]
            },
        ]
    }
])


export default router