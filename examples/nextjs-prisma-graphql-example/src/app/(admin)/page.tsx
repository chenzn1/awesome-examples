'use client'
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Admin() {
  const router = useRouter()
  useEffect(() => {
    router.push('/users')
  }, [router])
  return <></>
}