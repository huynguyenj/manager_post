import './App.css'
import axios from "axios";
import {Routes, Route } from "react-router-dom";
import Sidebar from './layouts/sidebar';

function App() {
 
  const api = axios.create({
    baseURL:"https://67a0377924322f8329c5813b.mockapi.io/api/manager"
  })

  api.interceptors.request.use(
  (config)=>{
      console.log('Request sent: ',config)
      return config;
    },
    (error)=>{
      return Promise.reject(error);
    }
  )
  return (
    <>  
          <Sidebar/>
          <Routes>
              <Route></Route>
              <Route></Route>
              <Route></Route>
            
          </Routes>
    </>
  )
}

export default App
