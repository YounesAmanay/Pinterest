import React from 'react'
import Header from './header/Header'
import Filter from './filter/Filter'
import Gallery from './gallery/Gallery'

function Content() {
  return (
    <div className='container'>
      <Header/>
      <Filter/>
      <Gallery/>
    </div>
  )
}

export default Content