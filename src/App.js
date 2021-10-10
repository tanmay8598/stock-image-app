import React, { useEffect, useState } from 'react'
import Photo from './Photo'
import { FaSearch } from 'react-icons/fa'
const mainUrl = 'https://api.unsplash.com/photos/'
const searchUrl = 'https://api.unsplash.com/search/photos/'
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`

const App = () => {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState('')
  const fetchImage = async () => {
    setLoading(true)
    let url
    const urlPage = `&page=${page}`
    const urlQuery = `&query=${query}`
    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
    } else {
      url = `${mainUrl}${clientID}${urlPage}`
    }
    try {
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results
        } else if (query) {
          return [...oldPhotos, ...data.results]
        } else {
          return [...oldPhotos, ...data]
        }
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  useEffect(() => {
    fetchImage()
    // eslint-disable-next-line
  }, [page])

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => {
          return oldPage + 1
        })
      }
    })
    return () => window.removeEventListener('scroll', event)
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setPage(1)
    fetchImage()
  }

  return (
    <div className='app-wrapper'>
      <div className='search-container'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search'
        />
        <button className='btn' onClick={handleSubmit}>
          {' '}
          <FaSearch />
        </button>
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
