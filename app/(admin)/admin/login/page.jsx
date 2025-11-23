"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/InputField";
import { useRouter } from "next/navigation";
import { useAsyncAction } from "@/lib/hooks";
import { AdminLoginAction } from "@/store/actions/Auth/action";
import FormWrapper from "@/components/FormWrapper";
import STATUS_CODES from "@/constants/status";
import { validationAdminLoginSchema } from "@/services/schema";
import Toast from "@/components/Toast";
import { TOAST_STATUS } from "@/constants/toast";

function AdminLogin() {
  const router = useRouter();
  const { execute } = useAsyncAction();
  const form = useForm( {
    resolver: yupResolver( validationAdminLoginSchema ),
    mode: "onChange"
  } );

  const {
    register,
    formState: { errors, isSubmitting },
    control,
    reset
  } = form;

  const onSubmit = async ( data ) => {
    try {
      const { status } = await execute( AdminLoginAction, data );
      reset( {
        username: "",
        password: ""
      } );
      status === STATUS_CODES.SUCCESS && router.push( "/admin" );
    } catch ( error ) {
      Toast( {
        title: error.message || "Login failed. Please check your credentials.",
        type: TOAST_STATUS.error
      } );
    }
  };
  return (
    <div className="container h-full flex flex-col justify-center items-center">
      <FormWrapper
        form={ form }
        className="w-[320px] md:w-[448px] gap-6 p-10 bg-secondary rounded-xl"
        onSubmit={ onSubmit }
        isLoading={ isSubmitting }
      >
        <h3 className="text-4xl text-center text-accent">Admin Login</h3>

        <div className="grid gap-6 mt-6 mb-6">
          <InputField
            name="username"
            placeholder="Username"
            control={ control }
            register={ register }
            isSubmitting={ isSubmitting }
            errors={ errors }
          />
          <InputField
            name="password"
            placeholder="Password"
            type="password"
            control={ control }
            register={ register }
            isSubmitting={ isSubmitting }
            errors={ errors }
          />
        </div>
        <div className="flex justify-center">
          <Button size="md" type="submit" className="max-w-40 tex" disabled={ isSubmitting }>
            { isSubmitting ? "Sending..." : "Login" }
          </Button>
        </div>
      </FormWrapper>
    </div>
  );
}

export default AdminLogin;