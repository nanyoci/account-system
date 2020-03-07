import { FETCH_USERS, NEW_USER, FETCH_USER , UPDATE_USER, DELETE_USER} from '../actions/types';

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        items: action.payload
      };
    case NEW_USER:
      state.items.push(action.payload)
      return {
        ...state
      };
    case FETCH_USER:
      console.log("reducer");
      console.log(action.payload);
        return {
          ...state,
          item: action.payload
        };
    case UPDATE_USER:
        let index = state.items.findIndex(user => user.id === action.payload.id);
        state.items.splice(index, 1, action.payload);
        return {
          ...state,
          };
    case DELETE_USER:
      let newState = state.items.filter(function(user) {return user.id !== action.payload.id});
        return {
          ...state,
        items: newState
          };
    default:
      return state;
  }
}
