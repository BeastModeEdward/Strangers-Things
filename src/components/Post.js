import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post, idx, posts, setPosts }) => {
  const [sendMessage, setSendMessage] = useState(false);
  const [content, setContent] = useState('');
  const postMessage = async () => {
    const API_URL =
      'https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT';
    try {
      const response = await fetch(`${API_URL}/posts/${post._id}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          message: {
            content: content,
          },
        }),
      });
      const result = await response.json();
      console.log(result);
      setSendMessage(false);
      setContent('');
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async (id) => {
    const API_URL =
      'https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT';
    try {
      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const result = await response.json();
      console.log(result);
      setPosts(posts.filter((obj) => obj._id !== id));
      alert('Post is Deleted');
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div key={post.id ?? idx}>
      <h5>Item: {post.title}</h5>
      <p>{post.description}</p>
      <small>Price: {post.price}</small>
      <br />
      {post.author.username === localStorage.getItem('username') ? (
        <>
          {localStorage.getItem('token') && (
            <>
              <Link to={`/posts/edit/${post._id}`}>
                <button
                  onClick={() => {
                    localStorage.setItem('editPost', JSON.stringify(post));
                  }}
                >
                  Edit
                </button>
              </Link>
              <button onClick={() => deletePost(post._id)}>Delete</button>
            </>
          )}
        </>
      ) : (
        <>
          {sendMessage ? (
            <>
              <h1>Message:</h1>
              <input
                type="text"
                placeholder="Title"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button onClick={() => postMessage()}>Send Message</button>
            </>
          ) : (
            localStorage.getItem('token') && (
              <button onClick={() => setSendMessage(true)}>Send Message</button>
            )
          )}
        </>
      )}
      <hr />
    </div>
  );
};

export default Post;
