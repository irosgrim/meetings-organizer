import React from 'react';
import logo from './icons/logo.svg';
import defaultAvatar from './icons/default-avatar_icon.svg';
import { Link } from 'react-router-dom';
function Header(props) {
    return (
        <header className="doc-header">
            <Link to="/">
                <figure className="logo">
                    <img src={logo} alt="buffel &amp; båg" />
                </figure>
            </Link>

            <figure
                onClick={props.handletoggleusermenu}
                style={{ cursor: 'pointer' }}>
                <img src={defaultAvatar} alt="" />
            </figure>
        </header>
    );
}
export default Header;
