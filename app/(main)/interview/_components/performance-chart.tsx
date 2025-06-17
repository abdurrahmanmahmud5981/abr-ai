"use client"
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'

const PerformanceChart = ({assessments}) => {
  const [chartData, setChartData] = useState([])


  useEffect(() => {
    
  if(assessments){
    const formattedData = assessments.map((assessment)=>({
      date: format(new Date(assessment.createdAt),"MMM dd"),
      score: assessment.quizScore,
    }))
    setChartData(formattedData)
  }

  }, [assessments])
  


  return (
    <div>
      
    </div>
  )
}

export default PerformanceChart
