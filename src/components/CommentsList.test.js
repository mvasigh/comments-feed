import React from 'react';
import { render } from '@testing-library/react';
import { CommentsList } from 'components';

describe('CommentsList', () => {
  it('renders each comment properly', () => {
    const comments = Array(10)
      .fill(null)
      .map(() => ({
        name: Math.random().toString(32),
        message: Math.random().toString(32),
      }));
    const { getByText } = render(<CommentsList comments={comments} />);
    for (let comment of comments) {
      expect(getByText(comment.name)).toBeInTheDocument();
      expect(getByText(comment.message)).toBeInTheDocument();
    }
  });
});
