import React, { Component } from 'react';

class Usermenu extends Component {
    render() {
        return (
            <div
                className={
                    this.props.usermenuvisible
                        ? 'user-menu show-user-menu'
                        : 'user-menu hide-user-menu'
                }
                onClick={e => {
                    console.log(e.target);
                }}>
                <ul>
                    <li className="user-menu-link">Hello Ion</li>
                    <li className="user-menu-link">Settings</li>
                    <li className="user-menu-link">Log out</li>
                </ul>
            </div>
        );
    }
}

export default Usermenu;
