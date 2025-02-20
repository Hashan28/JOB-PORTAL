import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const RecruterLogin = () => {

    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [image, setImage] = useState(false)
    const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false)

    const {setShowRecruterLogin}=useContext(AppContext);

    const onSubmitHandler = async(e)=>{
        e.preventDefault()

        if (state== "Sign Up" && !isTextDataSubmitted) {
            setIsTextDataSubmitted(true)
        }
    }

    useEffect(()=>{
        document.body.style.overflow ="hidden"

        return ()=>{
             document.body.style.overflow ="unset"
        }
    },[])

    return (
        <div className='absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center backdrop-blur-sm bg-black/30'>
            <form onSubmit={onSubmitHandler} className='relative p-10 bg-white rounded-xl text-slate-500'>
                <h1 className='text-2xl font-medium text-center text-neutral-700'>Recruter {state}</h1>
                <p className='text-sm'>Welcome back ! Please sign in to continue</p>
                {state === 'Sign Up' && isTextDataSubmitted
                    ? <>
                      <div className='flex items-center gap-4 my-10'>
                        <label htmlFor="image">
                            <img className='w-16 rounded-full' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                            <input onChange={e=>setImage(e.target.files[0])} type="file" hidden id='image'/>
                        </label>
                        <p>Upload Company <br/></p>
                    </div>  
                    </>
                    : <>
                        {state !== 'Login' && (
                            <div className='flex items-center gap-2 px-4 py-2 mt-5 border rounded-full'>
                                <img src={assets.person_icon} alt="" />
                                <input className='text-sm outline-none ' onChange={e => setName(e.target.value)} value={name} type="text" placeholder='Company Name' required />
                            </div>
                        )}

                        <div className='flex items-center gap-2 px-4 py-2 mt-5 border rounded-full'>
                            <img src={assets.email_icon} alt="" />
                            <input className='text-sm outline-none ' onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Email Id' required />
                        </div>
                        <div className='flex items-center gap-2 px-4 py-2 mt-5 border rounded-full'>
                            <img src={assets.lock_icon} alt="" />
                            <input className='text-sm outline-none ' onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='password' required />
                        </div>
                    </>
                }
                {state === 'Login' &&  <p className='mt-4 text-sm text-blue-600 cursor-pointer'>Forgot Password?</p> }
               

                <button type='submit' className='w-full py-2 mt-4 text-white bg-blue-600 rounded-full '>
                    {state === 'Login' ? 'Login' : isTextDataSubmitted ? 'Create Account' : 'Next'}
                </button>

                {
                    state === 'Login'
                        ? <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign Up')}>Sign Up</span></p>
                        : <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Login')}>Login</span></p>
                }


                <img onClick={e =>setShowRecruterLogin(false)} src={assets.cross_icon} className='absolute cursor-pointer top-5 right-5' alt="" />
            </form>
        </div>
    )
}

export default RecruterLogin