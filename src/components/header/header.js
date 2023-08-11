import React, {  useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { getItemFromLocalStorage } from "../../js/LocalStorag";
function Header() {
  const [isChecked, setIsChecked] = useState(getItemFromLocalStorage("dark")? true : false );
  function dark_mode(flag) {
    let element = document.body;
    if (flag) {
      element.classList.toggle("dark-mode");
    } else {
      element.classList.remove("dark-mode");
    }
    localStorage.setItem("dark", flag);
  }
  const handleDarkModeToggle = () => {
    setIsChecked(!isChecked);
    dark_mode(!isChecked);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm mb-5 rounded flex-nowrap">
        <div className="container min-width-335 d-flex align-items-center">
          <h1 className="navbar-brand m-0" href="#">
            Where in the world?
          </h1>
          <input
            type="checkbox"
            id="dark-toggle"
            checked={isChecked}
            onChange={handleDarkModeToggle}
          />
          <label htmlFor="dark-toggle">
            <div className="dark d-flex flex-nowrap align-items-center gap-2 btn">
              <FontAwesomeIcon icon={faMoon} className="dark" />
              <p className="m-0 dark">Dark Mode</p>
            </div>
          </label>
        </div>
      </nav>
    </div>
  );
}

export default Header;
