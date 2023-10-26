import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";

const RTE = ({
    name,
    control,
    label,
    defaultValue = "",
    maxLength = 257,
}) => {
    const [content, setContent] = useState(defaultValue);

    const keyDownHandler = (e) => {
        const regex = /[!@#$%^&*(),.?":{}|<>]/;

        if (regex.test(e.key)) {
            e.preventDefault();
            toast.error("Special characters are not allowed");
            return;
        }

        const allowedKeys = /^(Backspace|Delete|Tab|Enter|Shift|Control|Alt|CapsLock|ArrowLeft|ArrowRight|ArrowUp|ArrowDown|ShiftLeft|ShiftRight|ControlLeft|ControlRight|AltLeft|AltRight|Home|End)$/;

        if (content.length >= maxLength && !allowedKeys.test(e.key)) {
            e.preventDefault();
            toast.error("Content must be no longer than 250 characters");
            return;
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
            <>
                <Editor
                initialValue={defaultValue}
                value={content}
                init={{
                    height: 300,
                    menubar: true,
                    plugins: [
                    "image",
                    "advert",
                    "autolink",
                    "lists",
                    "link",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "help",
                    "wordcount",
                    ],
                    toolbar:
                    "undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help",
                    content_style:
                    "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }",
                }}
                onEditorChange={(content) => {
                    editorChangeHandler(content);
                    onChange(content);
                }}
                onKeyDown={keyDownHandler}
                />
            </>
            )}
        />
    </div>
  );
};

export default RTE;
