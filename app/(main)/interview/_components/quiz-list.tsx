"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const QuizList = ({assessments}) => {
  const router = useRouter();
  const [selected, setSelected] = useState(null)
  return (
    <>
      <Card>
      <CardHeader className='flex justify-between items-center'>
      <div className="">
          <CardTitle className='gradient-title text-3xl md:text-4xl'>
          Recent Quizzes 
        </CardTitle>
        <CardDescription>Review Your Past Quiz Performance </CardDescription>
      </div>
      <Button onClick={()=> router.push("/interview/mock")}>Start New Quiz</Button>
      </CardHeader>
      <CardContent>
        
      </CardContent>

    </Card>
    {/* dialog */}
    </>
  )
}

export default QuizList
