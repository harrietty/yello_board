import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Card from './Card';
import NewCard from './Newcard';
import { Lists } from '../api/lists';
import { Cards } from '../api/cards';

class List extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showInputField: false
    };
  }

  filterCards () {
    let filteredCards = this.props.cards.filter(card => {
      return card.listId === this.props.list._id;
    });
    return filteredCards.map((card, i) => {
      return <Card key={i} index={i} card={card} />
    });
  }

  deleteList () {
    Meteor.call('lists.remove', this.props.list._id);
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
    if (newTitle.length > 0) {
      Meteor.call('lists.update', this.props.list._id);
    }
    ReactDOM.findDOMNode(this.refs.newTitle).value = '';
    this.toggleShowInputField();
  }

  render () {
    console.log(this.props)
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
          {this.filterCards()}
          <NewCard listId={this.props.list._id} />
      </div>
    );
  }
}

List.propTypes = {
  list: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired
};

export default createContainer(() => {
  return {
    cards: Cards.find({}).fetch()
  }
}, List);
