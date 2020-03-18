import { FETCH_USERS, NEW_USER, FETCH_USER, DELETE_USER, UPDATE_USER, API} from './types';
import store from '../store'

export const fetchUsers = () => dispatch => {
  fetch(`${API}/users/`,{
    method: 'GET',
    headers:{
      Authorization: `bearer ${store.getState().authReducer.access_token}`
    }
  })
    .then(res => res.json())
    .then(users =>
      dispatch({
        type: FETCH_USERS,
        payload: users.content
      })
    );
};

export const fetchUser = (id) => dispatch => { 
  fetch(`https://reqres.in/api/users/${id}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'Accept': 'application/json'
    },
  })
    .then(res => res.json())
    .then(user =>
      dispatch({
        type: FETCH_USER,
        payload: user.data
      })
    );
};

export const createUser = newUser => dispatch => {

  fetch(`${API}/users/create/`, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${store.getState().authReducer.access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  })
    .then(res => res.json())
    .then(user => 
      dispatch({
        type: NEW_USER,
        payload: user
      })
    );
};

export const updateUser = newUserData => dispatch => { console.log(newUserData);
  fetch(`https://reqres.in/api/users/${newUserData.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(newUserData)
  })
    .then(res => res.json())
    .then(user =>
      dispatch({
        type: UPDATE_USER,
        payload: user
      })
    );
};

export const deleteUser = UserData => dispatch => { console.log(UserData);
  fetch(`https://reqres.in/api/users/${UserData.id}`, {
    method: 'GET', /*DELTE*/
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(res => res.json())
    .then(user =>
      dispatch({
        type: DELETE_USER,
        payload: user.data
      })
    ).catch((message)=> console.log(message));
};