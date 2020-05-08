import React from 'react';
import './NewCommentForm.scss';

const initialState = {
  name: '',
  message: '',
};

function NewCommentForm({ onSubmit = () => {}, submitError }) {
  const [state, setState] = React.useState(initialState);
  const [showError, setShowError] = React.useState(Boolean(submitError));

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
    }
  };

  React.useEffect(() => {
    if (!submitError) return;
    // Show error message when one is received, and unmount after 5 seconds
    setShowError(true);
    let timeout = setTimeout(() => setShowError(false), 5000);
    return () => clearTimeout(timeout);
  }, [submitError]);

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
        maxLength="100"
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
        maxLength="255"
        value={state.message}
        onChange={handleChange}
        onKeyDown={handleCommentKeyDown}
      />
      <div className="NewCommentForm__actions">
        <button data-testid="button-comment-submit" className="NewCommentForm__comment-button">
          Comment
        </button>
        {showError && (
          <p role="alert" className="NewCommentForm__submit-error">
            {submitError?.message ?? 'Error occured while submitting comment'}
          </p>
        )}
      </div>
    </form>
  );
}

export default NewCommentForm;
