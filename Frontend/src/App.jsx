import React, {useState} from 'react'
import {BrowserRouter, Routes ,Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ForBuyers from './Pages/ForBuyers';
import ForTenants from './Pages/ForTenants';
import ForOwners from './Pages/ForOwners';
import SeeListings from './Pages/SeeListings';
import UpdateProperty from './Pages/UpdateProperty';
import PrivateRoute from './components/PrivateRoute';
import Listing from './Pages/Listing';
import Search from './Pages/Search';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
  <BrowserRouter>
  <Header toggleSidebar={toggleSidebar}/>
  <section className='flex gap-6'>
    <Sidebar open={sidebarOpen}/>

    <div className='m-24 mx-64 w-screen text-xl text-gray-900 font-semibold'>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/About' element={<About />} />
      <Route path='/Signin' element={<Signin />} />
      <Route path='/Signup' element={<Signup />} />
      <Route path='/Search' element={<Search />} />
      <Route path='/listing/:listingId' element={<Listing />} />

      <Route element={<PrivateRoute />}>
      <Route path='/Profile' element={<Profile />} />
      <Route path='/ForOwners' element={<ForOwners />} />
      <Route path='/seelistings' element={<SeeListings />} />
      <Route path='/updateproperty/:listingId' element={<UpdateProperty />} />
      </Route>
      
      <Route path='/ForBuyers' element={<ForBuyers />} />
      <Route path='/ForTenants' element={<ForTenants />} />
    </Routes>
    </div>
  </section>
  </BrowserRouter>
  )
}

export default App;
