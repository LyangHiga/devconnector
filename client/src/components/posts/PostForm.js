import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import useFormState from '../../hooks/useFormState';
import { addPost } from '../../actions/post';

const PostForm = (props) => {
  const { addPost } = props;
  const { formData, handleChange, resetForm } = useFormState({ text: '' });
  const { text } = formData;
  const onSubmit = (e) => {
    e.preventDefault();
    addPost(formData);
    resetForm();
  };
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form className='form my-1' onSubmit={(e) => onSubmit(e)}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          value={text}
          onChange={handleChange}
          placeholder='Create a post'
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
