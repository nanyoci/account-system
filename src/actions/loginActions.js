import { AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL, API } from './types';

export const authenticateLogin = userData => dispatch =>{
    var formdata = new FormData();
    formdata.append("username", userData.username);
    formdata.append("password", userData.password);
    formdata.append("grant_type", "password");
    console.log(userData.username , userData.password);
        fetch(`${API}/oauth/token`, {
            method: 'POST',
            headers: {
            'Authorization': 'Basic bXktY2xpZW50Om15LXNlY3JldA==' //+ btoa('my-client:my-secret')
            },
            body: formdata,
        }).then(res => res.json())
        .then(result => 
          dispatch({
            type: AUTH_LOGIN_SUCCESS,
            payload: result
          })
        ).catch(result => dispatch({
          type: AUTH_LOGIN_FAIL,
          payload: result
        }));
    };

