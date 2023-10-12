import React, { useId } from "react";

const Input = ({ 
    label, 
    type = "text", 
    className = "", 
    ...props 
  }, ref) => {

    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label className="inline-block mb-1 pl-1" htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white 
                    text-black outline-none focus:bg-gray-50
                    duration-200 border border-gray-200 w-full active:border-light active:outline-none focus:outline-none focus:shadow-[0_3px_30px_-10px_rgba(0,0,0,0.26)]  $
                    {className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
}

export default React.forwardRef(Input);