import './navbar.css'
import Temple from '../assets/temple.svg'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'


export default function Navbar(){

    const {user} = useAuthContext()

const{logout,isPending} = useLogout()

    return(
        <nav className='navbar'>
<ul>
   <li className='logo'>
    <img src={Temple} />
    <span>Workspace</span>
   </li> 

{!user && (
    <>
<li><Link to='/login'>Login</Link></li>
<li><Link to='/signup'>Signup</Link></li>
</>
)}

{user && (
<>
<li>
{!isPending && <button className='btn' onClick={logout}>Logout</button>}
{isPending && <button className='btn' disabled>Logging Out...</button>}
</li>
</>
)}
</ul>
        </nav>
    )
}