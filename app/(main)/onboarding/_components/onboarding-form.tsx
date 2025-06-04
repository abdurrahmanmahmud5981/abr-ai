import React from 'react'

interface Industry {
  id: string | number;
  name: string;
}

interface OnboardingFormProps {
  industries: Industry[];
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ industries }) => {
  return (
    <div>
      <h2>Onboarding Form</h2>
      <form>
        <label htmlFor="industry">Select your industry:</label>
        <select id="industry" name="industry">
          {industries.map((industry) => (
            <option key={industry.id} value={industry.id}>
              {industry.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  )
}

export default OnboardingForm