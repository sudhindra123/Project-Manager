import { useState } from 'react'
import './login.css'
import { useLogin } from '../../hooks/useLogin'



export default function Login (){
const [email,setemail] = useState('')
const [password,setpassword] = useState('')
const {error,isPending,login} = useLogin()


const handleSubmit = (e)=>{
e.preventDefault()
login(email,password)
}


    return(
        <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        <label>
          <span>email:</span>
          <input
            required 
            type="email" 
            onChange={(e) => setemail(e.target.value)} 
            value={email}
          />
        </label>
        <label>
          <span>password:</span>
          <input
            required
            type="password" 
            onChange={(e) => setpassword(e.target.value)} 
            value={password}
          />
        </label>
       
        
        {!isPending && <button className="btn">Login</button>}
        {isPending && <button className="btn" disabled>loading</button>}
        {error && <div className="error">{error}</div>}
      </form>
    )
    
}