import React from 'react';
import { render } from '@testing-library/react';
import { CommentsListItem } from 'components';

describe('CommentsListItem', () => {
  it('renders a comment properly', () => {
    const name = 'Mehdi Vasigh';
    const message = 'I love MailChimp!';
    const { getByText } = render(<CommentsListItem name={name} message={message} />);
    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(message)).toBeInTheDocument();
  });
});
