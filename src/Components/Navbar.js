import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button';
import { auth } from '../helper/firebase';
import Hamburger from './Hamburger'
import './Navbar.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Link
} from 'react-router-dom';
const Navbar = ({ uid }) => {
    useEffect(() => {
        toast.configure()
        window.addEventListener('offline', function (e) {
            toast.error(<h6>Please check your internet connection</h6>)
        }, false);
    }, [])
    const logout = () => {
        auth.signOut().then(() => {
            console.log('log-out');

        }).catch((error) => {
            console.log("error from sign-out");
            console.log(error);
        })
    }
    return (
        <>
            <div className="navbar-main large-screen">
                <div className="navbar-left "><Link className="navbar-left" to='/'>Personal Notes</Link></div>
                <div className="navbar-right">
                    {

                        uid ?
                            <>
                                <Button className="navbar-btns" onClick={logout} variant="contained" color="secondary">
                                    <a className="sign-button" href='/' >Log Out</a>
                                </Button>
                                <Button className="navbar-btns" onClick={null} variant="contained" color="secondary">
                                    <a target="_new" className="sign-button" href='https://patel-shubham-portfolio.herokuapp.com/' >About me</a>
                                </Button>
                            </>
                            :
                            <>
                                <Button style={{ padding: "-10px -20px" }} onClick={null} variant="contained" color="secondary">
                                    <a target="_new" className="sign-button" href='https://patel-shubham-portfolio.herokuapp.com/' >About me</a>
                                </Button>
                            </>

                    }
                </div>

            </div >
            <div className="small-screen">
                <Hamburger uid={uid} />
            </div>
        </>
    )
}

export default Navbar
