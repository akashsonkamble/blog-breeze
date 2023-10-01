import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default RTE = ({ name, control, label, defaultValue = "" }) => {
  return <div className="w-full">
    { label && <label className="inline-block mb-1 pl-1" htmlFor={name}>{label}</label>}
    <Controller
    name={name}
    control={control}
    initialValue={defaultValue}
    render={({ field: { onChange }}) => (
      <Editor
      {...field}
      init={{
        height: 500,
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
          "wordcount"
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
      onEditorChange={onChange}
      />
    )}
    />
  </div>;
};

