import React from 'react'

const Photo = ({
  urls: { regular },
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium },
  },
}) => {
  return (
    <div className='photo-wrapper'>
      <img src={regular} alt={alt_description} className='image' />
      <div className='photo-info'>
        <div>
          {' '}
          <h4>{name}</h4>
          <p>{likes} likes</p>
        </div>
        <a href={portfolio_url}>
          <img src={medium} alt='' className='user-img' />
        </a>
      </div>
    </div>
  )
}

export default Photo
