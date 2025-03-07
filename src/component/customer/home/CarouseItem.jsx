import React from 'react'

const CarouselItem = ({image,title}) => {
  return (
        <div className='flex flex-col justify-center items-center'>
            <img className='w-[8rem] h-[8rem] lg:w-[10rem] lg:h-[10rem] rounded-full object-cover object-center' src={image} alt={title} />
            <span className='py-5 font-semibold text-xl text-gray-400'>{title}</span>
        </div>
  )
}

export default CarouselItem