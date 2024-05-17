import { useMemo, useRef, useState } from "react";

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
    const editor = useRef(null);
    const [content, setContent] = useState(defaultValue);

    const config = useMemo(() => ({
        placeholder: "Start typing...",
        buttons: [ "bold", "italic", "underline", "strikethrough", "|", "ul", "ol", "|", "center", "left", "right", "justify", "|", "link", "image"],
        uploader: { insertImageAsBase64URI: false },
        removeButtons: ["brush", "file"],
        showXPathInStatusbar: false,
        showCharsCounter: false,
        showWordsCounter: false,
        toolbarAdaptive: false
    }), []);

    const editorChangeHandler = (newContent, onChange) => {
        if (newContent.length <= maxLength) {
            setContent(newContent);
            onChange(newContent);
        } else {
            const truncatedContent = newContent.slice(0, maxLength);
            toast.error(`Content must be no longer than ${maxLength} characters`);
            setContent(truncatedContent);
            onChange(truncatedContent);
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
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1}
                        onChange={(newContent) => editorChangeHandler(newContent, onChange)}
                    />
                )}
            />
        </div>
    );
};

export default RTE;