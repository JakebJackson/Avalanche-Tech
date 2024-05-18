import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Success from './pages/Success';
import Orders from './pages/Orders';
import PartPage from './pages/PartPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <PageNotFound />,
    children: [
      {
        index: true, 
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/success',
        element: <Success />
      }, {
        path: '/orders',
        element: <Orders />
      }, {
        path: '/parts/:id',
        element: <PartPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)