import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as Down } from 'styles/assets/icons/dropdown/down.svg';
import { ReactComponent as Up } from 'styles/assets/icons/dropdown/up.svg';

const ActDropDown = props => {
  const { control, id, label, items, errors } = props;
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);
  return (
    <div className="act-dropdown-wrapper">
      <button onClick={onClick} className="menu-button">
        <div className="label">{label}</div>
        {isActive ? <Up /> : <Down />}
      </button>
      <div ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
        <ul>
          {items.map((item, index) => {
            return (
              <li key={index}>
                <div>{item}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default ActDropDown;
