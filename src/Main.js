import React, { useEffect, useState } from 'react'
import Signin from './Components/Signin'
import Signup from './Components/Signup'
import CreateTodo from './Components/Createnote'
import { auth } from './helper/firebase'
import Navbar from './Components/Navbar'
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import RequestLogin from './Components/RequestLogin'

const Main = () => {
  const [uid, setUid] = useState('');
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUid(user.uid)
      } else {
        console.log('user not found');
      }
    })
  }, [])
  return (
    <div >
      <BrowserRouter>
        <Navbar uid={uid} />
        {
          uid ?
            <Route exact path='/' ><CreateTodo uid={uid} /></Route>
            :
            <Route exact component={RequestLogin} path='/' />

        }
        <Route component={Signin} path='/signin' />
        <Route component={Signup} path='/signup' />
      </BrowserRouter>

    </div>
  )
}

export default Main
