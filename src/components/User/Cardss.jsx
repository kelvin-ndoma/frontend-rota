import Image from 'next/image'
import React from 'react'

const HomeCard = () => {
  return (
    // <div className='bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer' onClick={() => { }}>
    //   <div className='flex-center glassmorphism size-12 rounded-[10px]'>
    //     <Image src='/icons/add-meeting.svg' alt='meeting' width={27} height={27} />
    //   </div>
    //   <div className='flex flex-col gap-2'>
    //     <h1 className='text-2xl font-bold'>New Events</h1>
    //     <p className='text-lg font-normal'>Create an Events</p>

    //   </div>

    // </div>

  )
}

export default HomeCard;


'use client'
import React from 'react'
import HomeCard from './HomeCard'

const MeetingTypeList = () => {
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard />
      <HomeCard />
      <HomeCard />
      <HomeCard />
    </section>
  )
}

export default MeetingTypeList