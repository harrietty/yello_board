import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Cards } from '../api/cards';

export default class Card extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showInputField: false,
      text: this.props.card.text
    }
  }

  deleteCard () {
    Meteor.call('cards.remove', this.props.card._id);
  }

  toggleShowInputField () {
    this.setState({
      showInputField: !this.state.showInputField
    }, function () {
      if (this.state.showInputField) {
        ReactDOM.findDOMNode(this.refs.changeCard).focus();
      }
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    const newText = e.target.firstChild.value.trim();
    if (newText.length > 0) {
      Meteor.call('cards.update', this.props.card._id, newText);
    }
    this.toggleShowInputField();
  }

  handleChange (e) {
    const newText = e.target.value;
    this.setState({
      text: newText
    });
  }

  render () {
    return (
      <div key={this.props.index} className='card'>
        <div className='card-contents'>
          {this.state.showInputField ? (
            <form className='change-card-title' onSubmit={this.handleSubmit.bind(this)}>
              <input type='text' ref='changeCard' value={this.state.text} onBlur={this.toggleShowInputField.bind(this)} onChange={this.handleChange.bind(this)} />
            </form>
          ) : (
            <p onClick={this.toggleShowInputField.bind(this)}>
              {this.props.card.text}
            </p>) }
          <i className='fa fa-times' onClick={this.deleteCard.bind(this)} />
        </div>
      </div>
    );
  }
}
