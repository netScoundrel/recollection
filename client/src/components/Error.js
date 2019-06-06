import React from 'react';
import './Error.css';


export function Error() {
  return (
    <div className="Error">
      <h1 className="erh1">404</h1>
      <p className="erp">Oops! Something is wrong.</p>
      <a className="button-er" href="#"><i className="icon-home"></i> Go back in initial page, is better.</a>
    </div>
  )
}
