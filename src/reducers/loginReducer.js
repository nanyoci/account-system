import { AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL} from '../actions/types';

const initialState = {
  loginSucess: false,
  user:{}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
          console.log(action)
        { if(action.payload.token){
            return {
                loginSuccess: true,
                user: action.payload
            }}
            
         };
    case AUTH_LOGIN_FAIL:
        {
            return {
              ...state,
                user:{},
                loginSuccess: false,
            }
         };
    default:
      return state;
  }
}
