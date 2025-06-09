import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'

const IndustryInsightsPage = async () => {
  const { isOnboarded } = await getUserOnboardingStatus()
  console.log("isOnboarded", isOnboarded)
  if(!isOnboarded){
    redirect('/onboarding')
  }
  return (
    <div>IndustryInsightsPage</div>
  )
}

export default IndustryInsightsPage