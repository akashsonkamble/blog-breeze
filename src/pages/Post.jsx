import { useEffect, useState } from "react";

import { Button, Container } from "../components";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import appwriteService  from "../appwrite/config";

import { deletePost } from "../store/postSlice";

import { toast } from "react-toastify";

import parse from "html-react-parser";

const PostPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { slug } = useParams();
    const [post, setPost] = useState(null);

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((fetchedPost) => {
                if (fetchedPost) setPost(fetchedPost);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePostHandler = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                toast.success("Post deleted successfully");
                dispatch(deletePost(post.$id));
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-[#1b4436]" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-[#b70000]" onClick={deletePostHandler}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
};

export default PostPage;