import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper';

export default class TopNav extends Component {
  render () {
    return (
      <nav>
        <span className='pad' />
        <span>Yello</span>
        <span className='pad'>
          <AccountsUIWrapper />
        </span>
      </nav>
    );
  }
}
