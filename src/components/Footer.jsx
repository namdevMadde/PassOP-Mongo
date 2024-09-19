import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col justify-center items-center bg-slate-800 text-white w-full'>
        <div className="logo font-bold text-2xl">
                    <span className='text-green-500'> &lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </div>
        <div className='flex justify-center items-center '>
      Created With <img className='w-5 mx-2' src="icons/heart.png" alt="" /> By Gabbar
      </div>
    </div>
  )
}

export default Footer
