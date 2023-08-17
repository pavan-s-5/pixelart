import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DataFetchLoader from './loaders/DataFetchLoader'
import MasonaryLayout from './MasonaryLayout'
import { AiOutlineCompress } from 'react-icons/ai'

const Mymedia = ({feeds}) => {

  const [isLoading, setIsLoading] = useState(false)
  const [filteredFeed, setFilteredFeed] = useState(null)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    setIsLoading(true);
    setFilteredFeed(feeds?.filter((data) => data.users._id === user?.uid))
    setIsLoading(false);
  },[])

  return (
<div className='flex justify-center w-full'>
{
  isLoading ? (<DataFetchLoader/>) : (<>
    <div>
      {
        filteredFeed?.length > 0 ? (<MasonaryLayout feeds={filteredFeed}/>) : (
          <p className='text-2xl text-gray-500 flex justify-center items-center gap-2 select-none'>
             <AiOutlineCompress/> You haven't uploaded any media yet!
          </p>
        )
      }
      
    </div>
  </>)
}
</div>
  )
}

export default Mymedia