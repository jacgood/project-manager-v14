import {
  GET_PROJECTS,
  PROJECT_ERROR,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  ADD_PROJECT,
  GET_PROJECT,
  GET_OBJECTIVES,
  GET_OBJECTIVE,
  UPDATE_OBJECTIVE,
  DELETE_OBJECTIVE,
  ADD_OBJECTIVE,
  OBJECTIVE_ERROR,
  GET_TASKS,
  GET_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  ADD_TASK,
  TASK_ERROR
} from '../actions/types';

const initialState = {
  projects: [],
  project: null,
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: payload,
        loading: false
      };
    case GET_PROJECT:
      return {
        ...state,
        project: payload,
        loading: false
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [payload, ...state.projects],
        loading: false
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((project) => project._id !== payload),
        loading: false
      };
    case PROJECT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    // case UPDATE_PROJECT:
    //   return {
    //     ...state,
    //     projects: state.projects.map((project) =>
    //       project._id === payload.id ? { ...project, likes: payload.likes } : project
    //     ),
    //     loading: false
    //   };
    // case GET_OBJECTIVES:
    //   return {
    //     ...state,
    //     projects: payload,
    //     loading: false
    //   };
    // case GET_PROJECT:
    //   return {
    //     ...state,
    //     project: payload,
    //     loading: false
    //   };
    // case ADD_PROJECT:
    //   return {
    //     ...state,
    //     projects: [payload, ...state.projects],
    //     loading: false
    //   };
    // case DELETE_PROJECT:
    //   return {
    //     ...state,
    //     projects: state.projects.filter((project) => project._id !== payload),
    //     loading: false
    //   };
    // case PROJECT_ERROR:
    //   return {
    //     ...state,
    //     error: payload,
    //     loading: false
    //   };
    // // case UPDATE_PROJECT:
    // //   return {
    // //     ...state,
    // //     projects: state.projects.map((project) =>
    // //       project._id === payload.id ? { ...project, likes: payload.likes } : project
    // //     ),
    // //     loading: false
    // //   };case GET_PROJECTS:
    //   return {
    //     ...state,
    //     projects: payload,
    //     loading: false
    //   };
    // case GET_PROJECT:
    //   return {
    //     ...state,
    //     project: payload,
    //     loading: false
    //   };
    // case ADD_PROJECT:
    //   return {
    //     ...state,
    //     projects: [payload, ...state.projects],
    //     loading: false
    //   };
    // case DELETE_PROJECT:
    //   return {
    //     ...state,
    //     projects: state.projects.filter((project) => project._id !== payload),
    //     loading: false
    //   };
    // case PROJECT_ERROR:
    //   return {
    //     ...state,
    //     error: payload,
    //     loading: false
    //   };
    // case UPDATE_PROJECT:
    //   return {
    //     ...state,
    //     projects: state.projects.map((project) =>
    //       project._id === payload.id ? { ...project, likes: payload.likes } : project
    //     ),
    //     loading: false
    //   };
    default:
      return state;
  }
}
