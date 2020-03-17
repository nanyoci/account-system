import { AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL, AUTH_LOGOUT, REFRESH_TOKEN} from '../actions/types';
import {getCurrentTime} from '../utils/getCurrentTime';

const initialState = {
  loginSucess: false,
  currentUser:{},
  access_token: localStorage.getItem("access_token"),
  refresh_token: localStorage.getItem("refresh_token"),
  expires_in: localStorage.getItem("expires_in"),
  time_token_acquired: getCurrentTime()
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
        if(action.payload.access_token){
          // localStorage.setItem("access_token", action.payload.access_token );
          // localStorage.setItem("refresh_token", action.payload.refresh_token );
          // localStorage.setItem("expires_in", 300 );
            return {
                ...state,
                loginSuccess: true,
                currentUser: action.payload,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
                expires_in: 0//action.payload.expires_in
                //store refresh and access token in localStorage
            }}
        else{
          alert("successful authentication but no access_token!")
        }
        break;
         
    case AUTH_LOGIN_FAIL:
            return {
              ...state,
              currentUser:{},
              loginSuccess: false,
         };
    
    case AUTH_LOGOUT:
          //remove refresh and access token in localStorage
          localStorage.removeItem("access_token" );
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("expires_in");
          return {
              ...state,
              loginSuccess: false,
              currentUser: {},
              access_token:'',
              refresh_token:'',
              expires_in:0
          }
    case REFRESH_TOKEN:
      console.log("updating state")
      return {
        ...state,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        expires_in: action.payload.expires_in
    }
    default:
        return state;
    
  }

}
