import React from 'react';
import { render } from '@testing-library/react';
import { ErrorMessage } from 'components';

describe('ErrorMessage', () => {
  it('renders properly', () => {
    const errorMessage = 'Something went terribly wrong';
    const { getByText } = render(<ErrorMessage error={errorMessage} />);
    expect(getByText(errorMessage)).toBeInTheDocument();
  });
});
