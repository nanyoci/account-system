import {  API, AUTH_LOGOUT } from './types';
import {getAccessToken} from '../utils/getAccessToken';

export const logout = () => dispatch =>{
    fetch(`${API}/oauth/revoke`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'bearer '+ localStorage.getItem('access_token')
        },
    })
    .then(() => 
      dispatch({
        type: AUTH_LOGOUT,
      })
    )
};