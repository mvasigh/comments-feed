import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { parseDatetime } from 'utils/date';
import './CommentsListItem.scss';

function CommentsListItem({ name, message, created }) {
  const relativeDate = created
    ? formatDistanceToNow(parseDatetime(created), { addSuffix: true })
    : null;

  return (
    <article className="CommentsListItem">
      <div className="CommentsListItem__header">
        <span className="CommentsListItem__header-name">{name}</span>
        <span className="CommentsListItem__header-date">{relativeDate}</span>
      </div>
      <p className="CommentsListItem__message">{message}</p>
    </article>
  );
}

export default CommentsListItem;
