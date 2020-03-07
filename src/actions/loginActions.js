import { AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL } from './types';

export const authenticateLogin = userData => dispatch =>{

    let BaseUrl  = 'https://reqres.in/api/login';
    console.log(userData)
    console.log(userData.username , userData.password);
        fetch(BaseUrl, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userData.username,
                password: userData.password,
            }),
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