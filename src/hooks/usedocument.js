import { useEffect,useState } from "react";
import { projectFirestore } from "../firebase/config";
export const useDocument =(collection,id) =>{

const [document,setdocument] = useState(null)
const [error,seterror] = useState(null)

//realtime data for document
useEffect(()=>{

const ref= projectFirestore.collection(collection).doc(id)
 const unsub = ref.onSnapshot(snapshot=>{
    setdocument({...snapshot.data(),id:snapshot.id})
    seterror(null)
},(err)=>{
console.log(err.message)
seterror('failed to get document')
})
return () =>unsub()
},[collection,id])

return {document,error}
 }

