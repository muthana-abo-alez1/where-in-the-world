import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./header.css"
import { faMoon } from '@fortawesome/free-regular-svg-icons'
function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light  shadow-sm  mb-5  rounded flex-nowrap ">
      <div className="container min-width-335 d-flex align-items-center">
        <h1 className="navbar-brand m-0" href="#">Where in the world?</h1>
          <input type="checkbox" id="dark-toggle"/>
            <label htmlFor="dark-toggle">
            <div className="dark d-flex flex-nowrap align-items-center gap-2" >
               <FontAwesomeIcon icon={faMoon} className='' />
                    <p className='m-0'>Dark Mode</p>
            </div>
           
      </label>
      </div>
    </nav>
    </div>
  )
}

export default Header