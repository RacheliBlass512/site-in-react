import React, { useState} from 'react'
import {validateForm} from './../../shared/validation'

export default function Login({ updateUserDetails, closeForm ,dataUsers}) {
    const [id, setid] = useState('');
    const [password, setpassword] = useState('')
    const [errors, seterrors] = useState({
        id: ' ',
        password: ' ',
        match: ' '
    })
    const [showError, setshowError] = useState(false)

    function idMatchPsrd(passwordT) {
        //find user in this ID
        let userDetails = getDetailsById(id)
        if (userDetails == undefined) return false
        if (userDetails.password !== passwordT) return false
        return true
    }

    function saveDetails() {
        let userDetails = getDetailsById(id)
        localStorage.setItem('currUserDetails', JSON.stringify(userDetails))
        updateUserDetails({...userDetails})
        setpassword('');
        setid('');
        closeForm()
    }

    function getDetailsById(id) {
        let userDetails = dataUsers.find(user => {
            return user.id == id
        })
        return userDetails
    }
    function handleChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        switch (name) {
            case 'id':
                let idError = value.length === 0
                    ? 'this filed requierd'
                    : ''
                seterrors(prevErrors => ({
                    ...prevErrors, id: idError
                }))
                setid(value);
                break;
            case 'password':
                let passwordError = value.length === 0
                    ? 'this filed requierd'
                    : ''
                seterrors(prevErrors => ({
                    ...prevErrors, password: passwordError
                }))
                setpassword(value);
                break;
            default:
                break;
        }
        let matchError = idMatchPsrd(value) ? '' : 'The ID does not match the password';
        seterrors(prevErrors => ({
            ...prevErrors, match: matchError
        }))
        setshowError(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (id.length === 0) {
            seterrors(prevErrors => ({ ...prevErrors, id: 'this filed requierd' }))
        }
        if (password.length === 0) {
            seterrors(prevErrors => ({ ...prevErrors, password: 'this filed requierd' }))
        }
        if (validateForm(errors)) {
            saveDetails();
        } else {
            setshowError(true)
        }
    }


    return (
        <div className='wrapper-r'>
            <div className='form-wrapper'>
                <h2>כניסה</h2>
                <form noValidate>
                    <div className='id'>
                        <label htmlFor="id">תעודת זהות</label>
                        <input type='text' name='id' value={id} onChange={handleChange} />
                        {errors.id.length > 0 &&
                            <span className='error'>{errors.id}</span>}
                    </div>
                    <div className='password'>
                        <label htmlFor="password">סיסמא</label>
                        <input type='password' name='password' value={password} onChange={handleChange} noValidate />
                        {(errors.password.length > 0) &&
                            <span className='error' value={password}>{errors.password}</span>}
                    </div>
                    <div className='submit'>
                        <button onClick={handleSubmit}>כניסה</button>
                    </div>
                    {(showError) &&
                        <span className='error'>{errors.match}</span>}
                </form>
            </div>
        </div>
    )
}