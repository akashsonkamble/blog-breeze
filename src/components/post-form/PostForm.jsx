import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService  from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PostForm = ({ post }) => {
    
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });
    
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    const submit = async (data) => {
        console.log("data :: submit  :: ", data);
        try {
            if (post) {

                console.log("post :: updatePost :: ", post);
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file && post.featuredImage) {
                    await appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(
                    post.$id, {
                        ...data,
                        featuredImage: file ? file.$id : undefined,
                    }
                )

                if (dbPost) {
                    toast.success("Post updated successfully");
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;                

                if (file) {
                    data.featuredImage = file.$id;
                    data.userId = userData?.$id;
                    
                    const content = data.content;
                    if (content && content.length < 250) {
                        const dbPost = await appwriteService.createPost(data);
                        // console.log("dbPost :: createPost :: ", dbPost);
                        if (dbPost) {
                            toast.success("Post created successfully");
                            navigate(`/post/${dbPost.$id}`);
                        }
                    } else {
                        toast.error("Content must be a valid string and no longer than 250 chars");
                    }
                }
            }
        } catch (error) {
            if (error.code === 400) {
                // const errorMessage = "Something went wrong!";
                toast.error(error);
            }
            toast.error(error);
            console.log("PostForm :: submit :: error", error);
            return null;
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");
        }

        return '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title, {shouldValidate: true}));
            }
        });

        return () => subscription.unsubscribe();

    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="block w-full mb-4 text-xs text-gray-400"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 mt-5"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-[#1b4436]" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
};

export default PostForm;
