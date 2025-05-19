import React from 'react'
import { IoHomeOutline , IoSettingsOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { BsInfoCircle } from "react-icons/bs";
import { MdHistory } from "react-icons/md";
import { LiaEditSolid } from "react-icons/lia"
import { Link } from 'react-router-dom';

function Sidebar({open}) {
    const menus = [
        { name:"Home",link:'/', icon: IoHomeOutline },
        { name:"About",link:'/About', icon: BsInfoCircle },
        { name: "For Buyers",link:'/ForBuyers', icon: GoDotFill, margin: true },
        { name: "For Tenants",link:'/ForTenants', icon: GoDotFill },
        { name: "For Owners",link:'ForOwners', icon: GoDotFill },
        { name: "Your Listed Property",link:'/seelistings', icon: LiaEditSolid, margin: true },
      ];

  return (
    <div className={`bg-slate-100 min-h-screen fixed transition-transform ${open? 'w-60' : 'w-16'} duration-500 rounded-lg shadow-md`}>
    <span className='mt-24 flex flex-col gap-4 mx-2 relative'>
      {menus?.map((menu,i)=>(
        <Link 
        to={menu?.link}
        key={i} 
        className={` ${menu?.margin && 'mt-5'
        } group flex items-center text-md gap-10 font-semibold p-3 hover:bg-gray-200 rounded-md`}
        >
        
        <span>{React.createElement(menu?.icon,{ size: "20" })}</span>
        <h1 style={{transitionDelay: `${i+1}00ms`,}}
        className={`whitespace-pre duration-500 ${
          !open && "opacity-0 translate-x-28 overflow-hidden"}`}
        >
          {menu?.name}
        </h1>
        <h1 className={`${open && "hidden"} absolute left-48 bg-white font-normal whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 
        overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-16 group-hover:duration-300 group-hover:w-fit `}
        >
          {menu?.name}
        </h1>
        </Link>
        ))
        }
        
        <div className='border-t flex text-lg mt-36 p-3 my-16 mx-10'>
          <div className='overflow-hidden'>
            <div className='leading-4'>
              <Link to='/'>
              <h1 className='font-bold'>
                <span className='text-slate-10000'>URBAN</span>
                <span className='text-slate-600'>HOME</span>
              </h1>
              <span className='text-xs'>urhome@gmail.com</span>
              </Link>
            </div>
          </div>
        </div>
        
    </span>
  </div>
  )
}

export default Sidebar
