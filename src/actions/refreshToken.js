import { REFRESH_TOKEN, API } from './types';

export const refreshToken = ()  => dispatch =>  {
    
    console.log('fetching new token')
    var formdata = new FormData();
    formdata.append("refresh_token", localStorage.getItem("refresh_token"));
    formdata.append("grant_type", "refresh_token");

       return fetch(`${API}/oauth/token`, {
            method: 'POST',
            headers: {
            'Authorization': 'Basic bXktY2xpZW50Om15LXNlY3JldA==' //+ btoa('my-client:my-secret')
            },
            body: formdata,
        }).then(res =>
          { 
            if(!res.ok){
              throw res
            }
            return res.json()
        })
        .then(result => {console.log(result)
            dispatch({
            type: REFRESH_TOKEN,
            payload: result
          })
        })
};

