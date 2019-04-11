import React, { Component } from 'react';
import Card from './Post';

export class Feed extends Component {
  static displayName = Feed.name;

  render () {
    return (
      <section >
        <div className="feed">
          {/* <Card /> */}
        </div>
      </section>
    );
  }
}
