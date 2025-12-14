"use client"
type FormInputProps = {
        type: "text";
        value: string;
        ref?: React.Ref<HTMLInputElement>;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    }
    | {
        type: "textarea";
        value: string;
        ref?: React.Ref<HTMLTextAreaElement>;
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    }
    | {
        type: "number";
        value: number;
        ref?: React.Ref<HTMLInputElement>;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    };

const FormInput: React.FC<FormInputProps> = ({
    type,
    ref,
    value,
    onChange,
    onKeyDown
}) => {
  return (
    <>
        {type === "text" ? 
            <input 
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                ref={ref}
                className="bg-white text-[#1C1C1C] py-1.5 px-5 rounded-lg"
                type="text" 
                placeholder="title for your task" 
                required
            />
        : type === "textarea" ?
            <textarea 
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                ref={ref}
                className="bg-white text-[#1C1C1C] py-1.5 px-5 rounded-lg min-h-7.5"
                placeholder="more detailed task description"
            />
        :
            <input
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className="w-12.5 py-1.5 px-4 rounded-lg bg-white text-[#1C1C1C] appearance-none"
                type="number"
            />
        }
            
    </>
  )
}

export default FormInput