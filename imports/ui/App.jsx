import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Lists } from '../api/lists';
import List from './List';
import TopNav from './Topnav';
import NewList from './Newlist';

class App extends Component {
  renderLists () {
    return this.props.lists.map((list, i) => {
      return <List key={i} list={list} />
    });
  }

  render () {
    return (
      <div className='main-app'>
        <TopNav />
        <div id='board'>
          {this.renderLists()}
          <NewList />
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
    lists: Lists.find({}).fetch()
  }
}, App);
