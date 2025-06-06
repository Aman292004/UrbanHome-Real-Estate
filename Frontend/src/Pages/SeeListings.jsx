import React, { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

function SeeListings() {
  const {currentUser} = useSelector(state => state.user)
  const [showListingsError, setShowListingsError] = useState(false)
  const [ userListings, setUserListings] = useState([])

  useEffect(() => {
    
    const fetchShowListings = async () => {
      try {
        setShowListingsError(false)
        const res = await fetch(`/api/user/listings/${currentUser._id}`)
        const data = await res.json()
        if (data.success === false) {
          setShowListingsError(true)
          return
        }
  
        setUserListings(data)
      } catch (error) {
        setShowListingsError(true)
      }
    }
    fetchShowListings()
  }, [])


  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      }) 
      const data = await res.json()
      if (data.success === false) {
        console.log(data.message)
        return
      }

      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId))
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
  
  <div className='flex flex-col mx-10 gap-4'>
    <h1 className='text-center mt-7 text-3xl font-semibold'>Your Listed Property</h1>
    <p className='text-red-700 text-center  mt-10'>{showListingsError ? 'Error showing listings' : ''}</p>
    { userListings && userListings.length > 0 && userListings.map((listing) => 
    <div key={listing._id} className='border rounded-lg p-10 flex justify-between items-center gap-10'>
      
      <Link to={`/listing/${listing._id}`}>
        <img src={listing.imageUrls[0]} alt='listing cover' className='h-36 w-36 bject-contain rounded-lg hover:opacity-85 '/>
      </Link>
      
      <Link className='text-slate-700 font-bold uppercase hover:underline truncate flex-1' to={`/listing/${listing._id}`}>
        <p>{listing.name}</p>
      </Link>

        <div className='flex flex-col items-center'>
          <button onClick={() => handleListingDelete(listing._id)} className='text-rose-500 uppercase'>Delete</button>
          
          <Link to={`/updateproperty/${listing._id}`}>
            <button className='text-green-500 uppercase'>Edit</button>
          </Link>
        </div>
    </div>
    )}
  </div>
  )
}

export default SeeListings
