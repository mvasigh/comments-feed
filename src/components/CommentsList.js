import React from 'react';
import { CommentsListItem } from 'components';
import './CommentsList.scss';

function CommentsList({ comments = [] }) {
  const isEmpty = !comments?.length;

  const sortedComments = React.useMemo(() => {
    if (!comments) return comments;
    return comments.slice().sort((a, b) => new Date(b.created) - new Date(a.created));
  }, [comments]);

  return (
    <section className="CommentsList">
      {isEmpty ? (
        <p className="CommentsList__empty">No comments yet. Be the first to leave a comment!</p>
      ) : (
        sortedComments.map(({ name, message, created }, i) => (
          <CommentsListItem key={`comment-${i}`} name={name} message={message} created={created} />
        ))
      )}
    </section>
  );
}

export default CommentsList;
