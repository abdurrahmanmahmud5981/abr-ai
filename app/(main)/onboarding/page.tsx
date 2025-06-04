import { industries } from '@/data/industries'
import React from 'react'
import OnboardingForm from './_components/onboarding-form'

const OnboardingPage = () => {
  return (
    <div>
      <OnboardingForm industries={industries} />
    </div>
  )
}

export default OnboardingPage 