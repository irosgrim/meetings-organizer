//components
import React, { Component } from 'react';
import Header from './components/Header';
import Usermenu from './components/Usermenu';
import Sidenav from './components/Sidenav';

//routes
import Meetingscalendar from './components/routes/Meetingscalendar';
import Meetingslist from './components/routes/Meetingslist';
import Home from './components/routes/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//styles
import './style/App.css';

class App extends Component {
    constructor() {
        super();

        //bindings
        this.handleSearchResults = this.handleSearchResults.bind(this);
        this.handleSelectedPerson = this.handleSelectedPerson.bind(this);
        this.handleToggleUserMenu = this.handleToggleUserMenu.bind(this);
        this.handleRemovePerson = this.handleRemovePerson.bind(this);

        this.state = {
            userMenuVisible: false,
            searchResults: [],
            selectedPersons: []
        };
    }
    //handlers

    //remove selected person from the list
    handleRemovePerson(e) {
        const personToRemove = this.state.selectedPersons.filter(
            person => person.id !== e
        );
        this.setState({ selectedPersons: [...personToRemove] });
    }

    //show or hide user menu
    handleToggleUserMenu() {
        this.setState({ userMenuVisible: !this.state.userMenuVisible });
    }

    //store search results in the state
    handleSearchResults(e) {
        this.setState({ searchResults: e });
    }

    //store the selected person
    handleSelectedPerson(e) {
        const isSelected = this.state.selectedPersons.find(person => {
            return person.id === e.id;
        });
        if (isSelected === undefined) {
            this.setState({
                selectedPersons: [...this.state.selectedPersons, e]
            });
        } else {
            const filtered = this.state.selectedPersons.filter(person => {
                return person.id !== e.id;
            });

            this.setState({
                selectedPersons: [...filtered]
            });
        }
    }

    render() {
        return (
            <div
                className="App"
                onClick={e => {
                    this.state.userMenuVisible &&
                        e.target.className !== 'user-menu-link' &&
                        this.setState({ userMenuVisible: false });
                }}>
                <Router>
                    <Header handletoggleusermenu={this.handleToggleUserMenu} />
                    <Usermenu usermenuvisible={this.state.userMenuVisible} />
                    <main>
                        <Sidenav
                            nrofpeople={this.state.selectedPersons.length}
                        />
                        <Route
                            exact
                            path="/meetings"
                            render={props => (
                                <Meetingslist
                                    selectedpersons={this.state.selectedPersons}
                                    handleremoveperson={this.handleRemovePerson}
                                    {...props}
                                />
                            )}
                        />
                        <Route path="/calendar" component={Meetingscalendar} />

                        <Route
                            path="/"
                            exact
                            render={props => (
                                <Home
                                    searchresults={this.handleSearchResults}
                                    nrofpeople={
                                        this.state.selectedPersons.length
                                    }
                                    searchresultsarr={this.state.searchResults}
                                    handleselectedperson={
                                        this.handleSelectedPerson
                                    }
                                    selectedpersons={this.state.selectedPersons}
                                    {...props}
                                />
                            )}
                        />
                    </main>
                </Router>
            </div>
        );
    }
}

export default App;
