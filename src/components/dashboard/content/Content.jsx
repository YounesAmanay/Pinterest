import React from 'react'
import Header from './header/Header'
import Filter from './filter/Filter'
import Gallery from './gallery/Gallery'
import './content.css'
function Content() {
  return (
    <div className='home-container'>
      <Header/>
      <Filter/>
      <Gallery/>
    </div>
  )
}

export default Content