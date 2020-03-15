import { AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL, AUTH_LOGOUT} from '../actions/types';

const initialState = {
  loginSucess: false,
  currentUser:{},
  access_token: '',
  refresh_token:'',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
        if(action.payload.access_token){
          localStorage.setItem("access_token", action.payload.access_token );
          localStorage.setItem("refresh_token", action.payload.refresh_token );
            return {
                ...state,
                loginSuccess: true,
                currentUser: action.payload,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token
                //store refresh and access token in localStorage
            }}
        else{
          alert("no access_token")
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
          return {
              ...state,
              loginSuccess: false,
              currentUser: {},
              access_token:'',
              refresh_token:''
          }

      default:
      return state;
    
  }

}
