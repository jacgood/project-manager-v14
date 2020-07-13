const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const checkObjectId = require('../../middleware/checkObjectId');

const Project = require('../../models/Project');

// @route    POST api/projects
// @desc     Create or update project
// @access   Private
router.post(
  '/',
  [auth, [check('title', 'Status is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, client, assignedUser, dateDue } = req.body;

    const projectFields = {
      title,
      description,
      client,
      assignedUser,
      // createdBy: req.user.id,
      dateDue
    };

    try {
      // Using upsert option (creates new doc if no match is found):
      let project = await Project.findOneAndUpdate(
        { title: title },
        { $set: projectFields },
        { new: true, upsert: true }
      );

      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/projects
// @desc     Get all projects
// @access   Public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('user');
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/projects/user/:user_id
// @desc     Get projects by user ID
// @access   Public
router.get(
  '/user/:user_id',
  checkObjectId('user_id'),
  async ({ params: { user_id } }, res) => {
    try {
      const projects = await Project.find({
        assignedUser: user_id
      }).populate('user');

      if (projects === undefined || projects.length == 0)
        return res.status(400).json({ msg: 'No projects assigned to user' });

      return res.json(projects);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route    DELETE api/project
// @desc     Delete project
// @access   Private
router.delete('/:project_id', auth, async (req, res) => {
  try {
    const { project_id } = req.params;
    // Remove user posts
    // await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Project.findOneAndRemove({ _id: project_id });
    // Remove user
    // await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'Project deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/projects/:project_id/objectives/
// @desc     Add objective to project
// @access   Private
router.put(
  '/:project_id/objectives',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty()
      // check('company', 'Company is required').not().isEmpty(),
      // check('from', 'From date is required and needs to be from the past')
      //   .not()
      //   .isEmpty()
      //   .custom((value, { req }) => (req.body.to ? value < req.body.to : true))
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { project_id } = req.params;

    const { title, description, assignedUser, dateDue } = req.body;

    const newObjective = {
      title,
      description,
      assignedUser,
      dateDue
    };

    try {
      const project = await Project.findOne({ _id: project_id });

      project.objectives.unshift(newObjective);

      await project.save();

      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/projects/:project_id/objectives/:objective_id/
// @desc     Delete objective from project
// @access   Private

router.delete(
  '/:project_id/objectives/:objective_id',
  auth,
  async (req, res) => {
    const { project_id, objective_id } = req.params;
    try {
      const foundProject = await Project.findOne({ _id: project_id });

      foundProject.objectives = foundProject.objectives.filter(
        (obj) => obj._id.toString() !== objective_id
      );

      await foundProject.save();
      return res.status(200).json(foundProject);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route    PUT api/projects/:project_id/objectives/:objective_id/tasks/
// @desc     Add task to objective to project
// @access   Private
router.put(
  '/:project_id/objectives/:objective_id/tasks/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty()
      // check('degree', 'Degree is required').not().isEmpty(),
      // check('fieldofstudy', 'Field of study is required').not().isEmpty(),
      // check('from', 'From date is required and needs to be from the past')
      //   .not()
      //   .isEmpty()
      //   .custom((value, { req }) => (req.body.to ? value < req.body.to : true))
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { project_id, objective_id } = req.params;

    const { title, description, assignedUser, dateDue } = req.body;

    const newTask = {
      title,
      description,
      assignedUser,
      dateDue
    };

    try {
      const project = await Project.findOne({ _id: project_id });

      project.objectives.id(objective_id).tasks.unshift(newTask);

      await project.save();

      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/projects/:project_id/objectives/:objective_id/tasks/:task_id
// @desc     Delete task from objective from project
// @access   Private

router.delete(
  '/:project_id/objectives/:objective_id/tasks/:task_id',
  auth,
  async (req, res) => {
    const { project_id, objective_id, task_id } = req.params;
    try {
      const foundProject = await Project.findOne({ _id: project_id });
      foundProject.objectives = foundProject.objectives
        .id(objective_id)
        .tasks.filter((task) => !task._id.toString() !== task_id);

      await foundProject.save();
      return res.status(200).json(foundProject);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

module.exports = router;
