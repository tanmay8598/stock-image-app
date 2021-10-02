import React, { useEffect, useState } from 'react'
import Photo from './Photo'
const mainUrl = 'https://api.unsplash.com/photos/'
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`

const App = () => {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const fetchImage = async () => {
    setLoading(true)
    let url
    url = `${mainUrl}${clientID}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      setPhotos(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  useEffect(() => {
    fetchImage()
  }, [])
  return (
    <div className='app-wrapper'>
      <div className='search-container'>
        <input type='text' />
        <button>submit</button>
      </div>
      <div className='photo-container'>
        {photos.map((image, index) => {
          return <Photo key={index} {...image} />
        })}
      </div>
    </div>
  )
}

export default App
