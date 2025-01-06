'use client'

import React, { useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea';

const StartupForm = () => {

  const [errors, setErrors] = useState<Record<string, string>>({});
  return (
    <form action={() => {}} className='startup-form'>
      <div>
        <label htmlFor='title' className='startup-form_label'>Title</label>
        <Input 
          id='title' 
          name='title' 
          className='startup-form_input'
          placeholder='Startup Title'
          required
        />
        {errors.title && <p className='startup-form_error'>{errors.title}</p>}
      </div>

      <div>
        <label htmlFor='Description' className='startup-form_label'>Description</label>
        <Textarea 
          id='Description' 
          name='Description' 
          className='startup-form_input'
          placeholder='Startup Description'
          required
        />
        {errors.description && <p className='startup-form_error'>{errors.description}</p>}
      </div>

      <div>
        <label htmlFor='category' className='startup-form_label'>Category</label>
        <Input 
          id='category' 
          name='category' 
          className='startup-form_input'
          placeholder='Startup Category (Tech, Health, Education...'
          required
        />
        {errors.category && <p className='startup-form_error'>{errors.category}</p>}
      </div>

      <div>
        <label htmlFor='link' className='startup-form_label'>Image URL</label>
        <Input 
          id='link' 
          name='link' 
          className='startup-form_input'
          placeholder='Startup Image URL'
          required
        />
        {errors.link && <p className='startup-form_error'>{errors.link}</p>}
      </div>
      
    </form>
  )
  // ended at 3:58:16
}

export default StartupForm