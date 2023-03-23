import { useState } from "react"
import Avatar from "../../components/avatar"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import formatDistanceToNow from "date-fns/formatDistanceToNow"


export default function Projectcomments({project}){
    const {updateDocuments,response} = useFirestore('projects')
    const [newcomment,setnewcomment] = useState('')
const{user}= useAuthContext()
const handlesubmit = async (e) =>{
e.preventDefault();

const commenttoadd = {
    displayName:user.displayName,
    photoURL:user.photoURL,
    content:newcomment,
    createdAt:timestamp.fromDate(new Date()),
    id:Math.random()
}
await updateDocuments(project.id,{
    comments: [...project.comments,commenttoadd]
})
if(!response.error){
    setnewcomment('')
}
}



    return(
        <div className="project-comments">
     <h4>Project comments</h4>

<ul>
    {project.comments.length>0 && project.comments.map(comment=>(
        <li key={comment.id}>
            <div className="comment-author">
                <Avatar  src={comment.photoURL}/>
                <p>{comment.displayName}</p>
            </div>
            <div className="comment-date">
                <p>{formatDistanceToNow(comment.createdAt.toDate(),{addSuffix:true})}</p>
            </div>
            <div className="comment-content">
                <p>{comment.content}</p>
            </div>
        </li>
    ))}
</ul>





   
<form className="add-comment" onSubmit={handlesubmit}>
    <label>
        <span>
            Add a comment
        </span>
        <textarea 
onChange={(e)=>setnewcomment(e.target.value)}
value={newcomment}
        />
    </label>
    <button className="btn">Add comment</button>
</form>
        </div>
    )
}