import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Quiz from '../_components/Quiz'

const MockInterviewPage = () => {
  return (
    <div>

      <div className="">
        <Link href={'/interview'}>
          <Button variant={'link'} className='gap-2 pl-0'>
            <ArrowLeft className='h-4 w-4' />
            Back to Interview Preparation
          </Button>
        </Link>
      </div>

      <div >
        <h1 className='text-6xl font-bold gradient-title'>Mock Interview </h1>
        <p className='text-muted-foreground'>
          Test Your Knowledge with Industry-specific Questions
        </p>
      </div>

      <Quiz />
    </div>
  )
}

export default MockInterviewPage