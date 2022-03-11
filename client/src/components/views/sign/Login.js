import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_action'

function Login(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
    const [formErrorMessage, setFormErrorMessage] = useState('')
    const [rememberMe, setRememberMe] = useState(rememberMeChecked)
    const [values, setValue] = useState({
        email: '',
        password: ''
    })
    const onChange = (e) => {
        const {name, value} = e.target;
        setValue({
            ...values,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let dataToSubmit = values;

        dispatch(loginUser(dataToSubmit))
        .then(response => {

            if (response.payload.loginSuccess) {
              window.localStorage.setItem('userId', response.payload.userId);
              if (rememberMe === true) {
                window.localStorage.setItem('rememberMe', values.id);
              } else {
                localStorage.removeItem('rememberMe');
              }
               navigate('/')
            } else {
              setFormErrorMessage('Check out your Account or Password again')
            }
        })
        .catch(err => {
            setFormErrorMessage('Check out your Account or Password again')
            setTimeout(() => setFormErrorMessage(""), 3000);
            console.log(err)
        });

    }
    return (
        <form onSubmit={handleSubmit}>
            <label>이메일</label>
            <input type="email" value={values.email} name="email" onChange={onChange} />
            <label>비밀번호</label>
            <input type="password" value={values.password} name="password" onChange={onChange} autoComplete="off" />
            {formErrorMessage && ({formErrorMessage})}
            <button type="submit">로그인</button>
            <input type="checkbox" onChange={()=> setRememberMe(!rememberMe)} checked={rememberMe} />아이디 저장            
        </form>
    );
}

export default Login;