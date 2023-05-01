import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchFromApi } from '../api';

const AddNewPost = () => {
  const { _id } = useParams();
  const history = useHistory();
  const [post, setPost] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    willDeliver: false,
  });
  const handleField = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log('post', post);
    console.log('token', token);
    const response = await fetchFromApi({
      endPoint: 'posts',
      method: 'POST',
      body: {
        post: post,
      },
      token: localStorage.getItem('token'),
    });
    console.log('response', response);
    history.push(`/posts`);
  };

  const updatePost = async (e) => {
    e.preventDefault();
    const API_URL =
      'https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT';
    try {
      const response = await fetch(`${API_URL}/posts/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          post: post,
        }),
      });
      const result = await response.json();
      console.log(result);
      history.push(`/posts`);
      return result;
    } catch (err) {
      console.error(err);
    }
  };
  console.log('post', post);
  useEffect(() => {
    if (_id) {
      const tempPost = JSON.parse(localStorage.getItem('editPost'));
      console.log('tempPost', tempPost);
      setPost({
        title: tempPost.title,
        description: tempPost.description,
        price: tempPost.price,
        location: tempPost.location,
        willDeliver: tempPost.willDeliver,
      });
    }
  }, [_id]);
  console.log('_id', _id);
  return (
    <div>
      <h1 className="add-new-heading">{_id ? 'Edit Post' : 'Add New Post'}</h1>
      <form
        className="add-new-post-form"
        onSubmit={_id ? updatePost : handleSubmit}
      >
        <input
          value={post.title}
          className="add-new-input"
          type="text"
          name="title"
          onChange={handleField}
          placeholder="Title"
          required
        />
        <br />
        <input
          value={post.description}
          className="add-new-input"
          type="text"
          name="description"
          onChange={handleField}
          placeholder="Description"
          required
        />
        <br />
        <input
          value={post.price}
          className="add-new-input"
          type="text"
          name="price"
          onChange={handleField}
          placeholder="Price"
          required
        />
        <br />
        <input
          className="add-new-input"
          type="text"
          value={post.location}
          name="location"
          onChange={handleField}
          placeholder="Location"
          required
        />
        <br />
        <div>
          <input
            checked={post.willDeliver}
            type="checkbox"
            name="willDeliver"
            onChange={(e) =>
              setPost({ ...post, willDeliver: e.target.checked })
            }
          />
          Willing to Deliver?
        </div>
        <button type="submit">{_id ? 'UPDATE' : 'CREATE'}</button>
      </form>
    </div>
  );
};

export default AddNewPost;
