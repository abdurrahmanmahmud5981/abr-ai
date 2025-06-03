import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-6xl gradient-title font-bold">404 - Page Not Found</h1>
        <p className="mt-4 text-popover-foreground">Sorry, the page you are looking for does not exist.</p>
        <p className="mt-4">You can go back to the <Link href="/"><Button>home page</Button></Link>.</p>
    </div>
  )
}

export default NotFound