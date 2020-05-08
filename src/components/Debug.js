import React from 'react';
import { api } from 'utils';
import './Debug.scss';

function Debug() {
  const handlePurge = () => {
    api.delete('/api/deleteComments').then(() => {
      console.log('successfully deleted comments!');
    });
  };

  const handleAddComment = () => {
    api.post('/api/createComment', {
      name: 'Foo Bar',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    });
  };

  return (
    <div role="presentation" className="Debug">
      <button onClick={handleAddComment}>Add comment</button>
      <button onClick={handlePurge}>Purge comments</button>
    </div>
  );
}

export default Debug;
