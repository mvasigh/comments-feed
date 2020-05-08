import React from 'react';
import { CommentsList, NewCommentForm } from 'components';
import './CommentsFeed.scss';

function CommentsFeed() {
  return (
    <main className="CommentsFeed">
      <NewCommentForm />
      <CommentsList />
    </main>
  );
}

export default CommentsFeed;
