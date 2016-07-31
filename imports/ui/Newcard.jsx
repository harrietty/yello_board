import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Cards } from '../api/cards';

export default class NewCard extends Component {
  handleSubmit (e) {
    e.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.cardNameInput).value.trim();
    Cards.insert({
      text,
      createdAt: new Date(),
      listId: this.props.listId,
      completed: false
    });

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
