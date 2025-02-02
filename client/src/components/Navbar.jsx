import React from 'react'
import { assets } from '../assets/assets'
import { useClerk,UserButton,useUser,SignedIn } from "@clerk/clerk-react";
import {Link} from 'react-router-dom'

const Navbar = () => {

    const {openSignIn}= useClerk();
    const {user}= useUser();

 

  return (
    <div className='py-4 shadow'>
        <div className='container flex items-center justify-between px-4 mx-auto 2xl:px-20 '>
            <img src={assets.logo} alt="" />
            {
                user 
                ? 
                <div className='flex items-center gap-3'>
                    <Link to={'/applications'}>Appled Jobs</Link>
                    <p></p>
                    <p className='max-sm:hidden'>Hi, {user.firstName+" "+user.lastName}</p>
                    <UserButton/>
                </div>
                :
                <div className='flex gap-4 max-sm:text-xs'>
                <button className='text-gray-600'>Recruiter Login</button>
                <button onClick={e=> openSignIn()} className='px-6 py-2 text-white bg-blue-600 rounded-full sm:px-9'>Login</button>
            </div>
            }
           
        </div>
    </div>
  )
}

export default Navbar