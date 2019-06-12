import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

export default class GameContent extends Component{
    render(){
        return(
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Snake Game</Card.Title>
                    <Card.Text>
                        Collect the apples and avoid hitting your tail for as long as possible.
                    </Card.Text>
                    <Button variant="primary">Play</Button>
                </Card.Body>
             </Card>
        );
    }
}