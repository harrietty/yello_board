import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Lists } from '../api/lists';

export default class List extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showInputField: false
    };
  }

  deleteList () {
    Lists.remove(this.props.list._id);
  }

  toggleShowInputField () {
    this.setState({
      showInputField: !this.state.showInputField
    }, function () {
      if (this.state.showInputField) {
        ReactDOM.findDOMNode(this.refs.newTitle).focus();
      }
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    const newTitle = ReactDOM.findDOMNode(this.refs.newTitle).value.trim();

    Lists.update(this.props.list._id, {
      $set: {title: newTitle }
    });
    ReactDOM.findDOMNode(this.refs.newTitle).value = '';
    this.toggleShowInputField();
  }

  render () {
    return (
      <div className='list'>
          {this.state.showInputField ? (
            <form className='change-list-title' onSubmit={this.handleSubmit.bind(this)}>
              <input type='text' ref='newTitle' placeholder={this.props.list.title} onBlur={this.toggleShowInputField.bind(this)} />
            </form>
          ) : (
            <div className='list-header'>
              <h2 className='list-title' onClick={this.toggleShowInputField.bind(this)}>{this.props.list.title.toUpperCase()}</h2>
              <i className='fa fa-trash' onClick={this.deleteList.bind(this)} />
            </div>
          )}
      </div>
    );
  }
}

List.propTypes = {
  list: PropTypes.object.isRequired
};
