import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../helper/firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
import Button from '@material-ui/core/Button';
import { MDBInput } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './Sign.css'
const Signup = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSignup = () => {
        try {
            auth.createUserWithEmailAndPassword(email, password).then(result => {
                toast.success(<h6>Successfully Signed-up</h6>, { autoClose: 2000 })
                history.push('/')
            }).catch((error) => {
                const temp = error.code
                if (temp === 'auth/invalid-email') {
                    toast.error(<h6>Invalid Email</h6>, { autoClose: 2300 })
                }
                else if (temp === 'auth/weak-password') {
                    toast.error(<h6>Weak Password, minimum 6 characters required</h6>, { autoClose: 2300 })
                }
                else if (temp === 'auth/email-already-in-use') {
                    toast.error(<h6>User Exists</h6>, { autoClose: 2300 })
                }
                else if (temp === "auth/network-request-failed") {
                    toast.error(<h6>Please check Internet connection</h6>, { autoClose: 2300 })
                }
                else {
                    toast.error(<h6>Something went wrong, try again</h6>, { autoClose: 2300 })
                }

            })
        }
        catch (error) {
            console.log(error);
            toast.error(<h6>Something went wrong, try again</h6>, { autoClose: 2300 })
        }
    }

    return (
        <div className='signup-main'>
            <div className="sign-container">
                <div className="sign-title">
                    Signup
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
                <Button onClick={handleSignup} variant="contained" color="primary">
                    Sign up
                </Button>
                <div className="switch-sign">
                    Already have an Account?  <Link to='/signin'>Sign In</Link>
                </div>
            </div>

        </div>
    )
}

export default Signup
