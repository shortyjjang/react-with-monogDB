import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_actions/user_action'

function Register(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [values, setValue] = useState({
        email: '',
        password: '',
        name: '',
        lastname: '',
        chkpassword: ''
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
        let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            lastname: values.lastname
        };
        if(values.password !== values.chkpassword) return console.log('비밀번호가 일치하지 않습니다.')
        dispatch(registerUser(dataToSubmit))
        .then(response => {

            if (response.payload.success) {
                console.log(response.payload)
                navigate('/login')
            }
        })
        .catch(err => console.log(err));

    }
    return (
        <form onSubmit={handleSubmit}>
            <label>이메일</label>
            <input type="email" value={values.email} name="email" onChange={onChange} />
            <label>이름</label>
            <input type="text" value={values.name} name="name" onChange={onChange} />
            <label>last name</label>
            <input type="text" value={values.lastname} name="lastname" onChange={onChange} />
            <label>비밀번호</label>
            <input type="password" value={values.password} name="password" onChange={onChange} autoComplete="off" />
            <label>비밀번호 확인</label>
            <input type="password" value={values.chkpassword} name="chkpassword" onChange={onChange} autoComplete="off" />
            <button type="submit">회원가입</button>
        </form>
    );
}

export default Register;