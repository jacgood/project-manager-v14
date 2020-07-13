import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {
  addObjective,
  addTask,
  updateObjective,
  updateTask,
  deleteObjective,
  deleteTask,
  deleteProject
} from '../../actions/project';

const ProjectItem = ({
  addObjective,
  addTask,
  deleteObjective,
  deleteTask,
  deleteProject,
  auth,
  project: {
    _id,
    title,
    description,
    client,
    assignedUser,
    createBy,
    objectives,
    dateDue
  },
  showActions
}) => (
  <div className="post bg-white p-1 my-1">
    {/* <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div> */}
    <div>
      <p className="my-1">{title}</p>
      <p className="post-date">
        Due on <Moment format="YYYY/MM/DD">{dateDue}</Moment>
      </p>

      {showActions && (
        <Fragment>
          {/* <button
            onClick={() => addLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-up" />{' '}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={() => removeLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-down" />
          </button>
          <Link to={`/posts/${_id}`} className="btn btn-primary">
            Discussion{' '}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
           */}
          <button
            onClick={() => deleteProject(_id)}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times" />
          </button>
        </Fragment>
      )}
    </div>
  </div>
);

ProjectItem.defaultProps = {
  showActions: true
};

ProjectItem.propTypes = {
  project: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  // add: PropTypes.func.isRequired,
  // removeLike: PropTypes.func.isRequired,
  // deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  addObjective,
  addTask,
  updateObjective,
  updateTask,
  deleteObjective,
  deleteTask,
  deleteProject
})(ProjectItem);
