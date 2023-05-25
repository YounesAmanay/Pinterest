import React, { useState } from 'react';
import Search from './search/Search';
import './header.css'
import AddPin from './addPin/AddPin';
import { BsFillPostcardFill } from 'react-icons/bs';

function Header() {
  const [show ,setShow]=useState(false)
  const onClose =()=>{
    setShow(false)
  }
  return (
    <div className="header">
      <div className="pin-it">
      <div onClick={()=>setShow(!show)}><BsFillPostcardFill/></div>
      <p className="header-title">Share your inspiration </p>
      </div>
        <Search />
        {show&& <AddPin onClose={onClose}/>}
    </div>
  );
}

export default Header;
