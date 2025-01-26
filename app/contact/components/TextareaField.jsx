import {Textarea} from "@/components/ui/textarea";

export function TextareaField({name, register, errors, placeholder, onBlur}) {
    return (
        <div>
            <Textarea
                {...register(name)}
                className={`h-[200px] ${errors[name] && "border-red-500"}`}
                placeholder={placeholder}
                onBlur={onBlur}
            />
            {errors[name] && (
                <p className="text-red-500 text-sm mt-2 ml-1">{errors[name]?.message}</p>
            )}
        </div>
    );
}