"use client";

import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import {Button} from "@/components/ui/button";
import {InputField} from "@/components/InputField";
// import {ToastSuccess} from "./ToastSuccess";
import {useRef, useState} from "react";

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required("username is required")
        .matches(/^[a-zA-Z\s]+$/, "Please enter a valid username (letters only)"),
    password: Yup.string()
        .required("password is required")
        .matches(/^[a-zA-Z\s]+$/, "Please enter a valid password (letters only)"),
});

function AdminLogin() {
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
        <div className="container h-full flex flex-col justify-center items-center">
            <form
                ref={form}
                className="max-w-xs md:max-w-md gap-6 p-10 bg-[#27272c] rounded-xl"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h3 className="text-4xl text-center text-accent">Admin Login</h3>

                <div className="grid gap-6 mt-6 mb-6">
                    <InputField
                        name="username"
                        register={register}
                        errors={errors}
                        placeholder="Username"
                        onBlur={() => trigger("username")}
                    />
                    <InputField
                        name="password"
                        register={register}
                        errors={errors}
                        placeholder="Password"
                        onBlur={() => trigger("password")}
                    />
                </div>
                <div className="flex justify-center">
                    <Button size="md" type="submit" className="max-w-40 tex" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Login"}
                    </Button>
                </div>
            </form>
            {/*<ToastSuccess open={open} setOpen={setOpen}/>*/}
        </div>
    );
}

export default AdminLogin;