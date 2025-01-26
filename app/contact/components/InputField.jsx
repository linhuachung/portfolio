import {Input} from "@/components/ui/input";

export function InputField({name, register, errors, placeholder, onBlur}) {
    return (
        <div>
            <Input className={`w-full ${errors[name] && "border-red-500"}`} {...register(name)}
                   placeholder={placeholder}
                   onBlur={onBlur}/>
            {errors[name] && (
                <p className="text-red-500 text-sm mt-2 ml-1">{errors[name]?.message}</p>
            )}
        </div>
    );
}