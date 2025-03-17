import {useEffect, useRef, useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export function InputField({name, register, errors, placeholder, onBlur, type, ...props}) {
    const [isFocused, setIsFocused] = useState(false);
    useEffect(() => {
        setTimeout(function () {
            const inputs = document.querySelectorAll("input");
            inputs.forEach((input) => {
                if (window.getComputedStyle(input, null).getPropertyValue("appearance") === "menulist-button") {
                    setIsFocused(true)
                }
            });
        }, 300);

    }, [])

    return (
        <div className="relative w-full">
            <Label
                htmlFor={name}
                className={`absolute left-3 transition-all text-gray-500 ${
                    isFocused || register(name).value ? " z-10 bg-[#27272c] text-white/60 -top-2 text-xs px-2 before:content-[''] before:absolute before:-z-10 before:left-0 before:right-0 before:top-0 before:bottom-0 before:bg-[#27272c] before:rounded-sm" : "top-3 text-sm"
                } ${errors[name] ? "text-red-500" : ""}`}
            >
                {placeholder}
            </Label>
            <Input
                id={name}
                className={`w-full pt-2 pb-2 bg-transparent ${errors[name] && "border-red-500"} `}
                {...register(name)}
                placeholder=""
                onFocus={() => setIsFocused(true)}
                onBlur={(e) => {
                    setIsFocused(e.target.value !== "");
                    onBlur && onBlur(e);
                }}
                type={type ? type : "text"}
            />
            {errors[name] && (
                <p className="text-red-500 text-sm mt-2 ml-1">{errors[name]?.message}</p>
            )}
        </div>
    );
}