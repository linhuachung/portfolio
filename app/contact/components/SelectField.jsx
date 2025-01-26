import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function SelectField({name, options, setValue, trigger, errors}) {
    return (
        <div>
            <Select
                onValueChange={(value) => {
                    setValue(name, value);
                    trigger(name);
                }}
            >
                <SelectTrigger className={`w-full ${errors[name] && "border-red-500"}`}>
                    <SelectValue placeholder="Select a service"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Select a service</SelectLabel>
                        {options.map((option) => (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {errors[name] && (
                <p className="text-red-500 text-sm mt-2 ml-1">{errors[name]?.message}</p>
            )}
        </div>
    );
}