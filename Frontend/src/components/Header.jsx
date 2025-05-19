import React, { useEffect, useState } from 'react'
import {FaCogs, FaForward, FaSellcast, FaSignOutAlt, } from 'react-icons/fa'
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signoutUserStart, deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice';

function Header({ toggleSidebar }) {
  const {currentUser} = useSelector((state) => state.user)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const [isOpen , setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignout = async() => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search])

  return (
  <nav className="bg-slate-300 p-3 flex justify-between items-center flex-wrap fixed w-full top-0 z-50">
    <div className='flex'>
        
        {/* Button */}
        <button className='btn btn-square btn-ghost'
        onClick={toggleSidebar} >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current">
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        {/* Name */}
        <Link to='/'>
        <h1 className='font-bold mx-2 text-sm sm:text-xl flex flex-wrap p-2 btn btn-ghost'>
          <h2>
            <span className='text-slate-10000'>URBAN</span>
            <span className='text-slate-600'>HOME</span>
          </h2>
        </h1>
        </Link>
    </div>

    {/* Search */}
    <div className='form-control input input-bordered bg-slate-200'>
        <form onSubmit={handleSubmit} className='flex items-center'>
            <input type="text" placeholder="Search" className="bg-transparent  focus:outline-none  sm:w-64" value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
            <button className="btn btn-ghost btn-circle">
                <svg 
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </form>
    </div>

       {/* Login And Admin */}
       <div className='flex gap-6'>

        {/* Login */}
        <ul>
          <Link to='/Signin'>
          <li className='btn btn-square btn-ghost p-3 text-slate-800 font-bold'>Signin</li>
          </Link>
        </ul>

        {/* Admin */} 
        <div className="dropdown dropdown-end">
        <button
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle"
          onClick={toggleDropdown} // Toggle dropdown on button click
          >
            {currentUser ? (
              <img className='w-9 rounded-full' src={currentUser.avatar} alt='Profile' />
            ):
            <img
            className="w-9 rounded-full"
            alt="User Profile"
            src="https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
            />
            }
          </button>

          <ul
          tabIndex={0}
          className={`menu dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow-md ${isOpen ? 'block' : 'hidden'}`}
          >
            <li><a><FaSellcast className=' text-slate-600 mx-3'/><Link to='/Profile'>Profile</Link></a></li><hr />
            <li><a onClick={handleSignout}><FaSignOutAlt className='mx-3 text-slate-600'/>Sign out</a></li><hr />
          </ul>
        </div>
       </div>
  </nav>
  )
}

export default Header
