import React from 'react';
import { CommentsList, NewCommentForm } from 'components';

function CommentsFeed(props) {
  return (
    <main>
      <NewCommentForm />
      <CommentsList />
    </main>
  );
}

export default CommentsFeed;
