import React, { Component } from 'react';
import Person from './Person';

class Searchresults extends Component {
    render() {
        const searchResults = this.props.searchresults;

        return (
            <section className="search-results">
                {searchResults.map(person => {
                    return (
                        <Person
                            name={person.name}
                            key={person.id}
                            id={person.id}
                            handleselectedperson={
                                this.props.handleselectedperson
                            }
                            selectedpersons={this.props.selectedpersons}
                        />
                    );
                })}
            </section>
        );
    }
}

export default Searchresults;
