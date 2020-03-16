import {refreshToken} from '../actions/refreshToken';
import {getCurrentTime} from './getCurrentTime';

export const  getAccessToken = () => dispatch => {
    console.log("getting token")
    
    let time_token_acquried = new Date( localStorage.getItem("time_token_acquired"))
    let currentTime = getCurrentTime()
    let timeDifference = currentTime.getTime() - time_token_acquried.getTime()
    let timeDifferenceInSeconds = timeDifference/1000
    if(timeDifferenceInSeconds >= localStorage.getItem("expires_in") ){
        dispatch(refreshToken())
        console.log("refreshed")
    }
    else{
        console.log("not refreshed")
    }
};




