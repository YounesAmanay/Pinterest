import React from 'react'
import Nav from './nav/Nav'
import {Routes ,Route} from 'react-router-dom'
import Content from './content/Content'

function Dashboard() {
  return (
    <div className='dashboard'>
        <Nav/>
        <Routes>
          <Route index element={<Content/>}/>
          <Route path='/profile' element={<Content/>}/>
          <Route path='/library' element={<Content/>}/>
        </Routes>
    </div>
  )
}

export default Dashboard