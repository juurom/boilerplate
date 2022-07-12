import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types'



export default function(state={}, action){
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload} //...: 복사
            
            break;
    
        case REGISTER_USER:
            return {...state, registerSuccess: action.payload} //...: 복사
            
            break;
                
        default:
            return state;
            break;
    }
}