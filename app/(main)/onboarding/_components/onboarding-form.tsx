"use client";

import { onboardingSchema } from '@/lib/schema';
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
const OnboardingForm: React.FC = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = React.useState(null)

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(onboardingSchema)
  })
console.log("industries", industries.filter(industry => industry.name  === selectedIndustry)?.[0]?.subIndustries || [])
  return (
    <div className='flex items-center justify-center bg-background'>
      <Card className="w-full max-w-lg mt10 mx-2">
        <CardHeader>
          <CardTitle className="gradient-title text-4xl">Complete Onboarding</CardTitle>
          <CardDescription>Fill in the details below to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <Label htmlFor="industry" className="block mb-2">Industry</Label>
              <Select
                onValueChange={(value) => {
                  setValue('industry', value);
                  setSelectedIndustry(industries.find(industry => industry.id === value)?.name || null);
                  setValue('subIndustry', ''); // Reset sub-industry when industry changes
                }}
              >
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map(industry => <SelectItem key={industry.id} value={industry.id}>{industry.name}</SelectItem>)}
                </SelectContent>
              </Select>
              {
                errors.industry && (
                  <p className="text-red-500 text-sm">{errors.industry.message}</p>
                )
              }
            </div>
            <div className="space-y-4 mt-4">
              <Label htmlFor="subIndustry" className="block mb-2">Sub Industry</Label>
              <Select
                onValueChange={(value) => {
                  setValue('subIndustry', value);
                }}
              >
                <SelectTrigger id="subIndustry">
                  <SelectValue placeholder="Select Sub Industry" />
                </SelectTrigger>
                <SelectContent>
                  { industries.filter(industry => industry.name  === selectedIndustry)?.[0]?.subIndustries.map(ind => (
                    <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {
                errors.subIndustry && (
                  <p className="text-red-500 text-sm">{errors.subIndustry.message}</p>
                )
              }
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default OnboardingForm