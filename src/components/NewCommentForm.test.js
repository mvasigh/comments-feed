import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { NewCommentForm } from 'components';

describe('NewCommentForm', () => {
  let component, onSubmit;

  beforeEach(() => {
    onSubmit = jest.fn();
    component = render(<NewCommentForm onSubmit={onSubmit} />);
  });

  afterEach(() => {
    onSubmit = null;
    cleanup();
  });

  it('allows user to enter name and message', () => {
    const fields = ['name', 'message'];
    for (let field of fields) {
      const value = Math.random().toString(32).substr(2, 8);
      const fieldEl = component.getByTestId('field-' + field);
      expect(fieldEl.value).toBe('');
      fireEvent.input(fieldEl, {
        target: {
          value,
        },
      });
      expect(fieldEl.value).toBe(value);
    }
  });

  it('does not submit when values are empty', () => {
    const buttonEl = component.getByTestId('button-comment-submit');
    fireEvent.click(buttonEl);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('invokes onSubmit handler when form is submitted', () => {
    const commentPayload = {
      name: 'Mehdi',
      message: 'Lorem ipsum dolor sit amet...',
    };
    const nameEl = component.getByTestId('field-name');
    const messageEl = component.getByTestId('field-message');
    fireEvent.input(nameEl, { target: { value: commentPayload.name } });
    fireEvent.input(messageEl, { target: { value: commentPayload.message } });

    fireEvent.submit(component.getByTestId('form-new-comment'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining(commentPayload));

    // Should reset the form after submit
    expect(nameEl.value).toBe(commentPayload.name);
    expect(messageEl.value).toBe('');
  });

  it('submits the form when cmd/ctrl + return is pressed on textarea', () => {
    const commentPayload = {
      name: 'Mehdi',
      message: 'Lorem ipsum dolor sit amet...',
    };
    const nameEl = component.getByTestId('field-name');
    const messageEl = component.getByTestId('field-message');
    fireEvent.input(nameEl, { target: { value: commentPayload.name } });
    fireEvent.input(messageEl, { target: { value: commentPayload.message } });

    fireEvent.keyDown(messageEl, { metaKey: true, keyCode: 13 });
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining(commentPayload));
  });
});
