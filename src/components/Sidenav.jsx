import React, { Component } from 'react';
import contractIcon from './icons/contract_icon.svg';
import expandIcon from './icons/expand_icon.svg';
import meetingListIcon from './icons/meeting-list_icon.svg';
import calendarIcon from './icons/calendar_icon.svg';
import searchIcon from './icons/search_icon_black.svg';

import ReactTooltip from 'react-tooltip';

import { Link } from 'react-router-dom';

const expandedMenuStyle = {
    width: '140px',
    paddingLeft: '10px',
    overflowX: 'hidden'
};
const contractedMenuStyle = {
    width: '0px',
    overflowX: 'hidden',
    margin: '0',
    paddingLeft: '0',
    transformOrigin: 'left'
};

export class Sidenav extends Component {
    constructor() {
        super();
        this.handleToggleMenu = this.handleToggleMenu.bind(this);
        this.state = {
            menuExpanded: false,
            upcomingMeetings: false
        };
    }
    componentDidMount() {
        if (localStorage.getItem('upcomingMeetings') !== null) {
            this.setState({ upcomingMeetings: true });
        } else {
            this.setState({ upcomingMeetings: false });
        }
    }
    handleToggleMenu() {
        this.setState({ menuExpanded: !this.state.menuExpanded });
    }

    render() {
        return (
            <aside className="side-nav ">
                <nav>
                    {/*  the hamburger menu icon */}
                    <div
                        className="toggle-menu"
                        onClick={this.handleToggleMenu}>
                        <img
                            src={
                                this.state.menuExpanded
                                    ? contractIcon
                                    : expandIcon
                            }
                            alt=""
                            data-tip="Toggle menu"
                        />
                        {/*  show tooltip only if the sidebar menu is expanded */}
                        {this.state.menuExpanded || (
                            <ReactTooltip
                                place="right"
                                type="info"
                                effect="float"
                            />
                        )}
                    </div>
                    <Link to="/">
                        <div className="nav-link">
                            <h4
                                style={
                                    this.state.menuExpanded
                                        ? expandedMenuStyle
                                        : contractedMenuStyle
                                }>
                                Search
                            </h4>
                            <img src={searchIcon} alt="" data-tip="Search" />
                            {/*  show tooltip only if the sidebar menu is expanded */}
                            {this.state.menuExpanded || (
                                <ReactTooltip
                                    place="right"
                                    type="info"
                                    effect="float"
                                />
                            )}
                        </div>
                    </Link>
                    <Link to="/meetings">
                        <div className="nav-link">
                            <h4
                                style={
                                    this.state.menuExpanded
                                        ? expandedMenuStyle
                                        : contractedMenuStyle
                                }>
                                Suggestions
                            </h4>
                            {/*  tooltip that will show the number of selected people */}
                            <div className="meeting-list">
                                {this.props.nrofpeople > 0 && (
                                    <div className="amount-selected">
                                        {this.props.nrofpeople < 10
                                            ? '0' + this.props.nrofpeople
                                            : this.props.nrofpeople}
                                    </div>
                                )}
                                <img
                                    src={meetingListIcon}
                                    alt=""
                                    data-tip="Suggestions"
                                />
                                {/*  show tooltip only if the sidebar menu is expanded */}
                                {this.state.menuExpanded || (
                                    <ReactTooltip
                                        place="right"
                                        type="info"
                                        effect="float"
                                    />
                                )}
                            </div>
                        </div>
                    </Link>
                    <Link to="/calendar">
                        <div className="nav-link">
                            <h4
                                style={
                                    this.state.menuExpanded
                                        ? expandedMenuStyle
                                        : contractedMenuStyle
                                }>
                                Calendar
                            </h4>
                            {/*  small circle tooltip icon that will appear only if there are upcoming meetings */}
                            <div className="calendar-notification">
                                {this.state.upcomingMeetings && (
                                    <div className="calendar-tooltip" />
                                )}
                                <img
                                    src={calendarIcon}
                                    alt=""
                                    data-tip="Calendar"
                                />
                                {/*  show tooltip only if the sidebar menu is expanded */}
                                {this.state.menuExpanded || (
                                    <ReactTooltip
                                        place="right"
                                        type="info"
                                        effect="float"
                                    />
                                )}
                            </div>
                        </div>
                    </Link>
                </nav>
            </aside>
        );
    }
}

export default Sidenav;
