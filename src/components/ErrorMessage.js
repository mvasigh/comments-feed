import React from 'react';
import './ErrorMessage.scss';

function ErrorMessage({ error = '' }) {
  return (
    <p role="alert" className="ErrorMessage">
      {error}
    </p>
  );
}

export default ErrorMessage;
