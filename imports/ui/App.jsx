import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Lists } from '../api/lists';
import List from './List';
import TopNav from './Topnav';
import NewList from './Newlist';
import Welcome from './Welcome';

class App extends Component {
  renderLists () {
    return this.props.lists.map((list, i) => {
      return <List key={i} list={list} />
    });
  }

  render () {
    let lists = this.renderLists();
    return (
      <div className='main-app'>
        <TopNav />
        <div id='board'>
        {this.props.currentUser ? lists : ''}
        {this.props.currentUser ? <NewList /> : ''}
        {this.props.currentUser ? '' : <Welcome />}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  lists: PropTypes.array.isRequired
};

export default createContainer(() => {
  return {
    lists: Lists.find({}).fetch(),
    currentUser: Meteor.user()
  }
}, App);
