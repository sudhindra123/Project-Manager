import { useState } from "react"

const filterlist=['all','mine','development','design','marketing','sales']



export default function Projectfilter({currentFilter,changeFilter}){
  


    const handleClick = (newFilter)=>{
        console.log(newFilter)
        // setCurrentFilter(newFilter)
changeFilter(newFilter)

    }
    

    return(
        <div className="project-filter">
<nav>
    {filterlist.map((f)=>(
        <button key={f} onClick={()=>handleClick(f)}
        className={currentFilter===f ? 'active' : ''}
        >
            {f}
        </button>
    ))}
</nav>
        </div>
    )
}