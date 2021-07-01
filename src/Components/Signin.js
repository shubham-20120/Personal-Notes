import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../helper/firebase';
import { MDBInput } from "mdbreact";
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';

const Signin = ({ uid, setUid }) => {

    const history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSignin = () => {
        auth.signInWithEmailAndPassword(email, password).then((result) => {
            console.log('sign-in');
            toast.success(<h6>Successfully Signed-in</h6>, { autoClose: 2000 })
            history.push('/')
        }).catch((error) => {
            const temp = error.code
            if (temp == 'auth/invalid-email') {
                toast.error(<h6>Invalid Email</h6>, { autoClose: 2300 })
            }
            else if (temp == 'auth/weak-password') {
                toast.error(<h6>Weak Password, minimum 6 characters required</h6>, { autoClose: 2300 })
            }
            else if (temp == 'auth/wrong-password') {
                toast.error(<h6>Wrong Credentials</h6>, { autoClose: 2300 })
            }
            else if (temp === "auth/network-request-failed") {
                toast.error(<h6>Please check Internet connection</h6>, { autoClose: 2300 })
            }
            else {
                toast.error(<h6>Something went wrong, try again</h6>, { autoClose: 2300 })
            }
            console.log(error);
        })
    }

    return (
        <div className='signup-main'>
            <div className="sign-container">
                <div className="sign-title">
                    Signin
                </div>
                <MDBInput
                    label="E-mail address"
                    className='mdbinput'
                    icon="envelope"
                    value={email}
                    type="email"
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <MDBInput
                    label="Password"
                    className='mdbinput'
                    icon="unlock-alt"
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <Button onClick={handleSignin} variant="contained" color="primary">
                    Sign in
            </Button>
                <div className="switch-sign">
                    Don't have an account? <Link to='/signup'>Sign Up</Link>
                </div>
                <br /><br />
            </div>
        </div>
    )
}

export default Signin
