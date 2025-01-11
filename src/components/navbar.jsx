import React from 'react'

const navbar = () => {
  return (
    <div>
      <nav className='flex justify-between items-center px-6 py-3 bg-violet-500 text-white'>
        <div>
            <h1 className='font-extrabold text-[22px]'>&lt;GetPass/&gt;</h1>
        </div>
        {/* <ul className='flex gap-3'>
            <a className='hover:font-bold' href=""><li>About</li></a>
            <a className='hover:font-bold' href=""><li>Report</li></a>
        </ul> */}
        <button className='flex items-center gap-2 text-black bg-white font-semibold py-1 px-2 rounded-full'> 
          <img className='w-8' src="/public/github-mark.png" alt="" />
          Github 
        </button>
      </nav>
    </div>
  )
}

export default navbar
