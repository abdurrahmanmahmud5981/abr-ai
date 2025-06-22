"use client";
import { improveWithAI } from '@/actions/resume.';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useFetch from '@/hooks/use-fetch';
import { entrySchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { set } from 'date-fns';
import { Loader2, PlusCircle, Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface EntryFormProps {
    type: string;
    entries: any[];
    onChange: (entries: any[]) => void;
}

const EntryForm = ({ type, entries, onChange }: EntryFormProps) => {
    const [isAdding, setIsAdding] = useState<boolean>(false);

    const {
        register,
        handleSubmit: handleValidation,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm({
        resolver: zodResolver(entrySchema),
        defaultValues: {
            title: '',
            organization: '',
            startDate: '',
            endDate: '',
            description: '',
            current: false,
        }
    })

    const current = watch("current");

    const {
        loading:isImproving,
        fn:improveWithAIFn,
        data:improvedContent,
        error:improveError,
    } = useFetch(improveWithAI)

    const handleAdd = ()=>{}

    const handleDelete = ()=>{}


    useEffect(()=>{
        if(improvedContent && !isImproving){
            setValue("description", improvedContent);
            toast.success("Description improved successfully!");
        }
        if(improveError){
            toast.error(improveError?.message || "Failed to improve description. Please try again.");
        }
    },[improvedContent,improveError,isImproving])


    const handleImproveDescription = async ()=>{
     const description = watch("description");
     if(!description){
        toast.error("Please enter a description first");
        return;
      } 

      await improveWithAIFn({
            current:description,
            type:type.toLowerCase(),//'experience',
      })
    }

    return (
        <div>
            {
                isAdding && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Add {type}</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className="grid grid-cols-2 gap-4">
                                {/* title */}
                                <div className="space-y-2">
                                    <Input placeholder='Title/Position'
                                        {...register("title")}
                                        error={errors.title}

                                    />
                                    {
                                        errors.title && (
                                            <p className='text-sm text-red-500'>
                                                {errors.title.message}
                                            </p>
                                        )
                                    }
                                </div>
                                {/* organization */}
                                <div className="space-y-2">
                                    <Input placeholder='Organization/Company'
                                        {...register("organization")}
                                        error={errors.organization}

                                    />
                                    {
                                        errors.organization && (
                                            <p className='text-sm text-red-500'>
                                                {errors.organization.message}
                                            </p>
                                        )
                                    }
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* start date */}
                                <div className="space-y-2">

                                    <Input
                                        type='month'
                                        {...register("startDate")}
                                        error={errors.startDate}

                                    />
                                    {
                                        errors.startDate && (
                                            <p className='text-sm text-red-500'>
                                                {errors.startDate.message}
                                            </p>
                                        )
                                    }
                                </div>
                                {/* end date */}
                                <div className="space-y-2">

                                    <Input
                                        type='month'
                                        {...register("endDate")}
                                        disabled={current}
                                        error={errors.endDate}

                                    />
                                    {
                                        errors.endDate && (
                                            <p className='text-sm text-red-500'>
                                                {errors.endDate.message}
                                            </p>
                                        )
                                    }
                                </div>
                                {/* current */}
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" name="current" id="current"
                                        {...register("current")}
                                        onChange={(e) => {
                                            setValue("current", e.target.checked);
                                            if (e.target.checked) {
                                                setValue("endDate", ""); // clear end date if current is checked
                                            }
                                        }}
                                    />
                                    <label htmlFor="current">Current {type}</label>
                                </div>
                                {/* bio */}

                            </div>
                            <div className="space-y-2`
                                ">
                                <Textarea
                                    placeholder={`Description of your ${type.toLowerCase()}`}
                                    className='h-32'
                                    {...register("description")}
                                    error={errors.description}
                                />

                                {
                                    errors.description && (
                                        <p className='text-sm text-red-500'>
                                            {errors.description.message}
                                        </p>
                                    )
                                }
                            </div>
                            <Button 
                            type='button'
                            variant={"ghost"}
                            size={"sm"}
                            onClick={handleImproveDescription}
                            disabled={isImproving || !watch("description")}
                            >

                                {
                                    isImproving ?
                                     (<>
                                     <Loader2 className='h-4 w-4 animate-spin mr-2'/>
                                     Improving...
                                     </>)
                                     :
                                    (
                                        <>
                                        <Sparkles className='w-4 h-4 mr-2'/>
                                        Improve with AI
                                        </>
                                    )
                                }

                            </Button>
                        </CardContent>
                    </Card>
                )
            }

            {!isAdding && (
                <Button
                    className='w-full'
                    variant={"outline"}
                    onClick={() => setIsAdding(true)}
                >
                    <PlusCircle className='mr-2 h-4 w-4' />
                    Add {type}</Button>
            )}
        </div>
    )
}

export default EntryForm
