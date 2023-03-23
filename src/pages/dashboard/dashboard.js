import './dashboard.css'
import { useCollection } from '../../hooks/useCollection'
import Projectlist from '../../components/projectlist'
import Projectfilter from './projectfilter'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

export default function Dashboard (){

const {user} = useAuthContext()

const{documents,error} = useCollection('projects')
const [currentFilter,setCurrentFilter]=useState('all')

const changeFilter = (newFilter) =>{
    setCurrentFilter(newFilter)
}

const projects =  documents ? documents.filter((document)=>{
switch(currentFilter){
case 'all':
    return true
    case 'mine':
        let assignedtome = false
        document.assigneduserlist.forEach((u)=>{
if(user.uid===u.id){
    assignedtome=true
}
        })
        return assignedtome

case 'development':
    case 'design':
        case 'sales':
            case 'marketing':
                return document.category===currentFilter
                default :
                return true



}

}) : null


    return(
        <div>
            <h2 className='page-title'>Dashboard</h2>
            {error && <p className='error'>{error}</p>}
            {documents && <Projectfilter  currentFilter={currentFilter} changeFilter={changeFilter}/>}
            {projects && <Projectlist projects={projects} />}
        </div>
    )
}