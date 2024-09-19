import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800  text-white'>
            <div className="mycontainer flex justify-between items-center px-4 md:px-24 py-5 h-14">

                <div className="logo font-bold text-2xl">
                    <span className='text-green-500'> &lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </div>
                {/* <ul>
                    <li className='flex gap-3'>
                        <a className='hover:font-bold' href="#">Home</a>
                        <a className='hover:font-bold' href="#">About</a>
                        <a className='hover:font-bold' href="#">Contact</a>
                    </li>
                </ul> */}
                <button className='text-white bg-green-700 rounded-full flex items-center justify-center ring-white ring-2'>
                <img className=' w-11 p-1' src="icons/github.svg" alt="github" />
                <span className="font-bold px-1 pr-2">GitHub</span>
                </button>
            </div>

        </nav>

    )
}

export default Navbar
