"use client"
import { saveResume } from '@/actions/resume.'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import useFetch from '@/hooks/use-fetch'
import { resumeSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Download, Save } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import EntryForm from './enry-form'

const ResumeBuilder = ({ initialContent }) => {
    const [activeTav, setActiveTav] = useState("edit");
    const {
        loading: isSaving,
        fn: saveResumeFn,
        data: saveResult,
        error: saveError,
    } = useFetch(saveResume);


    // resume form
    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(resumeSchema),
        defaultValues: {
            contactInfo: {},
            summary: "",
            skills: "",
            experience: [],
            education: [],
            projects: []
        }
    });


    // api call



    const formValues = watch()


    // if resume is already 
    useEffect(() => {
        if (initialContent) setActiveTav("preview");
    }, [initialContent])


    const onSubmitForm = async (data) => { }


    return (
        <div className='space-y-4'>
            <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                <h1 className="font-bold gradient-title text-5xl md:text-6xl">
                    Resume Builder
                </h1>

                <div className='space-x-2'>
                    <Button variant={"destructive"}>
                        <Save className='h-4 w-4' />
                        Save
                    </Button>
                    <Button>
                        <Download className='h-4 w-4' />
                        Download PDF
                    </Button>
                </div>

            </div>


            <Tabs value={activeTav} onValueChange={setActiveTav}>
                <TabsList>
                    <TabsTrigger value='edit'>Form</TabsTrigger>
                    <TabsTrigger value='preview'>Markdown</TabsTrigger>
                </TabsList>
                <TabsContent value='edit'>
                    <form className='space-y-8' onSubmit={handleSubmit(onSubmitForm)}>
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">
                                Contact Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">
                                {/* email */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <Input
                                        {...register("contactInfo.email")}
                                        type='email' placeholder='youremail@gmail.com'
                                    />

                                    {/* error of email  */}
                                    {errors.contactInfo?.email && (<p className='text-sm text-red-500'>{errors.contactInfo.email.message}</p>)}
                                </div>


                                {/* mobile */}
                                <div className="space-y-2">
                                    <label htmlFor="mobile" className="text-sm font-medium">Mobile Number</label>
                                    <Input
                                        {...register("contactInfo.mobile")}
                                        type='tel' placeholder='+1 234 567 8901'
                                    />

                                    {/* error of phone */}
                                    {errors.contactInfo?.mobile
                                        && (
                                            <p className='text-sm text-red-500'>{errors.contactInfo.mobile.message}</p>
                                        )}
                                </div>


                                {/* linkedin url */}
                                <div className="space-y-2">
                                    <label htmlFor="linkedin" className="text-sm font-medium">LinkedIn URL</label>
                                    <Input
                                        {...register("contactInfo.linkedin")}
                                        type='url' placeholder='https://www.linkedin.com/in/yourprofile'
                                    />

                                    {/* error of linkedin */}
                                    {errors.contactInfo?.linkedin
                                        && (
                                            <p className='text-sm text-red-500'>{errors.contactInfo.linkedin.message}</p>
                                        )}
                                </div>

                                {/* twitter url */}
                                <div className="space-y-2">
                                    <label htmlFor="twitter" className="text-sm font-medium">Twitter/X Profile</label>
                                    <Input
                                        {...register("contactInfo.twitter")}
                                        type='url' placeholder='https://twitter.com/yourprofile'
                                    />

                                    {/* error of twitter */}
                                    {errors.contactInfo?.twitter
                                        && (
                                            <p className='text-sm text-red-500'>{errors.contactInfo.twitter.message}</p>
                                        )}
                                </div>
                            </div>
                        </div>

                        {/* professional bio */}
                        <div className="space-y-4">
                            <h3 className='text-lg font-medium'>
                                Professional Summary
                            </h3>
                            <Controller
                                name='summary'
                                control={control}
                                render={({ field }) => (<Textarea {...field} className='h-32'
                                    placeholder='Write a brief summary of your professional background, and career goals.'
                                    error={errors.summary}
                                />)}
                            />
                            {errors.summary && (
                                <p className='text-sm text-red-500'>{errors.summary.message}</p>
                            )}
                        </div>

                        {/* skills */}
                        <div className="space-y-4">
                            <h3 className='text-lg font-medium'>
                                Skills
                            </h3>
                            <Controller
                                name='skills'
                                control={control}
                                render={({ field }) => (<Textarea {...field} className='h-32'
                                    placeholder='List your key skills and technologies you are proficient in, separated by commas.'
                                    error={errors.skills}
                                />)}
                            />
                            {errors.skills && (
                                <p className='text-sm text-red-500'>{errors.skills.message}</p>
                            )}
                        </div>

                        {/* Experience  */}
                        <div className="space-y-4">
                            <h3 className='text-lg font-medium'>
                                Work Experience
                            </h3>
                            <Controller
                                name='experience'
                                control={control}
                                render={({ field }) =>
                                (
                                    <EntryForm
                                        type='Experience'
                                        entries={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.experience && (
                                <p className='text-sm text-red-500'>{errors.experience.message}</p>
                            )}
                        </div>

                        {/* education */}
                        <div className="space-y-4">
                            <h3 className='text-lg font-medium'>
                                Education
                            </h3>
                            <Controller
                                name='education'
                                control={control}
                                render={({ field }) => (
                                    <EntryForm
                                        type='Education'
                                        entries={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.education && (
                                <p className='text-sm text-red-500'>{errors.education.message}</p>
                            )}
                        </div>

                        {/* projects */}
                        <div className="space-y-4">
                            <h3 className='text-lg font-medium'>
                                Projects
                            </h3>
                            <Controller
                                name='projects'
                                control={control}
                                render={({ field }) => (
                                    <EntryForm
                                        type='Project'
                                        entries={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.projects && (
                                <p className='text-sm text-red-500'>{errors.projects.message}</p>
                            )}
                        </div>
                    </form>
                </TabsContent>
                <TabsContent value='preview'>Preview Edit</TabsContent>
            </Tabs>
        </div>
    )
}

export default ResumeBuilder
