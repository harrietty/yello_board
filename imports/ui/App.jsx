import React, { Component } from 'react';
import List from './List';
import TopNav from './Topnav';

export default class App extends Component {
  getLists () {
    return [
      { _id: 1, title: 'Urgent todos' },
      { _id: 2, title: 'Ideas for stuff' },
      { _id: 3, title: 'Completed' }
    ];
  }

  renderLists () {
    return this.getLists().map((list, i) => {
      return <List key={i} list={list} />
    });
  }

  render () {
    return (
      <div className='main-app'>
        <TopNav />
        <div id='board'>
          {this.renderLists()}
        </div>
      </div>
    );
  }
}
