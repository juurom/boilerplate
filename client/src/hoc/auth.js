import React, {useEffect} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponenet, option, adminRoute = null){

    //option
    //null : 아무나
    //true : 로그인만
    //false : 로그인x만

    //adminroute : admin유저만. 지금은 null

    function AuthenticationCheck(props){
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth().then(response=>{
                console.log(response);
            }))

            axios.get('/api/users/auth')
            
            
        }, [])

        return (
            <SpecificComponenet />
        )
        
    }

    return AuthenticationCheck
}