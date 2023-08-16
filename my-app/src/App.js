import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './App.scss';

import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Rooms from './pages/Rooms/Rooms';

// using createBrowserRouter() to set routing path

const router = createBrowserRouter([
  {
    path: '/',
    element: <Rooms />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: 'rooms',
    element: <Rooms />
  }
])

// using RouterProvider to provide routing feature

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
