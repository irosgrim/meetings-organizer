import React, { Component } from 'react';
import SearchSection from '../../components/Searchsection';
import SearchResults from '../../components/Searchresults';

export class Home extends Component {
    render() {
        return (
            <section className="main-content">
                <SearchSection
                    searchresults={this.props.searchresults}
                    nrofpeople={this.props.nrofpeople}
                />
                <SearchResults
                    searchresults={this.props.searchresultsarr}
                    handleselectedperson={this.props.handleselectedperson}
                    selectedpersons={this.props.selectedpersons}
                />
            </section>
        );
    }
}

export default Home;
