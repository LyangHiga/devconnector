import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = (props) => {
  const {
    auth,
    post: { _id, text, name, avatar, user, likes, comments, date },
    addLike,
    removeLike,
    deletePost,
  } = props;
  return (
    <div class='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img class='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class='my-1'>{text}</p>
        <p class='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <button
          type='button'
          onClick={() => addLike(_id)}
          class='btn btn-light'
        >
          <i class='fas fa-thumbs-up' />{' '}
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        <button
          type='button'
          onClick={() => removeLike(_id)}
          class='btn btn-light'
        >
          <i class='fas fa-thumbs-down' />
        </button>
        <Link to={`/post/${_id}`} class='btn btn-primary'>
          Discussion{' '}
          {comments.length > 0 && (
            <span class='comment-count'>{comments.length}</span>
          )}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button
            type='button'
            onClick={() => deletePost(_id)}
            class='btn btn-danger'
          >
            <i class='fas fa-times' />
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
