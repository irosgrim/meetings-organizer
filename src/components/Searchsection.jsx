import React, { Component } from 'react';
import axios from 'axios';
import searchIcon from './icons/search_icon.svg';
import cancelIcon from './icons/cancel-icon.svg';
import LoadingAnimation from './LoadingAnimation';
import '../style/Animations.css';

class Searchsection extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            searchValue: '',
            serverError: false,
            showLoading: false
        };
    }

    //query the end-point
    handleChange(e) {
        e.preventDefault();
        const value = e.target.value;
        this.setState({ searchValue: value });
        if (value.length >= 2) {
            this.setState({ showLoading: !this.state.showLoading });
            axios
                .get(
                    `https://stark-castle-84894.herokuapp.com/employees?q=${value}`
                )
                .then(response => {
                    this.setState({ showLoading: !this.state.showLoading });
                    this.props.searchresults(response.data.matches);
                })
                .catch(error => {
                    this.setState({ serverError: true, showLoading: false });
                });
        } else {
            this.props.searchresults([]);
        }
    }
    render() {
        return (
            <section className="search-section">
                {/* show loader animations */}
                {this.state.showLoading && <LoadingAnimation />}
                {/* show error modal  */}
                {this.state.serverError && (
                    <div className="modal">
                        <div className="modal-message scale-up-top">
                            <h3>Something went wrong, please try again</h3>
                            <button
                                onClick={() => {
                                    this.setState({ serverError: false });
                                }}>
                                Ok
                            </button>
                        </div>
                    </div>
                )}
                <form
                    onSubmit={e => {
                        return e.preventDefault();
                    }}>
                    <input
                        type="text"
                        placeholder="SEARCH EMPLOYEE"
                        onChange={this.handleChange}
                        id="searchInput"
                    />
                    <figure
                        onClick={() => {
                            this.props.searchresults([]);
                        }}>
                        <img
                            src={
                                this.state.searchValue.length < 1
                                    ? searchIcon
                                    : cancelIcon
                            }
                            alt=""
                        />
                    </figure>
                </form>
            </section>
        );
    }
}

export default Searchsection;
