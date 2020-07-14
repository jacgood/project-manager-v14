import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProject } from '../../actions/project';

const ProjectForm = ({ addProject }) => {
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [client, setClient] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [dateDue, setDateDue] = useState('');

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Create a Project ...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addProject({ title, description, client, assignedUser, dateDue });
          setTitle('');
          setDesc('');
          setClient('');
          setAssignedUser('');
          setDateDue('');
        }}
      >
        <input
          type="text"
          name="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          name="text"
          placeholder="Give a project description"
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <input
          type="text"
          name="text"
          placeholder="Client of the Project"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          required
        />
        <input
          type="text"
          name="text"
          placeholder="Employee assigned to the Project"
          value={assignedUser}
          onChange={(e) => setAssignedUser(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          name="dateDue"
          value={dateDue}
          onChange={(e) => setDateDue(e.target.value)}
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

ProjectForm.propTypes = {
  addProject: PropTypes.func.isRequired
};

export default connect(null, { addProject })(ProjectForm);
