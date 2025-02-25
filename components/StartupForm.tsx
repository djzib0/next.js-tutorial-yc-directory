'use client'

import React, { useActionState, useState } from 'react';
import MDEditor from '@uiw/react-md-editor'
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { createPitch } from '@/lib/actions';

const StartupForm = () => {

  const [errors, setErrors] = useState<Record<string, string>>({});
  // markdown editor state
  const [pitch, setPitch] = useState("")

  const { toast } = useToast();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      }

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status === "SUCCESS") {

        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully"
        })
      }

      router.push(`/startup/${result._id}`)
      console.log("I'm  here mate")
      return result

    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        })

        return {
          ...prevState,
          error: "Validation failed",
          status: "ERROR"
        }

      }

      toast({
        title: "Error",
        description: "Please check your inputs and try again",
        variant: "destructive",
      })

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR"
      }
    }

    return {
      ...prevState,
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      link: formData.get("link")
    }
  }

  const [state, formAction, isPending] = useActionState(
    handleFormSubmit,
    {
      error: "",
      status: "INITIAL"
    },
  )

  console.log(state, " state")

  return (
    <div>
      <form action={formAction} className='startup-form'>

        <div>
          <label htmlFor='title' className='startup-form_label'>
            Title
          </label>
          <input 
            id='title'
            name='title'
            className='startup-form_input'
            required
            placeholder='Startup Title'
          />
          {errors.title && <p className='startup-form_error'>{errors.title}</p>}
        </div>

        <div>
          <label htmlFor='description' className='startup-form_label'>
            Description
          </label>
          <input 
            id='description'
            name='description'
            className='startup-form_input'
            required
            placeholder='Startup Description'
          />
          {errors.description && <p className='startup-form_error'>{errors.description}</p>}
        </div>

        <div>
          <label htmlFor='category' className='startup-form_label'>
            Category
          </label>
          <input 
            id='category'
            name='category'
            className='startup-form_input'
            required
            placeholder='Startup Category (Tech, Healthm, Education ...)'
          />
          {errors.category && <p className='startup-form_error'>{errors.category}</p>}
        </div>

        <div>
          <label htmlFor='link' className='startup-form_label'>
            Image URL
          </label>
          <input 
            id='link'
            name='link'
            className='startup-form_input'
            required
            placeholder='Startup Image URL'
          />
          {errors.link && <p className='startup-form_error'>{errors.link}</p>}
        </div>

        <div data-color-mode="light">
          <MDEditor
            value={pitch}
            onChange={(value) => setPitch(value as string)}
            id='pitch'
            preview='edit'
            height={300}
            style={{borderRadius: 20, overflow: "hidden"}}
            textareaProps={{
              placeholder: "Briefly describe your idea and what problem it solves",
            }}
            previewOptions={{
              disallowedElements: ["style"]
            }}
           />
          {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
        </div>
        <Button 
          type='submit' 
          className='startup-form_btn text-white'
          disabled={isPending}
          >{isPending ? 'Submitting...' : 'Submit Your Pitch'}
          <Send className='size-6 ml-2' />
        
        </Button>
        
      </form>
      <p>Title: {state?.title}</p>
      <p>Description: {state?.description}</p>
      <p>Category: {state?.category}</p>
      <p>Image URL: {state?.link}</p>
    </div>
  )
}

export default StartupForm