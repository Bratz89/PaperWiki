import React from 'react';
import './Bars.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {   faRightToBracket, faAddressCard } from '@fortawesome/free-solid-svg-icons'
 
function TopBar() {

    return (
        <div className='TopBarContainer'>
            <div style={{ width: 70 }}></div>
            <div style={{ display: "flex", marginLeft: "auto", height: "100%", width: 80 }}>
                <div className='TopBarItem' style={{ display: "flex", marginLeft: "auto", width: "100%" }}>
                    <FontAwesomeIcon icon={faAddressCard} style={{ height: 20, margin: "auto" }}></FontAwesomeIcon>
                </div>
                <div className='TopBarItem' style={{ display: "flex", marginLeft: "auto", width: "100%" }}>
                    <FontAwesomeIcon icon={faRightToBracket} style={{ height: 20, margin: "auto" }}></FontAwesomeIcon>
                </div>
            </div>
        </div >
    )
}

export default TopBar;
