"use client";

import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import {Button} from "@/components/ui/button";
import {InputField} from "./InputField";
import {SelectField} from "./SelectField";
import {TextareaField} from "./TextareaField";
import {ToastSuccess} from "./ToastSuccess";
import {useRef, useState} from "react";

const validationSchema = Yup.object().shape({
    firstname: Yup.string()
        .required("Firstname is required")
        .matches(/^[a-zA-Z\s]+$/, "Please enter a valid firstname (letters only)"),
    lastname: Yup.string()
        .required("Lastname is required")
        .matches(/^[a-zA-Z\s]+$/, "Please enter a valid lastname (letters only)"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must be numeric")
        .required("Phone number is required"),
    service: Yup.string().required("Please select a service"),
    message: Yup.string().min(10, "Message must be at least 10 characters").required("Message is required"),
});

function FormContainer() {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setValue,
        trigger,
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const [open, setOpen] = useState(false);
    const form = useRef();

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const onSubmit = async () => {
        try {
            await emailjs.sendForm(serviceID, templateID, form.current, {
                publicKey,
            });
            setOpen(true);
            reset();
        } catch (error) {
            console.error("Error sending email:", error);
            alert("Failed to send the message. Please try again.");
        }
    };

    return (
        <>
            <form
                ref={form}
                className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h3 className="text-4xl text-accent">Let's work together</h3>
                <p className="text-white/60">
                    Excited to collaborate on impactful projects, I bring expertise in
                    ReactJS, NextJS, and modern frontend development. Let’s connect to
                    create seamless and engaging digital experiences together!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                        name="firstname"
                        register={register}
                        errors={errors}
                        placeholder="Firstname"
                        onBlur={() => trigger("firstname")}
                    />
                    <InputField
                        name="lastname"
                        register={register}
                        errors={errors}
                        placeholder="Lastname"
                        onBlur={() => trigger("lastname")}
                    />
                    <InputField
                        name="email"
                        register={register}
                        errors={errors}
                        placeholder="Email"
                        onBlur={() => trigger("email")}
                    />
                    <InputField
                        name="phone"
                        register={register}
                        errors={errors}
                        placeholder="Phone number"
                        onBlur={() => trigger("phone")}
                    />
                </div>

                <SelectField
                    name="service"
                    options={[
                        "Frontend Development",
                        "Backend Development",
                        "Fullstack Development",
                    ]}
                    setValue={setValue}
                    trigger={trigger}
                    errors={errors}
                />

                <TextareaField
                    name="message"
                    register={register}
                    errors={errors}
                    placeholder="Type your message here."
                    onBlur={() => trigger("message")}
                />

                <Button size="md" type="submit" className="max-w-40" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send message"}
                </Button>
            </form>
            <ToastSuccess open={open} setOpen={setOpen}/>
        </>
    );
}

export default FormContainer;