import React from 'react'
import Button from '@material-ui/core/Button';
import {
    Link
} from 'react-router-dom';
import './Sign.css'

const RequestLogin = () => {
    return (
        <div className="requestLogin-main">
            <div className="requestLogin-container">
                <div className="requestLogin-text" style={{ fontSize: '1.2rem' }}>Please Join the server to make Apps</div>
                <div className="requestLogin-links">
                    <Button variant="contained" color="secondary">
                        <Link className="sign-button" to='/signin' >Sign in</Link>
                    </Button>
                    <Button variant="contained" color="secondary">
                        <Link className="sign-button" to='/signup' >Sign up</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default RequestLogin
