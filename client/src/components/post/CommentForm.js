import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import useFormState from '../../hooks/useFormState';

const CommentForm = (props) => {
  const { addComment, postId } = props;
  const { formData, handleChange, resetForm } = useFormState({ text: '' });
  const { text } = formData;
  const onSubmit = (e) => {
    e.preventDefault();
    addComment(postId, formData);
    resetForm();
  };
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave a Comment</h3>
      </div>
      <form className='form my-1' onSubmit={(e) => onSubmit(e)}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Leave a Comment'
          value={text}
          onChange={handleChange}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

export default connect(null, { addComment })(CommentForm);
