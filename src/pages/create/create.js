import { useEffect, useState } from 'react'
import './create.css'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom'



export default function Create (){
    const history = useHistory()
const [name,setname]=useState('')
const [details,setdetails]=useState('')
const [duedate,setduedate]=useState('')
const [category,setcategory]=useState('')
const [assignedusers,setassignedusers]=useState([])
const [formerror,setformerror]=useState(null)


const{addDocument,response} = useFirestore('projects')
const {documents} = useCollection('users')
const [users,setusers] = useState([])
const {user} = useAuthContext()


const handlesubmit= async(e)=>{
e.preventDefault()
setformerror(null)

if(!category){
    setformerror('select the category')
    return
}

if(assignedusers.length <1){
    setformerror('atleast 1 person must be assigned')
    return
}



const createdby = {
    displayName:user.displayName,
    photoURL:user.photoURL,
    id:user.uid
}


const assigneduserlist = assignedusers.map((u)=>{
    return{
        displayName:u.value.displayName,
        photoURL:u.value.photoURL,
        id:u.value.id
    }
})



const project = {
    name:name,
    details:details,
    category:category.value,
    duedate:timestamp.fromDate(new Date(duedate)),
    comments: [],
    createdby:createdby,
assigneduserlist:assigneduserlist
}


await addDocument(project)
if(!response.error){
    history.push('/')
}

}



// useEffect(()=>{
//     if(documents){
//         const options = documents.map(user=>{
//             return {value:{...user,id:user.id},label:user.displayName}
//         })
//     setusers(options)
//     }


// },[documents])
useEffect(() => {
    if(documents) {
      setusers(documents.map(user => {
        return { value: {...user, id: user.id}, label: user.displayName }
      }))
    }
  }, [documents])


const categories = [
    {value:'development',label:'Development'},
    {value:'design',label:'Design'},
    {value:'sales',label:'Sales'},
    {value:'marketing',label:'Marketing'},
]



    return(
        <div className='create-form'>
            <h2 className='page-title'>Create a new project</h2>
            <form onSubmit={handlesubmit}>
<label>
    <span>Project Name</span>
    <input type='text'
    onChange={(e)=>setname(e.target.value)}
    value={name}
    required
    />
</label>

<label>
<span>Project Details</span>
<textarea
type='text'
required
onChange={(e)=>setdetails(e.target.value)}
value={details}
/>
</label>
<label>
    <span>Due  Date</span>
    <input type='date'
    onChange={(e)=>setduedate(e.target.value)}
    value={duedate}
    required
    />
</label>
<label>
    <span>Project Category</span>
    <Select 
    onChange={(option)=>setcategory(option)}
        options={categories}
    />
</label>

<label>
    <span>Assign to:</span>
    <Select
    onChange={(option)=>setassignedusers(option)}
     options={users}
        isMulti
     />
</label>


<button className='btn'>Add Project</button>

{formerror && <p className='error'>{formerror}</p>}
            </form>
        </div>
    )
}