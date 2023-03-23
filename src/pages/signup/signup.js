import { useState } from 'react'
import './signup.css'

import { useSignup } from '../../hooks/useSignup'

export default function Signup() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [displayname, setdisplayname] = useState('')
    const [thumbnail, setthumbnail] = useState(null)
    const [thunmnailerror, setthumbnailerror] = useState(null)


const {signup,isPending,error} = useSignup()


    const handlefilechange = (e) => {
        setthumbnail(null)
        let selected = e.target.files[0] // we can select multiple files,so we restrict ourseleves to the first file
        console.log(selected)

        // we check whether the file is selected ot not,if it is in correct format and in the desired size range
        if (!selected) {
            setthumbnailerror('pls select a file')
            return

        }
        if (!selected.type.includes('image')) {
            setthumbnailerror('the file must be an image')
            return
        }

        if (selected.size > 100000) {
            setthumbnailerror('image is too large to update,must be less than 100kb')
            return
        }
        setthumbnailerror(null)

        setthumbnail(selected)
    }



    const submitform = (e) => {
        e.preventDefault()
        signup(email, password, displayname, thumbnail)
    }






    return (
        <form className='auth-form' onSubmit={submitform}>
            <h2>SignUp</h2>


            <label>
                <span>Email</span>
                <input type='email'
                    onChange={(e) => setemail(e.target.value)}
                    value={email}
                    required
                />
            </label>

            <label>
                <span>Password</span>
                <input type='password'
                    onChange={(e) => setpassword(e.target.value)}
                    value={password}
                    required
                />
            </label>

            <label>
                <span>DisplayName</span>
                <input type='text'
                    onChange={(e) => setdisplayname(e.target.value)}
                    value={displayname}
                    required
                />
            </label>

            <label>
                <span>Avatar</span>
                <input type='file'
                    required
                    onChange={handlefilechange}
                />
                {thunmnailerror && <div className='error'>{thunmnailerror}</div>}

            </label>

            {!isPending && <button className='btn'>SignUp</button>}
            
            {isPending && <button className='btn' disabled>Loading....</button>}
            {error && <div className='error'>{error}</div>}
        </form>
    )
}