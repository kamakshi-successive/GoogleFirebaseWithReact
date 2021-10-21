import React  from "react";
import { logout } from '../Firebase';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const Header = (props) => {
    return(
        <>
            <div className="header_block">
                <img src="../header.png" className="header_img" />
                { props.flag ?
                <div className="header_text">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                       <div class="user">
                         <img src="../user.png" />
                       </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item><b>Name:</b>{props.name}</Dropdown.Item>
                        <Dropdown.Item ><b>Email:</b>{props.email}</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/register" onClick={logout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                   </Dropdown>
                </div>
                :
                <div className="header_text">
                  <Link to="/" className="head-text"><i class="fa fa-sign-in" /></Link>
                  <Link to="/register" className="head-text"> <i class="fa fa-user-plus" /></Link>
               </div> 
               }
            </div>
        </>
    )
}

export default Header;