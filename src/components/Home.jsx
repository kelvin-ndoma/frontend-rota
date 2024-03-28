import React from 'react'

export default function Home() {
  return (
    <div className='flex justify-center items-center px-4 md:px-0 lg:px-0'>
      <div className='container flex flex-wrap justify-between mx-auto'>
        {/* left */}
        <div data-aos="zoom-in-left" className="left w-full md:w-2/6 lg:w-2/6 mt-0 md:mt-20 lg:mt-20">
          <h1 className='text-2xl md:text-5xl lg:text-5xl font-bold py-4'>The Rotary Club, Kenya</h1>
          <p className='text-base py-3'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris
          </p>
        </div>
        {/* right */}
        <div data-aos="zoom-in-right" className="right w-full md:w-4/6 lg:w-4/6">
          <img src="https://res.cloudinary.com/dfczhaomn/image/upload/v1707957349/Untitled_design_2_hut3pl.png" className='' />
        </div>
      </div>

    </div>
  )
}
