import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService  from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePost } from "../store/postSlice";

const EditPostPage = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    setPost(fetchedPost);
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const handlePostUpdate = (updatedData) => {
        dispatch(updatePost({ postId: post.$id, updatedData }));
    };

    return post ? (
        <div className="py-8">
            <Container>
            <PostForm post={post} onUpdate={handlePostUpdate} />
            </Container>
        </div>
    ) : null;
};

export default EditPostPage;
