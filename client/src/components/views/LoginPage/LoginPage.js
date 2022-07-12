import axios from 'axios';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action'

function LoginPage(props) {
  const dispatch = useDispatch();
  //prop은 함수내부에서 변경불가
  //state를 이용해서 변경

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEmailHandler=(event)=>{
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler=(event)=>{
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler=(event)=>{
    event.preventDefault();
    let body={
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
    .then(response => {
        if (response.payload.loginSuccess) {
            props.history.push('/')
            //페이지 이동시킬때. props에 시작페이지가 들어감...?
            //root page로 이동!
        } else {
            alert('Error˝')
        }
    })
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <form style={{
        display: 'flex', flexDirection: 'column'
      }} onSubmit={onSubmitHandler}> 
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}/>
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>
        <br/>
        <button type="submit" >Login</button>
      </form>
    </div>
  )
}

export default LoginPage