import { useState } from "react";

import { Controller } from "react-hook-form";

import JoditEditor from 'jodit-react';

import { toast } from "react-toastify";

const RTE = ({
    name = "content",
    control,
    label,
    defaultValue = "",
    maxLength = 250,
}) => {
    const [content, setContent] = useState(defaultValue);

    const config = {
        readonly: false,
        menubar: true,
        height: 300,
        toolbar: true,
        placeholder: "Type here...",
    }

    const keyDownHandler = (e) => {
        const { key } = e;
        const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;

        if (specialCharactersRegex.test(key)) {
            e.preventDefault();
            toast.error("Special characters are not allowed");
            return;
        }

        if (content.length >= maxLength && key !== "Backspace" && key !== "Delete") {
            e.preventDefault();
            toast.error(`Content must be no longer than ${maxLength} characters`);
        }
  };

    const editorChangeHandler = (newContent) => {
        if (newContent.length <= maxLength) {
            setContent(newContent);
        } else {
            const truncatedContent = newContent.slice(0, maxLength);
            setContent(truncatedContent);
        }
    };

  return (
    <div className="w-full">
        {label && (
            <label className="inline-block mb-1 pl-1" htmlFor={name}>
                {label}
            </label>
        )}
        <Controller
            name={name || "content"}
            control={control}
            render={({ field: { onChange } }) => (
                <JoditEditor
                    value={content}
                    config={config}
                    tabIndex={1}
                    onKeyDown={keyDownHandler}
                    onBlur={(newContent) => setContent(newContent)}
                />
            )}
        />
    </div>
  );
};

export default RTE;
