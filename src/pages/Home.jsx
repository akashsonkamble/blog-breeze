import React, { useEffect } from "react";
import { Container, PostCard } from "../components";

import appwriteService from "../appwrite/config";

import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../store/postSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
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

  if (authStatus === false) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length === 0 && authStatus === true) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                No posts to show
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
