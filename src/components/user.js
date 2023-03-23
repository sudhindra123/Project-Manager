import './user.css'
import { useCollection } from '../hooks/useCollection'
import Avatar from './avatar'
export default function User(){
    const {error,documents} = useCollection('users')
    return(
        <div className='user-list'>
            <h2>Users</h2>
            {error && <div className='error'>{error}</div>}
            {documents && documents.map(user =>(
                <div key={user.id} className='user-list-item'>
                {user.online && <span className='online-user'></span>}
                    <span>{user.displayName}</span>
                    <Avatar src={user.photoURL} />
                </div>
            ))}
        </div>
    )
}