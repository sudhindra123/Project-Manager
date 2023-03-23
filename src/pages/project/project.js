import './project.css'
import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/usedocument'
import Projectsummary from './projectsummary'
import Projectcomments from './projectcomments'
export default function Project  (){

const {id} = useParams()
const {document,error} = useDocument('projects',id)

if(error){
    return <div className='error'>{error}</div>
}
if(!document){
    return <div className='loading'>Loading...</div>
}


    return (
        <div className='project-details'>
          <Projectsummary project={document} />
          <Projectcomments  project={document}/>
        </div>
    )
}
