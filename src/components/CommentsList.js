import React from 'react';
import { CommentsListItem } from 'components';
import './CommentsList.scss';

const _comments = Array(10)
  .fill(null)
  .map(() => ({
    name: 'Mehdi Vasigh',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  }));

function CommentsList({ comments = _comments }) {
  return (
    <section className="CommentsList">
      {comments.map(({ name, message }, i) => (
        <CommentsListItem name={name} message={message} key={`comment-${i}`} />
      ))}
    </section>
  );
}

export default CommentsList;
