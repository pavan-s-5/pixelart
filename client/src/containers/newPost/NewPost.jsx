import React from 'react'
import {subMenu} from '../../utils/supports'
import {NavLink, Route, Routes} from 'react-router-dom'
import {Collections, CreatePost, Mymedia} from '../../components/index'
import { useSelector } from 'react-redux'

const NewPost = () => {
  const feeds = useSelector((state) => state.feeds)
  return (
    <div className='text-white w-screen p-3 md:p-10 inset-0'>
      
      <section className='flex flex-col w-full h-auto items-center justify-start px-1 md:px-6'>
          <div className=" w-full h-auto flex items-center justify-start overflow-x-auto">
              <ul className="flex items-center gap-6 justify-center whitespace-nowrap ">
                  {subMenu && subMenu.map((menu) => (
                      <NavLink key={menu.id} className={({isActive}) => isActive? "text-red-500 border-b-2 border-solid " : "text-gray-300 py-5 hover:text-gray-100"} to={menu.slug}>
                        {menu.name}
                      </NavLink>
                  ))}
              </ul>
          </div>
          <div className="flex flex-col w-full items-start justify-start h-auto py-4">
              <Routes>
                    <Route path='/upload' element={<CreatePost/>} />
                    <Route path='/my-collections' element={<Collections/>} />
                    <Route path='/my-media' element={<Mymedia feeds={feeds}/>} />
              </Routes>
          </div>
      </section>

    </div>
  )
}

export default NewPost