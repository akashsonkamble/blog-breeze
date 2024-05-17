import { useEffect } from 'react';

import { Container, PostCard } from '../components';

import { useSelector, useDispatch } from "react-redux";

import appwriteService  from "../appwrite/config";

import { setPosts } from "../store/postSlice";

const AllPostsPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.post.posts);

    useEffect(() => {
        if (!posts.length) {
            appwriteService.getPosts().then((fetchedPosts) => {
                if (fetchedPosts) {
                    dispatch(setPosts(fetchedPosts.documents));
                }
            });
        }
    }, [dispatch, posts]);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold">
                                No posts to show
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default AllPostsPage;
