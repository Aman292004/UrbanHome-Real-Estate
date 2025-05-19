import React, { useEffect, useState } from 'react'
import ListingItem from '../components/ListingItem'
import { Link } from 'react-router-dom'

function ForBuyers() {

  const [saleListings, setSaleListings] = useState([])

  useEffect(() => {
    
    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4')
        const data = await res.json()
        setSaleListings(data)
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchSaleListings()
  }, [])
  
  return (
    <div className='w-[1200px] mx-7 p-3'>
      {
          saleListings && saleListings.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-slate-700 font-bold text-6xl'>Find Your Dream <br/> <span className='text-slate-500'>Home</span> <br/> To Buy</h2>
                <Link to={'/search?type=sale'} className='text-sm text-blue-800 hover:underline'>Show more places for sale</Link>
              </div>
              <div className='flex flex-wrap gap-6'>
                {
                  saleListings.map((listing) => (
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

export default ForBuyers
