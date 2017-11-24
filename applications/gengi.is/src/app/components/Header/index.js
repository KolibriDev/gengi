import React from 'react';

import './index.scss';

function Header() {
  return (
    <header>
      <div className="content-wrap">
        <div className="icon">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <g className="g-logo" fill="none" fillRule="evenodd">
              <path
                fill="#FFFFFF"
                className="circle"
                d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16z"
              />
              <path
                fill="#39D6B3"
                className="arrow right"
                d="M19.5 13H10v-3h9.5V7.964l4.536 3.536-4.536 3.536V13z"
              />
              <path
                fill="#39D6B3"
                className="arrow left"
                d="M12.5 22H22v-3h-9.5v-2.036L7.964 20.5l4.536 3.536V22z"
              />
            </g>
          </svg>
        </div>
        <div className="title">
          <h1 className="App-title">Gengi.is</h1>
        </div>
      </div>
    </header>
  );
}

export default Header;
