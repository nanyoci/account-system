import { FETCH_USERS, CREATE_USER_FAIL, CREATE_USER_SUCCESS, FETCH_USER , UPDATE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAIL} from '../actions/types';

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      console.log(action.payload)
      return {
        ...state,
        items: action.payload
      };
    case CREATE_USER_SUCCESS:
      // state.items.push(action.payload)
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case CREATE_USER_FAIL:
      // state.items.push(action.payload)
      alert("FAIL TO CREATE USERS")
      console.log(action.payload)
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
    case DELETE_USER_SUCCESS:
      console.log("delete users success")
      let newState = state.items.filter(function(user) {return user.email !== action.payload.email});
        return {
          ...state,
        items: newState
          };
    case DELETE_USER_FAIL:
      // state.items.push(action.payload)
      alert("FAIL TO DELETE USERS")
      console.log(action.payload)
      return {
        ...state
      };
    default:
      return state;
  }
}
