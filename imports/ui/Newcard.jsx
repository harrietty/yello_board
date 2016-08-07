import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Cards } from '../api/cards';

export default class NewCard extends Component {
  handleSubmit (e) {
    e.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.cardNameInput).value.trim();
    if (text.length > 0) {
      Meteor.call('cards.insert', text, this.props.listId);
    }

    ReactDOM.findDOMNode(this.refs.cardNameInput).value = '';
  }

  render () {
    return (
      <div>
        <form className='new-card' onSubmit={this.handleSubmit.bind(this)}>
          <input type='text' ref='cardNameInput' placeholder='Add a card' />
        </form>
      </div>
    );
  }
}
