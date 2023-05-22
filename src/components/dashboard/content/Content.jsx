import React, { useContext} from 'react'
import Header from './header/Header'
import Filter from './filter/Filter'
import Gallery from './gallery/Gallery'
import './content.css'
import usePins from '../../../costumHooks/usePins'
import PinsContext from '../../../context/PinsContext '
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