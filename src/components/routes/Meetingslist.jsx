import React, { Component } from 'react';
import LoadingAnimation from '../LoadingAnimation';
import '../../style/Animations.css';
import axios from 'axios';
import cancelIcon from './../icons/cancel-icon.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';

import ReactTooltip from 'react-tooltip';

//a few things could have been made into components

class Meetingslist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(), // start date selector
            endDate: new Date(), // end date selector
            startDateToLocaleSe: '', // converted start date to the Swedish format
            endDateToLocaleSe: '', // converted end date to the Swedish format
            startTime: '', // start time selector
            endTime: '', // end time selector
            meetingLength: 0, // desired meeting length in minutes, 30 or 60
            chosenDate: '', // chosen date for the meeting
            chosenTime: '', // chosen time for the meeting
            suggestions: [], // fetched suggestions from the server
            showSuggestions: false, // toggle show suggestions container
            showConfirmation: false, // show meeting confirmation modal window
            serverError: false, // show server error window
            showLoading: false
        };
        // handlers
        this.handleGetSuggestions = this.handleGetSuggestions.bind(this); // fetch suggestions from the server
        this.handleStartDate = this.handleStartDate.bind(this); // convert to swedish date format
        this.handleEndDate = this.handleEndDate.bind(this); // convert to swedish date format
        this.handleSaveMeeting = this.handleSaveMeeting.bind(this); // save meeting in the DB - local storage
    }

    //fake database call to store upcoming meeting

    handleSaveMeeting() {
        const atendees = this.props.selectedpersons;
        const { chosenDate, chosenTime, meetingLength } = this.state;
        //get existing meetings or empty array
        const existingMeetings =
            JSON.parse(localStorage.getItem('upcomingMeetings')) || [];

        const newMeeting = {
            chosenDate,
            chosenTime,
            meetingLength,
            atendees
        };
        //push new meeting to the existing ones
        existingMeetings.unshift(newMeeting);

        //store to local storage
        localStorage.setItem(
            'upcomingMeetings',
            JSON.stringify(existingMeetings)
        );
        console.log('stored to local storage', newMeeting);
        this.setState({ showConfirmation: true });
    }
    handleStartDate(date) {
        const convertToLocaleSe = date.toLocaleDateString('sv-SE');
        this.setState({
            startDate: date,
            startDateToLocaleSe: convertToLocaleSe
        });
    }
    handleEndDate(date) {
        const convertToLocaleSe = date.toLocaleDateString('sv-SE');
        this.setState({
            endDate: date,
            endDateToLocaleSe: convertToLocaleSe
        });
    }
    handleGetSuggestions(e) {
        e.preventDefault();
        const peopleArr = this.props.selectedpersons.map(person => {
            return `employees=${person.id}&`;
        });
        const employees = peopleArr.join('');
        const fromDate = this.state.startDateToLocaleSe;
        const toDate = this.state.endDateToLocaleSe;
        const officehoursStart = this.state.startTime;
        const officehoursEnd = this.state.endTime;
        const meetingLength = this.state.meetingLength;
        this.setState({ showLoading: !this.state.showLoading });
        axios
            .get(
                `https://stark-castle-84894.herokuapp.com/suggestions?${employees}fromDate=${fromDate}&toDate=${toDate}&officehoursStart=${officehoursStart}&officehoursEnd=${officehoursEnd}&meetingLength=${meetingLength}`
            )
            .then(response =>
                this.setState({
                    suggestions: response.data,
                    showSuggestions: !this.state.showSuggestions,
                    showLoading: false
                })
            )
            .catch(err => {
                console.log('some error', err);
                this.setState({ serverError: true, showLoading: false });
            });
    }
    render() {
        return (
            <div className="main-content">
                {/* show loader animations */}
                {this.state.showLoading && <LoadingAnimation />}
                {/* show error modal in case of server error */}
                {this.state.serverError && (
                    <div className="modal">
                        <div className="modal-message scale-up-top">
                            <h3>
                                Something went wrong, please try again later!
                            </h3>
                            <button
                                onClick={() => {
                                    this.setState({ serverError: false });
                                }}>
                                Ok
                            </button>
                        </div>
                    </div>
                )}
                {/* show warning row in case no people were selected */}
                {this.props.selectedpersons.length > 0 || (
                    <div className="row error">
                        <h3>Add people to the list first</h3>
                        <Link to="/">
                            <button className="brand-btn">Add people</button>
                        </Link>
                    </div>
                )}
                {/* the form */}
                <form onSubmit={this.handleGetSuggestions}>
                    <div className="time-container">
                        <div className="selector">
                            <h4>Start Date:</h4>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleStartDate}
                            />
                        </div>

                        <div className="selector">
                            <h4>End Date:</h4>
                            <DatePicker
                                selected={this.state.endDate}
                                onChange={this.handleEndDate}
                            />
                        </div>

                        <div className="selector">
                            <h3>Office hours</h3>
                        </div>

                        <div className="selector">
                            <h4>From:</h4>
                            <select
                                onChange={e => {
                                    console.log(e.target.value);
                                    return this.setState({
                                        startTime: e.target.value
                                    });
                                }}
                                required>
                                <option value="">Start Time</option>
                                <option value="08:00">08:00</option>
                                <option value="08:30">08:30</option>
                                <option value="09:00">09:00</option>
                                <option value="09:30">09:30</option>
                                <option value="10:00">10:00</option>
                                <option value="10:30">10:30</option>
                                <option value="11:00">11:00</option>
                                <option value="11:30">11:30</option>
                                <option value="12:00">12:00</option>
                                <option value="12:30">12:30</option>
                                <option value="13:00">13:00</option>
                                <option value="13:30">13:30</option>
                                <option value="14:00">14:00</option>
                                <option value="14:30">14:30</option>
                                <option value="15:00">15:00</option>
                                <option value="15:30">15:30</option>
                                <option value="16:00">16:00</option>
                            </select>
                        </div>
                        <div className="selector">
                            <h4>To:</h4>
                            <select
                                onChange={e => {
                                    return this.setState({
                                        endTime: e.target.value
                                    });
                                }}
                                required>
                                <option value="">End Time</option>
                                <option value="08:00">08:00</option>
                                <option value="08:30">08:30</option>
                                <option value="09:00">09:00</option>
                                <option value="09:30">09:30</option>
                                <option value="10:00">10:00</option>
                                <option value="10:30">10:30</option>
                                <option value="11:00">11:00</option>
                                <option value="11:30">11:30</option>
                                <option value="12:00">12:00</option>
                                <option value="12:30">12:30</option>
                                <option value="13:00">13:00</option>
                                <option value="13:30">13:30</option>
                                <option value="14:00">14:00</option>
                                <option value="14:30">14:30</option>
                                <option value="15:00">15:00</option>
                                <option value="15:30">15:30</option>
                                <option value="16:00">16:00</option>
                                <option value="16:30">16:30</option>
                                <option value="17:00">17:00</option>
                            </select>
                        </div>
                        <div className="selector">
                            <h4>Meeting length:</h4>
                            <input
                                type="number"
                                placeholder="minutes ex 60"
                                onChange={e => {
                                    return this.setState({
                                        meetingLength: e.target.value
                                    });
                                }}
                                required
                            />
                        </div>
                    </div>
                    {/* meeting confirmation modal */}
                    {this.state.showConfirmation && (
                        <div className="modal" style={{ bottom: '-600px' }}>
                            <div
                                className="modal-message scale-up-top"
                                style={{ marginTop: '80vh' }}>
                                <h3>
                                    Meeting set for {this.state.chosenDate} at{' '}
                                    {this.state.chosenTime}
                                </h3>
                                <p>
                                    {this.props.selectedpersons.length} people
                                    invited
                                </p>
                                <button
                                    onClick={() => {
                                        this.setState({
                                            showConfirmation: false
                                        });
                                        window.location.reload();
                                    }}>
                                    Ok
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="btn-container">
                        <button type="submit" className="btn">
                            Get suggestions
                        </button>
                    </div>
                </form>
                {/* show time table suggestion */}
                {this.state.showSuggestions && (
                    <div className="suggestions-container">
                        <div className="suggestions">
                            {this.state.suggestions.suggestions.map(
                                (element, i) => {
                                    return (
                                        <div
                                            className="suggestions-column"
                                            key={i}>
                                            <h3>{element.date}</h3>
                                            {element.start_times.map(
                                                (el, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="suggestions-time"
                                                            onClick={() => {
                                                                this.setState({
                                                                    chosenTime: el.slice(
                                                                        0,
                                                                        5
                                                                    ),
                                                                    chosenDate:
                                                                        element.date
                                                                });
                                                            }}
                                                            style={
                                                                this.state
                                                                    .chosenDate ===
                                                                    element.date &&
                                                                this.state
                                                                    .chosenTime ===
                                                                    el.slice(
                                                                        0,
                                                                        5
                                                                    )
                                                                    ? {
                                                                          backgroundColor:
                                                                              '#E1DCEC',
                                                                          border:
                                                                              '1px solid #333333'
                                                                      }
                                                                    : null
                                                            }>
                                                            {el.slice(0, 5)}
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    );
                                }
                            )}
                        </div>
                        <div className="btn-container">
                            <button onClick={this.handleSaveMeeting}>
                                Send invitation
                            </button>
                        </div>
                    </div>
                )}
                {/* list of people that will be invited */}
                {this.props.selectedpersons.length > 0 && (
                    <header className="list-title green">
                        <h3>Participants</h3>
                    </header>
                )}

                <div className="search-results">
                    {this.props.selectedpersons.map(person => {
                        return (
                            <div className="found-person" key={person.id}>
                                <h3>{person.name}</h3>

                                <div
                                    className="check-icon"
                                    onClick={() => {
                                        return this.props.handleremoveperson(
                                            person.id
                                        );
                                    }}>
                                    <img
                                        src={cancelIcon}
                                        alt=""
                                        data-tip="Remove"
                                    />
                                    <ReactTooltip
                                        place="top"
                                        type="warning"
                                        effect="float"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Meetingslist;
