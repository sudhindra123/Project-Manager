// meant for online users
import './sidebar.css'
import Dashboard from '../assets/dashboard_icon.svg'
import Addicon from '../assets/add_icon.svg'
import { NavLink } from 'react-router-dom'
import Avatar from './avatar'
import { useAuthContext } from '../hooks/useAuthContext'
export default function Sidebar(){

const {user} = useAuthContext()

    return(
        <div className='sidebar'>
        <div className='sidebar-content'>
        <div className='user'>
        <Avatar src={user.photoURL} />
            <p>Hey {user.displayName}</p>
        </div>
        <nav className='links'>
            <ul>
                <li>
                    <NavLink  exact to='/'>
                        <img src={Dashboard} />
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/create'>
                    <img src={Addicon} />
                    <span>New Project</span>

                    </NavLink>
                </li>
            </ul>
        </nav>

        </div>

        </div>
    )
}