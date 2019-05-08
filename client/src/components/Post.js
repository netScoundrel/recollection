import { Card } from 'antd';


import React, { Component } from 'react'

export class Post extends Component {
  render() {

      const title = this.props.title;
      const text = this.props.text;

    return (
      <div>
        <Card
            title={title}
            extra={<a href="#">More</a>}
            style={{ width: 700 }}
            >
            <p>Picture Placeholder</p>
            <p>{text}</p>
        </Card>
      </div>
    )
  }
}
