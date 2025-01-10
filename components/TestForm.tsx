'use client'

import React, { useActionState } from 'react'

const TestForm = () => {

  async function handleForm(prevState, formData) {
    console.log(prevState)
  }

  const [state, formAction] = useActionState(handleForm, 25)

  return (
    <div>
      <form>
        {state}
        <button formAction={formAction}>Do something</button>
      </form>
    </div>
  )
}

export default TestForm