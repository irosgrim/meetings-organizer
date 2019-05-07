import React, { Component } from 'react';
import uncheckedIcon from './icons/unchecked_icon.svg';
import checkedIcon from './icons/checked_icon.svg';

class Person extends Component {
    constructor() {
        super();
        this.handleSelected = this.handleSelected.bind(this);
        this.state = {
            checked: false
        };
    }
    componentDidMount() {
        if (this.props.selectedpersons !== undefined) {
            const isSelected = this.props.selectedpersons.find(person => {
                return person.id === this.props.id;
            });
            if (isSelected !== undefined) {
                this.setState({ checked: true });
            }
        }
    }
    handleSelected() {
        this.setState({ checked: !this.state.checked });
        const selectedPerson = { id: this.props.id, name: this.props.name };
        this.props.handleselectedperson(selectedPerson);
    }
    render() {
        return (
            <div
                className={
                    this.state.checked
                        ? 'found-person selected'
                        : 'found-person'
                }
                onClick={this.handleSelected}>
                <h3>{this.props.name}</h3>
                <div className="check-icon" onClick={this.handleSelected}>
                    <img
                        src={this.state.checked ? checkedIcon : uncheckedIcon}
                        alt=""
                    />
                </div>
            </div>
        );
    }
}

export default Person;
