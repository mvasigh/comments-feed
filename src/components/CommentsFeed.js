import React from 'react';
import { CommentsList, NewCommentForm, ErrorMessage } from 'components';
import { useCommentsFeed } from 'hooks';
import './CommentsFeed.scss';

function CommentsFeed() {
  const { status, data, error, actions } = useCommentsFeed();
  const [submitError, setSubmitError] = React.useState(null);

  const handleSubmit = (payload) => {
    actions.createComment(payload).catch((e) => setSubmitError(e));
  };

  return (
    <main className="CommentsFeed">
      <NewCommentForm onSubmit={handleSubmit} submitError={submitError} />
      {status === 'success' && <CommentsList comments={data} />}
      {status === 'error' && <ErrorMessage error={error} />}
    </main>
  );
}

export default CommentsFeed;
