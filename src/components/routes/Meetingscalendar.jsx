import React, { Component } from 'react';

class Meetingscalendar extends Component {
    constructor() {
        super();
        this.state = {
            meetings: [], // the fetched meetings
            noMeetingsMessageVisible: false, // track if "no meetings planned " should be visible
            showAtendees: -1 // track which meeting atendees to show
        };
    }
    componentDidMount() {
        if (this.state.meetings.length === 0) {
            this.setState({
                noMeetingsMessageVisible: true
            });
        } else {
            this.setState({ noMeetingsMessageVisible: false });
        }
    }
    // fetch data from the DB
    componentWillMount() {
        let storedMeetings =
            JSON.parse(localStorage.getItem('upcomingMeetings')) || [];

        if (this.state.meetings.length === 0) {
            this.setState({
                meetings: storedMeetings,
                noMeetingsMessageVisible: true
            });
        } else {
            this.setState({ noMeetingsMessageVisible: false });
        }
    }

    render() {
        return (
            <div className="main-content">
                {/*  show a warning that there are no meetings booked */}
                {this.state.noMeetingsMessageVisible && (
                    <div className="row error">
                        <h3>No meetings planed</h3>
                    </div>
                )}
                <div className="calendar-content">
                    {this.state.meetings.map((meeting, index) => (
                        <div className="meetings-container" key={index}>
                            <div className="found-person">
                                <h3>
                                    {meeting.chosenDate} - {meeting.chosenTime}
                                </h3>
                                <div className="meeting-controls">
                                    <button
                                        className="btn "
                                        onClick={() => {
                                            this.state.showAtendees !== index
                                                ? this.setState({
                                                      showAtendees: index
                                                  })
                                                : this.setState({
                                                      showAtendees: -1
                                                  });
                                        }}>
                                        Show Atendees
                                    </button>

                                    <button className="btn warning">
                                        Cancel meeting
                                    </button>
                                </div>
                            </div>
                            {/*  show the list of atendees */}
                            {this.state.showAtendees === index && (
                                <div className="atendees-container">
                                    {meeting.atendees.map(atendee => (
                                        <div
                                            key={atendee.id}
                                            className="atendee">
                                            {atendee.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Meetingscalendar;
