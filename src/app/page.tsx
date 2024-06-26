'use client'

// Next Imports
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '../configs/firebaseConfig' // Adjust this path if necessary
import "../style/style.css"

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (!user) {
        router.push('/login')
      } else {
        try {
          // User is signed in, handle accordingly
          const token = await user.getIdToken()
          const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            token: token
          }

          // Save user data to local storage
          localStorage.setItem('user', JSON.stringify(userData))
          console.log(userData);

          // Redirect to dashboard or home page
          router.push('/home')
        } catch (error) {
          console.error('Error fetching user data:', error)
          // Handle error appropriately, e.g., show a notification or redirect to an error page
        }
      }
    })

    return () => unsubscribe()
  }, [router])

  return null // Don't render anything
}
