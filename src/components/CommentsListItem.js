import React from 'react';
import './CommentsListItem.scss';

function CommentsListItem({ name, message }) {
  return (
    <article className="CommentsListItem">
      <div className="CommentsListItem__header">
        <span className="CommentsListItem__header-name">{name}</span>
        <span className="CommentsListItem__header-date">10 minutes ago</span>
      </div>
      <p className="CommentsListItem__message">{message}</p>
    </article>
  );
}

export default CommentsListItem;
