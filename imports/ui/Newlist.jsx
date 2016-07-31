import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Lists } from '../api/lists';

export default class NewList extends Component {
  handleSubmit (e) {
    e.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.listNameInput).value.trim();

    Lists.insert({
      title: text,
      createdAt: new Date()
    });

    ReactDOM.findDOMNode(this.refs.listNameInput).value = '';
  }

  render () {
    return (
      <div className='list'>
        <form className='new-list' onSubmit={this.handleSubmit.bind(this)}>
          <input type='text' ref='listNameInput' placeholder='Add a list' />
        </form>
      </div>
    );
  }
}
