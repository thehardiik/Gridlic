import React from 'react'
import { Outlet} from 'react-router-dom'

function Signup() {
    
  return (
    <div className='bg-zinc-950 w-full h-screen flex justify-center items-center'>
        <div className='h-5/6 w-3/5 bg-gray-100 flex p-2 rounded-3xl [@media(max-width:600px)]:p-0 [@media(max-width:600px)]:w-[100vw] [@media(max-width:600px)]:h-[100vh] [@media(max-width:600px)]:bg-zinc-950 [@media(max-width:600px)]:text-gray-100 [@media(max-width:600px)]:text-[#FFAA80]'>
            <div className='w-1/2 flex flex-col items-center [@media(max-width:600px)]:w-[100vw]'>
                <Outlet/>
            </div>
            <div className="w-1/2 bg-orange-700 rounded-3xl bg-[url('https://i.pinimg.com/564x/a4/3c/6e/a43c6e30850f07eab5717efe67c0e65e.jpg')] bg-cover bg-center [@media(max-width:600px)]:w-0"></div>
        </div>
    </div>
  )
}

export default Signup