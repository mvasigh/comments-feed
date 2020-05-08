import React from 'react';
import './NewCommentForm.scss';

const initialState = {
  name: '',
  message: '',
};

function NewCommentForm({ onSubmit = () => {} }) {
  const [state, setState] = React.useState(initialState);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.name || !state.message) return;
    onSubmit(state);
    setState({ ...state, message: '' });
  };

  const handleCommentKeyDown = (e) => {
    // submit the form if cmd/ctrl + return used on textarea
    if (e.keyCode === 13 && e.metaKey) {
      handleSubmit(e);
      e.target.blur();
    }
  };

  return (
    <form data-testid="form-new-comment" onSubmit={handleSubmit} className="NewCommentForm">
      <label className="NewCommentForm__label" htmlFor="name">
        Your Name
      </label>
      <input
        data-testid="field-name"
        className="NewCommentForm__name-field"
        type="text"
        id="name"
        name="name"
        autoComplete="off"
        required
        value={state.name}
        onChange={handleChange}
      />
      <textarea
        data-testid="field-message"
        className="NewCommentForm__comment-field"
        aria-label="leave a comment"
        rows={4}
        placeholder="What's on your mind?"
        name="message"
        required
        value={state.message}
        onChange={handleChange}
        onKeyDown={handleCommentKeyDown}
      />
      <button data-testid="button-comment-submit" className="NewCommentForm__comment-button">
        Comment
      </button>
    </form>
  );
}

export default NewCommentForm;
