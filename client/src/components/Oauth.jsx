import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import {app} from '../Firebase.js'
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';


export default function Oauth() {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            
            const result = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo:result.user.photoURL
                })
            })
            const data = await res.json()
            dispatch(signInSuccess(data))
            navigate('/')
        } catch (error) {
            console.log('could not sign in with google',error);
        }
    }
  return (
    <button type='button' onClick={handleGoogleClick} className='bg-red-600 p-3 rounded-lg text-white uppercase hover:opacity-90 text-xs'>Continue with google</button>
  )
}
