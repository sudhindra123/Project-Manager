import './projectlist.css'
import { Link } from 'react-router-dom'
import Avatar from './avatar'
export default function Projectlist({projects}){
    return(
<div className='project-list'>
    {projects.length === 0 && <p>No projects yet!</p>}
    {projects.map(project =>(
        <Link key={project.id} to={`/projects/${project.id}`}>
<h4>{project.name}</h4>
<p>Due by {project.duedate.toDate().toDateString()}</p>
<div className='assigned-to'>
<ul>
    {project.assigneduserlist.map(user =>(
<li key={user.id}>
<Avatar src={user.photoURL} />
</li>
    ))}
    </ul>
</div>
        </Link>
    ))}
</div>
    )
}