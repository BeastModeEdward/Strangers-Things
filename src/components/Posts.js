import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFromApi } from '../api';
import Post from './Post';

const Posts = () => {
  const [gPosts, setGPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searText, setSearText] = useState([]);

  const fetchPosts = async () => {
    const data = await fetchFromApi({
      endPoint: 'posts',
    });
    console.log('posts', data.data.posts);

    if (data.data.posts) {
      setPosts(data.data.posts);
      setGPosts(data.data.posts);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = (txt) => {
    setSearText(txt);
    if (txt === '') {
      setPosts(gPosts);
    } else {
      setPosts(
        gPosts.filter((item) => {
          if (
            item.title.toLowerCase().includes(txt.toLowerCase()) ||
            item.description.toLowerCase().includes(txt.toLowerCase())
          ) {
            return item;
          }
        })
      );
    }
  };

  return (
    <>
      <h1>
        Posts
        <input
          type="text"
          value={searText}
          placeholder="Search Posts"
          onChange={(e) => handleSearch(e.target.value)}
        />
        {localStorage.getItem('token') && <Link to="/posts/add">ADD POST</Link>}
      </h1>
      <div>
        {posts ? (
          posts.map((post, idx) => (
            <Post
              key={post.id ?? idx}
              idx={idx}
              post={post}
              posts={posts}
              setPosts={setPosts}
            />
          ))
        ) : (
          <div>No Post</div>
        )}
      </div>
    </>
  );
};

export default Posts;
