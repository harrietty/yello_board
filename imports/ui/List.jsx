import React, { Component, PropTypes } from 'react';

export default class List extends Component {
  render () {
    return (
      <div className='list'>
        <h2 className='list-title'>{this.props.list.title.toUpperCase()}</h2>
      </div>
    );
  }
}

List.propTypes = {
  list: PropTypes.object.isRequired
};
