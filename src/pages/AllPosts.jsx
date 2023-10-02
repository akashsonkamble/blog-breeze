import { useEffect, useState } from 'react';
import { Container, PostCard } from '../components';
import { service as appwriteService } from "../appwrite/config";

const AllPostsPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        
    }, []);
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents);
        }
    });
    return <div className="w-full py-8">
        <div className="flex flex-wrap">
            {posts.map((post) => (
                <div key={post.$id} className="p-2 w-1/4">
                    <PostCard post={post} />
                </div>
            ))}
        </div>
    </div>;
};

export default AllPostsPage;
