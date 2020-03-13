import { AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL} from '../actions/types';

const initialState = {
  loginSucess: false,
  user:{},
  token: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
        if(action.payload.access_token){
            return {
                ...state,
                loginSuccess: true,
                user: action.payload,
                token: action.access_token
            }}
        else{
          console.log("no access_token")
        }
        break;
         
    case AUTH_LOGIN_FAIL:
            return {
              ...state,
                user:{},
                loginSuccess: false,
         };
    default:
      return state;
  }
}
