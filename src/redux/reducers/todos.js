import {
  ADD_TODO,
  TOGGLE_TODO,
  UPDATE_MONETIZATION_PREFERENCES
} from "../actionTypes";

const initialState = {
  allIds: [],
  byIds: {},
  preferences: { lol: 'memes' }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, content } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            content,
            completed: false
          }
        }
      };
    }
    case UPDATE_MONETIZATION_PREFERENCES: {
      const { preferences } = action.payload;
      console.log(preferences);
      return {
        ...state,
        preferences
      };
    }
    case TOGGLE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            completed: !state.byIds[id].completed
          }
        }
      };
    }
    default:
      return state;
  }
}
