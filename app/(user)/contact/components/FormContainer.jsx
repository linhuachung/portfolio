"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/InputField";
import { SelectField } from "@/components/SelectField";
import { TextareaField } from "@/components/TextareaField";
import { EmailSubmit } from "@/lib/email";
import FormWrapper from "@/components/FormWrapper";
import { validationContactSchema } from "@/services/schema";

function FormContainer() {
  const form = useForm( {
    resolver: yupResolver( validationContactSchema ),
    mode: "onChange"
  } );

  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    control
  } = form;

  const services = [
    { value: "fe", label: "Frontend Development" },
    { value: "be", label: "Backend Development" },
    { value: "fs", label: "Fullstack Development" }
  ];

  const onSubmit = async ( data ) => {
    try {
      await EmailSubmit( data );
      reset( {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        service: "",
        message: ""
      } );
    } catch ( error ) {
      console.error( "Error sending email:", error );
      alert( "Failed to send the message. Please try again." );
    }
  };

  return (
    <>
      <FormWrapper
        form={ form }
        className="flex flex-col gap-6 px-10 py-8 bg-secondary rounded-xl"
        onSubmit={ onSubmit }
        isLoading={ isSubmitting }
      >
        <h3 className="text-4xl text-accent">Let&apos;s work together</h3>
        <p className="text-white/60 mt-5 mb-5">
          Excited to collaborate on impactful projects, I bring expertise in
          ReactJS, NextJS, and modern frontend development. Let’s connect to
          create seamless and engaging digital experiences together!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InputField
            name="firstname"
            placeholder="Firstname"
            control={ control }
            register={ register }
            isSubmitting={ isSubmitting }
            errors={ errors }
          />
          <InputField
            name="lastname"
            placeholder="Lastname"
            control={ control }
            register={ register }
            isSubmitting={ isSubmitting }
            errors={ errors }
          />
          <InputField
            name="email"
            placeholder="Email"
            control={ control }
            register={ register }
            isSubmitting={ isSubmitting }
            errors={ errors }
          />
          <InputField
            name="phone"
            placeholder="Phone number"
            control={ control }
            register={ register }
            isSubmitting={ isSubmitting }
            errors={ errors }
          />
        </div>
        <div className="my-5">
          <SelectField
            name="service"
            options={ services }
            errors={ errors }
            placeholder="Select a service"
            labelFocus="Service"
            control={ control }
            register={ register }
            isSubmitting={ isSubmitting }
          />
        </div>
        <div className="mb-6">
          <TextareaField
            name="message"
            placeholder="Type your message here"
            register={ register }
            control={ control }
            errors={ errors }
            isSubmitting={ isSubmitting }
          />
        </div>
        <Button size="md" type="submit" className="max-w-40" disabled={ isSubmitting }>
          { isSubmitting ? "Sending..." : "Send message" }
        </Button>
      </FormWrapper>
    </>
  );
}

export default FormContainer;