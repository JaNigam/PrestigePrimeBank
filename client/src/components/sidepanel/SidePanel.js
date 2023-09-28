import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom'
import DropdownButton from 'react-bootstrap/DropdownButton';
import AuthenticationService from "../../services/AuthenticationService";
import Dropdown from 'react-bootstrap/Dropdown';

import NavBar from "../NavBar";
import {
  faHome,
  faBars,
  faPowerOff,
  faUser,
  faMoneyBill,
  faUserPlus,
  faExchangeAlt,
  faHandHoldingUsd,
  faMoneyCheckAlt

} from "@fortawesome/free-solid-svg-icons";
import '../../styles/Sidepanel.css'

function SidePanel() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFundTransferExpanded, setIsFundTransferExpanded] = useState();
  const id = AuthenticationService.getLoggedInUserName()

  const toggleCollapse = () => {
    // setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const handleFundTransferHover = () => {
    setIsFundTransferExpanded(true);
  };

  const handleFundTransferLeave = () => {
    setIsFundTransferExpanded(false);
  };

  return (
    <>
    {/* <NavBar/> */}
    <div className="side-panel">
    {/* <div className={`side-panel ${isCollapsed ? "collapsed" : ""}`}> */}
      <div className="toggle-button" onClick={toggleCollapse}>
        <FontAwesomeIcon icon={faBars}/>
      </div>
      <ul>
        
        <li>
          <FontAwesomeIcon icon={faUser} style={{"margin-right": "10px" }}/>
          {!isCollapsed && <Link to = "/user" style={{"fontSize": "16px"}}> User Profile</Link>}
        </li>
        
        <li>
          <FontAwesomeIcon icon={faHome} style={{"margin-right": "5px"}} />
          {!isCollapsed && <Link to={`/dashboard/${id}`} style={{"fontSize": "16px"}}> {' '} Transaction History</Link> }
        </li>
        <li>
          <FontAwesomeIcon icon={faHome} style={{"margin-right": "5px"}} />
          {!isCollapsed && <Link to="/account/" style={{"fontSize": "16px"}}> {' '} Account Summary</Link> }
        </li>
        <li>
          <FontAwesomeIcon icon={faUserPlus} style={{"margin-right": "5px"}} />
          {!isCollapsed && <Link to="/" style={{"fontSize": "16px"}}> {' '} Change Password</Link> }
        </li>
        {/* <li onClick={handleLogout}>
          <FontAwesomeIcon icon={faPowerOff} />
          {!isCollapsed && <span>Logout</span>}
        </li> */}
        {/* <li
          onMouseEnter={handleFundTransferHover}
          onMouseLeave={handleFundTransferLeave}
        >
          <FontAwesomeIcon icon={faExchangeAlt} />
          {!isCollapsed && (
            <span className={`submenu ${isFundTransferExpanded ? "expanded" : ""}`}>
              Fund Transfer
              <ul>
                <li>
                  <FontAwesomeIcon icon={faUserPlus} />
                  <span>Add Account</span>
                </li>
              </ul>
            </span>
          )}
        </li> */}

        <li>
          <FontAwesomeIcon icon={faMoneyBill} />
          {!isCollapsed && <DropdownButton style={{"margin": "0"}} variant="link" id="dropdown-basic-button" title="Money Transfer">
            <Dropdown.Item ><Link to ="/addBeneficiary">Add Beneficiary </Link> </Dropdown.Item> 
            <Dropdown.Item ><Link to ="/imps">Fund Transfer </Link> </Dropdown.Item> 
            {/* <Dropdown.Item href="#/action-1">Fund Transfers</Dropdown.Item>  */}
            </DropdownButton>}
            
        </li>
      </ul>
    </div>
    </>
  );
}

export default SidePanel;
