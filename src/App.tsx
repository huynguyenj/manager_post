import './App.css'
import axios from "axios";
import {Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';
import Post from './pages/posts/PostList';
import Sidebar from './layouts/Sidebar';
import User from './pages/users/UserList';
import PostDetail from './pages/posts/PostDetail';
import UserDetail from './pages/users/UserDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
 
  const api = axios.create({
    baseURL:"https://67a0377924322f8329c5813b.mockapi.io/api/manager"
  })

  api.interceptors.request.use(
  (config)=>{
      // console.log('Request sent: ',config)
      return config;
    },
    (error)=>{
      return Promise.reject(error);
    }
  )
  return (
    <main className='flex min-h-screen'>  
          <Sidebar/>
          <Routes>
              <Route path='/' element={<Dashboard api={api}/>}></Route>
              <Route path='/userlist' element={<User api={api}/>}></Route>
              <Route path='/postlist' element={<Post api={api}/>}></Route>
              <Route path='/postlist/:id' element={<PostDetail api={api}/>}></Route>
              <Route path='/userdetail' element={<UserDetail/>}></Route>
          </Routes>
          <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  )
}
export default App
