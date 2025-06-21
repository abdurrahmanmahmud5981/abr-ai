"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { entrySchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

interface EntryFormProps {
  type: string;
  entries: any[];
  onChange: (entries: any[]) => void;
}

const EntryForm = ({type, entries, onChange}: EntryFormProps) => {
     const [isAdding, setIsAdding] = useState<boolean>(false);

    const {
        register,
        handleSubmit:handleValidation,
        formState:{errors},
        reset,
        watch,
        setValue,
    } = useForm({
        resolver:zodResolver(entrySchema),
        defaultValues:{
            title: '',
            organization: '',
            startDate: '',
            endDate: '',
            description: '',
            current: false,
        }
    })

    const current = watch("current");

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
                </CardContent>
            </Card>
        )
      }

      {!isAdding && (
        <Button 
        className='w-full'
        variant={"outline"}
        onClick={()=> setIsAdding(true)}
        >
            <PlusCircle className='mr-2 h-4 w-4' />
            Add {type}</Button>
      )}
    </div>
  )
}

export default EntryForm
