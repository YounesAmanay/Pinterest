import React from 'react';
import Search from './search/Search';
import './header.css'

function Header() {
  return (
    <div className="header">
      <p className="header-title">Share your inspiration </p>
        <Search />
    </div>
  );
}

export default Header;
