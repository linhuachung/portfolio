"use client";

import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {Button} from "@/components/ui/button";
import {InputField} from "@/components/InputField";
import {useRef} from "react";
import {useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector, useAsyncAction} from "@/lib/hooks";
import {AdminLoginAction} from "@/store/reducers/Auth/action";

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required("username is required"),
    password: Yup.string()
        .required("password is required")
});

function AdminLogin() {
    const router = useRouter()
    const { execute, loading, error } = useAsyncAction();
    console.log({loading, error})
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        trigger,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const form = useRef();

    const onSubmit = async () => {
        try {
            const username = form.current.username.value;
            const password = form.current.password.value;

            // const data = await loginAdmin({username, password});
            // data && setTimeout(() => router.push("/admin"), 1000);
            await execute(AdminLoginAction, {username, password});
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <div className="container h-full flex flex-col justify-center items-center">
            <form
                ref={form}
                className="w-[320px] md:w-[448px] gap-6 p-10 bg-[#27272c] rounded-xl"
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
                        autoComplete="off"
                    />
                    <InputField
                        name="password"
                        register={register}
                        errors={errors}
                        placeholder="Password"
                        onBlur={() => trigger("password")}
                        type="password"
                        autoComplete="off"
                    />
                </div>
                <div className="flex justify-center">
                    <Button size="md" type="submit" className="max-w-40 tex" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Login"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AdminLogin;