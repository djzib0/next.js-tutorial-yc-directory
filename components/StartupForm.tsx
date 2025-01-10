"use client";

import React, { useState, useActionState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    console.log("I'm here")
    try {
      const formValues = {
        title: formData.get("title") as string,
      };

      await formSchema.parseAsync(formValues);

      console.log(formValues)

      // const result = await createPitch(prevState, formData, pitch);
      return prevState
    } catch (error) {
      console.log(error)
    }
  };

  const [state, formAction] = useActionState(handleFormSubmit, null);

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />

        {errors.title && <p className="startup-form_error">{errors.title}klj</p>}
      </div>

      <Button
        type="button"
        className="startup-form_btn text-white"
        // disabled={isPending}
      >
        {/* {isPending ? "Submitting..." : "Submit Your Pitch"} */}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;