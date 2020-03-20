import { FETCH_USERS, CREATE_USER_FAIL, CREATE_USER_SUCCESS, FETCH_USER, DELETE_USER_SUCCESS, DELETE_USER_FAIL, UPDATE_USER, API} from './types';
import store from '../store'
import {getAccessToken} from '../utils/getAccessToken'

export const fetchUsers = () => dispatch => {
  console.log("fetch users")
  return(
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
     )
   )
  
};

export const createUser = newUser => dispatch => {
  // dispatch(getAccessToken())

  return(
  fetch(`${API}/users/create/`, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  })
    .then(res => res.json())
    .then(user => 
      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: user
      }))
    .catch(error => 
      dispatch({
        type: CREATE_USER_FAIL,
        payload: error
      }))
  )
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

export const deleteUser = UserData => dispatch => { 
  return(
  fetch(`${API}/users/${UserData.email}`, {
    method: 'DELETE',
    headers: {
      Authorization: `bearer ${store.getState().authReducer.access_token}`
    },
  })
  .then(res => res.json())
  .then(user =>
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: UserData
      }))
  .catch(error=> 
        dispatch({
        type: DELETE_USER_FAIL,
        payload: error
    }))
  )
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