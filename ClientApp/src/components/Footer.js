import React from 'react';
import {ProgressBar} from 'react-bootstrap';

export default function Footer() {
    const percent = 2;
  return (
    <footer className="footer">
        <h3>Website Status: {percent}%</h3>
        <ProgressBar id="progbar" animated now={percent}/>
    </footer>
  )
}
