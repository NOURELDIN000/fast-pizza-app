import Cart from "./features/cart/Cart";
import CreateOrder, {action as createOrderAction} from "./features/order/CreateOrder";
import Order, {Loader as orderLoader} from "./features/order/Order";

import {action as updateOrderAction} from "./features/order/UpdateOrder";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import AppLayout from "./ui/AppLayout";
import Menu, {Loader as menuLoader} from "./features/menu/Menu";
import Error from "./ui/Error"

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout/>,
      errorElement: <Error/>,
      children:[
        {
          path: '/',
          element: <Home/>
        },
        {
          path: '/menu',
          element: <Menu/>,
          loader: menuLoader,
          errorElement: <Error/>,
        },
        {
          path:'/order/new',
          element: <CreateOrder/>,
          action: createOrderAction,
        },
        {
          path:'/order/:orderId',
          element: <Order/>,
          loader: orderLoader,
          errorElement: <Error/>,
          action: updateOrderAction,
            
        },
        {
          path:'/cart',
          element: <Cart/>
        }
      ]
    },
   
  ])

  return (
   
      <RouterProvider  router={router}/>
    
  );
}

export default App;
