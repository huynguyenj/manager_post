
import React, { useState } from 'react'
import logo from '../assets/logo_manager.png'
import { BackArrow,PostList,UserList,DashBoard } from '../components/MuiIcon'
type MenuItem = {
      title:string,
      src: React.ComponentType
}
function Sidebar() {
      const [open,setOpen] = useState<boolean>(true);
      const handleOpen = ():void=>{
            setOpen((prev)=>!prev)
            console.log(open)
      }
      
      const menu:MenuItem[] = [
            {title:"Dashboard",src:DashBoard},
            {title:"Users",src:UserList},
            {title:"Posts",src:PostList},
      ]
  return (
    <aside className={`${open ? "w-72" : "w-32"} bg-gray-950 h-screen duration-300 ease-in relative `}>
      <nav className='h-full flex flex-col border-r shadow-sm'>
            <div className='w-full px-8 flex items-center'>
                  <img className='w-20' src={logo} alt="icon" />
                  <p className={`${!open&&"scale-0"
                  } font-semibold text-amber-50`}>Manager Post</p>
            </div>
            <ul className='pt-6 p-10'>
                  {menu.map((item,index)=>(
                        <li className='flex gap-x-4 p-2 mt-3 hover:bg-blue-500 cursor-pointer items-center rounded-2xl relative' key={index}>
                              <div><item.src sx={{color:'white',fontSize:'2rem'}}/></div>
                              <span className={`${!open&&"hidden"} text-white`}>{item.title}</span>
                             
                        </li>
                  ))}
            </ul>
      </nav>
      <button className={`${open&&"rotate-180"} rounded-full bg-blue-300 cursor-pointer hover:bg-amber-200 transition duration-75 ease-in-out absolute top-5 -right-2 `} onClick={handleOpen}><BackArrow/></button>
    </aside>
  )
}

export default Sidebar