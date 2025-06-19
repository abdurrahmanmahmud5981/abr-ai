"use client"
import { saveResume } from '@/actions/resume.'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useFetch from '@/hooks/use-fetch'
import { resumeSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Download, Save } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const ResumeBuilder = ({initialContent}) => {
    const [activeTav, setActiveTav] = useState("edit");
    

    // resume form
    const {control,register,handleSubmit,watch,formState:{errors}} = useForm({
        resolver:zodResolver(resumeSchema),
        defaultValues:{
            contactInfo:{},
            summary:"",
            skills:"",
            experience:[],
            education:[],
            projects:[]
        }
    });


    // api call
    const {
        loading:isSaving,
        fn:saveResumeFn,
        data:saveResult,
        error:saveError,
    } = useFetch(saveResume)



    const formValues = watch()


    // if resume is already 
    useEffect(()=>{
        if(initialContent)setActiveTav("preview");
    },[initialContent])

  return (
    <div className='space-y-4'>
     <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <h1 className="font-bold gradient-title text-5xl md:text-6xl">
            Resume Builder 
        </h1>

        <div className='space-x-2'>
            <Button variant={"destructive"}>
                <Save className='h-4 w-4'/>
                Save
            </Button> 
             <Button>
                <Download className='h-4 w-4'/>
                Download PDF
            </Button>
        </div>

     </div>


     <Tabs value={activeTav} onValueChange={setActiveTav}>
        <TabsList>
            <TabsTrigger value='edit'>Form</TabsTrigger>
            <TabsTrigger value='preview'>Markdown</TabsTrigger>
        </TabsList>
        <TabsContent value='edit'>Edit</TabsContent>
        <TabsContent value='preview'>Preview Edit</TabsContent>
     </Tabs>
    </div>
  )
}

export default ResumeBuilder
