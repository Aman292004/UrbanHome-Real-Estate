import React, { useEffect, useState } from 'react'
import ListingItem from '../components/ListingItem'
import { Link } from 'react-router-dom'

function ForTenants() {

  const [rentListings, setRentListings] = useState([])

  useEffect(() => {
    
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent')
        const data = await res.json()
        setRentListings(data)
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchRentListings()
  }, [])

  return (
    <div className='w-[1200px] mx-7 p-3'>
      {
          rentListings && rentListings.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-slate-700 font-bold text-6xl'>Find Your Dream <br/> <span className='text-slate-500'>Home</span> <br/> For Rent</h2>
                <Link to={'/search?type=rent'} className='text-sm text-blue-800 hover:underline'>Show more places for rent</Link>
              </div>
              <div className='flex flex-wrap gap-6'>
                {
                  rentListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._idS}/>
                  ))
                }
              </div>
            </div>
          )
        }
    </div>
  )
}

export default ForTenants
