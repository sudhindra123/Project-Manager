import { useState, useEffect } from 'react'
import { projectAuth,projectStorge,projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName,thumbnail) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }


// for uplaoding and creating its copy (of the avatar) in the databse
// what it does is that if the thumbnail folder is not there first it creates it and later goes to the specific uid
// thumbnail has a name property like mario.png,lukia.png
const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`


//uploading part ,where it should be uploaded to a reference
 const img = await projectStorge.ref(uploadPath).put(thumbnail)

 //it gives the url of the image uploaded
 const imgurl = await img.ref.getDownloadURL()



      // add display name to user // photourl is for the avatar
      await res.user.updateProfile({ displayName,photoURL:imgurl })



//creating a user document
await projectFirestore.collection('users').doc(res.user.uid).set({
  online:true,
  displayName:displayName,
  photoURL:imgurl
})





      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}