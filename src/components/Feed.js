import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Input from './Input';
import { handlePostState, useSSRPostsState } from 'atoms/postAtom';
import Post from './Post';

function Feed({ posts }) {
  const [realtimePosts, setRealtimePosts] = useState([]);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState); // default server side render

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('api/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();
      setRealtimePosts(responseData);
      setHandlePost(false);
      setUseSSRPosts(false);
    };

    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlePost]);

  console.log(realtimePosts);
  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input />
      {/* Posts */}
      {!useSSRPosts
        ? realtimePosts.map((post) => <Post key={post._id} post={post} />)
        : posts.map((post) => <Post key={post_id} post={post} />)}
      {/* Hybrid */}
    </div>
  );
}

export default Feed;
