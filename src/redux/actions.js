import { 
  ADD_TODO,
  TOGGLE_TODO,
  SET_FILTER,
  UPDATE_MONETIZATION_PREFERENCES
} from "./actionTypes";

let nextTodoId = 0;

export const addTodo = content => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content
  }
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const updatePreferences = preferences => ({
  type: UPDATE_MONETIZATION_PREFERENCES,
  payload: { 
    preferences: preferences
  }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
