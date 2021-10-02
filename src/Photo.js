import React from 'react'

const Photo = ({ urls: { regular } }) => {
  return (
    <div className='photo-wrapper'>
      <img src={regular} alt='' />
    </div>
  )
}

export default Photo
