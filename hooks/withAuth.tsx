import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'

const withAuth = (Component: any) => {
  return function ProtectedRouter({ ...props }) {
    const router = useRouter()
    const user = typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("user") as string)
      : null

    useEffect(() => {
      if (!user) {
        router.push('/pages/login')
      }
    }, [router, user])

    return <Component {...props} />
  }
}

export default withAuth
